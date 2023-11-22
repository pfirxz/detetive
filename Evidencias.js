import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Evidencias = ({ navigation }) => {
  const [evidencias, setEvidencias] = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [informacao, setInformacao] = useState('');
  const [senha, setSenha] = useState('123');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mostrarConteudo, setMostrarConteudo] = useState(false);

  const handleDataChange = (text) => {
    if (/^\d{0,2}(\/\d{0,2}(\/\d{0,4})?)?$/.test(text)) {
      setData(text);
    }
  };

  const handleHoraChange = (text) => {
    if (/^\d{0,2}(:\d{0,2})?$/.test(text) || /^\d{0,4}$/.test(text)) {
      if (/^\d{2}$/.test(text)) {
        setHora(text + ':');
      } else if (/^\d{2}:\d{2}$/.test(text)) {
        setHora(text);
      } else if (/^\d{4}$/.test(text)) {
        setHora(text.substring(0, 2) + ':' + text.substring(2));
      } else {
        setHora(text);
      }
    }
  };

  const handleInformacaoChange = (text) => {
    setInformacao(text);
  };

  const carregarEvidencias = async () => {
    try {
      const evidenciasArmazenadas = await AsyncStorage.getItem('evidencias');
      if (evidenciasArmazenadas) {
        setEvidencias(JSON.parse(evidenciasArmazenadas));
      }
    } catch (error) {
      console.error('Erro ao carregar evidências:', error);
    }
  };

  useEffect(() => {
    carregarEvidencias();
  }, []);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) {
      return data;
    }
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (hora) => {
    const horaObj = new Date(`2000-01-01T${hora}`);
    if (isNaN(horaObj.getTime())) {
      return hora;
    }
    const horas = horaObj.getHours().toString().padStart(2, '0');
    const minutos = horaObj.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const cadastrarEvidencia = async () => {
    const novaEvidencia = { data, hora, informacao, senha };

    try {
      const evidenciasAntigas = await AsyncStorage.getItem('evidencias');
      const evidencias = evidenciasAntigas ? JSON.parse(evidenciasAntigas) : [];
      evidencias.push(novaEvidencia);
      await AsyncStorage.setItem('evidencias', JSON.stringify(evidencias));
      setEvidencias(evidencias);
      Alert.alert('Sucesso', 'Evidência cadastrada com sucesso!');
      setData('');
      setHora('');
      setInformacao('');
      setMostrarConteudo(false);
      Keyboard.dismiss();
    } catch (error) {
      console.error('Erro ao salvar evidência:', error);
    }
  };

  const editarEvidencia = (evidencia) => {
    setData(evidencia.data);
    setHora(evidencia.hora);
    setInformacao(evidencia.informacao);
  };

  const excluirEvidencia = async (evidencia) => {
    try {
      const evidenciasAtuais = evidencias.filter((e) => e !== evidencia);
      setEvidencias(evidenciasAtuais);
      await AsyncStorage.setItem('evidencias', JSON.stringify(evidenciasAtuais));
      Alert.alert('Sucesso', 'Evidência excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir evidência:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            value={data}
            onChangeText={handleDataChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Hora (HH:MM)"
            value={hora}
            onChangeText={handleHoraChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Informação"
            value={informacao}
            onChangeText={handleInformacaoChange}
          />
          <Button title="Cadastrar Evidência" onPress={cadastrarEvidencia} />
        </View>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Evidências</Text>
        </View>
        <View style={styles.evidencias}>
          {evidencias.map((evidencia, index) => (
            <Card
              key={index}
              data={formatarData(evidencia.data)}
              hora={formatarHora(evidencia.hora)}
              informacao={evidencia.informacao}
              senha={evidencia.senha}
              mostrarConteudo={mostrarConteudo}
              onSenhaChange={(text) => setSenhaDigitada(text)}
              onVerificarSenha={() => setMostrarConteudo(senhaDigitada === senha)}
              onEdit={() => editarEvidencia(evidencia)}
              onDelete={() => excluirEvidencia(evidencia)}
            />
          ))}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const Card = ({
  data,
  hora,
  informacao,
  senha,
  mostrarConteudo,
  onSenhaChange,
  onVerificarSenha,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      {!mostrarConteudo ? (
        <View>
          <Text>Insira a senha para visualizar o conteúdo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={onSenhaChange}
          />
          <Button title="Verificar Senha" onPress={onVerificarSenha} />
        </View>
      ) : (
        <View>
          <View style={styles.data}>
            <Text style={styles.dataLabel}>Data:</Text>
            <Text style={styles.dataValue}>{data}</Text>
          </View>
          <View style={styles.hora}>
            <Text style={styles.horaLabel}>Hora:</Text>
            <Text style={styles.horaValue}>{hora}</Text>
          </View>
          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>Informação:</Text>
            <Text style={styles.informacaoValue}>{informacao}</Text>
          </View>
          <View style={styles.acoes}>
            <Button title="Editar" onPress={onEdit} />
            <Button title="Excluir" onPress={onDelete} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tituloContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  evidencias: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  data: {
    flexDirection: 'row',
  },
  dataLabel: {
    fontSize: 16,
  },
  dataValue: {
    fontSize: 16,
    marginLeft: 5,
  },
  hora: {
    flexDirection: 'row',
  },
  horaLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
  horaValue: {
    fontSize: 16,
    marginLeft: 5,
  },
  informacao: {
    flexDirection: 'row',
  },
  informacaoLabel: {
    fontSize: 16,
  },
  informacaoValue: {
    fontSize: 16,
    width: '100%',
    marginLeft: 5,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default Evidencias;
