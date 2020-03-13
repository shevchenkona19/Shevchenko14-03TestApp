import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {Button, Container, Content, Text} from 'native-base';
import Styles from '../res/styles';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
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
