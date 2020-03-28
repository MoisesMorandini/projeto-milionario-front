import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import Routes from './routes';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import history from './services/history';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* deixar disponivel o nosso store da aplicacao, disponivel para todos os componentes */}
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} closeOnClick />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
