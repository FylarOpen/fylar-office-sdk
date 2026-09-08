# DOCX API

DOCX API 通过 `widget.render()` 返回的 `app` 调用：

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-docx", fileName: "demo.docx", file });
const app = await widget.mount("#office-container").render();
```

## 组件

| Component | 说明 |
| --- | --- |
| `Document` | 导出、缩放、分页视图、页码跳转、页面设置、复制剪切粘贴、段落标记、分页符和分节符显示 |
| `Paragraph` | 字体、文字样式、段落对齐、行距、项目符号和编号 |
| `Table` | 表格插入、删除、行列操作、合并与取消合并 |
| `Selection` | 选区、光标、分隔符插入、选区变化事件 |
| `Finder` | 查找、上一个/下一个结果、查找状态 |
| `UndoRedo` | 撤销、重做和可用状态 |

## 快速示例

```ts
app.Document.setZoom(120);
app.Paragraph.setFontName("Arial");
app.Paragraph.setFontSize(14);
app.Paragraph.setFontColor({ r: 68, g: 114, b: 196 });

if (app.Table.isInTable()) {
  app.Table.addRows("End", 1);
}

app.Finder.search("合同");
app.Finder.selectNext();
```

事件示例：

```ts
function onSelectionChange(info) {
  console.log("selection", info);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
app.Selection.removeEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | 导出原始文档。 |
| `exportPdf` | `(printOptions?: unknown): Promise<void>` | `Promise<void>` | 按打印配置导出 PDF。 |
| `setZoom` | `(value: number): void` | `void` | 设置缩放比例，常用值如 `80`、`100`、`120`。 |
| `getZoom` | `(): number` | `number` | 获取当前缩放比例。 |
| `focusEditor` | `(): void` | `void` | 将焦点切回编辑区。 |
| `updateVisibleArea` | `(): void` | `void` | 重新计算可视区域。 |
| `setPageView` | `(mode: "single" \| "multi" \| "wide"): void` | `void` | 切换单页、多页、页宽视图。 |
| `goToPage` | `(pageNum: number): void` | `void` | 跳转到页码，`pageNum` 从 `1` 开始。 |
| `getCurrentPagePosition` | `(pageIndex?: number): PagePosition \| {}` | `PagePosition \| {}` | 获取页码信息；`pageIndex` 为页索引，从 `0` 开始，不传取当前页。当前实现不会稳定区分显式传入的 `0` 与未传值。 |
| `setPageOrientation` | `(value: "Portrait" \| "Landscape"): void` | `void` | 设置页面纵向或横向；只支持精确传入 `"Portrait"` 或 `"Landscape"`。 |
| `setPageSize` | `(width: number, height: number): void` | `void` | 设置页面宽高，单位为厘米；`width`、`height` 必须是有限正数。 |
| `copy` | `(): Promise<void>` | `Promise<void>` | 触发编辑区复制。 |
| `cut` | `(): Promise<void>` | `Promise<void>` | 触发编辑区剪切。 |
| `paste` | `(): Promise<void>` | `Promise<void>` | 触发编辑区粘贴。 |
| `startReadOnly` | `(): void` | `void` | 进入只读状态。 |
| `endReadOnly` | `(): void` | `void` | 退出只读状态。 |
| `isReadOnly` | `(): boolean` | `boolean` | 获取当前只读状态。 |
| `setShowParagraphMarks` | `(value: boolean): void` | `void` | 设置是否显示段落换行标记。 |
| `getShowParagraphMarks` | `(): boolean` | `boolean` | 获取段落换行标记显示状态。 |
| `setShowPageBreak` | `(value: boolean): void` | `void` | 设置是否显示分页符标记。 |
| `getShowPageBreak` | `(): boolean` | `boolean` | 获取分页符标记显示状态。 |
| `setShowSectionBreak` | `(value: boolean): void` | `void` | 设置是否显示分节符标记。 |
| `getShowSectionBreak` | `(): boolean` | `boolean` | 获取分节符标记显示状态。 |

`PagePosition`：

```ts
type PagePosition = {
  pageNum: number;
  pageCnt: number;
  total: number;
};
```

Document 示例：

```ts
await app.Document.exportPdf();

app.Document.setPageView("wide");
app.Document.goToPage(3);

const page = app.Document.getCurrentPagePosition();
console.log(page.pageNum, page.pageCnt, page.total);

app.Document.setPageOrientation("Portrait");
app.Document.setPageSize(21, 29.7);
await app.Document.cut();
app.Document.setShowParagraphMarks(true);
app.Document.setShowPageBreak(true);
app.Document.setShowSectionBreak(true);
```

页面设置参数说明：

- `setPageOrientation(...)` 不接收空字符串、自定义字符串或其他别名；传入非法值属于未定义行为。
- `setPageSize(...)` 不会把 `0`、负数、空参数或极小尺寸归一化为安全值，接入方应在调用前完成参数校验。

Document 支持的组件事件：

| 事件名 | payload | 说明 |
| --- | --- | --- |
| `DOCX_PAGE_POSITION_CHANGE` | 无 | 当前页位置变化。 |
| `DOCX_FIRST_PART_LOADING` | `(isLoading: boolean)` | 首批页面加载状态。 |
| `DOCX_END_LOADING` | `(count: number)` | 全部页面加载完成。 |
| `DOCUMENT_EXPORT_READY` | 无 | 导出完成。 |
| `DOCX_ZOOM_CHANGE` | 无 | 缩放变化。 |
| `DOCX_PART_LOADING` | `(pageIndex: number, ratio: number)` | 分段加载进度，`ratio` 通常为 `0` 到 `1`。 |

`exportPdf(...)` 需要安全上下文（通常为 HTTPS 或 localhost）、`window.queryLocalFonts` 和本地字体访问权限。不满足条件时当前实现不会执行 PDF 导出。

## Paragraph

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `setBold` | `(value?: boolean): void` | `void` | 设置或切换粗体。不传时按当前选区状态切换。 |
| `setItalic` | `(value?: boolean): void` | `void` | 设置或切换斜体。不传时按当前选区状态切换。 |
| `setUnderline` | `(lineType?: string): void` | `void` | 设置或取消下划线，默认线型为 `"thick"`。 |
| `setStrikeThrough` | `(value?: boolean): void` | `void` | 设置或切换删除线。 |
| `setFontSize` | `(value: string \| number): void` | `void` | 设置字号；空值、非数值会被忽略。 |
| `setFontName` | `(value: string): void` | `void` | 设置字体；当前 API 不校验字体是否已安装或是否存在于字体列表。 |
| `setFontColor` | `(value: DocxColor): void` | `void` | 设置字体颜色，支持 RGB 或主题色对象。主题色必须来自 `getColorPalette()` 返回项。 |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | 获取主题色和标准色。 |
| `setAlignment` | `(value: ParagraphAlignment): boolean` | `boolean` | 设置段落水平对齐。 |
| `getAlignment` | `(): ParagraphAlignment \| undefined` | `ParagraphAlignment \| undefined` | 获取当前段落水平对齐。 |
| `setLineSpacing` | `(value: number): void` | `void` | 设置行距倍数，常用值如 `1`、`1.15`、`1.5`、`2`。 |
| `setBulletList` | `(index?: number): boolean \| undefined` | `boolean \| undefined` | 设置或取消项目符号，默认 `index = -1`。 |
| `setNumberedList` | `(index?: number): boolean \| undefined` | `boolean \| undefined` | 设置或取消编号，默认 `index = -1`。 |

颜色和对齐参数：

```ts
type DocxColor =
  | { r: number; g: number; b: number }
  | { name: string; theme: number; tint?: number; shade?: number };

type ParagraphAlignment =
  | "Left"
  | "Centered"
  | "Right"
  | "Justified"
  | "Distributed"
  | 0
  | 1
  | 2
  | 3
  | 4;
```

`ParagraphAlignment` 数字值与 PPTX 对齐枚举一致：`0` 右对齐、`1` 左对齐、`2` 居中、`3` 两端对齐、`4` 分散对齐。

主题色调用必须包含 `name` 和 `theme`；仅传 `{ theme, tint }` 时无法定位主题色名称，不属于受支持参数。

Paragraph 示例：

```ts
app.Paragraph.setBold(true);
app.Paragraph.setItalic(false);
app.Paragraph.setUnderline("single");
app.Paragraph.setStrikeThrough(false);

app.Paragraph.setFontName("Microsoft YaHei");
app.Paragraph.setFontSize(16);
app.Paragraph.setFontColor({ r: 192, g: 0, b: 0 });

app.Paragraph.setAlignment("Centered");
app.Paragraph.setLineSpacing(1.5);
app.Paragraph.setBulletList(0);
```

## Table

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `insertTable` | `(rows?: number, columns?: number): void` | `void` | 插入表格，默认 `3 x 4`。 |
| `delete` | `(): void` | `void` | 删除当前表格。 |
| `addRows` | `(insertLocation?: InsertLocation \| number, rowCount?: number): void` | `void` | 在当前位置插入行，默认向后插入 1 行；第一个参数传数字时表示行数。 |
| `addColumns` | `(insertLocation?: InsertLocation \| number, columnCount?: number): void` | `void` | 在当前位置插入列，默认向右插入 1 列；第一个参数传数字时表示列数。 |
| `deleteRows` | `(rowCount?: number): void` | `void` | 删除当前行，默认删除 1 行。 |
| `deleteColumns` | `(columnCount?: number): void` | `void` | 删除当前列，默认删除 1 列。 |
| `mergeCells` | `(): void` | `void` | 合并当前选中的单元格。 |
| `unmergeCells` | `(): void` | `void` | 取消合并单元格。 |
| `isInTable` | `(): boolean` | `boolean` | 当前选区是否在表格内。 |

```ts
type InsertLocation =
  | "Start"
  | "Before"
  | "Left"
  | "start"
  | "before"
  | "left"
  | "End"
  | "After"
  | "Right"
  | "end"
  | "after"
  | "right";
```

`"Start"`、`"Before"`、`"Left"` 及其小写形式表示向前或向左插入；其他值按默认 `"End"` 处理，即向后或向右插入。

Table 示例：

```ts
app.Table.insertTable(3, 5);

if (app.Table.isInTable()) {
  app.Table.addColumns("End", 1);
  app.Table.addRows(2);
  app.Table.mergeCells();
}
```

## Selection

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `getSelectedText` | `(options?: unknown): string` | `string` | 获取当前选区文本；没有有效选区时返回空字符串。 |
| `getParagraphInfo` | `(pageIndex?: number): ParagraphInfo` | `ParagraphInfo` | 获取段落所在行列和选区 ID。 |
| `clearSelection` | `(): void` | `void` | 清空页面选区高亮。 |
| `hideCursor` | `(): void` | `void` | 隐藏光标。 |
| `insertBreak` | `(type?: BreakType): void` | `void` | 插入分页符、分节符或分栏符；只支持下方 `BreakType` 枚举。 |

```ts
type ParagraphInfo = {
  row: number;
  col: number;
  selection: {
    startPosId?: string;
    endPosId?: string;
  };
};

type BreakType =
  | "Page"
  | "SectionNext"
  | "SectionContinuous"
  | "SectionEven"
  | "SectionOdd"
  | "Column";
```

`insertBreak(...)` 参数说明：

- `"SectionNext"`、`"SectionContinuous"`、`"SectionEven"`、`"SectionOdd"` 分别表示下一页、连续、偶数页、奇数页分节符。
- 不支持 `"SectionNextPage"`、`"SectionEvenPage"`、`"SectionOddPage"`、`"Line"` 等别名；软回车当前不属于该 API 的能力范围。
- 省略参数会插入分页符。非法参数的兜底行为不作为对外保证，接入方应只传合法枚举。

Selection 示例：

```ts
app.Selection.insertBreak("Page");
app.Selection.insertBreak("SectionNext");

const info = app.Selection.getParagraphInfo();
console.log(info.row, info.col);
```

Selection 支持的组件事件：

| 事件名 | payload |
| --- | --- |
| `SELECTION_CHANGE` | `DocxSelectionChange` |

```ts
type DocxSelectionChange = {
  bold: boolean;
  italic: boolean;
  fontName: string;
  fontSize: number | string;
  fontColor: unknown;
  underline: boolean;
  strikeout: boolean;
  paraAlignHorizontal:
    | "left"
    | "center"
    | "right"
    | "justify"
    | "distribute"
    | undefined;
  canCopy: boolean;
};
```

## Finder

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `search` | `(text: string): void` | `void` | 开始查找关键词。 |
| `getSelectText` | `(): string \| undefined` | `string \| undefined` | 获取当前选中文本；仅在选中文本长度大于 `0` 且小于 `256` 时返回。 |
| `selectNext` | `(): void` | `void` | 跳到下一个查找结果。 |
| `selectPrevious` | `(): void` | `void` | 跳到上一个查找结果。 |
| `getSearchStatus` | `(): FinderStatus` | `FinderStatus` | 获取当前查找状态。 |

```ts
type FinderStatus = {
  keyword: string;
  allFounds: unknown[];
  currentIndex: number;
  totalCount: number;
  loop: boolean;
  currentSelect: unknown;
  countNum?: number;
};
```

Finder 支持的组件事件：

| 事件名 | payload | 说明 |
| --- | --- | --- |
| `DOCX_OPEN_FIND_UI` | 无 | 文档请求打开查找 UI。 |

`DOCX_OPEN_FIND_UI` 表示编辑器发出了“打开查找面板”的请求，不表示每次执行 `Finder.search(...)` 都会触发该事件；搜索结果状态请使用 `getSearchStatus()` 获取。

Finder 示例：

```ts
const selectedWord = app.Finder.getSelectText();
app.Finder.search(selectedWord || "合同");
app.Finder.selectNext();

const status = app.Finder.getSearchStatus();
console.log(status.currentIndex, status.totalCount);
```

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
| `UNDO_REDO_STATE_CHANGE` | 无 |

示例：

```ts
if (app.UndoRedo.canUndo()) {
  app.UndoRedo.undo();
}
```
