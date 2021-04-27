import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './libs/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// client-side render app: react
// architecture: components, constants, context, helpers, lib (firebase in here), hooks, pages
// services(firebase functions in here)
