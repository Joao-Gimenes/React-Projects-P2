// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const jobs = [
  { id: 1, title: 'Desenvolvedor Backend', salary: 'R$ 3000,00', description: 'Trabalhar com Node.js', contact: 'backend@empresa.com', image: 'https://via.placeholder.com/300x200.png?text=Backend' },
  { id: 2, title: 'Engenheiro de Dados', salary: 'R$ 4000,00', description: 'Trabalhar com Big Data', contact: 'dados@empresa.com', image: 'https://via.placeholder.com/300x200.png?text=Engenharia+de+Dados' },
  { id: 3, title: 'Desenvolvedor Frontend', salary: 'R$ 3500,00', description: 'Trabalhar com React', contact: 'frontend@empresa.com', image: 'https://via.placeholder.com/300x200.png?text=Frontend' },
];

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {jobs.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Image source={{ uri: job.image }} style={styles.jobImage} />
            <Button
              title="Saiba mais"
              onPress={() => navigation.navigate('Details', { job })}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function DetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>{job.title}</Text>
      <Image source={{ uri: job.image }} style={styles.detailsImage} />
      <Text style={styles.detailsText}>Salário: {job.salary}</Text>
      <Text style={styles.detailsText}>Descrição: {job.description}</Text>
      <Text style={styles.detailsText}>Contato: {job.contact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  detailsImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Vagas' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes da Vaga' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
