import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Container, Content, Text} from 'native-base';
import {RootLoginStackParamList} from '../navigators/LoginNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootLoginStackParamList,
  'Chooser'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default (props: Props) => {
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.header}>Welcome to To-Do app</Text>
        <View style={styles.bottom}>
          <Button
            style={styles.button}
            block
            onPress={() => props.navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
          <Button
            style={styles.button}
            block
            onPress={() => props.navigation.navigate('Register')}>
            <Text>Register</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  content: {
    flex: 1,
  },
});
