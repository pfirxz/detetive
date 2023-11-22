import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const initialRegion = {
    latitude: -14.235004,
    longitude: -51.92528,
    latitudeDelta: 15,
    longitudeDelta: 15,
  };

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');

  const isMarkerOverlapping = (newCoordinate) => {
    return markers.some((marker) => {
      const { latitude, longitude } = marker.coordinate;
      const latDiff = Math.abs(newCoordinate.latitude - latitude);
      const lonDiff = Math.abs(newCoordinate.longitude - longitude);
      return latDiff < 0.0005 && lonDiff < 0.0005; // Ajuste os valores conforme necessário
    });
  };

  const handleMapPress = (event) => {
    const newCoordinate = event.nativeEvent.coordinate;

    if (!isMarkerOverlapping(newCoordinate)) {
      const newMarker = {
        id: Date.now().toString(),
        coordinate: newCoordinate,
        title: `Marker ${markers.length + 1}`,
        note: '',
      };

      setMarkers([...markers, newMarker]);
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setNoteText(marker.note);
    setModalVisible(true);
  };

  const handleMarkerLongPress = (marker) => {
    const updatedMarkers = markers.filter((m) => m.id !== marker.id);
    setMarkers(updatedMarkers);
  };

  const handleModalSave = () => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.id === selectedMarker.id) {
        return { ...marker, note: noteText };
      }
      return marker;
    });

    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalDelete = () => {
    const updatedMarkers = markers.filter((marker) => marker.id !== selectedMarker.id);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              onPress={() => handleMarkerPress(marker)}
              onLongPress={() => handleMarkerLongPress(marker)}
            >
              <View style={styles.customCallout}>
                <Text>{marker.note}</Text>
              </View>
            </Marker>
          ))}
        </MapView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <Text>Edit Note:</Text>
            <TextInput
              style={styles.noteInput}
              multiline
              value={noteText}
              onChangeText={setNoteText}
            />
            <View style={styles.buttonContainer}>
              <Button title="Delete" onPress={handleModalDelete} />
              <Button title="Save" onPress={handleModalSave} />
              <Button title="Close" onPress={handleModalClose} />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  customCallout: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noteInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default MapScreen;
