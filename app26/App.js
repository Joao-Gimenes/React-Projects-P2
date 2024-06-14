import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CurrencyConverter = () => {
  const [value, setValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [convertedValue, setConvertedValue] = useState(null);

  const convertCurrency = async () => {
    const url = `https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const rate = data[`${fromCurrency}${toCurrency}`].ask;
      const result = parseFloat(value) * parseFloat(rate);
      setConvertedValue(result.toFixed(2));
    } catch (error) {
      console.error("Erro ao buscar taxa de conversão:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <Text style={styles.label}>De:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Dólar (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
        <Picker.Item label="Bitcoin (BTC)" value="BTC" />
      </Picker>
      <Text style={styles.label}>Para:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Real (BRL)" value="BRL" />
      </Picker>
      <Button title="Converter" onPress={convertCurrency} />
      {convertedValue !== null && (
        <Text style={styles.result}>Valor convertido: {convertedValue}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CurrencyConverter;
