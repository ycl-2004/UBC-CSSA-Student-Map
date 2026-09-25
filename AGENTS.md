# CSSA map maintenance

- Read DEVELOPMENT.md for the file map, local startup, and data ownership.
- Keep the app usable from both file:// and an HTTP static server. Classic defer scripts have an explicit dependency order in the HTML entry.
- Keep merchant content in src/data/partners.js. CSV is a source snapshot, not runtime input. Never invent coordinates for delivery-only merchants.
- Keep CSS in styles/ and behavior in the corresponding src/ module. Avoid adding inline handlers/styles or rebuilding a single-file app.
- Keep the 860px breakpoint synchronized between src/ui/dom.js and styles/responsive.css.
- Preserve the established CSSA red/pastel design and English major place names.
- For UI changes, verify the supported viewports listed in README.md and both entry protocols. Preserve list scroll/focus when closing details.
- Do not commit, push, or deploy unless the user explicitly requests it for the current work.
