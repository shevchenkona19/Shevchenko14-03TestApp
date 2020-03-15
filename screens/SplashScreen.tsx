import {StyleSheet} from 'react-native';
import React from 'react';
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
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginStart: 16,
    flex: 1,
    textAlign: 'center',
  },
});
