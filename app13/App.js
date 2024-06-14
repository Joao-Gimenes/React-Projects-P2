// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const products = [
  { id: 1, title: 'Produto 1', image: 'https://via.placeholder.com/150', description: 'Descrição do Produto 1' },
  { id: 2, title: 'Produto 2', image: 'https://via.placeholder.com/150', description: 'Descrição do Produto 2' },
  { id: 3, title: 'Produto 3', image: 'https://via.placeholder.com/150', description: 'Descrição do Produto 3' },
];

function HomeScreen({ navigation }) {
  return (
    <ScrollView horizontal style={styles.container}>
      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text>{product.title}</Text>
          <Button
            title="Ver detalhes"
            onPress={() => navigation.navigate('Details', { product })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

function DetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Image source={{ uri: product.image }} style={styles.detailsImage} />
      <Text style={styles.detailsTitle}>{product.title}</Text>
      <Text style={styles.detailsDescription}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  product: {
    margin: 10,
    width: 150,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  detailsImage: {
    width: 300,
    height: 300,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailsDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anúncios' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
