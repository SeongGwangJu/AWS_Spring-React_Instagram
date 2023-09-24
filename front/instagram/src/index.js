import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Global } from '@emotion/react';
import { Common } from './Styles/Common';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Global styles = { Common }/>
    <Reset />
    <App />
  </BrowserRouter>
);

reportWebVitals();
