# Office SDK React Demo

React 18 + Vite 示例，演示如何把 Office SDK 封装成 `OfficeViewer` 组件，并复用 `/shared` 中的打开、新建和生命周期 helper。

## 启动

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://127.0.0.1:5174/
```

如需预览构建产物，可运行 `npm run build && npm run preview`，默认预览地址为 `http://127.0.0.1:4174/`。

## 关键文件

- `src/App.jsx`：文件选择、新建类型、打开选项和状态展示。
- `src/components/OfficeViewer.jsx`：封装 `OfficeUI.openfile`、`OfficeUI.createfile`、挂载、重新打开和卸载。
- `vite.config.js`：把 `@office-sdk` 指向当前包的 `/lib`，把 `@office-sdk-shared` 指向 `/shared`。
