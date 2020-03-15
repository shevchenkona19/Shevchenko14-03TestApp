import gql from 'graphql-tag';
import {MutationUpdaterFn} from "apollo-client";

export interface toDoType {
  createdAt: string;
  description: string;
  id: number;
  isDone: boolean;
  title: string;
  userId: number;
  __typename: string;
}

export interface getToDosType {
  allTasks: {
    nodes: toDoType[];
    __typename: string;
  };
  __typename: string;
}

export const GET_TODOS = gql`
  query MyToDos {
    allTasks {
      nodes {
        createdAt
        description
        id
        isDone
        title
        userId
        __typename
      }
      __typename
    }
    __typename
  }
`;

export interface createToDosTypes {
  createTask: {
    task: toDoType;
    __typename: string;
  };
  __typename: string;
}

export interface createToDosVarsTypes {
  title: string;
  description: string;
  userId: number;
  id: number;
}

export const CREATE_TO_DO = gql`
  mutation createToDo($title: String!, $description: String!, $userId: Int!) {
    createTask(
      input: {task: {title: $title, description: $description, userId: $userId}}
    ) {
      task {
        description
        createdAt
        id
        isDone
        title
        userId
        __typename
      }
      __typename
    }
  }
`;

export const createToDoUpdate: MutationUpdaterFn<createToDosTypes> = (
  cache,
    {
      data,
    },
) => {
  if (data === undefined|| data === null || data.createTask === undefined || data.createTask === null) {
    return;
  }
  const {task} = data.createTask;
  const cacheData = cache.readQuery<getToDosType>({query: GET_TODOS});
  cache.writeQuery({
    query: GET_TODOS,
    data: {
      allTasks: {
        nodes: cacheData?.allTasks.nodes.concat([task]),
        __typename: cacheData?.allTasks.__typename,
      },
      __typename: data?.__typename,
    },
  });
};

export interface updateTaskByIdVarsTypes {
  isDone: boolean;
  id: number;
}

export interface updateTaskByIdTypes {
  updateTaskById: {
    task: toDoType;
    __typename: string;
  };
  __typename: string;
}

export const UPDATE_TO_DO = gql`
  mutation updateTaskById($isDone: Boolean!, $id: Int!) {
    updateTaskById(input: {taskPatch: {isDone: $isDone}, id: $id}) {
      task {
        createdAt
        description
        id
        isDone
        title
        __typename
        userId
      }
      __typename
    }
  }
`;
