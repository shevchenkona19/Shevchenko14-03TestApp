import {ApolloCache} from 'apollo-cache';
import {Resolvers} from 'apollo-client';
import {gql} from 'apollo-client-preset';
import {GET_TODOS, toDoType} from '../queries/todos';

export const typeDefs = gql`
  type Task {
    id: Int!
    title: String!
    description: String!
    isDone: Boolean!
    createdAt: String!
    userId: Int
  }
  type AllTasks {
    nodes: [Task!]
  }
  type Query {
    allTasks: AllTasks!
  }
  type CreateTask {
    title: String!
    description: String!
    user_id: String!
  }
  type CreateTaskInput {
    task: CreateTask!
  }
  type TaskIsDone {
    isDone: Boolean!
  }
  type TaskPatch {
    taskPatch: TaskIsDone!
  }
  type UpdateTaskInput {
    taskPatch: TaskPatch!
    id: Int!
  }
  type Mutation {
    createTask(input: CreateTaskInput): Task
    updateTaskById(input: UpdateTaskInput): Task
  }
`;
type ResolverFn = (
  parent: any,
  args: any,
  {cache}: {cache: ApolloCache<any>},
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Mutation: {
    updateTaskById: ResolverFn;
  };
}

export const resolvers: AppResolvers = {
  // Mutation: {
  //   updateTaskById: (_, vars, {cache, getCacheKey}) => {
  //     const id = getCacheKey({
  //       __typename: 'Task',
  //       id: vars.id,
  //     });
  //     const fragment = gql`
  //       fragment completeTask on Task {
  //         isDone
  //       }
  //     `;
  //     const todo = cache.readFragment({fragment, id});
  //     const data = {...todo, isDone: !todo.isDone};
  //     cache.writeData({id, data});
  //     return null;
  //   },
  // },
};
