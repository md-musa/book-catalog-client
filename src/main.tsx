/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { ToastContainer } from 'react-toast';
import { Provider } from 'react-redux';
import { store } from './store/configureStore.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
