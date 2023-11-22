import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroSuspeito = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [genero, setGenero] = useState('');

  const handleIdadeChange = (text) => {
    if (!isNaN(text)) {
      setIdade(text);
    }
  };

  const handleAlturaChange = (text) => {
    if (!isNaN(text)) {
      setAltura(text);
    }
  };

  const cadastrarSuspeito = async () => {
    if (!nome || !idade || !altura || !genero) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novoSuspeito = { nome, idade, altura, genero };

    try {
      const suspeitosAntigos = await AsyncStorage.getItem('suspeitos');
      const suspeitos = suspeitosAntigos ? JSON.parse(suspeitosAntigos) : [];
      suspeitos.push(novoSuspeito);
      await AsyncStorage.setItem('suspeitos', JSON.stringify(suspeitos));
      Alert.alert('Sucesso', 'Suspeito cadastrado com sucesso!');
      navigation.navigate('ListagemSuspeitos');
    } catch (error) {
      console.error('Erro ao salvar suspeito:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Suspeito</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={handleIdadeChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={altura}
        onChangeText={handleAlturaChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={(text) => setGenero(text)}
      />
      <Button title="Cadastrar Suspeito" onPress={cadastrarSuspeito} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default CadastroSuspeito;







  
      
  




