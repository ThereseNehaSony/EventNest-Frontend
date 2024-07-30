import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Use ReactDOM.createRoot directly
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId='981982605973-sdtf7lmort8no95nbtjp64g97uj2rhct.apps.googleusercontent.com'>
      <Router>
        <App />
      </Router>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);




