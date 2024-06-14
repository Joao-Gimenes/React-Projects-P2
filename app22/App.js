import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = () => {
    const newItems = [...items, currentItem];
    setItems(newItems);
    saveItems(newItems);
    setModalVisible(false);
    setCurrentItem({ name: '', quantity: '' });
  };

  const editItem = () => {
    const newItems = [...items];
    newItems[editIndex] = currentItem;
    setItems(newItems);
    saveItems(newItems);
    setModalVisible(false);
    setCurrentItem({ name: '', quantity: '' });
    setIsEditing(false);
    setEditIndex(null);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    saveItems(newItems);
  };

  const openEditModal = (item, index) => {
    setCurrentItem(item);
    setIsEditing(true);
    setEditIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} ({item.quantity})</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => openEditModal(item, index)} />
              <Button title="Delete" onPress={() => deleteItem(index)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Nome do Item"
            value={currentItem.name}
            onChangeText={(text) => setCurrentItem({ ...currentItem, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Quantidade"
            value={currentItem.quantity}
            onChangeText={(text) => setCurrentItem({ ...currentItem, quantity: text })}
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button
              title="Salvar"
              onPress={isEditing ? editItem : addItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#008CBA',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
});

export default App;
