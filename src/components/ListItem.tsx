import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  text,
  isCompleted,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onToggle(id)}
      style={styles.row}
      activeOpacity={1}>
      <FontAwesomeIcon icon={faAddressBook} />
      <Text>{text}</Text>
      <View style={styles.checkboxContainer}>
        <View
          style={
            isCompleted ? styles.checkedCheckbox : styles.uncheckedCheckbox
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  checkedCheckbox: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 3,
  },
  uncheckedCheckbox: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
});

export default ListItem;
