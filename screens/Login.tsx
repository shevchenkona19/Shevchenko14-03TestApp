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
import Styles from '../res/styles';
import {useInput} from '../hooks/useInput';
import {login} from '../store/user/thunks';
import {useDispatch, useSelector} from 'react-redux';
import {LoginStore} from '../store/user/types';
import {RootState} from '../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default (props: Props) => {
  const {value: username, setValue: setUsername} = useInput('');
  const {value: password, setValue: setPassword} = useInput('');
  const [isLoading, setLoading] = useState(false);
  const state = useSelector<RootState, LoginStore>(store => store.user.login);
  const dispatch = useDispatch();

  if (state.isError && isLoading) {
    Alert.alert('Oops!', state.errorMessage);
    setLoading(false);
  }

  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      setLoading(true);
      dispatch(login(username, password));
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
