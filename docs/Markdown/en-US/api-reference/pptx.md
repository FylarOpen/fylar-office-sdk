# PPTX API

PPTX APIs are called through the `app` returned by `widget.render()`:

```ts
const { widget } = await OfficeSdk.openfile({ docId: "demo-pptx", fileName: "demo.pptx", file });
const app = await widget.mount("#office-container").render();
```

## Components

| Component | Description |
| --- | --- |
| `Document` | Page number, zoom, layout, export, and read-only state |
| `Paragraph` | Text font, color, size, bold, italic, underline, strikethrough, and horizontal paragraph alignment |
| `TextBox` | Text box vertical alignment |
| `Player` | Start playback, navigate within the current slide show, and full-screen playback |
| `Selection` | Selection type, text style queries, and selection change events |
| `Viewer` | Current active target in the thumbnail area |
| `UndoRedo` | Undo, redo, and availability state |

## Quick Example

```ts
app.Document.setZoom(120);
app.Document.goToSlide(2);

app.Paragraph.setFontName("Arial");
app.Paragraph.setBold(true);
app.Paragraph.setAlignment(2);

app.TextBox.setVerticalAlignment(1);
app.Player.play(1);
```

Event example:

```ts
function onSelectionChange(info) {
  console.log(info.selectType);
}

app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);
```

## Document

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `getSlideInfo` | `(): { total: number; current: number }` | `{ total; current }` | Gets total slide count and current slide. Page numbers start from `1`. |
| `getCurrentSlideIndex` | `(): number` | `number` | Gets current page number. Page numbers start from `1`. |
| `getSlideCount` | `(): number` | `number` | Gets total slide count. |
| `getZoom` | `(): number` | `number` | Gets zoom percentage. |
| `setZoom` | `(value: number): void` | `void` | Sets zoom percentage. Common values include `80`, `100`, and `120`. |
| `autoZoom` | `(): void` | `void` | Adjusts the zoom automatically. |
| `focusEditor` | `(): void` | `void` | Currently a no-op in the PPTX implementation. |
| `updateVisibleArea` | `(): void` | `void` | Recalculates the visible area. |
| `goToSlide` | `(slideNum: number): void` | `void` | Goes to a slide. `slideNum` starts from `1`. |
| `deleteSlides` | `(slides?: number[]): void` | `void` | Deletes specified slide indexes. If omitted, deletes the currently selected slide. `slides` uses zero-based indexes. |
| `addSlide` | `(layout?: SlideLayoutRef, position?: number): void` | `void` | Inserts a new slide. `layout` uses layout indexes, and `position` is the zero-based insert position. If `layout` is omitted, the layout near the current selection is reused. |
| `getSlideLayouts` | `(force?: boolean): SlideLayoutItem[][]` | `SlideLayoutItem[][]` | Gets layouts grouped by slide master. When `force = true`, refreshes the cache. |
| `exportDocument` | `(): Promise<void>` | `Promise<void>` | Exports the original PPTX file. |
| `copy` | `(): Promise<void>` | `Promise<void>` | Copies the current selection. |
| `cut` | `(): Promise<void>` | `Promise<void>` | Cuts the current selection. |
| `paste` | `(): Promise<void>` | `Promise<void>` | Pastes into the current selection. |
| `getColorPalette` | `(): { theme: unknown[]; standard: unknown[] }` | `{ theme; standard }` | Gets theme colors and standard colors. |
| `startReadOnly` | `(): void` | `void` | Enters read-only state. |
| `endReadOnly` | `(): void` | `void` | Exits read-only state. |
| `isReadOnly` | `(): boolean` | `boolean` | Whether the current state is read-only. |
| `isDisable` | `(): boolean` | `boolean` | Whether the current editor is disabled. |

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

`goToSlide(slideNum)` uses display page numbers starting from `1`; `deleteSlides(slides)` and `addSlide(layout, position)` use zero-based underlying indexes.

Document example:

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

Document component events:

| Event Name | Payload | Description |
| --- | --- | --- |
| `DOCUMENT_READY` | Raw event parameters | Document ready. |
| `DOCUMENT_EXPORT_READY` | Raw event parameters | Export completed. |
| `PPTX_SLIDES_CHANGED` | `(currentPage: number, totalPages: number)` | Current page or page count changed. |
| `PPTX_ZOOM_CHANGE` | `(zoom: number)` | Zoom changed. |
| `PPTX_FIRST_PAGE_LOADED` | None | First page loaded. |
| `PPTX_START_LOADING` | None | Loading started. |


## Paragraph

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `setFontName` | `(value: string): void` | `void` | Sets font family. |
| `setFontColor` | `(value: string \| { hex: string; [key: string]: unknown }): void` | `void` | Sets font color. Object values must include `hex`; new integrations should use the `{ hex: "#RRGGBB" }` object form. |
| `setFontSize` | `(value: number \| string): void` | `void` | Sets font size. |
| `setBold` | `(value: boolean): void` | `void` | Sets bold. |
| `setItalic` | `(value: boolean): void` | `void` | Sets italic. |
| `setUnderline` | `(value: boolean): void` | `void` | Sets underline. |
| `setStrikeThrough` | `(value: boolean): void` | `void` | Sets strikethrough. |
| `setAlignment` | `(value: 0 \| 1 \| 2 \| 3 \| 4): void` | `void` | Sets horizontal paragraph alignment. |
| `decreaseFontSize` | `(): void` | `void` | Decreases font size. |
| `increaseFontSize` | `(): void` | `void` | Increases font size. |

`setAlignment(value)` enum:

| Value | Description |
| --- | --- |
| `0` | Right |
| `1` | Left |
| `2` | Center |
| `3` | Justified |
| `4` | Distributed |

Paragraph example:

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

PPTX `setFontColor(...)` currently resolves object colors from `hex` only. Fields such as `type`, `name`, `theme`, and `tint` may be carried as palette metadata, but `hex` cannot be omitted and theme-only objects such as `{ name, theme }` are not supported.

## TextBox

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `setVerticalAlignment` | `(value: 0 \| 1 \| 2 \| 3 \| 4): void` | `void` | Sets text box vertical alignment. |

`setVerticalAlignment(value)` enum:

| Value | Description |
| --- | --- |
| `0` | Top |
| `1` | Center |
| `2` | Bottom |
| `3` | Justified distribution |
| `4` | Distributed |

Example:

```ts
app.TextBox.setVerticalAlignment(1);
```

## Player

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `playFirst` | `(): void` | `void` | Jumps to the first slide within the current slide-show state. |
| `playLast` | `(): void` | `void` | Jumps to the last slide within the current slide-show state. |
| `play` | `(fromType: 1 \| 2): void` | `void` | Starts slide playback. |
| `playPrevious` | `(): void` | `void` | Jumps to the previous slide within the current slide-show state. |
| `playNext` | `(): void` | `void` | Jumps to the next slide within the current slide-show state. |
| `enterFullScreen` | `(fromType: 1 \| 2): void` | `void` | Enters full-screen playback. |
| `exitFullScreen` | `(): void` | `void` | Exits full screen. |

`fromType`:

| Value | Description |
| --- | --- |
| `1` | From beginning |
| `2` | From current slide |

Example:

```ts
app.Player.play(2);
app.Player.enterFullScreen(1);
app.Player.exitFullScreen();
```

## Selection

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `isTextSelected` | `(): boolean` | `boolean` | Whether the current context is a text selection or text-editing context; it may be `true` when the caret is inside a text box even if no characters are selected. |
| `isShapeSelected` | `(): boolean` | `boolean` | Whether a shape is currently selected. |
| `isUnderline` | `(): boolean` | `boolean` | Whether the current text has single underline. |
| `isStrikeThrough` | `(): "" \| "noStrike" \| "sngStrike" \| "dblStrike" \| null` | `string \| null` | Gets the current text strike state value. Mixed states may return an empty string, and unresolved values may return `null`. |
| `getFontSize` | `(): string` | `string` | Gets current font size. For mixed font sizes, returns the minimum font size plus `+`. |
| `getFontName` | `(): string \| null` | `string \| null` | Gets current font family. For mixed fonts, returns an empty string. |
| `isBold` | `(): boolean \| 0 \| null` | `boolean \| 0 \| null` | Gets bold state. Mixed states may return `0`. |
| `isItalic` | `(): boolean \| 0 \| null` | `boolean \| 0 \| null` | Gets italic state. Mixed states may return `0`. |
| `getFontColor` | `(): string` | `string` | Gets font color as an `rgba(...)` string. The alpha value comes from underlying data and must not be assumed to be CSS-normalized to `0` through `1`. Mixed colors, non-solid fills, and currently unsupported fill types fall back to `rgba(0,0,0,1)`. |
| `getAlignment` | `(): "default" \| "right" \| "left" \| "center" \| "justify" \| "distribute" \| "nil"` | `string` | Gets horizontal paragraph alignment. |
| `getVerticalAlignment` | `(): "top" \| "center" \| "bottom" \| "default" \| undefined` | `string \| undefined` | Gets text box vertical alignment. Returns `undefined` when there is no text box result or the default anchor cannot be resolved. |

Selection example:

```ts
if (app.Selection.isTextSelected()) {
  console.log(app.Selection.getFontName());
  console.log(app.Selection.getFontColor());
}
```

If you pass the `getFontColor()` return value directly to CSS, normalize alpha to the `0` through `1` range expected by CSS `rgba()` first.

`getAlignment()` return values:

| Value | Description |
| --- | --- |
| `"default"` | Default alignment. |
| `"right"` | Right. |
| `"left"` | Left. |
| `"center"` | Center. |
| `"justify"` | Justified. |
| `"distribute"` | Distributed. |
| `"nil"` | Multiple selected contents do not share one horizontal alignment value. |

`getVerticalAlignment()` return values:

| Value | Description |
| --- | --- |
| `"top"` | Top. |
| `"center"` | Center. |
| `"bottom"` | Bottom. |
| `"default"` | Default vertical alignment. |
| `undefined` | There is no text box result, or the default anchor did not resolve to a recognizable vertical alignment value. |

The implementation keeps an internal `"NIL"` mapping, but it is not exposed as a stable `getVerticalAlignment()` return value.

Selection component events:

| Event Name | Payload |
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

`selectType` is a bit flag and can be combined with bitwise OR:

| Value | Description |
| --- | --- |
| `0` | No stable selection |
| `1` | Table |
| `2` | Shape |
| `4` | Text |
| `6` | Shape + text |
| `8` | SmartArt |
| `16` | Chart |
| `32` | Image |

Common combined values:

| Value | Description |
| --- | --- |
| `6` | Shape + text |

## Viewer

| Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `getActiveZoom` | `(): null \| "" \| "Thumbnail" \| "ThumbnailGapLine"` | `string \| null` | Gets the current active target in the thumbnail area. Returns `null` before the first active-target event. |

Return values:

| Value | Description |
| --- | --- |
| `null` | No active-target event has been received yet. |
| `""` | No stable target currently. |
| `"Thumbnail"` | Thumbnail. |
| `"ThumbnailGapLine"` | Gap line between thumbnails. |

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
| `UNDO_REDO_STATE_CHANGE` | Raw event parameters |

Example:

```ts
if (app.UndoRedo.canUndo()) {
  app.UndoRedo.undo();
}
```
