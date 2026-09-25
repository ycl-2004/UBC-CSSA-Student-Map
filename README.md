# UBC CSSA 福利地图

大温合作商家地图，支持店名/别名/优惠搜索、分类和区域筛选，以及完整会员优惠详情。使用原生 HTML、CSS、JavaScript 和 Leaflet 1.9.4。

线上地址：<https://ycl-2004.github.io/UBC-CSSA-Student-Map/>。

GitHub Pages 从 `main` 分支根目录发布，后续推送到 `main` 会自动更新网站。`index.html` 跳转至地图入口，`.nojekyll` 保证直接发布静态文件。

## 打开与开发

可以直接双击 `cssa-map-design-directions.html`。HTML、`src/`、`styles/` 必须一起保留。Leaflet 与底图来自外部服务，需要联网。

推荐开发时在项目根目录运行静态服务器：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8765/cssa-map-design-directions.html>。不需要安装 npm 依赖或执行构建。部署时上传 HTML、`src/` 和 `styles/`；不能只上传 HTML。

## 文件分工

```text
cssa-map-design-directions.html   页面结构、控件和资源加载顺序
src/
  namespace.js                   唯一共享命名空间 CSSAMap
  app.js                         页面状态、筛选事件、模块协调
  data/
    partners.js                  运行时商家数据、优惠、坐标、搜索别名
    map-config.js                地名、核心范围、区域配色
  search.js                      纯筛选函数与分类词
  map.js                         Leaflet 初始化、视野和标记更新
  marker-icons.js                地图标记与聚合图标
  ui/
    dom.js                       DOM 工具、文本转义、响应式断点
    partner-list.js              商家列表、抽屉和筛选展开
    detail-panel.js              详情弹层、焦点恢复、导航
styles/
  main.css                       样式入口及加载顺序
  base.css                       颜色变量、字体、基础交互
  layout.css                     页面布局与头部
  sidebar.css                    搜索、筛选、商家卡片
  map.css                        地图和标记
  detail.css                     详情标题、正文、固定操作区
  responsive.css                 手机、平板、窄屏与短屏规则
cssa_partner_discounts.csv        原始整理与地址来源快照，不是页面的实时数据源
```

## 修改商家数据

编辑 `src/data/partners.js`，每个分店一条记录，`id` 保持唯一且稳定。

- `name`、`address`、`areaLabel`：显示名称、完整地址、区域名称。
- `perk`：完整优惠；`shortPerk`：列表摘要。摘要应保留折扣数字和主要条件。
- `category`：`food`、`drink`、`fun` 或 `life`。
- `area`：`downtown`、`vancouver`、`richmond`、`burnaby`、`ubc`、`surrey`、`coquitlam`、`langley` 或 `unconfirmed`。
- `aliases`：中英文名称、简繁体、常用简称；搜索也覆盖地址、优惠与分类。
- `lat`、`lng`：仅填写已确认的实体店坐标。地址未确认的商家使用 `addressPending: true`，省略坐标。

CSV 是历史来源记录；修改 CSV 不会自动更新网站。页面以 `partners.js` 为准，避免同时维护两份运行时数据。

## 维护约定与设计决定

各脚本通过 IIFE 保持私有作用域，只把明确接口放进 `window.CSSAMap`。HTML 中的 `defer` 脚本按顺序加载：命名空间 → 数据/工具 → 功能模块 → `app.js`。新增依赖时，把它放在使用它的脚本前。

这里选择普通独立脚本，是为了兼容双击 HTML 的 `file://` 打开方式。原生 ES 模块在本地文件协议下会受到浏览器 CORS 限制；如果以后引入打包工具或框架，可以把这些现有模块接口改成 import/export。

`app.js` 持有筛选和选中状态；列表组件只负责呈现；地图组件只管理 Leaflet。选中店铺时只更新卡片选中样式，不重新生成列表，所以关闭详情后滚动位置和键盘焦点可以保留。

860px 是列表抽屉和详情弹层的分界，修改时同步 `src/ui/dom.js` 与 `styles/responsive.css`。手机详情使用原生 modal dialog，背景不可操作，标题/关闭/操作区固定，正文单独滚动；桌面使用非模态地图详情卡。手机筛选默认收起，防止短屏被筛选控件占满。桌面与手机均由 `sidebarBody` 统一滚动筛选和商家列表，搜索框固定，避免筛选区成为滚动死区。溢出的区域按钮行支持鼠标纵向滚轮转为横向滚动，触控板横向手势保持原生行为。

地图容器尺寸变化由 ResizeObserver 通知 Leaflet；视觉视口变化用于适配软键盘。商家数据和搜索不依赖地图成功加载，外部 Leaflet 加载失败时显示提示，列表仍可用。

## 验证

搜索与数据完整性回归测试（需要 Node.js，无第三方依赖）：

```sh
node --test tests/search.test.cjs
```

改 UI 后检查 320×568、320×693、390×844、568×320、768×1024、1024×768 和 1440×900：列表、筛选、详情、长优惠、关闭返回及旋转屏幕。同时检查 `file://` 和 HTTP 两种入口。

改数据后检查“添玺”“skin lab”“柠檬茶”“event food orders of 100+ meals”，以及无结果后的清除筛选。地址未确认的商家应可搜索但不产生地图坐标或导航。

## 官方参考

- [脚本的 defer 加载顺序](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#defer)
- [原生模块与本地服务器要求](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [原生 dialog 的模态与焦点行为](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [Leaflet invalidateSize](https://leafletjs.com/reference.html#map-invalidatesize)

## Downtown 与地图视觉

商圈筛选互斥：`downtown` 单独列出，`vancouver` 表示温哥华其余区域，UBC 继续独立。Downtown 仍属于 Vancouver 市；这是一套找店分组，不是行政区划。基于现有地址，Mainland St 的 Share Tea、Abbott St 的 Tokyo in April、Nelson St 的 Wren Cafe 归入 Downtown；Broadway、Granville St、Kingsway、Renfrew St、W 41st Ave 的店铺保留在 Vancouver。参考 [Vancouver 市政府 Downtown 介绍](https://vancouver.ca/news-calendar/downtown.aspx) 与 [市政府区域边界数据](https://opendata.vancouver.ca/explore/dataset/local-area-boundary/)。本次未复核商家营业状态或重新地理编码。

地图沿用 Esri 真实道路与地名，以 CSS 柔化色彩、添加浅玫瑰色底图叠层；商家标记采用红边贴纸和花形聚合。区域虚线圆仅是视觉提示，不表示正式边界。Downtown 使用主地名标签，Vancouver 标签移到市区中部；区域跳转分别定位。窄屏保留横向滚动区域按钮，底图署名避开底部收起列表。

## 店铺链接与到店规则

`website` 保存 CSV「店铺Link」对应的 HTTP(S) 链接，按店名和地址匹配分店。详情底部的「店铺链接」在新窗口打开，可能指向官网或第三方商家页；不代表线上下单可享会员优惠。统一在列表显示「优惠仅限到店」，详情卡不重复展示使用提示。HAKUMORI 已按用户更正改为到店 15% off，取消旧官网折扣码文案。YOYO 暂保留 15% off 与美食分类，地址待确认，禁用导航且不生成坐标。CSV 作为来源快照保留旧优惠与地址描述，运行时以 partners.js 的最新更正为准。

## 地图拖动与来源

底图使用 `updateWhenIdle: false`、100ms 更新间隔，在拖动过程中请求瓦片；保留 3 圈已加载瓦片以改善往返拖动，并关闭瓦片渐显。代价是拖动期间可能增加请求和内存占用；首次进入新区域仍受底图服务网络速度影响。滤色改为单瓦片处理，粉色叠层限制在地图窗口大小，移除浮层背景模糊；缩放结束事件合并到一帧更新标记。来源栏收起为「Powered by Esri · 地图来源」，可展开完整署名。参考 [Leaflet GridLayer](https://leafletjs.com/reference.html#gridlayer-updatewhenidle) 和 [Esri 来源要求](https://developers.arcgis.com/documentation/esri-and-data-attribution/)。
