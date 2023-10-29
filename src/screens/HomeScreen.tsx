import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ToDoContext} from '../state/ToDoContext';
import ListItem from '../components/ListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import InputField from '../components/InputField';

const HomeScreen = () => {
  const {todos, addTodo, toggleTodo, deleteTodo} = useContext(ToDoContext);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's tasks</Text>
      <SwipeListView
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem
            id={item.id}
            text={item.text}
            isCompleted={item.isCompleted}
            onToggle={toggleTodo}
          />
        )}
        renderHiddenItem={({item}) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backRightBtnEdit}
              onPress={() => console.log('Edit Action')}>
              <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backRightBtnDelete}
              onPress={() => deleteTodo(item.id)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-150}
      />
      <InputField onAddTodo={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 16,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnEdit: {
    alignItems: 'center',
    backgroundColor: 'blue',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 75,
    height: 60,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  backRightBtnDelete: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 60,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default HomeScreen;
