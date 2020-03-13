import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Action,
} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {UserReducer} from './user/reducers';

const mainReducer = combineReducers({
  user: UserReducer,
});

export type RootState = ReturnType<typeof mainReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(mainReducer, enhancer);

export default store;
