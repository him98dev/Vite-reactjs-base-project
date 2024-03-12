import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { createRouter } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={createRouter()} />
    </Provider>
  </React.StrictMode>
);
