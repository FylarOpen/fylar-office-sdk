# 开发指南：CSP 部署指南

本文档面向需要在企业内网、门户系统或安全网关后接入 `office-sdk` 的场景，说明 SDK 在 `Content-Security-Policy` 下的最小部署要求和常见调整方式。

## 适用场景

如果接入页面配置了 CSP，请在上线前确认 SDK 静态资源目录、文档文件来源和页面自身脚本策略都已纳入白名单。SDK 会加载 ES Module、样式、Worker、SharedWorker、WebAssembly、图片和字体等资源，过窄的 CSP 会导致文档打开失败或空白。

## 推荐起始配置

下面配置假设：

- SDK 的完整 `lib/` 目录与接入页面同源部署，例如 `/office-sdk/`
- 文档文件也从同源或明确的业务文件域名加载
- 接入页面通过外部 `type="module"` 脚本或动态 `import()` 加载 SDK，不依赖 inline script

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval';
  script-src-elem 'self';
  worker-src 'self';
  child-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: blob:;
  connect-src 'self' https://<file-host>;
  object-src 'none';
  base-uri 'self';
```

请将 `https://<file-host>` 替换为实际的文档文件、图片或鉴权接口域名。如果所有文件都与页面同源，可以移除该占位域名。

## 指令说明

| 指令 | 是否通常必需 | 说明 |
| --- | --- | --- |
| `script-src 'self'` | 是 | 允许加载 `UI.js`、`preload.js`、运行时拆分模块和 wasm JS glue 文件。 |
| `'wasm-unsafe-eval'` | 是 | 允许浏览器编译和实例化 WebAssembly。 |
| `'unsafe-eval'` | 兼容项 | 用于兼容部分浏览器或安全策略对 WebAssembly 运行时的识别差异。若企业安全规范不允许配置该项，请先在目标浏览器完成 CSP 验证。 |
| `script-src-elem 'self'` | 建议 | 如果企业策略显式配置了 `script-src-elem`，需要允许同源模块脚本。 |
| `worker-src 'self'` | 是 | SDK 默认从静态 `worker/` 目录加载 module Worker 和 SharedWorker。 |
| `child-src 'self'` | 建议 | 兼容部分旧浏览器或旧 CSP 实现对 Worker 的 fallback。 |
| `style-src 'self' 'unsafe-inline'` | 是 | SDK 会加载 `style.css`，运行时组件也会写入必要的 inline style。 |
| `font-src 'self' data:` | 建议 | 允许加载 SDK/文档渲染所需字体和内嵌字体数据。 |
| `img-src 'self' data: blob:` | 是 | 文档中的图片、预览图、导出图像和临时对象 URL 可能使用 `data:` 或 `blob:`。 |
| `connect-src` | 按业务配置 | 打开远程文档 URL、请求鉴权接口或加载跨域资源时，需要加入对应域名。 |
| `object-src 'none'` | 建议 | SDK 不依赖 `<object>`，建议禁用。 |
| `base-uri 'self'` | 建议 | 限制页面 `<base>` 注入风险。 |

## 什么时候需要 `blob:`

SDK 默认 Worker 是静态文件 URL，因此基础配置中 `worker-src 'self'` 即可。只有在以下情况才需要把 `blob:` 加入 `worker-src` 和 `child-src`：

- 接入方把 Worker URL 改写成 `blob:` URL
- 宿主页面或微前端框架统一把 Worker 包装成 Blob Worker
- 企业代理或安全容器要求通过 Blob URL 注入 Worker 脚本

对应配置示例：

```http
worker-src 'self' blob:;
child-src 'self' blob:;
```

## Inline script 建议

SDK 本身不要求 `script-src 'unsafe-inline'`。如果接入页面需要写 inline bootstrap 脚本，优先使用 `nonce` 或 `hash`：

```http
script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval' 'nonce-<random>';
```

页面中的脚本标签示例：

```html
<script type="module" nonce="<random>">
  import OfficeSdk from "/office-sdk/UI.js";
</script>
```

如果企业安全规范禁止 inline script，建议把接入代码放入独立 `.js` 文件，并通过同源模块脚本加载。

## 跨域部署注意事项

当前 SDK 直接通过 `new SharedWorker(workerUrl)` 创建 SharedWorker。SharedWorker 对脚本来源有严格的同源限制，因此仅配置 CSP 和 CORS 不能保证完整 SDK 可跨域运行。

推荐做法：

- 将完整 `lib/` 与接入页面部署在同一 origin
- 或由宿主域名反向代理 SDK 静态资源，使 `/office-sdk/worker/` 对页面表现为同源
- 保持 `worker/`、`worker/wasm/`、`locale-assets/`、`vendor/` 的完整目录结构
- 为 `.wasm` 返回 `application/wasm` MIME 类型

ES Module、样式或文档 URL 可以按浏览器规则单独配置跨域访问，但这不等于跨域 SharedWorker 可用。上线前必须在最终域名、CSP 和浏览器环境中实际打开文档验证。

## 常见 CSP 报错排查

| 报错现象 | 可能原因 | 处理方式 |
| --- | --- | --- |
| `Refused to load the script` | `script-src` 或 `script-src-elem` 未允许 SDK 资源域名 | 加入 SDK 静态资源域名，并确认 `UI.js`、运行时 chunk 可访问。 |
| `Refused to create a worker` | `worker-src` 未允许 Worker 来源，或 SharedWorker 脚本与页面不同源 | 确认 `worker-src` 允许同源 Worker，并将 `worker/` 同源部署或通过宿主域名反向代理；若使用 Blob Worker，额外加入 `blob:`。 |
| `Refused to compile or instantiate WebAssembly` | 缺少 `'wasm-unsafe-eval'` 或浏览器只识别 `'unsafe-eval'` | 在 `script-src` 中加入 `'wasm-unsafe-eval'`；必要时保留 `'unsafe-eval'`。 |
| 文档图片丢失 | `img-src` 未允许 `data:` 或 `blob:` | 在 `img-src` 中加入 `data:` 和 `blob:`。 |
| 样式错乱 | `style-src` 未允许 `style.css` 或 inline style | 允许 SDK 样式域名，并保留 `'unsafe-inline'`。 |
| 远程文档打开失败 | `connect-src` 未允许文件域名或鉴权接口域名 | 将实际业务域名加入 `connect-src`。 |

## 上线检查清单

- 已部署完整 `lib/` 目录，而不是只部署 `UI.js`
- `style.css`、`worker/`、`worker/wasm/`、`locale-assets/`、`vendor/` 均可直接访问
- CSP 中允许 SDK 静态资源域名
- CSP 中允许 Worker 和 WebAssembly 所需指令
- SharedWorker 脚本与宿主页面同源
- 目标浏览器允许 SharedWorker 和 IndexedDB
- 打开 `.wasm` 文件时服务器返回 `application/wasm`
- 远程文档 URL、鉴权接口和图片域名已加入 `connect-src` / `img-src`
- 浏览器 DevTools Console 中没有 CSP violation
