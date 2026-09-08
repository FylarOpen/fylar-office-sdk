# XLSX API

XLSX APIs are called through the `app` returned by `widget.render()`:

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-xlsx", fileName: "demo.xlsx", file });
const app = await widget.mount("#office-container").render();
```

## Components

| Component | Description |
| --- | --- |
| `Document` | Export, zoom, editing state, and loading events |
| `Workbook` | Worksheets, palette, number formats, and protection state |
| `Worksheet` | Rows, columns, freeze panes, row height, and column width |
| `Selection` | Current selection content, font, borders, fill, alignment, and number format |
| `Finder` | Search, previous/next result, and search status |
| `Cursor` | Current mouse/cursor target area |
| `UndoRedo` | Undo, redo, and availability state |

## Quick Example

```ts
app.Document.setZoom(125);
app.Selection.setBold(true);
app.Selection.setFillColor({ r: 255, g: 242, b: 204 });
await app.Worksheet.insertRows();

app.Finder.search("revenue");
app.Finder.selectNext();
```

Event example:

```ts
function onSelectionChange(info) {
  console.log(info);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `isEditing` | `(): boolean` | `boolean` | Whether a cell is currently being edited. |
| `setZoom` | `(value: number, redraw?: boolean): boolean` | `boolean` | Sets zoom percentage. `redraw` defaults to `true`; returns the underlying zoom operation result. |
| `getZoom` | `(): number` | `number` | Gets zoom percentage. |
| `focusEditor` | `(): void` | `void` | Currently a no-op in the XLSX implementation. |
| `updateVisibleArea` | `(): void` | `void` | Redraws the visible area of the current active worksheet. |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | Exports the original workbook. |
| `exportPdf` | `(printOptions?: unknown): Promise<void>` | `Promise<void>` | Exports PDF with print options. |
| `copy` | `(): Promise<void>` | `Promise<void>` | Copies the current selection. |
| `cut` | `(): Promise<void>` | `Promise<void>` | Cuts the current selection. |
| `paste` | `(): Promise<void>` | `Promise<void>` | Pastes into the current selection. |
| `startReadOnly` | `(): void` | `void` | Enters read-only state. |
| `endReadOnly` | `(): void` | `void` | Exits read-only state. |
| `isReadOnly` | `(): boolean` | `boolean` | Gets the current read-only state. |

Example:

```ts
if (!app.Document.isEditing()) {
  app.Document.setZoom(110);
}

await app.Document.exportDocument();
await app.Document.exportPdf();
```

Clipboard notes:

`copy()`, `cut()`, and `paste()` depend on the browser Clipboard API, a secure context, and user permission. Some browsers do not allow writing the editor's custom MIME type to the system clipboard. In that case a `NotAllowedError` may be thrown, but the document remains editable. Catch the error and guide users to use the system shortcut.

Document component events:

| Event Name | Payload | Description |
| --- | --- | --- |
| `XLSX_WORKSHEET_LOADED` | None | Worksheet loaded. |
| `XLSX_END_LOADING` | None | Document loading completed. |
| `DOCUMENT_EXPORT_READY` | None | Export completed. |
| `XLSX_EDITING_STATUS_CHANGE` | `(status: boolean)` | Cell editing state changed. |
| `XLSX_ZOOM_CHANGE` | None | Zoom changed. |
| `XLSX_WORKSHEET_LOADING_RATIO` | `(ratio: number)` | Worksheet loading progress. |
| `XLSX_FIRST_PART_LOADING` | None | First batch content loaded. |
| `XLSX_WORKSHEET_CHANGE` | `({ sheetProtected?: boolean })` | Current worksheet changed. |

`exportPdf(...)` requires a secure context (normally HTTPS or localhost), `window.queryLocalFonts`, and permission to access local fonts. If these requirements are not met, the current implementation does not perform the PDF export.

## Workbook

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `addWorksheet` | `(): void` | `void` | Adds a worksheet. |
| `setWorksheetName` | `(name: string, index?: number): boolean \| number` | `boolean \| number` | Sets worksheet name. If `index` is omitted, the active worksheet is used. Returns success or a name-validation status code. |
| `deleteWorksheet` | `(index?: number): void` | `void` | Deletes a worksheet. If `index` is omitted, the active worksheet is deleted. |
| `getWorksheetName` | `(index?: number): string` | `string` | Gets worksheet name. If `index` is omitted, the active worksheet is read. |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | Gets the color palette. |
| `getCellNumberFormats` | `(): string[]` | `string[]` | Gets number format category list. |
| `getNumberFormatExample` | `(format: string, value?: unknown, lcid?: unknown): unknown` | `unknown` | Gets a number format example. |
| `getNumberFormatExamples` | `(formats: string[], value?: unknown, lcid?: unknown): unknown` | `unknown` | Gets number format examples in batch. |
| `isWorksheetProtected` | `(index?: number): boolean` | `boolean` | Checks whether a worksheet is protected. If `index` is omitted, the active worksheet is checked. |

Example:

```ts
app.Workbook.addWorksheet();
app.Workbook.setWorksheetName("Summary");

const name = app.Workbook.getWorksheetName();
const protectedSheet = app.Workbook.isWorksheetProtected();

const formats = app.Workbook.getCellNumberFormats();
const examples = app.Workbook.getNumberFormatExamples(["0.00", "0%"], 1234.56, "en-US");
```

## Worksheet

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `isFrozenPane` | `(): boolean` | `boolean` | Whether panes are currently frozen. |
| `toggleFreezePanes` | `(): void` | `void` | Toggles freeze/unfreeze panes. |
| `setRowHeight` | `(heightPt: number): Promise<unknown>` | `Promise<unknown>` | Sets current row height. Empty values are ignored. |
| `insertRows` | `(): Promise<unknown>` | `Promise<unknown>` | Inserts rows. |
| `hideRows` | `(): Promise<unknown>` | `Promise<unknown>` | Hides rows. |
| `unhideRows` | `(): Promise<unknown>` | `Promise<unknown>` | Unhides rows. |
| `deleteRows` | `(): Promise<unknown>` | `Promise<unknown>` | Deletes rows. |
| `insertColumns` | `(): Promise<unknown>` | `Promise<unknown>` | Inserts columns. |
| `setColumnWidth` | `(nChars: number): void` | `void` | Sets current column width in character width units. Empty values are ignored. |
| `hideColumns` | `(): Promise<unknown>` | `Promise<unknown>` | Hides columns. |
| `unhideColumns` | `(): Promise<unknown>` | `Promise<unknown>` | Unhides columns. |
| `deleteColumns` | `(): Promise<unknown>` | `Promise<unknown>` | Deletes columns. |
| `getRowHeight` | `(row?: number \| null, wsIdx?: number \| null): number` | `number` | Gets row height. If omitted or `null`, the current context is used. |
| `getColumnWidth` | `(col?: number \| null, wsIdx?: number \| null): number` | `number` | Gets column width. If omitted or `null`, the current context is used. |

Example:

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

Selection methods operate on the current active cell or selection.

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `clearContents` | `(): void` | `void` | Clears content in the current selection. |
| `setAccountingFormat` | `(value: AccountingFormat): Promise<unknown> \| false` | `Promise<unknown> \| false` | Sets accounting format. Invalid format values may return `false`. |
| `setUnderline` | `(value: string): void` | `void` | Sets underline. |
| `setBorder` | `(value: BorderValue): void` | `void` | Sets borders. |
| `setStrikeThrough` | `(value: boolean): void` | `void` | Sets strikethrough. |
| `setBold` | `(value: boolean): void` | `void` | Sets bold. |
| `setItalic` | `(value: boolean): void` | `void` | Sets italic. |
| `setFontSize` | `(value: string \| number): void` | `void` | Sets font size. Must satisfy `0 < value <= 409`. |
| `setHorizontalAlignment` | `(value: string): void` | `void` | Sets horizontal alignment. |
| `setVerticalAlignment` | `(value: string): void` | `void` | Sets vertical alignment. |
| `setFontColor` | `(value: XlsxColor): void` | `void` | Sets font color. |
| `setFillColor` | `(value: XlsxColor): void` | `void` | Sets fill color. |
| `setFontName` | `(value: string): void` | `void` | Sets font family. |
| `setCellStyle` | `(value: string): Promise<unknown>` | `Promise<unknown>` | Sets cell style. |
| `setPercentFormat` | `(): Promise<unknown>` | `Promise<unknown>` | Sets percent format. |
| `setNumberFormat` | `(value: unknown): Promise<unknown>` | `Promise<unknown>` | Sets number format. |
| `increaseDecimalPlaces` | `(): void` | `void` | Increases decimal places. |
| `decreaseDecimalPlaces` | `(): void` | `void` | Decreases decimal places. |

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

`rgbHex` supports 6-digit `RRGGBB` or 8-digit `AARRGGBB`. The 8-digit form can carry alpha; the `{ r, g, b }` RGB object itself does not support transparency.

While cell text is being edited, `setBold`, `setItalic`, `setUnderline`, and `setStrikeThrough` toggle the current state and ignore the supplied boolean value. `setHorizontalAlignment` and `setVerticalAlignment` currently have no effect in that editing state.

Common enums:

| Parameter | Common Values |
| --- | --- |
| `setUnderline(value)` | `"single"`, `"none"` |
| `setHorizontalAlignment(value)` | `"left"`, `"center"`, `"right"`, `"justify"`, `"distributed"` |
| `setVerticalAlignment(value)` | `"top"`, `"center"`, `"bottom"` |
| `setAccountingFormat(value)` | `"RMB"`, `"Dollar"`, `"EUR"`, `"GBP"`, `"JPY"`, `"none"` |
| `BorderValue.position` | `"all"`, `"none"`, `"inner"`, `"outer"`, `"left"`, `"right"`, `"top"`, `"bottom"`, `"verticalInner"`, `"horizontalInner"`, `"diagonalUp"`, `"diagonalDown"` |
| `BorderValue.style` | `"hair"`, `"dotted"`, `"dashed"`, `"thin"`, `"medium"`, `"thick"`, `"double"`, `"dashDot"`, `"dashDotDot"`, `"mediumDashed"`, `"mediumDashDot"`, `"mediumDashDotDot"`, `"slantDashDot"`; when clearing borders, usually use `position: "none"` |

Example:

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

Selection component events:

| Event Name | Payload |
| --- | --- |
| `SELECTION_CHANGE` | `XlsxSelectionChange` or the raw event object |

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

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `search` | `(text: string, callback?: (...args: unknown[]) => void): void` | `void` | Starts searching for a keyword. Optional callback supported. |
| `selectFirst` | `(): void` | `void` | Moves to the first search result. |
| `selectNext` | `(): void` | `void` | Moves to the next search result. |
| `selectPrevious` | `(): void` | `void` | Moves to the previous search result. |
| `getSearchStatus` | `(): unknown` | `unknown` | Gets search status. |

Finder component events:

| Event Name | Payload | Description |
| --- | --- | --- |
| `XLSX_OPEN_FIND_UI` | None | The document requests opening the find UI. |

Example:

```ts
app.Finder.search("Q1");
app.Finder.selectFirst();
app.Finder.selectNext();

console.log(app.Finder.getSearchStatus());
```

## Cursor

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `getTargetType` | `(): "" \| "columnHeader" \| "rowHeader" \| "cells" \| "navBar"` | `string` | Gets the current mouse/cursor target area. |

Return values:

| Value | Description |
| --- | --- |
| `""` | No stable target currently. |
| `"cells"` | Cell area. |
| `"rowHeader"` | Row header. |
| `"columnHeader"` | Column header. |
| `"navBar"` | Bottom worksheet tab area. |

Example:

```ts
const targetType = app.Cursor.getTargetType();
if (targetType === "cells") {
  app.Selection.setBold(true);
}
```

## UndoRedo

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `undo` | `(callback?: (value: unknown) => void): void` | `void` | Undo. Optional callback supported. |
| `redo` | `(callback?: (value: unknown) => void): void` | `void` | Redo. Optional callback supported. |
| `canUndo` | `(): boolean` | `boolean` | Whether undo is available. |
| `canRedo` | `(): boolean` | `boolean` | Whether redo is available. |

UndoRedo component events:

| Event Name | Payload |
| --- | --- |
| `UNDO_REDO_STATE_CHANGE` | None |

Example:

```ts
if (app.UndoRedo.canRedo()) {
  app.UndoRedo.redo();
}
```
