// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CepSearch from './src/CepSearch';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CepSearch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
