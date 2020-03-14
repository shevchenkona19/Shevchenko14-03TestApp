import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {toDoType} from '../queries/todos';
import {CheckBox} from 'native-base';

type Props = {
  node: toDoType;
  onClick: (todo: toDoType) => void;
};

export default (props: Props) => {
  const {node, onClick} = props;
  return (
    <View>
      <TouchableOpacity onPress={() => onClick(node)} style={{...styles.container, ...(node.isDone && styles.doneContainer)}}>
        <Text style={{...styles.title, ...(node.isDone && styles.doneText)}}>
          {node.title}
        </Text>
        <Text style={{...styles.description, ...(node.isDone && styles.doneText)}}>{node.description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#fdffd8',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
  doneContainer: {
    backgroundColor: '#c1c2bd',
    elevation: 0,
    shadowOpacity: 0,
    opacity: 0.7,
  },
});
