try {
  self.importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
  self.importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


self.addEventListener('notificationclick', event => {
  const rootUrl = new URL('/', location).href;
  event.notification.close();
  // Enumerate windows, and call window.focus(), or open a new one.
  event.waitUntil(
    clients.matchAll().then(matchedClients => {
      for (let client of matchedClients) {
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});

firebase.initializeApp({
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
});

const messaging = firebase.messaging();
} catch (e) {
  
}
