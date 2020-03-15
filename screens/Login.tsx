/**
 * @format
 */

import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Label,
  Spinner,
  Text,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchLogin} from '../utils/api/user';
import {RouteProp} from '@react-navigation/native';
import {RootLoginStackParamList} from '../navigators/LoginNavigator';

type LoginScreenNavigationProp = StackNavigationProp<
  RootLoginStackParamList,
  'Login'
>;
type LoginScreenRouteProp = RouteProp<RootLoginStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

interface LoginData {
  status: 'ok' | 'error';
  user_id: number | undefined;
  token: string | undefined;
  code: string | undefined;
  message: string | undefined;
}

export default (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    fetchLogin(username, password)
      .then<LoginData>(res => res.json())
      .then(json => {
        setLoading(false);
        if (json.status === 'ok') {
          props.route.params.setToken(true, json.token as string, json.user_id);
        } else if (json.status === 'error') {
          Alert.alert('Oops!', json.message as string);
        }
      })
      .catch(e => {
        setLoading(false);
        console.error(e);
        Alert.alert('Oops!', 'Something went wrong...');
      });
  };

  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      login();
    } else {
      Alert.alert('Please, input username and password');
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        {isLoading ? (
          <View>
            <Spinner />
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.header}>Please, enter your credentials:</Text>
            <View style={styles.form}>
              <Item style={styles.field} floatingLabel>
                <Label>Username</Label>
                <Input
                  autoCapitalize={'none'}
                  autoCompleteType={'username'}
                  textContentType={'username'}
                  onChangeText={setUsername}
                  editable={!isLoading}
                  value={username}
                />
              </Item>
              <Item style={styles.field} floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  autoCapitalize={'none'}
                  autoCompleteType={'password'}
                  textContentType={'password'}
                  onChangeText={setPassword}
                  editable={!isLoading}
                  value={password}
                />
              </Item>
            </View>
            <View style={styles.bottom}>
              <Button
                disabled={isLoading}
                block
                style={styles.button}
                onPress={onSubmit}>
                <Text>Login</Text>
              </Button>
            </View>
          </View>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  field: {
    marginVertical: 16,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginStart: 16,
    textAlign: 'left',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
