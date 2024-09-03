import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store/store';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='489559664608-b3nk8m69a7gu9hbutnk5o6o4m4vgkbk4.apps.googleusercontent.com'>
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App /> 
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
