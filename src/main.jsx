import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import './index.css';
import Manager from './Manager.jsx';
import Usuarios from './Usuarios.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Manager></Manager>
  </StrictMode>,
);

