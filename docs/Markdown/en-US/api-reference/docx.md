# DOCX API

DOCX APIs are called through the `app` returned by `widget.render()`:

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-docx", fileName: "demo.docx", file });
const app = await widget.mount("#office-container").render();
```

## Components

| Component | Description |
| --- | --- |
| `Document` | Export, zoom, page view, page navigation, page setup, copy/cut/paste, paragraph marks, page break display, and section break display |
| `Paragraph` | Font, text style, paragraph alignment, line spacing, bullets, and numbering |
| `Table` | Table insertion, deletion, row/column operations, merge, and unmerge |
| `Selection` | Selection, cursor, break insertion, and selection change events |
| `Finder` | Search, previous/next result, and search status |
| `UndoRedo` | Undo, redo, and availability state |

## Quick Example

```ts
app.Document.setZoom(120);
app.Paragraph.setFontName("Arial");
app.Paragraph.setFontSize(14);
app.Paragraph.setFontColor({ r: 68, g: 114, b: 196 });

if (app.Table.isInTable()) {
  app.Table.addRows("End", 1);
}

app.Finder.search("contract");
app.Finder.selectNext();
```

Event example:

```ts
function onSelectionChange(info) {
  console.log("selection", info);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
app.Selection.removeEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | Exports the original document. |
| `exportPdf` | `(printOptions?: unknown): Promise<void>` | `Promise<void>` | Exports PDF with print options. |
| `setZoom` | `(value: number): void` | `void` | Sets zoom percentage. Common values include `80`, `100`, and `120`. |
| `getZoom` | `(): number` | `number` | Gets the current zoom percentage. |
| `focusEditor` | `(): void` | `void` | Moves focus back to the editor area. |
| `updateVisibleArea` | `(): void` | `void` | Recalculates the visible area. |
| `setPageView` | `(mode: "single" \| "multi" \| "wide"): void` | `void` | Switches between single-page, multi-page, and page-width views. |
| `goToPage` | `(pageNum: number): void` | `void` | Goes to a page. `pageNum` starts from `1`. |
| `getCurrentPagePosition` | `(pageIndex?: number): PagePosition \| {}` | `PagePosition \| {}` | Gets page information. `pageIndex` is zero-based; if omitted, the current page is used. The current implementation does not reliably distinguish an explicit `0` from an omitted value. |
| `setPageOrientation` | `(value: "Portrait" \| "Landscape"): void` | `void` | Sets portrait or landscape orientation. Only exact `"Portrait"` and `"Landscape"` values are supported. |
| `setPageSize` | `(width: number, height: number): void` | `void` | Sets page width and height in centimeters. `width` and `height` must be finite positive numbers. |
| `copy` | `(): Promise<void>` | `Promise<void>` | Triggers copy in the editor area. |
| `cut` | `(): Promise<void>` | `Promise<void>` | Triggers cut in the editor area. |
| `paste` | `(): Promise<void>` | `Promise<void>` | Triggers paste in the editor area. |
| `startReadOnly` | `(): void` | `void` | Enters read-only state. |
| `endReadOnly` | `(): void` | `void` | Exits read-only state. |
| `isReadOnly` | `(): boolean` | `boolean` | Gets the current read-only state. |
| `setShowParagraphMarks` | `(value: boolean): void` | `void` | Sets whether paragraph marks are visible. |
| `getShowParagraphMarks` | `(): boolean` | `boolean` | Gets paragraph mark visibility. |
| `setShowPageBreak` | `(value: boolean): void` | `void` | Sets whether page break marks are visible. |
| `getShowPageBreak` | `(): boolean` | `boolean` | Gets page break mark visibility. |
| `setShowSectionBreak` | `(value: boolean): void` | `void` | Sets whether section break marks are visible. |
| `getShowSectionBreak` | `(): boolean` | `boolean` | Gets section break mark visibility. |

`PagePosition`:

```ts
type PagePosition = {
  pageNum: number;
  pageCnt: number;
  total: number;
};
```

Document example:

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

Page setup parameter notes:

- `setPageOrientation(...)` does not accept empty strings, custom strings, or aliases. Passing unsupported values is undefined behavior.
- `setPageSize(...)` does not normalize `0`, negative values, empty arguments, or extremely small page sizes. Validate values before calling this API.

Document component events:

| Event Name | Payload | Description |
| --- | --- | --- |
| `DOCX_PAGE_POSITION_CHANGE` | None | Current page position changed. |
| `DOCX_FIRST_PART_LOADING` | `(isLoading: boolean)` | First batch page loading state. |
| `DOCX_END_LOADING` | `(count: number)` | All pages finished loading. |
| `DOCUMENT_EXPORT_READY` | None | Export completed. |
| `DOCX_ZOOM_CHANGE` | None | Zoom changed. |
| `DOCX_PART_LOADING` | `(pageIndex: number, ratio: number)` | Chunk loading progress. `ratio` is usually `0` to `1`. |

`exportPdf(...)` requires a secure context (normally HTTPS or localhost), `window.queryLocalFonts`, and permission to access local fonts. If these requirements are not met, the current implementation does not perform the PDF export.

## Paragraph

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `setBold` | `(value?: boolean): void` | `void` | Sets or toggles bold. If omitted, toggles based on the current selection state. |
| `setItalic` | `(value?: boolean): void` | `void` | Sets or toggles italic. If omitted, toggles based on the current selection state. |
| `setUnderline` | `(lineType?: string): void` | `void` | Sets or clears underline. The default line type is `"thick"`. |
| `setStrikeThrough` | `(value?: boolean): void` | `void` | Sets or toggles strikethrough. |
| `setFontSize` | `(value: string \| number): void` | `void` | Sets font size. Empty or non-numeric values are ignored. |
| `setFontName` | `(value: string): void` | `void` | Sets font family. The API currently does not validate whether the font is installed or present in the font list. |
| `setFontColor` | `(value: DocxColor): void` | `void` | Sets font color. Supports RGB or theme color objects. Theme colors must come from `getColorPalette()` results. |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | Gets theme colors and standard colors. |
| `setAlignment` | `(value: ParagraphAlignment): boolean` | `boolean` | Sets horizontal paragraph alignment. |
| `getAlignment` | `(): ParagraphAlignment \| undefined` | `ParagraphAlignment \| undefined` | Gets current horizontal paragraph alignment. |
| `setLineSpacing` | `(value: number): void` | `void` | Sets line spacing multiplier. Common values include `1`, `1.15`, `1.5`, and `2`. |
| `setBulletList` | `(index?: number): boolean \| undefined` | `boolean \| undefined` | Sets or clears bullet list. Default `index = -1`. |
| `setNumberedList` | `(index?: number): boolean \| undefined` | `boolean \| undefined` | Sets or clears numbering. Default `index = -1`. |

Color and alignment parameters:

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

`ParagraphAlignment` numeric values match the PPTX alignment enum: `0` right, `1` left, `2` center, `3` justified, `4` distributed.

Theme color calls must include both `name` and `theme`. Passing only `{ theme, tint }` cannot identify the theme color name and is not a supported parameter shape.

Paragraph example:

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

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `insertTable` | `(rows?: number, columns?: number): void` | `void` | Inserts a table. Default is `3 x 4`. |
| `delete` | `(): void` | `void` | Deletes the current table. |
| `addRows` | `(insertLocation?: InsertLocation \| number, rowCount?: number): void` | `void` | Inserts rows at the current position. Defaults to inserting 1 row after; if the first argument is a number, it is treated as row count. |
| `addColumns` | `(insertLocation?: InsertLocation \| number, columnCount?: number): void` | `void` | Inserts columns at the current position. Defaults to inserting 1 column to the right; if the first argument is a number, it is treated as column count. |
| `deleteRows` | `(rowCount?: number): void` | `void` | Deletes current rows. Defaults to 1 row. |
| `deleteColumns` | `(columnCount?: number): void` | `void` | Deletes current columns. Defaults to 1 column. |
| `mergeCells` | `(): void` | `void` | Merges the currently selected cells. |
| `unmergeCells` | `(): void` | `void` | Unmerges cells. |
| `isInTable` | `(): boolean` | `boolean` | Whether the current selection is inside a table. |

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

`"Start"`, `"Before"`, `"Left"`, and their lowercase forms insert before or to the left. Other values use the default `"End"` behavior, inserting after or to the right.

Table example:

```ts
app.Table.insertTable(3, 5);

if (app.Table.isInTable()) {
  app.Table.addColumns("End", 1);
  app.Table.addRows(2);
  app.Table.mergeCells();
}
```

## Selection

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `getSelectedText` | `(options?: unknown): string` | `string` | Gets text from the current selection. Returns an empty string when there is no valid selection. |
| `getParagraphInfo` | `(pageIndex?: number): ParagraphInfo` | `ParagraphInfo` | Gets row, column, and selection ID information for the paragraph. |
| `clearSelection` | `(): void` | `void` | Clears selection highlights on the page. |
| `hideCursor` | `(): void` | `void` | Hides the cursor. |
| `insertBreak` | `(type?: BreakType): void` | `void` | Inserts a page break, section break, or column break. Only the `BreakType` enum below is supported. |

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

`insertBreak(...)` parameter notes:

- `"SectionNext"`, `"SectionContinuous"`, `"SectionEven"`, and `"SectionOdd"` insert next-page, continuous, even-page, and odd-page section breaks.
- Aliases such as `"SectionNextPage"`, `"SectionEvenPage"`, `"SectionOddPage"`, and `"Line"` are not supported. Soft line breaks are currently outside this API's scope.
- Omitting the parameter inserts a page break. Fallback behavior for unsupported values is not a public contract, so pass only the documented enum values.

Selection example:

```ts
app.Selection.insertBreak("Page");
app.Selection.insertBreak("SectionNext");

const info = app.Selection.getParagraphInfo();
console.log(info.row, info.col);
```

Selection component events:

| Event Name | Payload |
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

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `search` | `(text: string): void` | `void` | Starts searching for a keyword. |
| `getSelectText` | `(): string \| undefined` | `string \| undefined` | Gets the currently selected text. Only returns when selected text length is greater than `0` and less than `256`. |
| `selectNext` | `(): void` | `void` | Moves to the next search result. |
| `selectPrevious` | `(): void` | `void` | Moves to the previous search result. |
| `getSearchStatus` | `(): FinderStatus` | `FinderStatus` | Gets current search status. |

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

Finder component events:

| Event Name | Payload | Description |
| --- | --- | --- |
| `DOCX_OPEN_FIND_UI` | None | The document requests opening the find UI. |

`DOCX_OPEN_FIND_UI` means the editor requested that the find panel be opened. It is not emitted for every `Finder.search(...)` call; use `getSearchStatus()` for search result state.

Finder example:

```ts
const selectedWord = app.Finder.getSelectText();
app.Finder.search(selectedWord || "contract");
app.Finder.selectNext();

const status = app.Finder.getSearchStatus();
console.log(status.currentIndex, status.totalCount);
```

## UndoRedo

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `undo` | `(): void` | `void` | Undo. |
| `redo` | `(): void` | `void` | Redo. |
| `canUndo` | `(): boolean` | `boolean` | Whether undo is available. |
| `canRedo` | `(): boolean` | `boolean` | Whether redo is available. |

UndoRedo component events:

| Event Name | Payload |
| --- | --- |
| `UNDO_REDO_STATE_CHANGE` | None |

Example:

```ts
if (app.UndoRedo.canUndo()) {
  app.UndoRedo.undo();
}
```
