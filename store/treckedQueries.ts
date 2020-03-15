import {combineReducers} from 'redux';
import {createSelector} from 'reselect';

interface TrackedQuery {
  contextJSON: string;
  id: string;
  name: string;
  queryJSON: string;
  variablesJSON: string;
}

// ACTIONS
const TRACKED_QUERIES_ADD = 'TRACKED_QUERIES_ADD';
const TRACKED_QUERIES_REMOVE = 'TRACKED_QUERIES_REMOVE';
const CLEAR_TRACKED_QUERIES = 'CLEAR_TRACKED_QUERIES';

interface TrackedQueriesAdd {
  payload: TrackedQuery;
  type: typeof TRACKED_QUERIES_ADD;
}

interface TrackedQueriesRemove {
  payload: string;
  type: typeof TRACKED_QUERIES_REMOVE;
}

interface TrackedQueriesClear {
  type: typeof CLEAR_TRACKED_QUERIES;
}

export type TrackedQueriesActionType =
  | TrackedQueriesAdd
  | TrackedQueriesRemove
  | TrackedQueriesClear;

// ACTION CREATORS
export const trackedQueriesAdd = (
  trackedQuery: TrackedQuery,
): TrackedQueriesAdd => ({
  payload: trackedQuery,
  type: TRACKED_QUERIES_ADD,
});

export const trackedQueriesRemove = (id: string): TrackedQueriesRemove => ({
  payload: id,
  type: TRACKED_QUERIES_REMOVE,
});

export const trackedQueriesClear = () => ({
  type: CLEAR_TRACKED_QUERIES,
});

// REDUCERS
interface TrackedQueriesById {
  [key: string]: TrackedQuery;
}

type TrackedQueriesIds = string[];

export interface State {
  byId: TrackedQueriesById;
  ids: TrackedQueriesIds;
}
const byId = (
  state: TrackedQueriesById = {},
  action: TrackedQueriesActionType,
) => {
  let newState: TrackedQueriesById;
  switch (action.type) {
    case TRACKED_QUERIES_ADD:
      newState = {
        ...state,
        [action.payload.id]: action.payload,
      };
      return newState;
    case TRACKED_QUERIES_REMOVE:
      newState = {
        ...state,
      };
      delete newState[action.payload];
      return newState;
    case CLEAR_TRACKED_QUERIES:
      newState = {};
      return newState;
    default:
      return state;
  }
};

const ids = (
  state: TrackedQueriesIds = [],
  action: TrackedQueriesActionType,
) => {
  let newState: TrackedQueriesIds;
  switch (action.type) {
    case TRACKED_QUERIES_ADD:
      newState = [...state, action.payload.id];
      return newState;
    case TRACKED_QUERIES_REMOVE:
      newState = state.filter(id => id !== action.payload);
      return newState;
    case CLEAR_TRACKED_QUERIES:
      newState = [];
      return newState;
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
});

// SELECTORS
const getTrackedQueriesIds = (state: State) => state.ids;

const getTrackedQueriesById = (state: State) => state.byId;

export const getTrackedQueries = createSelector(
  getTrackedQueriesIds,
  getTrackedQueriesById,
  (pIds, pById) => pIds.map(o => pById[o]),
);
