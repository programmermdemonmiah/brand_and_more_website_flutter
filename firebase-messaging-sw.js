// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCHSzk4n1LhTnDyv64u6cKldJMq5k_NDOs",
    authDomain: "ecom-metrix.firebaseapp.com",
    projectId: "ecom-metrix",
    storageBucket: "ecom-metrix.firebasestorage.app",
    messagingSenderId: "972064786517",
    appId: "1:972064786517:web:c26ba23af86ccbe02e2cdc",
    measurementId: "G-KZB78LK8VE"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});