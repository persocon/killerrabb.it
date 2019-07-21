import firebase from 'firebase';

const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token', token);

    fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/all`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `key=${process.env.GATSBY_SERVER_KEY}`,
      }
    }).then(() => {
      console.log("registered");
    })
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

const inicializarFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID
  });
  askForPermissioToReceiveNotifications();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw-push-notification.bundle.js')
        .then((registration) => {
          firebase.messaging().useServiceWorker(registration);
        })
        .catch(error => {
          console.error(error);
        });
  }
}

  inicializarFirebase();
