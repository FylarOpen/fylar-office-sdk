export const SUPPORTED_LANGS = [
  { value: "zh-CN", label: "简体中文 (zh-CN)" },
  { value: "en-US", label: "English (en-US)" },
];

export const DEFAULT_OPTIONS = {
  uiOptions: {
    showTopBar: true,
    showBottomBar: true,
  },
  mode: {
    lang: "zh-CN",
    readOnly: false,
  },
};

export function createDefaultState() {
  return {
    lang: DEFAULT_OPTIONS.mode.lang,
    readOnly: DEFAULT_OPTIONS.mode.readOnly,
    showTopBar: DEFAULT_OPTIONS.uiOptions.showTopBar,
    showBottomBar: DEFAULT_OPTIONS.uiOptions.showBottomBar,
  };
}

export function buildOpenOptions(state = createDefaultState(), demoTag = "demo") {
  return {
    userData: {
      userId: `${demoTag}-user`,
      nickName: `${demoTag} User`,
    },
    uiOptions: {
      showTopBar: state.showTopBar,
      showBottomBar: state.showBottomBar,
    },
    mode: {
      lang: state.lang,
      readOnly: state.readOnly,
    },
  };
}
