import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 스타일링 파일 (필요하면 작성하세요)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
