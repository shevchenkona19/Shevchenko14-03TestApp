import {StyleSheet} from 'react-native';
import React from 'react';
import Styles from '../res/styles';
import {Container, Content, Text} from 'native-base';

export default () => {
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.appName}>To-Do</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  appName: {
    ...Styles.header,
    flex: 1,
    textAlign: 'center',
  },
});
