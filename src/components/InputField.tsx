import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

interface InputFieldProps {
  onAddTodo: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({onAddTodo}) => {
  const [text, setText] = useState('');
  const handleAddPress = () => {
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Write a task"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    padding: 10,
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 10,
    textAlign: 'center',
    borderRadius: 25,
    fontSize: 16,
    color: '#A0A0A0',
    backgroundColor: 'white',

    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
  },
  addButtonText: {
    fontSize: 24,
    color: '#A0A0A0',
  },
});

export default InputField;
