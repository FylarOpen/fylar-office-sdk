const c = "OfficeSDKLib-v1";
function a(e) {
  const t = new URL(e.url);
  return !(e.method !== "GET" || t.protocol !== "http:" && t.protocol !== "https:");
}
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    Promise.all([
      // 立即控制当前页面
      self.clients.claim(),
      // 可选：清理旧缓存
      caches.keys().then((t) => Promise.all(
        t.filter((n) => n !== c).map((n) => caches.delete(n))
      ))
    ])
  );
});
self.addEventListener("fetch", (e) => {
  const t = e.request;
  a(t) && e.respondWith(i(t));
});
async function i(e) {
  const t = await caches.open(c), n = await t.match(e);
  if (n)
    return n;
  const s = await fetch(e);
  return s && s.ok && await t.put(e, s.clone()), s;
}
