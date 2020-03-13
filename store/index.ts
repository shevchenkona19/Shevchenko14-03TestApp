import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {UserReducer} from './user/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import {persistReducer, persistStore} from 'redux-persist';

const mainReducer = combineReducers({
  user: UserReducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export type RootState = ReturnType<typeof persistedReducer>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
