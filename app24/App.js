import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchGitHubUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil dos Devs</Text>
      <View style={styles.iconContainer}>
        <Icon name="github" size={100} color="#000" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o login git..."
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Buscar" onPress={fetchGitHubUser} />
      {userData && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userData.avatar_url }}
            style={styles.avatar}
          />
          <Text>Id: {userData.id}</Text>
          <Text>Nome: {userData.name}</Text>
          <Text>Repositórios: {userData.public_repos}</Text>
          <Text>Criado em: {new Date(userData.created_at).toLocaleDateString()}</Text>
          <Text>Seguidores: {userData.followers}</Text>
          <Text>Seguindo: {userData.following}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default App;
