import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

const App = () => {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [moeda, setMoeda] = useState('Dolar');

  const converter = () => {
    let valorConvertido = 0;

    if (moeda === 'Dolar') {
      valorConvertido = valor * 0.19;
    } else if (moeda === 'Euro') {
      valorConvertido = valor * 0.17;
    } else if (moeda === 'Bitcoin') {
      valorConvertido = valor * 0.000036;
    }

    setResultado(valorConvertido.toFixed(2));
  };

  const handleMoedaChange = (novaMoeda) => {
    setMoeda(novaMoeda);
    setResultado('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor em R$"
        keyboardType="numeric"
        value={valor}
        onChangeText={(text) => setValor(text)}
      />
      <Button title="Converter" onPress={converter} />
      <Text style={styles.result}>Resultado: {resultado}</Text>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={[styles.menuButton, moeda === 'Dolar' && styles.selectedButton]}
          onPress={() => handleMoedaChange('Dolar')}
        >
          <Text style={styles.buttonText}>Dólar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, moeda === 'Euro' && styles.selectedButton]}
          onPress={() => handleMoedaChange('Euro')}
        >
          <Text style={styles.buttonText}>Euro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, moeda === 'Bitcoin' && styles.selectedButton]}
          onPress={() => handleMoedaChange('Bitcoin')}
        >
          <Text style={styles.buttonText}>Bitcoin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  result: {
    fontSize: 18,
    marginBottom: 20,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  menuButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#000',
  },
});

export default App;