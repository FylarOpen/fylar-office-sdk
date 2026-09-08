import { useMemo, useRef, useState } from "react";
import OfficeViewer from "./components/OfficeViewer.jsx";
import {
  ACCEPT_ATTR,
  CREATE_DOC_TYPES,
  getCreateDocType,
  isSupportedOfficeFile,
} from "@office-sdk-shared/officeWidget.js";
import { SUPPORTED_LANGS, buildOpenOptions, createDefaultState } from "@office-sdk-shared/ui-defaults.js";

export default function App() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileToOpen, setFileToOpen] = useState(null);
  const [docTypeToCreate, setDocTypeToCreate] = useState(null);
  const [createDocType, setCreateDocType] = useState(CREATE_DOC_TYPES[0].value);
  const [openRequestId, setOpenRequestId] = useState(0);
  const [fileName, setFileName] = useState("未选择文件");
  const [statusText, setStatusText] = useState("请选择文件");
  const [errorInfo, setErrorInfo] = useState(null);
  const [options, setOptions] = useState(() => createDefaultState());

  const openOptions = useMemo(() => buildOpenOptions(options, "react-demo"), [options]);

  function handleFileChange(event) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setFileName(file ? file.name : "未选择文件");
    setErrorInfo(null);
    setStatusText(file ? "文件已选择，点击“打开文件”开始挂载" : "请选择文件");
  }

  function openSelectedFile() {
    if (!selectedFile) {
      setErrorInfo({ title: "未选择文件", detail: "请先选择一个 Office 文档。" });
      return;
    }
    if (!isSupportedOfficeFile(selectedFile.name)) {
      setErrorInfo({
        title: "不支持的文件类型",
        detail: `${selectedFile.name} 不是 SDK 支持的 Office 文档类型。`,
      });
      return;
    }

    setErrorInfo(null);
    setFileToOpen(selectedFile);
    setDocTypeToCreate(null);
    setOpenRequestId((current) => current + 1);
  }

  function createNewFile() {
    const item = getCreateDocType(createDocType);
    if (!item) {
      setErrorInfo({ title: "无法新建文件", detail: "请选择要新建的 Office 文档类型。" });
      return;
    }

    setSelectedFile(null);
    setFileToOpen(null);
    setDocTypeToCreate(item.value);
    setFileName(item.fileName);
    setErrorInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOpenRequestId((current) => current + 1);
  }

  function reset() {
    setSelectedFile(null);
    setFileToOpen(null);
    setDocTypeToCreate(null);
    setOpenRequestId((current) => current + 1);
    setFileName("未选择文件");
    setErrorInfo(null);
    setStatusText("已重置，可重新选择文件");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="office-sdk-demo">
      <aside className="office-sdk-demo-panel">
        <div>
          <p className="office-sdk-demo-eyebrow">React Demo</p>
          <h1>Office SDK · React 18 集成</h1>
          <p className="office-sdk-demo-muted">
            演示如何把 Office SDK 封装成 React 组件，并复用 /shared 中的打开、新建与生命周期 helper。
          </p>
        </div>

        <section className="office-sdk-demo-block">
          <h2>1. 打开或新建文件</h2>
          <div className="office-sdk-demo-controls">
            <label className="office-sdk-demo-file-picker" htmlFor="react-file">
              <span>选择文件</span>
              <input
                id="react-file"
                ref={fileInputRef}
                type="file"
                accept={ACCEPT_ATTR}
                onChange={handleFileChange}
              />
            </label>
            <button type="button" onClick={openSelectedFile}>打开文件</button>
            <button type="button" className="office-sdk-demo-secondary" onClick={reset}>重置</button>
          </div>
          <div className="office-sdk-demo-controls">
            <select
              className="office-sdk-demo-create-select"
              aria-label="新建文件类型"
              value={createDocType}
              onChange={(event) => setCreateDocType(Number(event.target.value))}
            >
              {CREATE_DOC_TYPES.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <button type="button" onClick={createNewFile}>新建文件</button>
          </div>
          <div className="office-sdk-demo-meta">
            <span>当前文件：</span>
            <strong>{fileName}</strong>
          </div>
        </section>

        <section className="office-sdk-demo-block">
          <h2>2. 打开选项</h2>
          <div className="office-sdk-demo-form-grid">
            <label>
              <span>语言</span>
              <select
                value={options.lang}
                onChange={(event) => setOptions((current) => ({ ...current, lang: event.target.value }))}
              >
                {SUPPORTED_LANGS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
            <label className="office-sdk-demo-inline">
              <input
                type="checkbox"
                checked={options.readOnly}
                onChange={(event) => setOptions((current) => ({ ...current, readOnly: event.target.checked }))}
              />
              <span>只读模式</span>
            </label>
            <label className="office-sdk-demo-inline">
              <input
                type="checkbox"
                checked={options.showTopBar}
                onChange={(event) => setOptions((current) => ({ ...current, showTopBar: event.target.checked }))}
              />
              <span>显示顶部工具栏</span>
            </label>
            <label className="office-sdk-demo-inline">
              <input
                type="checkbox"
                checked={options.showBottomBar}
                onChange={(event) => setOptions((current) => ({ ...current, showBottomBar: event.target.checked }))}
              />
              <span>显示底部状态栏</span>
            </label>
          </div>
        </section>

        <section className="office-sdk-demo-block">
          <h2>3. 状态</h2>
          <p className="office-sdk-demo-status">{statusText}</p>
          {errorInfo ? (
            <div className="office-sdk-demo-error">
              <strong>{errorInfo.title}</strong>
              <p>{errorInfo.detail}</p>
            </div>
          ) : null}
          <p className="office-sdk-demo-hint">如果资源加载失败，请确认 /lib 已完整保留，并通过 HTTP 服务访问。</p>
        </section>
      </aside>

      <section className="office-sdk-demo-viewer-shell">
        <OfficeViewer
          file={fileToOpen}
          createDocType={docTypeToCreate}
          requestId={openRequestId}
          openOptions={openOptions}
          onStatus={setStatusText}
          onError={setErrorInfo}
        />
      </section>
    </div>
  );
}
