# XLSX API

XLSX API 通过 `widget.render()` 返回的 `app` 调用：

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-xlsx", fileName: "demo.xlsx", file });
const app = await widget.mount("#office-container").render();
```

## 组件

| Component | 说明 |
| --- | --- |
| `Document` | 导出、缩放、编辑态和加载事件 |
| `Workbook` | 工作表、调色板、数字格式和保护状态 |
| `Worksheet` | 行列、冻结窗格、行高列宽 |
| `Selection` | 当前选区内容、字体、边框、填充、对齐和数字格式 |
| `Finder` | 查找、上一个/下一个结果、查找状态 |
| `Cursor` | 当前鼠标/光标所在目标区域。 |
| `UndoRedo` | 撤销、重做和可用状态 |

## 快速示例

```ts
app.Document.setZoom(125);
app.Selection.setBold(true);
app.Selection.setFillColor({ r: 255, g: 242, b: 204 });
await app.Worksheet.insertRows();

app.Finder.search("收入");
app.Finder.selectNext();
```

事件示例：

```ts
function onSelectionChange(info) {
  console.log(info);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `isEditing` | `(): boolean` | `boolean` | 当前是否处于单元格内编辑态。 |
| `setZoom` | `(value: number, redraw?: boolean): boolean` | `boolean` | 设置缩放比例；`redraw` 默认 `true`，返回底层缩放操作结果。 |
| `getZoom` | `(): number` | `number` | 获取缩放比例。 |
| `focusEditor` | `(): void` | `void` | 当前 XLSX 实现为空操作。 |
| `updateVisibleArea` | `(): void` | `void` | 重新绘制当前活动工作表可视区域。 |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | 导出原始工作簿。 |
| `exportPdf` | `(printOptions?: unknown): Promise<void>` | `Promise<void>` | 按打印配置导出 PDF。 |
| `copy` | `(): Promise<void>` | `Promise<void>` | 复制当前选区。 |
| `cut` | `(): Promise<void>` | `Promise<void>` | 剪切当前选区。 |
| `paste` | `(): Promise<void>` | `Promise<void>` | 粘贴到当前选区。 |
| `startReadOnly` | `(): void` | `void` | 进入只读状态。 |
| `endReadOnly` | `(): void` | `void` | 退出只读状态。 |
| `isReadOnly` | `(): boolean` | `boolean` | 获取当前只读状态。 |

示例：

```ts
if (!app.Document.isEditing()) {
  app.Document.setZoom(110);
}

await app.Document.exportDocument();
await app.Document.exportPdf();
```

剪贴板说明：

`copy()`、`cut()`、`paste()` 依赖浏览器 Clipboard API、安全上下文和用户授权。部分浏览器不允许向系统剪贴板写入编辑器自定义 MIME 类型；这种情况下可能抛出 `NotAllowedError`，但文档编辑态不会因此失效。接入方应捕获异常，并引导用户使用系统快捷键。

Document 支持的组件事件：

| 事件名 | payload | 说明 |
| --- | --- | --- |
| `XLSX_WORKSHEET_LOADED` | 无 | 工作表加载完成。 |
| `XLSX_END_LOADING` | 无 | 文档加载结束。 |
| `DOCUMENT_EXPORT_READY` | 无 | 导出完成。 |
| `XLSX_EDITING_STATUS_CHANGE` | `(status: boolean)` | 单元格编辑态变化。 |
| `XLSX_ZOOM_CHANGE` | 无 | 缩放变化。 |
| `XLSX_WORKSHEET_LOADING_RATIO` | `(ratio: number)` | 工作表加载进度。 |
| `XLSX_FIRST_PART_LOADING` | 无 | 首批内容加载完成。 |
| `XLSX_WORKSHEET_CHANGE` | `({ sheetProtected?: boolean })` | 当前工作表变化。 |

`exportPdf(...)` 需要安全上下文（通常为 HTTPS 或 localhost）、`window.queryLocalFonts` 和本地字体访问权限。不满足条件时当前实现不会执行 PDF 导出。

## Workbook

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `addWorksheet` | `(): void` | `void` | 新增工作表。 |
| `setWorksheetName` | `(name: string, index?: number): boolean \| number` | `boolean \| number` | 设置工作表名称；`index` 不传时使用活动工作表。返回成功状态或名称校验状态码。 |
| `deleteWorksheet` | `(index?: number): void` | `void` | 删除工作表；`index` 不传时删除活动工作表。 |
| `getWorksheetName` | `(index?: number): string` | `string` | 获取工作表名称；`index` 不传时读取活动工作表。 |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | 获取调色板。 |
| `getCellNumberFormats` | `(): string[]` | `string[]` | 获取数字格式分类列表。 |
| `getNumberFormatExample` | `(format: string, value?: unknown, lcid?: unknown): unknown` | `unknown` | 获取一个数字格式示例。 |
| `getNumberFormatExamples` | `(formats: string[], value?: unknown, lcid?: unknown): unknown` | `unknown` | 批量获取数字格式示例。 |
| `isWorksheetProtected` | `(index?: number): boolean` | `boolean` | 判断工作表是否受保护；`index` 不传时检查活动工作表。 |

示例：

```ts
app.Workbook.addWorksheet();
app.Workbook.setWorksheetName("汇总");

const name = app.Workbook.getWorksheetName();
const protectedSheet = app.Workbook.isWorksheetProtected();

const formats = app.Workbook.getCellNumberFormats();
const examples = app.Workbook.getNumberFormatExamples(["0.00", "0%"], 1234.56, "zh-CN");
```

## Worksheet

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `isFrozenPane` | `(): boolean` | `boolean` | 当前是否冻结窗格。 |
| `toggleFreezePanes` | `(): void` | `void` | 切换冻结/取消冻结窗格。 |
| `setRowHeight` | `(heightPt: number): Promise<unknown>` | `Promise<unknown>` | 设置当前行高；空值会被忽略。 |
| `insertRows` | `(): Promise<unknown>` | `Promise<unknown>` | 插入行。 |
| `hideRows` | `(): Promise<unknown>` | `Promise<unknown>` | 隐藏行。 |
| `unhideRows` | `(): Promise<unknown>` | `Promise<unknown>` | 取消隐藏行。 |
| `deleteRows` | `(): Promise<unknown>` | `Promise<unknown>` | 删除行。 |
| `insertColumns` | `(): Promise<unknown>` | `Promise<unknown>` | 插入列。 |
| `setColumnWidth` | `(nChars: number): void` | `void` | 设置当前列宽，单位为字符宽度；空值会被忽略。 |
| `hideColumns` | `(): Promise<unknown>` | `Promise<unknown>` | 隐藏列。 |
| `unhideColumns` | `(): Promise<unknown>` | `Promise<unknown>` | 取消隐藏列。 |
| `deleteColumns` | `(): Promise<unknown>` | `Promise<unknown>` | 删除列。 |
| `getRowHeight` | `(row?: number \| null, wsIdx?: number \| null): number` | `number` | 获取行高；不传或传 `null` 时读取当前上下文。 |
| `getColumnWidth` | `(col?: number \| null, wsIdx?: number \| null): number` | `number` | 获取列宽；不传或传 `null` 时读取当前上下文。 |

示例：

```ts
if (!app.Worksheet.isFrozenPane()) {
  app.Worksheet.toggleFreezePanes();
}

await app.Worksheet.setRowHeight(24);
app.Worksheet.setColumnWidth(12);

const rowHeight = app.Worksheet.getRowHeight();
const colWidth = app.Worksheet.getColumnWidth();
```

## Selection

Selection 方法作用于当前活动单元格或选区。

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `clearContents` | `(): void` | `void` | 清空当前选区内容。 |
| `setAccountingFormat` | `(value: AccountingFormat): Promise<unknown> \| false` | `Promise<unknown> \| false` | 设置会计格式；格式值无效时可能返回 `false`。 |
| `setUnderline` | `(value: string): void` | `void` | 设置下划线。 |
| `setBorder` | `(value: BorderValue): void` | `void` | 设置边框。 |
| `setStrikeThrough` | `(value: boolean): void` | `void` | 设置删除线。 |
| `setBold` | `(value: boolean): void` | `void` | 设置粗体。 |
| `setItalic` | `(value: boolean): void` | `void` | 设置斜体。 |
| `setFontSize` | `(value: string \| number): void` | `void` | 设置字号；必须为 `0 < value <= 409`。 |
| `setHorizontalAlignment` | `(value: string): void` | `void` | 设置水平对齐。 |
| `setVerticalAlignment` | `(value: string): void` | `void` | 设置垂直对齐。 |
| `setFontColor` | `(value: XlsxColor): void` | `void` | 设置字体颜色。 |
| `setFillColor` | `(value: XlsxColor): void` | `void` | 设置填充色。 |
| `setFontName` | `(value: string): void` | `void` | 设置字体。 |
| `setCellStyle` | `(value: string): Promise<unknown>` | `Promise<unknown>` | 设置单元格样式。 |
| `setPercentFormat` | `(): Promise<unknown>` | `Promise<unknown>` | 设置百分比格式。 |
| `setNumberFormat` | `(value: unknown): Promise<unknown>` | `Promise<unknown>` | 设置数字格式。 |
| `increaseDecimalPlaces` | `(): void` | `void` | 增加小数位。 |
| `decreaseDecimalPlaces` | `(): void` | `void` | 减少小数位。 |

```ts
type AccountingFormat = "RMB" | "Dollar" | "EUR" | "GBP" | "JPY" | "none";

type XlsxColor =
  | { r: number; g: number; b: number }
  | { theme: number; tint?: number }
  | { indexed: number }
  | { rgbHex: string };

type BorderValue = {
  color: XlsxColor;
  position: string;
  style: string;
};
```

`rgbHex` 支持 6 位 `RRGGBB` 或 8 位 `AARRGGBB`。8 位形式可以携带 alpha；`{ r, g, b }` RGB 对象本身不支持透明度。

在单元格文本编辑态下，`setBold`、`setItalic`、`setUnderline` 和 `setStrikeThrough` 会切换当前状态，并忽略传入的布尔值；`setHorizontalAlignment` 和 `setVerticalAlignment` 在该状态下当前不会生效。

常用枚举：

| 参数 | 常用值 |
| --- | --- |
| `setUnderline(value)` | `"single"`、`"none"` |
| `setHorizontalAlignment(value)` | `"left"`、`"center"`、`"right"`、`"justify"`、`"distributed"` |
| `setVerticalAlignment(value)` | `"top"`、`"center"`、`"bottom"` |
| `setAccountingFormat(value)` | `"RMB"`、`"Dollar"`、`"EUR"`、`"GBP"`、`"JPY"`、`"none"` |
| `BorderValue.position` | `"all"`、`"none"`、`"inner"`、`"outer"`、`"left"`、`"right"`、`"top"`、`"bottom"`、`"verticalInner"`、`"horizontalInner"`、`"diagonalUp"`、`"diagonalDown"` |
| `BorderValue.style` | `"hair"`、`"dotted"`、`"dashed"`、`"thin"`、`"medium"`、`"thick"`、`"double"`、`"dashDot"`、`"dashDotDot"`、`"mediumDashed"`、`"mediumDashDot"`、`"mediumDashDotDot"`、`"slantDashDot"`；清除边框时通常使用 `position: "none"` |

示例：

```ts
app.Selection.clearContents();

app.Selection.setFontName("Arial");
app.Selection.setFontSize(12);
app.Selection.setBold(true);
await app.Selection.setAccountingFormat("RMB");
app.Selection.setFontColor({ r: 192, g: 0, b: 0 });
app.Selection.setFillColor({ r: 255, g: 242, b: 204 });

app.Selection.setBorder({
  color: { r: 0, g: 0, b: 0 },
  position: "all",
  style: "thin"
});

await app.Selection.setNumberFormat("0.00");
app.Selection.increaseDecimalPlaces();
```

Selection 支持的组件事件：

| 事件名 | payload |
| --- | --- |
| `SELECTION_CHANGE` | `XlsxSelectionChange` 或事件原始对象 |

```ts
type XlsxSelectionChange = {
  bold: boolean;
  italic: boolean;
  fontName: string;
  fontSize: number | string;
  fontColor: unknown;
  underline: string;
  strikeout: boolean;
  fillColor: unknown;
  alignHorizontal: string;
  alignVertical: string;
  numFormat: string;
  numFormatType: string;
  canCopy?: boolean;
  bSelectAll?: boolean;
  isText?: boolean;
};
```

## Finder

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `search` | `(text: string, callback?: (...args: unknown[]) => void): void` | `void` | 开始查找关键词，可传回调。 |
| `selectFirst` | `(): void` | `void` | 跳到第一个查找结果。 |
| `selectNext` | `(): void` | `void` | 跳到下一个查找结果。 |
| `selectPrevious` | `(): void` | `void` | 跳到上一个查找结果。 |
| `getSearchStatus` | `(): unknown` | `unknown` | 获取查找状态。 |

Finder 支持的组件事件：

| 事件名 | payload | 说明 |
| --- | --- | --- |
| `XLSX_OPEN_FIND_UI` | 无 | 文档请求打开查找 UI。 |

示例：

```ts
app.Finder.search("Q1");
app.Finder.selectFirst();
app.Finder.selectNext();

console.log(app.Finder.getSearchStatus());
```

## Cursor

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `getTargetType` | `(): "" \| "columnHeader" \| "rowHeader" \| "cells" \| "navBar"` | `string` | 获取当前鼠标/光标所在区域。 |

返回值：

| 值 | 说明 |
| --- | --- |
| `""` | 当前没有稳定目标。 |
| `"cells"` | 单元格区域。 |
| `"rowHeader"` | 行头。 |
| `"columnHeader"` | 列头。 |
| `"navBar"` | 底部工作表标签区域。 |

示例：

```ts
const targetType = app.Cursor.getTargetType();
if (targetType === "cells") {
  app.Selection.setBold(true);
}
```

## UndoRedo

| 方法 | 签名 | 返回 | 说明 |
| --- | --- | --- | --- |
| `undo` | `(callback?: (value: unknown) => void): void` | `void` | 撤销，可传回调。 |
| `redo` | `(callback?: (value: unknown) => void): void` | `void` | 重做，可传回调。 |
| `canUndo` | `(): boolean` | `boolean` | 是否可撤销。 |
| `canRedo` | `(): boolean` | `boolean` | 是否可重做。 |

UndoRedo 支持的组件事件：

| 事件名 | payload |
| --- | --- |
| `UNDO_REDO_STATE_CHANGE` | 无 |

示例：

```ts
if (app.UndoRedo.canRedo()) {
  app.UndoRedo.redo();
}
```
