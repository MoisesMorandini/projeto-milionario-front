import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'vagnaoStore',
      storage,
      whitelist: ['auth', 'user', 'cart', 'purchase'],
    },
    reducers
  );

  return persistedReducer;
};
