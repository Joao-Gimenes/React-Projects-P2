// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson) {
        setTasks(JSON.parse(tasksJson));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now().toString(), text: newTask }];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const saveEditedTask = () => {
    if (currentTask && newTask.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === currentTask.id ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTask(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskInputContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Nome da Tarefa"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button
          title={isEditing ? 'Salvar' : 'Adicionar'}
          onPress={isEditing ? saveEditedTask : addTask}
        />
        {isEditing && (
          <Button
            title="Cancelar"
            onPress={() => {
              setIsEditing(false);
              setNewTask('');
              setCurrentTask(null);
            }}
          />
        )}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => editTask(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
