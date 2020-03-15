/**
 * @format
 */

import React, {useState} from 'react';
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
import {Alert, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchRegister} from '../utils/api/user';
import {RootLoginStackParamList} from '../navigators/LoginNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootLoginStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

interface RegisterData {
  status: 'ok' | 'error';
  code: string | undefined;
  message: string | undefined;
}

export default (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const register = () => {
    fetchRegister(username, password)
      .then(res => res.json())
      .then((json: RegisterData) => {
        setLoading(false);
        if (json.status === 'ok') {
          Alert.alert('Success!', 'Please, log in now', [
            {text: 'Ok', onPress: () => props.navigation.navigate('Login')},
          ]);
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
      setLoading(true);
      register();
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
            <Text style={styles.header}>
              Please, enter new user's username and password:
            </Text>
            <View style={styles.form}>
              <Item style={styles.field} floatingLabel>
                <Label>Username</Label>
                <Input
                  autoCapitalize={'none'}
                  autoCompleteType={'username'}
                  textContentType={'username'}
                  onChangeText={setUsername}
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
                  value={password}
                />
              </Item>
            </View>
            <View style={styles.bottom}>
              <Button block style={styles.button} onPress={onSubmit}>
                <Text>Register</Text>
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
