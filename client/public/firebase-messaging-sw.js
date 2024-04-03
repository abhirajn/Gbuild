importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCwcr84e3YoSa8cede3N7ynuL_7y93BYU8",
    authDomain: "gbuild-283ce.firebaseapp.com",
    projectId: "gbuild-283ce",
    storageBucket: "gbuild-283ce.appspot.com",
    messagingSenderId: "656811490813",
    appId: "1:656811490813:web:a676f35c30eabb97ab2d94"
  };
  

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});