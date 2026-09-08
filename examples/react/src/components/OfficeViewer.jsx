import { useEffect, useRef } from "react";
import OfficeUI from "@office-sdk/UI.js";
import {
  classifyError,
  createOfficeController,
  getCreateDocType,
  isOpenCancelledError,
  isSupportedOfficeFile,
} from "@office-sdk-shared/officeWidget.js";

export default function OfficeViewer({
  file,
  createDocType,
  requestId,
  openOptions,
  onStatus,
  onError,
}) {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const activeRequestIdRef = useRef(0);

  if (!controllerRef.current) {
    controllerRef.current = createOfficeController({ OfficeUI });
  }

  useEffect(() => {
    let cancelled = false;
    if (!controllerRef.current) {
      controllerRef.current = createOfficeController({ OfficeUI });
    }
    const controller = controllerRef.current;
    activeRequestIdRef.current = requestId;

    async function openCurrentFile() {
      const createItem = getCreateDocType(createDocType);

      if (!file && !createDocType) {
        await controller?.close();
        return;
      }
      if (!file && !createItem) {
        onError?.({
          kind: "invalid-create-type",
          title: "无法新建文件",
          detail: "请选择 Word、Excel 或 PowerPoint 文档类型。",
        });
        return;
      }
      if (file && !isSupportedOfficeFile(file.name)) {
        onError?.({
          kind: "unsupported",
          title: "不支持的文件类型",
          detail: `${file.name} 不是 SDK 支持的 Office 文档类型。`,
        });
        return;
      }

      onError?.(null);
      onStatus?.(file ? `正在打开 ${file.name} ...` : `正在新建 ${createItem.label} ...`);

      try {
        if (file) {
          await controller.open(
            containerRef.current,
            {
              fileName: file.name,
              file,
            },
            openOptions ?? {},
          );
        } else {
          await controller.create(containerRef.current, createItem.value, openOptions ?? {});
        }
        if (!cancelled && activeRequestIdRef.current === requestId) {
          onStatus?.(file ? `${file.name} 已加载` : `${createItem.fileName} 已创建`);
        }
      } catch (error) {
        if (isOpenCancelledError(error)) {
          return;
        }
        console.error("[react-demo] open/create failed", error);
        if (!cancelled && activeRequestIdRef.current === requestId) {
          onStatus?.(file ? "打开失败" : "新建失败");
          onError?.(classifyError(error));
        }
      }
    }

    void openCurrentFile();

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  useEffect(() => () => {
    void controllerRef.current?.close();
    controllerRef.current = null;
  }, []);

  return <div ref={containerRef} className="office-sdk-demo-office-viewer" />;
}
