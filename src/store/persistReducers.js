import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'projetoMilhonario',
      storage,
      whitelist: ['auth', 'user', 'cart', 'purchase'],
    },
    reducers,
  );

  return persistedReducer;
};
