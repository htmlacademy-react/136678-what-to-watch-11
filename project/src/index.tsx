import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { checkAuthAction, getFilmsAction, getPromoFilmAction } from './store/api-actions';
import { store } from './store';
import { getToken } from './services/token';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

if (getToken()) {
  store.dispatch(checkAuthAction());
}

store.dispatch(getFilmsAction());
store.dispatch(getPromoFilmAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
