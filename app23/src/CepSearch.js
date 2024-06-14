// src/CepSearch.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CepSearch = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);

  const searchCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      alert('Erro ao buscar o CEP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cep x Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP..."
        value={cep}
        onChangeText={setCep}
      />
      <Button title="Buscar" onPress={searchCep} />
      {address && (
        <View style={styles.result}>
          <Text>Cep: {address.cep}</Text>
          <Text>Logradouro: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
});

export default CepSearch;
