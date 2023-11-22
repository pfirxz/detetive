import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecorderScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  const startRecording = () => {
    // Lógica para iniciar a gravação
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Lógica para parar a gravação
    setIsRecording(false);
    // Salvar a gravação na lista de gravações
    setRecordings((prevRecordings) => [
      ...prevRecordings,
      { id: Date.now().toString(), title: `Recording ${prevRecordings.length + 1}` },
    ]);
  };

  const deleteRecording = (id) => {
    // Lógica para excluir a gravação com o ID fornecido
    setRecordings((prevRecordings) => prevRecordings.filter((recording) => recording.id !== id));
  };

  const renderRecording = ({ item }) => (
    <View style={styles.recordingCard}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteRecording(item.id)}>
        <MaterialCommunityIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gravação</Text>
      <Button
        title={isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={renderRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recordingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default RecorderScreen;




