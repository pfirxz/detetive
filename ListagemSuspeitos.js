import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ListagemSuspeitos = ({ navigation }) => {
  const [suspeitos, setSuspeitos] = useState([]);
  const [suspeitosFavoritos, setSuspeitosFavoritos] = useState([]);

  const carregarSuspeitos = async () => {
    try {
      const suspeitosArmazenados = await AsyncStorage.getItem('suspeitos');
      if (suspeitosArmazenados) {
        setSuspeitos(JSON.parse(suspeitosArmazenados));
      }
    } catch (error) {
      console.error('Erro ao carregar suspeitos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Quando a tela ganha foco, recarrega os suspeitos
      carregarSuspeitos();
    }, [])
  );

  const detalhesSuspeito = (suspeito) => {
    Alert.alert(
      'Detalhes do Suspeito',
      `Nome: ${suspeito.nome}\nIdade: ${suspeito.idade}\nAltura: ${suspeito.altura}\nGênero: ${suspeito.genero}`
    );
  };

  const editarSuspeito = (suspeito) => {
    navigation.navigate('EditarSuspeito', { suspeito });
  };

  const excluirSuspeito = async (suspeito) => {
    try {
      const suspeitosAtuais = suspeitos.filter((s) => s !== suspeito);
      setSuspeitos(suspeitosAtuais);
      await AsyncStorage.setItem('suspeitos', JSON.stringify(suspeitosAtuais));
      Alert.alert('Sucesso', 'Suspeito excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir suspeito:', error);
    }
  };

  const favoritarSuspeito = (suspeito) => {
    // Lógica para adicionar/remover suspeito da lista de favoritos
    const isFavorito = suspeitosFavoritos.includes(suspeito);
    if (isFavorito) {
      const novosFavoritos = suspeitosFavoritos.filter((fav) => fav !== suspeito);
      setSuspeitosFavoritos(novosFavoritos);
    } else {
      setSuspeitosFavoritos([...suspeitosFavoritos, suspeito]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => detalhesSuspeito(item)}>
      <View style={styles.card}>
        <Image source={{ uri: 'https://i0.wp.com/blog.actbr.org.br/wp-content/uploads/2020/11/Question-mark-face.jpg?resize=980%2C400&ssl=1' }} style={styles.imagem} />
        <View style={styles.informacoes}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>Idade: {item.idade}</Text>
          <Text>Altura: {item.altura}</Text>
          <Text>Gênero: {item.genero}</Text>
        </View>
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoEditar} onPress={() => editarSuspeito(item)}>
            <Text>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirSuspeito(item)}>
            <Text>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoFavoritar} onPress={() => favoritarSuspeito(item)}>
            <MaterialIcons name={suspeitosFavoritos.includes(item) ? 'star' : 'star-border'} size={24} color="yellow" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listagem de Suspeitos</Text>
      <FlatList
        data={suspeitos}
        renderItem={renderItem}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  informacoes: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  botaoEditar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  botaoFavoritar: {
    marginLeft: 'auto', // Move o botão para o final à direita
  },
});

export default ListagemSuspeitos;

