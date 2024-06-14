import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RealToEuro() {
  const [valueInReal, setValueInReal] = useState('');
  const [result, setResult] = useState(null);

  const convertCurrency = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
      const data = await response.json();
      const rate = data.rates.EUR;
      setResult((parseFloat(valueInReal) * rate).toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conversor de Moedas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor em R$"
        keyboardType="numeric"
        value={valueInReal}
        onChangeText={setValueInReal}
      />
      <Button title="Converter" onPress={convertCurrency} />
      {result && <Text style={styles.result}>Resultado: € {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'red'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'blue',
  },
});
