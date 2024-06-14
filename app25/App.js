import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://sujeitoprogramador.com/r-api/?api=filmes')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {selectedMovie ? (
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{selectedMovie.nome} - Sinopse</Text>
          <Text style={styles.synopsis}>{selectedMovie.sinopse}</Text>
          <TouchableOpacity onPress={() => setSelectedMovie(null)} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        movies.map((movie) => (
          <View key={movie.id} style={styles.movieContainer}>
            <Text style={styles.movieTitle}>{movie.nome}</Text>
            <Image source={{ uri: movie.foto }} style={styles.movieImage} />
            <TouchableOpacity onPress={() => setSelectedMovie(movie)} style={styles.button}>
              <Text style={styles.buttonText}>Leia mais</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  movieContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  synopsis: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
