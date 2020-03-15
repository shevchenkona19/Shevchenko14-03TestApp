import {ApolloLink} from 'apollo-link';
import {Dispatch} from 'redux';
import uuid from 'uuid-random';

import {
  TrackedQueriesActionType,
  trackedQueriesAdd,
  trackedQueriesRemove,
} from '../../store/treckedQueries';

export default (dispatch: Dispatch<TrackedQueriesActionType>) =>
  new ApolloLink((operation, forward) => {
    console.log(operation.operationName);
    if (forward === undefined) {
      console.log('forward null');
      return null;
    }
    const name: string = operation.operationName;
    const queryJSON: string = JSON.stringify(operation.query);
    const variablesJSON: string = JSON.stringify(operation.variables);
    const context = operation.getContext();
    const contextJSON = JSON.stringify(context);
    const id = uuid();
    if (context.tracked !== undefined) {
      dispatch(
        trackedQueriesAdd({
          contextJSON,
          id,
          name,
          queryJSON,
          variablesJSON,
        }),
      );
    }
    return forward(operation).map(data => {
      if (context.tracked !== undefined) {
        dispatch(trackedQueriesRemove(id));
      }
      return data;
    });
  });
