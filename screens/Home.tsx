import {SectionList, StyleSheet, View} from 'react-native';
import {Fab, Icon, Spinner, Text} from 'native-base';
import React from 'react';
import Styles from '../res/styles';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from '../navigators/MainNavigator';
import {
  GET_TODOS,
  getToDosType,
  toDoType,
  UPDATE_TO_DO,
  updateTaskByIdTypes,
  updateTaskByIdVarsTypes,
} from '../queries/todos';
import ToDo from '../components/ToDo';

type HomeScreenNavigationProp = StackNavigationProp<RootMainStackParamList,
  'Home'>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

type Section = {
  title: string;
  data: toDoType[];
};

export default (props: Props) => {
  const {data, loading} = useQuery<getToDosType>(GET_TODOS);
  const [updateToDo] = useMutation<updateTaskByIdTypes, updateTaskByIdVarsTypes>(
    UPDATE_TO_DO,
  );

  const handleClick = (node: toDoType) => {
    updateToDo({
      variables: {
        id: node.id,
        isDone: !node.isDone,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateTaskById: {
          task: {
            id: node.id,
            isDone: !node.isDone,
            title: node.title,
            description: node.description,
            createdAt: node.createdAt,
            userId: node.userId,
            __typename: node.__typename,
          },
          __typename: 'UpdateTaskPayload',
        }
      },
    }).then(() => {});
  };
  const sections: Section[] = [
    {
      title: 'To-do...',
      data: [],
    },
    {
      title: 'Done',
      data: [],
    },
  ];
  data?.allTasks.nodes.forEach(node => {
    if (node.isDone) {
      sections[1].data.push(node);
    } else {
      sections[0].data.push(node);
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      {loading ? (
        <View>
          <Spinner/>
        </View>
      ) : (
        <View style={styles.container}>
          {data && data.allTasks && data.allTasks.nodes && data.allTasks.nodes.length > 0 ?
          <SectionList<toDoType>
            style={styles.list}
            sections={sections}
            renderItem={({item}) => <ToDo node={item} onClick={handleClick}/>}
            keyExtractor={node => node.id.toString(10)}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />: <Text>Poor thing... There is nothing here. Go create some tasks!</Text>}
          <Fab
            position="bottomRight"
            onPress={() => props.navigation.navigate('CreateToDo')}>
            <Icon name="add"/>
          </Fab>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Styles.header,
    textAlign: 'left',
  },
  list: {
    flex: 1,
    marginTop: 8,
  },
  sectionHeader: {
    backgroundColor: '#fcfcfc',
    paddingStart: 24,
    paddingVertical: 4,
  },
});
