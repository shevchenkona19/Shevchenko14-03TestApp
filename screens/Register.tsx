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
import Styles from '../res/styles';
import {useInput} from '../hooks/useInput';
import {register} from '../store/user/thunks';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {RegisterStore} from '../store/user/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default (props: Props) => {
  const {value: username, setValue: setUsername} = useInput('');
  const {value: password, setValue: setPassword} = useInput('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector<RootState, RegisterStore>(
    store => store.user.register,
  );

  if (state.isError && isLoading) {
    Alert.alert('Oops!', state.errorMessage);
    setLoading(false);
  }

  if (!state.isError && isLoading && state.status === 'ok') {
    setLoading(false);
    Alert.alert('Success!', 'Please, log in now', [
      {text: 'Ok', onPress: () => props.navigation.navigate('Login')},
    ]);
  }

  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      setLoading(true);
      dispatch(register(username, password));
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
    alignItems: 'center',
  },
  field: {
    marginVertical: 16,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    ...Styles.header,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  bottom: {
    ...Styles.bottom,
    marginBottom: 36,
  },
  content: {
    flex: 1,
  },
});
