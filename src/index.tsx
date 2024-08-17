import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-5HFh05W8bLBcElrVQXxAcibXpH/1t+9IY4HR5Y6xH5tNh6ElRJ4q2X5OwXUSrY7x"
  crossOrigin="anonymous"
/>



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




