import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyD8rkazRsRQUMYGfGejC_XpXqhsoAIKsYA',
  authDomain: 'instagram-real-clone.firebaseapp.com',
  projectId: 'instagram-real-clone',
  storageBucket: 'instagram-real-clone.appspot.com',
  messagingSenderId: '71380953690',
  appId: '1:71380953690:web:e6cc84ce3ec0d9568ac663',
  measurementId: 'G-ZJ06H2W5VM',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
console.log(firebase.storage());
export { firebase, FieldValue };
