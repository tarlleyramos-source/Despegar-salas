const CACHE = "despegar-salas-v1";
const ASSETS = [
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instala e faz cache dos arquivos principais
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Ativa e limpa caches antigos
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Intercepta requisições: cache-first para assets, network-first para API
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Requisições externas (Google OAuth, APIs) sempre vão para a rede
  if (!url.origin.includes(self.location.hostname)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match("/index.html"));
    })
  );
});

// Recebe push notifications (para alertas em tempo real)
self.addEventListener("push", e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || "Despegar Salas";
  const options = {
    body: data.body || "Novo alerta de sala",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: data.tag || "sala-alerta",
    data: { url: data.url || "/" },
    actions: [
      { action: "ver", title: "Ver agora" },
      { action: "fechar", title: "Fechar" }
    ],
    vibrate: [200, 100, 200]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Ao tocar na notificação, abre o app
self.addEventListener("notificationclick", e => {
  e.notification.close();
  if (e.action === "ver" || !e.action) {
    e.waitUntil(clients.openWindow(e.notification.data.url || "/"));
  }
});
