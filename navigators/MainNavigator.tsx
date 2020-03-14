import Home from '../screens/Home';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateToDo from '../screens/CreateToDo';
import {Button} from 'react-native';

export type RootMainStackParamList = {
  Home: undefined;
  CreateToDo: undefined;
};

const AppStack = createStackNavigator<RootMainStackParamList>();
type Props = {
  setToken: (setLogged: boolean, token: string, userId: number | undefined) => void;
};

export default (props: Props) => {
  function logout() {
    props.setToken(false, '', undefined);
  }

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <Button title={'Logout'} onPress={logout} />,
        }}
      />
      <AppStack.Screen name="CreateToDo" component={CreateToDo} />
    </AppStack.Navigator>
  );
};
