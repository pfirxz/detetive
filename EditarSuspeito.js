import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarSuspeito = ({ route, navigation }) => {
  const { suspeito } = route.params;
  const [nome, setNome] = useState(suspeito.nome);
  const [idade, setIdade] = useState(suspeito.idade.toString());
  const [altura, setAltura] = useState(suspeito.altura.toString());
  const [genero, setGenero] = useState(suspeito.genero);

  const editarSuspeito = async () => {
    if (!nome || !idade || !altura || !genero) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const suspeitoEditado = { nome, idade, altura, genero };

    try {
      const suspeitosAntigos = await AsyncStorage.getItem('suspeitos');
      const suspeitos = suspeitosAntigos ? JSON.parse(suspeitosAntigos) : [];
      const index = suspeitos.findIndex((s) => s.nome === suspeito.nome);
      suspeitos[index] = suspeitoEditado;
      await AsyncStorage.setItem('suspeitos', JSON.stringify(suspeitos));
      Alert.alert('Sucesso', 'Suspeito editado com sucesso!');
      navigation.navigate('ListagemSuspeitos');
    } catch (error) {
      console.error('Erro ao editar suspeito:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Suspeito</Text>
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
        onChangeText={(text) => setIdade(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={altura}
        onChangeText={(text) => setAltura(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={(text) => setGenero(text)}
      />
      <Button title="Editar Suspeito" onPress={editarSuspeito} />
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

export default EditarSuspeito;

