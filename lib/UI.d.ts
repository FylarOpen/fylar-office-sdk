export type OfficeSdkLocale = "zh-CN" | "en-US" | (string & {});

export interface OfficeSdkUser {
  clientId?: string;
  userId?: string;
  nickName?: string;
  avatar?: string;
  opts?: Record<string, unknown>;
}

export interface OfficeSdkUiOptions {
  showTopBar?: boolean;
  showBottomBar?: boolean;
}

export interface OfficeSdkOpenMode {
  readOnly?: boolean;
  lang?: OfficeSdkLocale;
}

export interface OfficeSdkCoreExt {
  coediting?: unknown;
  license?: unknown;
  watermark?: string;
}

export interface OfficeSdkOpenOptions {
  userData?: OfficeSdkUser | null;
  uiOptions?: OfficeSdkUiOptions;
  mode?: OfficeSdkOpenMode;
  coreExt?: OfficeSdkCoreExt | null;
}

export interface OfficeWidgetFileData {
  docId?: string;
  fileName: string;
  file: Blob | ArrayBuffer | ArrayBufferView | string;
}

export type OfficeComponentEventStatus =
  | "ok"
  | "no such event"
  | "duplicated event callback"
  | "no such callback";

export type OfficeEventHandler = (...args: unknown[]) => void;

export interface OfficeComponentApi {
  callFun(methodName: string, ...args: unknown[]): unknown;
  addEventListener(eventName: string, handler: OfficeEventHandler): OfficeComponentEventStatus;
  removeEventListener(eventName: string, handler: OfficeEventHandler): OfficeComponentEventStatus;
}

export interface OfficeRgbColor {
  r: number;
  g: number;
  b: number;
}

export interface OfficeThemeColor {
  name: string;
  theme: number;
  tint?: number;
  shade?: number;
}

export interface OfficeXlsxThemeColor {
  theme: number;
  tint?: number;
}

export interface OfficeIndexedColor {
  indexed: number;
}

export interface OfficeRgbHexColor {
  rgbHex: string;
}

export interface OfficePaletteColor {
  hex: string;
  type?: string;
  name?: string;
  theme?: number;
  tint?: number;
  shade?: number;
  [key: string]: unknown;
}

export interface OfficeColorPalette {
  theme: unknown[];
  standard: unknown[];
}

export type OfficeDocxColor = OfficeRgbColor | OfficeThemeColor;
export type OfficeXlsxColor =
  | OfficeRgbColor
  | OfficeXlsxThemeColor
  | OfficeIndexedColor
  | OfficeRgbHexColor;
export type OfficePptxColor = OfficePaletteColor | string;
export type OfficeColor = OfficeDocxColor | OfficeXlsxColor | OfficePptxColor;
export type OfficePptxTextStrike = "" | "noStrike" | "sngStrike" | "dblStrike" | null;
export type OfficePptxHorizontalAlignment =
  | "default"
  | "right"
  | "left"
  | "center"
  | "justify"
  | "distribute"
  | "nil";
export type OfficePptxVerticalAlignment = "top" | "center" | "bottom" | "default";
export type OfficePageViewMode = "single" | "multi" | "wide";
export type OfficePageOrientation = "Portrait" | "Landscape";
export type OfficeDocxBreakType =
  | "Page"
  | "SectionNext"
  | "SectionContinuous"
  | "SectionEven"
  | "SectionOdd"
  | "Column";
export type OfficeParagraphAlignment =
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

export interface OfficePagePosition {
  pageNum: number;
  pageCnt: number;
  total: number;
}

export interface OfficeSlideInfo {
  total: number;
  current: number;
}

export interface OfficeSlideLayoutRef {
  masterIndex: number;
  layoutIndex: number;
}

export interface OfficeSlideLayoutItem {
  img: unknown;
  name: string;
  xmlName: string;
  id: string | number;
  layoutIndex: number;
  slideMasterIndex: number;
}

export interface OfficeDocumentApi extends OfficeComponentApi {
  updateVisibleArea(): void;
  setZoom(value: number, redraw?: boolean): void | boolean;
  getZoom(): number;
  exportDocument(): Promise<void>;
  exportPdf(printOptions?: unknown): Promise<void>;
  isEditing?: () => boolean;
  focusEditor(): void;
  setPageView?: (mode: OfficePageViewMode) => void;
  goToPage?: (pageNum: number) => void;
  getCurrentPagePosition?: (pageIndex?: number) => OfficePagePosition | {};
  setPageOrientation?: (value: OfficePageOrientation) => void;
  setPageSize?: (width: number, height: number) => void;
  copy(): Promise<void>;
  cut(): Promise<void>;
  paste(): Promise<void>;
  setShowParagraphMarks?: (value: boolean) => void;
  getShowParagraphMarks?: () => boolean;
  setShowPageBreak?: (value: boolean) => void;
  getShowPageBreak?: () => boolean;
  setShowSectionBreak?: (value: boolean) => void;
  getShowSectionBreak?: () => boolean;
  getSlideInfo?: () => OfficeSlideInfo;
  getCurrentSlideIndex?: () => number;
  getSlideCount?: () => number;
  autoZoom?: () => void;
  goToSlide?: (slideNum: number) => void;
  deleteSlides?: (slides?: number[]) => void;
  addSlide?: (layout?: OfficeSlideLayoutRef, position?: number) => void;
  getSlideLayouts?: (force?: boolean) => OfficeSlideLayoutItem[][];
  getColorPalette?: () => OfficeColorPalette;
  startReadOnly(): void;
  endReadOnly(): void;
  isReadOnly(): boolean;
  isDisable?: () => boolean;
}

export interface DocxDocumentApi extends OfficeDocumentApi {
  setZoom(value: number): void;
}

export interface XlsxDocumentApi extends OfficeDocumentApi {
  isEditing(): boolean;
  setZoom(value: number, redraw?: boolean): boolean;
}

export interface PptxDocumentApi extends OfficeDocumentApi {
  setZoom(value: number): void;
  getSlideInfo(): OfficeSlideInfo;
  getCurrentSlideIndex(): number;
  getSlideCount(): number;
  autoZoom(): void;
  goToSlide(slideNum: number): void;
  deleteSlides(slides?: number[]): void;
  addSlide(layout?: OfficeSlideLayoutRef, position?: number): void;
  getSlideLayouts(force?: boolean): OfficeSlideLayoutItem[][];
}

export interface OfficeParagraphApi<TColor extends OfficeColor = OfficeColor> extends OfficeComponentApi {
  setBold(value?: boolean): void;
  setItalic(value?: boolean): void;
  setUnderline(value?: string | boolean): void;
  setStrikeThrough(value?: boolean): void;
  setFontSize(value: string | number): void;
  setFontName(value: string): void;
  setFontColor(value: TColor): void;
  getColorPalette?: () => OfficeColorPalette;
  setAlignment?: (value: OfficeParagraphAlignment) => boolean | void;
  getAlignment?: () => OfficeParagraphAlignment | undefined;
  setLineSpacing?: (value: number) => void;
  setBulletList?: (index?: number) => boolean | undefined;
  setNumberedList?: (index?: number) => boolean | undefined;
  decreaseFontSize?: () => void;
  increaseFontSize?: () => void;
}

export interface OfficeTableApi extends OfficeComponentApi {
  insertTable(rows?: number, columns?: number): void;
  delete(): void;
  addRows(insertLocation?: string | number, rowCount?: number): void;
  addColumns(insertLocation?: string | number, columnCount?: number): void;
  deleteRows(rowCount?: number): void;
  deleteColumns(columnCount?: number): void;
  mergeCells(): void;
  unmergeCells(): void;
  isInTable(): boolean;
}

export interface OfficeWorkbookApi extends OfficeComponentApi {
  addWorksheet(): void;
  setWorksheetName(name: string, index?: number): boolean | number;
  deleteWorksheet(index?: number): void;
  getWorksheetName(index?: number): string;
  getColorPalette(): OfficeColorPalette;
  getCellNumberFormats(): string[];
  getNumberFormatExample(format: string, value?: unknown, lcid?: unknown): unknown;
  getNumberFormatExamples(formats: string[], value?: unknown, lcid?: unknown): unknown;
  isWorksheetProtected(index?: number): boolean;
}

export interface OfficeWorksheetApi extends OfficeComponentApi {
  isFrozenPane(): boolean;
  toggleFreezePanes(): void;
  setRowHeight(heightPt: number): Promise<unknown>;
  insertRows(): Promise<unknown>;
  hideRows(): Promise<unknown>;
  unhideRows(): Promise<unknown>;
  deleteRows(): Promise<unknown>;
  insertColumns(): Promise<unknown>;
  setColumnWidth(width: number): void;
  hideColumns(): Promise<unknown>;
  unhideColumns(): Promise<unknown>;
  deleteColumns(): Promise<unknown>;
  getRowHeight(row?: number | null, wsIdx?: number | null): number;
  getColumnWidth(col?: number | null, wsIdx?: number | null): number;
}

export interface OfficeSelectionApi<TColor extends OfficeColor = OfficeColor> extends OfficeComponentApi {
  getSelectedText?: (options?: unknown) => string;
  getParagraphInfo?: (pageIndex?: number) => unknown;
  clearContents?: () => void;
  clearSelection?: () => void;
  hideCursor?: () => void;
  insertBreak?: (type?: OfficeDocxBreakType) => void;
  setAccountingFormat?: (value: unknown) => Promise<unknown> | false;
  setUnderline?: (value: string | boolean) => void;
  setBorder?: (value: unknown) => void;
  setStrikeThrough?: (value: boolean) => void;
  setBold?: (value: boolean) => void;
  setItalic?: (value: boolean) => void;
  setFontSize?: (value: string | number) => void;
  setHorizontalAlignment?: (value: string) => void;
  setVerticalAlignment?: (value: string | number) => void;
  setFontColor?: (value: TColor) => void;
  setFillColor?: (value: TColor) => void;
  setFontName?: (value: string) => void;
  setCellStyle?: (value: string) => Promise<unknown>;
  setPercentFormat?: () => Promise<unknown>;
  setNumberFormat?: (value: unknown) => Promise<unknown>;
  increaseDecimalPlaces?: () => void;
  decreaseDecimalPlaces?: () => void;
  isTextSelected?: () => boolean;
  isShapeSelected?: () => boolean;
  isBold?: () => boolean | 0 | null;
  isItalic?: () => boolean | 0 | null;
  isUnderline?: () => boolean;
  isStrikeThrough?: () => boolean;
  getFontSize?: () => string;
  getFontName?: () => string | null;
  getFontColor?: () => string;
  getAlignment?: () => string;
  getVerticalAlignment?: () => string | undefined;
}

export interface PptxSelectionApi extends OfficeComponentApi {
  isTextSelected(): boolean;
  isShapeSelected(): boolean;
  isUnderline(): boolean;
  isStrikeThrough(): OfficePptxTextStrike;
  getFontSize(): string;
  getFontName(): string | null;
  isBold(): boolean | 0 | null;
  isItalic(): boolean | 0 | null;
  getFontColor(): string;
  getAlignment(): OfficePptxHorizontalAlignment;
  getVerticalAlignment(): OfficePptxVerticalAlignment | undefined;
}

export interface OfficeFinderApi extends OfficeComponentApi {
  search(text: string, callback?: (...args: unknown[]) => void): void;
  getSelectText?: () => string | undefined;
  selectFirst?: () => void;
  selectNext(): void;
  selectPrevious(): void;
  getSearchStatus(): unknown;
}

export interface OfficeCursorApi {
  callFun(methodName: string, ...args: unknown[]): unknown;
  getTargetType(): "" | "columnHeader" | "rowHeader" | "cells" | "navBar";
}

export interface OfficeViewerApi {
  callFun(methodName: string, ...args: unknown[]): unknown;
  getActiveZoom(): null | "" | "Thumbnail" | "ThumbnailGapLine";
}

export interface OfficeUndoRedoApi extends OfficeComponentApi {
  undo(callback?: (value: unknown) => void): void;
  redo(callback?: (value: unknown) => void): void;
  canUndo(): boolean;
  canRedo(): boolean;
}

export interface OfficeTextBoxApi extends OfficeComponentApi {
  setVerticalAlignment(value: number): void;
}

export interface OfficePlayerApi {
  callFun(methodName: string, ...args: unknown[]): unknown;
  playFirst(): void;
  playLast(): void;
  play(fromType: 1 | 2): void;
  playPrevious(): void;
  playNext(): void;
  enterFullScreen(fromType: 1 | 2): void;
  exitFullScreen(): void;
}

export interface OfficeRenderedApp {
  Document: OfficeDocumentApi;
  Paragraph?: OfficeParagraphApi | null;
  Table?: OfficeTableApi | null;
  Workbook?: OfficeWorkbookApi | null;
  Worksheet?: OfficeWorksheetApi | null;
  Selection?: OfficeSelectionApi | PptxSelectionApi | null;
  Finder?: OfficeFinderApi | null;
  Cursor?: OfficeCursorApi | null;
  Viewer?: OfficeViewerApi | null;
  UndoRedo?: OfficeUndoRedoApi | null;
  TextBox?: OfficeTextBoxApi | null;
  Player?: OfficePlayerApi | null;
  getBSViewer?: () => { updateVisibleArea?: () => void } | null;
  updateVisibleArea?: () => void;
  setReadOnly?: (readOnly: boolean) => Promise<boolean>;
  isReadOnly?: () => boolean;
  isDisposed?: () => boolean;
}

export interface DocxRenderedApp extends OfficeRenderedApp {
  Document: DocxDocumentApi;
  Paragraph: OfficeParagraphApi<OfficeDocxColor>;
  Table: OfficeTableApi;
  Selection: OfficeSelectionApi;
  Finder: OfficeFinderApi;
  UndoRedo: OfficeUndoRedoApi;
}

export interface XlsxRenderedApp extends OfficeRenderedApp {
  Document: XlsxDocumentApi;
  Workbook: OfficeWorkbookApi;
  Worksheet: OfficeWorksheetApi;
  Selection: OfficeSelectionApi<OfficeXlsxColor>;
  Finder: OfficeFinderApi;
  Cursor: OfficeCursorApi;
  UndoRedo: OfficeUndoRedoApi;
}

export interface PptxRenderedApp extends OfficeRenderedApp {
  Document: PptxDocumentApi;
  Paragraph: OfficeParagraphApi<OfficePptxColor>;
  TextBox: OfficeTextBoxApi;
  Player: OfficePlayerApi;
  Selection: PptxSelectionApi;
  Viewer: OfficeViewerApi;
  Cursor?: never;
  UndoRedo: OfficeUndoRedoApi;
}

export interface OfficeWidgetApp<TApp extends OfficeRenderedApp = OfficeRenderedApp> {
  mount(target: string | HTMLElement): OfficeWidgetApp<TApp>;
  render(): Promise<TApp>;
  close(): Promise<void>;
  readonly docId: string;
  readonly docType: number;
  readonly docTypeName: string | null;
}

export interface OfficeWidgetOpenResult<TApp extends OfficeRenderedApp = OfficeRenderedApp> {
  docType: number;
  widget: OfficeWidgetApp<TApp>;
}

export type OfficeWidgetCreateDocType = 1 | 2 | 3;

export interface DocxOfficeWidgetFileData extends OfficeWidgetFileData {
  fileName: `${string}.doc` | `${string}.docx` | `${string}.DOC` | `${string}.DOCX`;
}

export interface XlsxOfficeWidgetFileData extends OfficeWidgetFileData {
  fileName: `${string}.xls` | `${string}.xlsx` | `${string}.XLS` | `${string}.XLSX`;
}

export interface PptxOfficeWidgetFileData extends OfficeWidgetFileData {
  fileName: `${string}.pptx` | `${string}.PPTX`;
}

export type OfficeSdkRenderedApp = OfficeRenderedApp;
export type OfficeSdkDocxRenderedApp = DocxRenderedApp;
export type OfficeSdkXlsxRenderedApp = XlsxRenderedApp;
export type OfficeSdkPptxRenderedApp = PptxRenderedApp;

export declare function openfile(
  fileData: DocxOfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<DocxRenderedApp>>;
export declare function openfile(
  fileData: XlsxOfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<XlsxRenderedApp>>;
export declare function openfile(
  fileData: PptxOfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<PptxRenderedApp>>;
export declare function openfile(
  fileData: OfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult>;
export declare function createfile(
  docType: 1,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<DocxRenderedApp>>;
export declare function createfile(
  docType: 2,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<XlsxRenderedApp>>;
export declare function createfile(
  docType: 3,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult<PptxRenderedApp>>;
export declare function createfile(
  docType: OfficeWidgetCreateDocType,
  options?: OfficeSdkOpenOptions | null | undefined
): Promise<OfficeWidgetOpenResult>;

declare const officeWidgetUi: {
  openfile: typeof openfile;
  createfile: typeof createfile;
};

export default officeWidgetUi;
