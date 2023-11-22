import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalhesSuspeito = ({ route }) => {
  const { suspeito } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ url: 'https://i0.wp.com/blog.actbr.org.br/wp-content/uploads/2020/11/Question-mark-face.jpg?resize=980%2C400&ssl=1' }} // Substitua pela URI real da imagem do suspeito
        style={styles.imagemDetalhe}
      />
      <Text style={styles.nome}>{suspeito.nome}</Text>
      <Text>Idade: {suspeito.idade}</Text>
      <Text>Altura: {suspeito.altura}</Text>
      <Text>Gênero: {suspeito.genero}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  imagemDetalhe: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetalhesSuspeito;
