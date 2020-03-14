import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chooser from '../screens/Chooser';
import Login from '../screens/Login';
import Register from '../screens/Register';

export type RootLoginStackParamList = {
  Chooser: undefined;
  Login: {
    setToken: (
      loggedIn: boolean,
      token: string,
      userId: number | undefined,
    ) => void;
  };
  Register: undefined;
};

const UserStack = createStackNavigator<RootLoginStackParamList>();

type Props = {
  setToken: (
    setLogged: boolean,
    token: string,
    userId: number | undefined,
  ) => void;
};

export default (props: Props) => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Chooser" component={Chooser} />
      <UserStack.Screen
        name="Login"
        component={Login}
        initialParams={{
          setToken: props.setToken,
        }}
      />
      <UserStack.Screen name="Register" component={Register} />
    </UserStack.Navigator>
  );
};
