# PPTX API

PPTX API 通过 `widget.render()` 返回的 `app` 调用：

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-pptx", fileName: "demo.pptx", file });
const app = await widget.mount("#office-container").render();
```

## 组件

| Component | 说明 |
| --- | --- |
| `Document` | 页码、缩放、布局、导出、只读状态 |
| `Paragraph` | 文本字体、颜色、字号、加粗、斜体、下划线、删除线、段落水平对齐 |
| `TextBox` | 文本框垂直对齐 |
| `Player` | 启动放映、放映态跳转、全屏播放 |
| `Selection` | 选区类型、文本样式查询、选区变化事件 |
| `Viewer` | 获取缩略图区域当前活动目标。 |
| `UndoRedo` | 撤销、重做和可用状态 |

## 快速示例

```ts
app.Document.setZoom(120);
app.Document.goToSlide(2);

app.Paragraph.setFontName("Arial");
app.Paragraph.setBold(true);
app.Paragraph.setAlignment(2);

app.TextBox.setVerticalAlignment(1);
app.Player.play(1);
```

事件示例：

```ts
function onSelectionChange(info) {
  console.log(info.selectType);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `getSlideInfo` | `(): { total: number; current: number }` | `{ total; current }` | 获取总页数与当前页，页码从 `1` 开始。 |
| `getCurrentSlideIndex` | `(): number` | `number` | 获取当前页码，页码从 `1` 开始。 |
| `getSlideCount` | `(): number` | `number` | 获取总页数。 |
| `getZoom` | `(): number` | `number` | 获取缩放比例。 |
| `setZoom` | `(value: number): void` | `void` | 设置缩放比例，常用值如 `80`、`100`、`120`。 |
| `autoZoom` | `(): void` | `void` | 自动缩放。 |
| `focusEditor` | `(): void` | `void` | 当前 PPTX 实现为空操作。 |
| `updateVisibleArea` | `(): void` | `void` | 重新计算可视区域。 |
| `goToSlide` | `(slideNum: number): void` | `void` | 跳转到幻灯片，`slideNum` 从 `1` 开始。 |
| `deleteSlides` | `(slides?: number[]): void` | `void` | 删除指定幻灯片索引；不传时删除当前选中的幻灯片。`slides` 使用从 `0` 开始的索引。 |
| `addSlide` | `(layout?: SlideLayoutRef, position?: number): void` | `void` | 插入新幻灯片；`layout` 使用布局索引，`position` 是从 `0` 开始的插入位置。不传 `layout` 时沿用当前选区附近的布局。 |
| `getSlideLayouts` | `(force?: boolean): SlideLayoutItem[][]` | `SlideLayoutItem[][]` | 按母版分组获取布局列表；`force = true` 时刷新缓存。 |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | 导出 PPTX 原文件。 |
| `copy` | `(): Promise<void>` | `Promise<void>` | 复制当前选区。 |
| `cut` | `(): Promise<void>` | `Promise<void>` | 剪切当前选区。 |
| `paste` | `(): Promise<void>` | `Promise<void>` | 粘贴到当前选区。 |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | 获取主题色和标准色。 |
| `startReadOnly` | `(): void` | `void` | 进入只读状态。 |
| `endReadOnly` | `(): void` | `void` | 退出只读状态。 |
| `isReadOnly` | `(): boolean` | `boolean` | 当前是否只读。 |
| `isDisable` | `(): boolean` | `boolean` | 当前编辑器是否处于禁用状态。 |

```ts
type SlideLayoutRef = {
  masterIndex: number;
  layoutIndex: number;
};

type SlideLayoutItem = {
  img: unknown;
  name: string;
  xmlName: string;
  id: string | number;
  layoutIndex: number;
  slideMasterIndex: number;
};
```

`goToSlide(slideNum)` 使用从 `1` 开始的展示页码；`deleteSlides(slides)` 和 `addSlide(layout, position)` 使用从 `0` 开始的底层索引。

Document 示例：

```ts
const pages = app.Document.getSlideInfo();
console.log(pages.current, pages.total);

app.Document.goToSlide(1);
const layoutGroups = app.Document.getSlideLayouts();
const layout = layoutGroups[0][0];
app.Document.addSlide(
  {
    masterIndex: layout.slideMasterIndex,
    layoutIndex: layout.layoutIndex
  },
  1
);
app.Document.deleteSlides([0]);

await app.Document.exportDocument();
```

Document 支持的组件事件：

| 事件名 | payload | 说明 |
| --- | --- | --- |
| `DOCUMENT_READY` | 事件参数透传 | 文档 ready。 |
| `DOCUMENT_EXPORT_READY` | 事件参数透传 | 导出完成。 |
| `PPTX_SLIDES_CHANGED` | `(currentPage: number, totalPages: number)` | 当前页或页数变化。 |
| `PPTX_ZOOM_CHANGE` | `(zoom: number)` | 缩放变化。 |
| `PPTX_FIRST_PAGE_LOADED` | 无 | 第一页加载完成。 |
| `PPTX_START_LOADING` | 无 | 开始加载。 |


## Paragraph

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `setFontName` | `(value: string): void` | `void` | 设置字体。 |
| `setFontColor` | `(value: string \| { hex: string; [key: string]: unknown }): void` | `void` | 设置字体颜色。对象形式必须包含 `hex`；新接入建议统一使用 `{ hex: "#RRGGBB" }` 对象。 |
| `setFontSize` | `(value: number \| string): void` | `void` | 设置字号。 |
| `setBold` | `(value: boolean): void` | `void` | 设置粗体。 |
| `setItalic` | `(value: boolean): void` | `void` | 设置斜体。 |
| `setUnderline` | `(value: boolean): void` | `void` | 设置下划线。 |
| `setStrikeThrough` | `(value: boolean): void` | `void` | 设置删除线。 |
| `setAlignment` | `(value: 0 \| 1 \| 2 \| 3 \| 4): void` | `void` | 设置段落水平对齐。 |
| `decreaseFontSize` | `(): void` | `void` | 减小字号。 |
| `increaseFontSize` | `(): void` | `void` | 增大字号。 |

`setAlignment(value)` 枚举：

| 值 | 说明 |
| --- | --- |
| `0` | 右对齐 |
| `1` | 左对齐 |
| `2` | 居中 |
| `3` | 两端对齐 |
| `4` | 分散对齐 |

Paragraph 示例：

```ts
app.Paragraph.setFontName("Microsoft YaHei");
app.Paragraph.setFontColor({ hex: "#4472C4" });
app.Paragraph.setFontSize(18);
app.Paragraph.setBold(true);
app.Paragraph.setItalic(false);
app.Paragraph.setUnderline(true);
app.Paragraph.setStrikeThrough(false);
app.Paragraph.setAlignment(2);
app.Paragraph.increaseFontSize();
```

PPTX `setFontColor(...)` 当前只会按 `hex` 解析对象颜色；`type`、`name`、`theme`、`tint` 等字段可作为色盘元数据随对象携带，但不能省略 `hex`，也不支持仅传 `{ name, theme }` 形式的主题色。

## TextBox

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `setVerticalAlignment` | `(value: 0 \| 1 \| 2 \| 3 \| 4): void` | `void` | 设置文本框垂直对齐。 |

`setVerticalAlignment(value)` 枚举：

| 值 | 说明 |
| --- | --- |
| `0` | 顶部 |
| `1` | 居中 |
| `2` | 底部 |
| `3` | 两端分布 |
| `4` | 分散分布 |

示例：

```ts
app.TextBox.setVerticalAlignment(1);
```

## Player

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `playFirst` | `(): void` | `void` | 在当前放映态跳到第一页。 |
| `playLast` | `(): void` | `void` | 在当前放映态跳到最后一页。 |
| `play` | `(fromType: 1 \| 2): void` | `void` | 启动幻灯片放映。 |
| `playPrevious` | `(): void` | `void` | 在当前放映态跳到上一页。 |
| `playNext` | `(): void` | `void` | 在当前放映态跳到下一页。 |
| `enterFullScreen` | `(fromType: 1 \| 2): void` | `void` | 进入全屏。 |
| `exitFullScreen` | `(): void` | `void` | 退出全屏。 |

`fromType`：

| 值 | 说明 |
| --- | --- |
| `1` | 从头开始 |
| `2` | 从当前页开始 |

示例：

```ts
app.Player.play(2);
app.Player.enterFullScreen(1);
app.Player.exitFullScreen();
```

## Selection

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `isTextSelected` | `(): boolean` | `boolean` | 当前是否处于文本选区或文本编辑上下文；光标在文本框内但没有选中字符时也可能为 `true`。 |
| `isShapeSelected` | `(): boolean` | `boolean` | 当前是否选中图形。 |
| `isUnderline` | `(): boolean` | `boolean` | 当前文本是否为单下划线。 |
| `isStrikeThrough` | `(): "" \| "noStrike" \| "sngStrike" \| "dblStrike" \| null` | `string \| null` | 获取当前文本的删除线状态值；混合状态可能返回空字符串，没有可解析值时可能返回 `null`。 |
| `getFontSize` | `(): string` | `string` | 获取当前字号；混合字号时返回最小字号加 `+`。 |
| `getFontName` | `(): string \| null` | `string \| null` | 获取当前字体；混合字体时返回空字符串。 |
| `isBold` | `(): boolean \| 0 \| null` | `boolean \| 0 \| null` | 获取粗体状态；混合状态时可能返回 `0`。 |
| `isItalic` | `(): boolean \| 0 \| null` | `boolean \| 0 \| null` | 获取斜体状态；混合状态时可能返回 `0`。 |
| `getFontColor` | `(): string` | `string` | 获取字体颜色，当前返回 `rgba(...)` 字符串；alpha 值来自底层数据，不能假定已归一化到 CSS 的 `0` 到 `1`。混合颜色、非纯色填充或暂不支持的填充类型当前会回退为 `rgba(0,0,0,1)`。 |
| `getAlignment` | `(): "default" \| "right" \| "left" \| "center" \| "justify" \| "distribute" \| "nil"` | `string` | 获取段落水平对齐。 |
| `getVerticalAlignment` | `(): "top" \| "center" \| "bottom" \| "default" \| undefined` | `string \| undefined` | 获取文本框垂直对齐；当前没有文本框结果或默认锚点无法解析时返回 `undefined`。 |

Selection 示例：

```ts
if (app.Selection.isTextSelected()) {
  console.log(app.Selection.getFontName());
  console.log(app.Selection.getFontColor());
}
```

如果将 `getFontColor()` 的返回值直接用于 CSS，请先把 alpha 规范到 CSS `rgba()` 需要的 `0` 到 `1` 范围。

`getAlignment()` 返回值：

| 值 | 说明 |
| --- | --- |
| `"default"` | 默认对齐。 |
| `"right"` | 右对齐。 |
| `"left"` | 左对齐。 |
| `"center"` | 居中。 |
| `"justify"` | 两端对齐。 |
| `"distribute"` | 分散对齐。 |
| `"nil"` | 多选内容没有统一水平对齐值。 |

`getVerticalAlignment()` 返回值：

| 值 | 说明 |
| --- | --- |
| `"top"` | 顶部。 |
| `"center"` | 居中。 |
| `"bottom"` | 底部。 |
| `"default"` | 默认垂直对齐。 |
| `undefined` | 当前没有文本框结果，或默认锚点没有解析出可识别的垂直对齐值。 |

当前实现中内部保留了 `"NIL"` 映射，但不会作为稳定的 `getVerticalAlignment()` 返回值暴露。

Selection 支持的组件事件：

| 事件名 | payload |
| --- | --- |
| `SELECTION_CHANGE` | `PptxSelectionChange` |

```ts
type PptxSelectionChange = {
  selectType: number;
  bold?: boolean | 0 | null;
  italic?: boolean | 0 | null;
  fontName?: string | null;
  fontSize?: string;
  fontColor?: string;
  underline?: boolean;
  strikeout?: "" | "noStrike" | "sngStrike" | "dblStrike" | null;
  alignHorizontal?: string;
  alignVertical?: "top" | "center" | "bottom" | "default";
  canCopy: boolean;
};
```

`selectType` 是位标记，可通过按位或组合：

| 值 | 说明 |
| --- | --- |
| `0` | 无稳定选区 |
| `1` | 表格 |
| `2` | 图形 |
| `4` | 文本 |
| `6` | 图形 + 文本 |
| `8` | SmartArt |
| `16` | 图表 |
| `32` | 图片 |

常见组合值：

| 值 | 说明 |
| --- | --- |
| `6` | 图形 + 文本 |

## Viewer

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `getActiveZoom` | `(): null \| "" \| "Thumbnail" \| "ThumbnailGapLine"` | `string \| null` | 获取缩略图区域当前活动目标；首次收到活动目标事件前返回 `null`。 |

返回值：

| 值 | 说明 |
| --- | --- |
| `null` | 尚未收到活动目标事件。 |
| `""` | 当前没有稳定目标。 |
| `"Thumbnail"` | 缩略图。 |
| `"ThumbnailGapLine"` | 缩略图间隔线。 |

## UndoRedo

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `undo` | `(): void` | `void` | 撤销。 |
| `redo` | `(): void` | `void` | 重做。 |
| `canUndo` | `(): boolean` | `boolean` | 是否可撤销。 |
| `canRedo` | `(): boolean` | `boolean` | 是否可重做。 |

UndoRedo 支持的组件事件：

| 事件名 | payload |
| --- | --- |
| `UNDO_REDO_STATE_CHANGE` | 事件参数透传 |

示例：

```ts
if (app.UndoRedo.canUndo()) {
  app.UndoRedo.undo();
}
```
