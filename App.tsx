/**
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chooser from './screens/Chooser';
import Login from './screens/Login';
import Register from './screens/Register';
import {Provider, useSelector} from 'react-redux';
import {persistor, RootState, store} from './store';
import Home from './screens/Home';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './screens/SplashScreen';

export type RootStackParamList = {
  Chooser: undefined;
  Login: undefined;
  Register: undefined;
};

const UserStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator();

const App = () => {
  const token = useSelector<RootState, string>(state => state.user.token);

  return (
    <NavigationContainer>
      {token.length === 0 ? (
        <UserStack.Navigator>
          <UserStack.Screen name="Chooser" component={Chooser} />
          <UserStack.Screen name="Login" component={Login} />
          <UserStack.Screen name="Register" component={Register} />
        </UserStack.Navigator>
      ) : (
        <AppStack.Navigator>
          <AppStack.Screen name="Home" component={Home} />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
