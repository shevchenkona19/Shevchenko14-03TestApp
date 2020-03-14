/**
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import {getToken, signIn, signOut} from './utils/token';
import SplashScreen from './screens/SplashScreen';
import LoginNavigator from './navigators/LoginNavigator';
import MainNavigator from './navigators/MainNavigator';
import {options, persistCachePromise, queueLink} from './apollo';
import ApolloClient from 'apollo-client';
import NetInfo from '@react-native-community/netinfo';
import {GET_TODOS} from './queries/todos';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {persistor} from './store';
import {
  getTrackedQueries,
  State,
  trackedQueriesClear,
  trackedQueriesRemove,
} from './store/treckedQueries';
import {updateHandlerByName} from './queries';
import {createSelector} from 'reselect';

let client: any;

const App = () => {
  const [isLogin, setLogged] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isHydrated, setHydrated] = useState(false);
  const [online, setOnline] = useState(true);
  const dispatch = useDispatch();

  const trackedQueries = useSelector((state: State) => {
    if (state.trackedQueries) {
      const trackedQueriesIds = state.trackedQueries.ids;
      const trackedQueriesById = state.trackedQueries.byId;
      return trackedQueriesIds.map(o => trackedQueriesById[o]);
    } else {
      return [];
    }
  });
  const [trackedLoaded, setTrackedLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isInetReachable = state.isInternetReachable;
      if (isInetReachable === null) {
        return;
      }
      if (isInetReachable === undefined) {
        return;
      }

      if (isInetReachable) {
        queueLink.open();
      } else {
        queueLink.close();
      }
      setOnline(isInetReachable);
    });
    return () => unsubscribe();
  }, []);

  const setToken = (
    loggedIn: boolean,
    token: string,
    userId: number | undefined,
  ) => {
    if (loggedIn) {
      signIn(token, userId as number).then(() => {
        setLogged(true);
      });
    } else {
      signOut().then(async () => {
        setLogged(false);
        await client.resetStore();
        await persistor.purge();
        dispatch(trackedQueriesClear());
      });
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token && token.length > 0) {
        setLogged(true);
      } else {
        setLogged(false);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  useEffect(() => {
    const execute = async () => {
      await persistCachePromise();
      client = new ApolloClient({...options});
      setHydrated(true);
      const promises: Array<Promise<any>> = [];
      trackedQueries.forEach(trackedQuery => {
        const context = JSON.parse(trackedQuery.contextJSON);
        const query = JSON.parse(trackedQuery.queryJSON);
        const variables = JSON.parse(trackedQuery.variablesJSON);
        promises.push(
          client.mutate({
            context,
            mutation: query,
            optimisticResponse: context.optimisticResponse,
            update: updateHandlerByName[trackedQuery.name],
            variables,
          }),
        );
        dispatch(trackedQueriesRemove(trackedQuery.id));
      });
      setTrackedLoaded(true);
      if (online) {
        try {
          await Promise.all(promises);
        } catch (e) {
          console.log('error', e);
        }
        try {
          await client.query({
            fetchPolicy: 'network-only',
            query: GET_TODOS,
          });
        } catch (e) {
          console.log('error', e);
        }
      }
    };
    execute();
  }, [dispatch, online, trackedQueries]);

  if (isLoading || !isHydrated || !trackedLoaded) {
    return <SplashScreen />;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLogin ? (
          <MainNavigator setToken={setToken} />
        ) : (
          <LoginNavigator setToken={setToken} />
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
