import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../services/api';
import {styles} from './styles';
export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data);
    setLoading(false);
  };

  const addTask = async () => {
    if(newTitle && newDescription) {
      const body = JSON.stringify({ title: newTitle, description: newDescription });
      await api.post('/tasks', body, { headers: { 'Content-Type': 'application/json' } });
      setNewTitle('');
      setNewDescription('');
      loadTasks();
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const editTask = async (id) => {
    if(newTitle && newDescription) {
      const body = JSON.stringify({ title: newTitle, description: newDescription });
      await api.put(`/tasks/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
      setNewTitle('');
      setNewDescription('');
      loadTasks();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newTitle}
        onChangeText={(text) => setNewTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newDescription}
        onChangeText={(text) => setNewDescription(text)}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => editTask(item.id)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteTask(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}


