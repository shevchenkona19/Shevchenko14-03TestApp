import {gql} from 'apollo-client-preset';

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
