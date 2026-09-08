const compatScripts = [
  ["zepto", "./vendor/zepto.min.js?version=1788858640169"],
  ["XRegExp", "./vendor/xregexp-all-min.js?version=1788858640169"]
];

const runtimeScope = typeof globalThis !== "undefined" ? globalThis : window;

function canInstallCompatGlobals() {
  return typeof document !== "undefined" && typeof window !== "undefined";
}

function hasCompatGlobal(name) {
  if (name === "zepto") {
    return Boolean(runtimeScope.$);
  }
  return Boolean(runtimeScope[name]);
}

function installClassicScript(relativeUrl) {
  const scriptUrl = new URL(relativeUrl, import.meta.url).href;
  const existing = document.querySelector(`script[data-office-sdk-compat-src="${scriptUrl}"]`);
  if (existing) {
    if (existing.dataset.officeSdkCompatLoaded === "true") {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`failed to load compat runtime script: ${scriptUrl}`)), {
        once: true
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = false;
    script.dataset.officeSdkCompatSrc = scriptUrl;
    script.addEventListener("load", () => {
      script.dataset.officeSdkCompatLoaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`failed to load compat runtime script: ${scriptUrl}`)), {
      once: true
    });
    document.head.appendChild(script);
  });
}

if (canInstallCompatGlobals()) {
  for (const [globalName, relativeUrl] of compatScripts) {
    if (!hasCompatGlobal(globalName)) {
      await installClassicScript(relativeUrl);
    }
  }

  runtimeScope.jQuery ??= runtimeScope.$;
}

export {};
