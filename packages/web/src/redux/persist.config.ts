import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';

export const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Only persist auth state
};
