import {MutationUpdaterFn} from 'apollo-client';
import {createToDoUpdate} from './todos';

interface UpdateHandlerByName {
  [key: string]: MutationUpdaterFn<any>;
}

export const updateHandlerByName: UpdateHandlerByName = {
  createToDo: createToDoUpdate,
};
