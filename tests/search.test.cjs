const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const file of ['namespace.js', 'data/partners.js', 'data/map-config.js', 'search.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'src', file), 'utf8'), context, { filename: file });
}
const { partners, filterPartners } = context.window.CSSAMap;
const search = (query, extra = {}) => filterPartners(partners, { query, category: 'all', area: 'all', ...extra });

test('merchant IDs are stable and unique; every physical location has valid coordinates', () => {
  assert.equal(partners.length, 30);
  assert.equal(new Set(partners.map(p => p.id)).size, partners.length);
  for (const p of partners) {
    assert.ok(p.name && p.perk && p.shortPerk);
    if (p.addressPending) {
      assert.equal(p.lat, undefined);
      assert.equal(p.lng, undefined);
    } else {
      assert.ok(Number.isFinite(p.lat) && p.lat >= -90 && p.lat <= 90, p.id);
      assert.ok(Number.isFinite(p.lng) && p.lng >= -180 && p.lng <= 180, p.id);
    }
  }
});
test('aliases, traditional names, case and full-width forms remain searchable', () => {
  assert.equal(search('添玺')[0].name, '添璽（The North Bistro）');
  assert.equal(search('ＳＫＩＮ　ＬＡＢ')[0].name, 'From 1% Skin Lab');
  assert.equal(search('柠檬茶').length, 1);
  assert.equal(search('V+')[0].id, 'partner_29');
});
test('full long offers are indexed, not only card summaries', () => {
  const matches = search('event food orders of 100+ meals');
  assert.equal(matches.length, 3);
  assert.ok(matches.every(p => p.name.includes('MYST')));
});
test('category, area and all query terms are combined', () => {
  const matches = search('share tea', { category: 'drink', area: 'vancouver' });
  assert.ok(matches.length > 0);
  assert.ok(matches.every(p => p.area === 'vancouver' && p.category === 'drink'));
  assert.equal(search('share tea', { category: 'food' }).length, 0);
  assert.equal(search('share tea impossibleword').length, 0);
});
test('outer area filter and merchant with pending address remain searchable', () => {
  assert.ok(search('', { area: 'outer' }).length > 0);
  assert.ok(search('', { area: 'outer' }).every(p => ['surrey', 'langley', 'coquitlam'].includes(p.area)));
  const fitbox = search('fit box');
  assert.equal(fitbox.length, 1);
  assert.equal(fitbox[0].addressPending, true);
});
test('clearing a query restores all records without mutating merchant data', () => {
  const before = JSON.stringify(partners);
  assert.equal(search('no-such-merchant').length, 0);
  assert.equal(search('  ').length, 30);
  assert.equal(JSON.stringify(partners), before);
});
test('Downtown is separate from the remaining Vancouver locations', () => {
  assert.deepEqual(Array.from(search('', { area: 'downtown' }), p => p.id), ['partner_4', 'partner_15', 'partner_23']);
  assert.equal(search('', { area: 'vancouver' }).length, 7);
  assert.equal(search('市中心').length, 3);
  assert.equal(search('Vancouver').filter(p => p.area === 'downtown').length, 3);
  assert.equal(search('share tea', { area: 'downtown' })[0].id, 'partner_4');
});
test('short latin tokens and global club terms do not cause false positives', () => {
  const okMatches = search('ok');
  assert.equal(okMatches.length, 1);
  assert.equal(okMatches[0].id, 'partner_29');
  assert.ok(!okMatches.some(p => p.name.includes('Tokyo') || p.name.includes('Boxing') || p.name.includes('Share')));

  const ubcMatches = search('ubc');
  assert.equal(ubcMatches.length, 1);
  assert.equal(ubcMatches[0].area, 'ubc');

  assert.equal(search('cssa').length, 0);
});
