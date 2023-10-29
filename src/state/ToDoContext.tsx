// src/state/ToDoContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';

interface ToDo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface ToDoContextProps {
  todos: ToDo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const ToDoContext = createContext<ToDoContextProps>({} as ToDoContextProps);

const ToDoProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const lastToggledTodoId = useRef<string | null>(null);

  const addTodo = (text: string) => {
    setTodos([...todos, {id: uuid.v4().toString(), text, isCompleted: false}]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          lastToggledTodoId.current = id;
          return {...todo, isCompleted: !todo.isCompleted};
        }
        return todo;
      }),
    );
  };
  useEffect(() => {
    todos.forEach(todo => {
      if (todo.id === lastToggledTodoId.current) {
        //Alert.alert(todo.text, todo.isCompleted.toString());
        console.log(todo.text, todo.isCompleted.toString());
      }
    });
  }, [todos]);

  //log isCompleted
  // useEffect(() => {
  //   todos.forEach(todo => {
  //     Alert.alert(todo.text, todo.isCompleted.toString());
  //   });
  // }, [todos]);

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosString = await AsyncStorage.getItem('@todos');
        if (todosString) {
          setTodos(JSON.parse(todosString));
        }
      } catch (e) {
        console.error('Failed to load todos from AsyncStorage', e);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('@todos', JSON.stringify(todos));
      } catch (e) {
        console.error('Failed to save todos to AsyncStorage', e);
      }
    };

    saveTodos();
  }, [todos]);

  return (
    <ToDoContext.Provider value={{todos, addTodo, toggleTodo, deleteTodo}}>
      {children}
    </ToDoContext.Provider>
  );
};

export {ToDoContext, ToDoProvider};
