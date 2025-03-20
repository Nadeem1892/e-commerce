import { createRoot } from 'react-dom/client';
import './index.css';
import Routes from './routes/Routes.tsx'; // Import the Routes component that includes the router configuration
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store.ts';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer/>
   <Routes /> 
  </Provider>
   
  
);
