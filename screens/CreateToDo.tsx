import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Label,
  Spinner,
  Text,
  Textarea,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from '../navigators/MainNavigator';
import {
  CREATE_TO_DO,
  createToDosTypes,
  createToDosVarsTypes,
  createToDoUpdate,
} from '../queries/todos';
import {getUserId} from '../utils/token';
import getRandomNumber from '../utils/rnd';

type HomeScreenNavigationProp = StackNavigationProp<
  RootMainStackParamList,
  'CreateToDo'
>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

export default (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createToDo, {called, loading}] = useMutation<
    createToDosTypes,
    createToDosVarsTypes
  >(CREATE_TO_DO, {
    context: {
      tracked: true,
      serializationKey: 'TO-DO',
    },
    update: createToDoUpdate,
  });

  const onSubmit = async () => {
    const userId = await getUserId();
    const id = getRandomNumber(0, 500000);
    createToDo({
      variables: {
        title,
        description,
        userId,
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTask: {
          __typename: 'TaskConnection',
          task: {
            __typename: 'Task',
            title,
            description,
            createdAt: new Date().toISOString(),
            isDone: false,
            userId,
            id,
          },
        },
      },
    });
    props.navigation.goBack();
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {called && loading ? (
          <View style={styles.container}>
            <Spinner />
          </View>
        ) : (
          <React.Fragment>
            <View style={styles.form}>
              <Item floatingLabel style={styles.field}>
                <Label>Title</Label>
                <Input value={title} onChangeText={setTitle} />
              </Item>
              <Textarea
                style={styles.field}
                rowSpan={5}
                bordered
                placeholder="Description"
                value={description}
                underline={false}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.bottom}>
              <Button onPress={onSubmit}>
                <Text>Submit</Text>
              </Button>
            </View>
          </React.Fragment>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginHorizontal: 16,
  },
  field: {
    marginVertical: 16,
  },
  checkBoxLabel: {
    marginEnd: 16,
  },
  checkBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    marginHorizontal: 16,
  },
});
