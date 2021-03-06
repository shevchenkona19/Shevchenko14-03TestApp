import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {getToken} from '../utils/token';
import {ApolloLink} from 'apollo-link';
import SerializingLink from 'apollo-link-serialize';
import {typeDefs} from '../gqltypes';
import {RetryLink} from 'apollo-link-retry';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import QueueLink from 'apollo-link-queue';
import {NormalizedCacheObject} from 'apollo-cache-inmemory';
import {PersistedData, PersistentStorage} from 'apollo-cache-persist/types';
import trackerLink from '../apollo/links/trackerLink';
import store from '../store';
import {SERVER_URL} from '../utils/api/api';
import apolloLogger from 'apollo-link-logger';

const httpLink = new HttpLink({uri: SERVER_URL + '/graphql'});
const retry = new RetryLink({attempts: {max: Infinity}});

export const queueLink = new QueueLink();
const serialize = new SerializingLink();
const authLink = setContext(async (req, {headers}) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const link = ApolloLink.from([
  apolloLogger,
  authLink,
  trackerLink(store.dispatch),
  queueLink,
  serialize,
  retry,
  httpLink,
]);

const cache = new InMemoryCache();

export const persistCachePromise = () =>
  persistCache({
    cache,
    storage: AsyncStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  });

export const options = {
  link,
  cache,
  typeDefs,
};
