import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routes from './routes/Routes.tsx'; // Import the Routes component that includes the router configuration

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes /> 
  </StrictMode>
);
