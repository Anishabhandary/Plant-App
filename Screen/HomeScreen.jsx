import React, { useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useImagePicker from '../hooks/useImagePicker';
import sendImageToApi from '../services/apiService';

const HomeScreen = () => {
  const { imageUri, handleSelectImage, handleTakePhoto } = useImagePicker();
  const [selectedPlant, setSelectedPlant] = useState('plant1');
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleSendImage = async () => {
    try {
      const { prediction, confidence } = await sendImageToApi(imageUri, selectedPlant);
      setPrediction(prediction);
      setConfidence(confidence);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Choose Your Plant
      </Text>

      {/* Plant Picker */}
      <Picker
        selectedValue={selectedPlant}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedPlant(itemValue)}
      >
        <Picker.Item label="Plant 1" value="plant1" />
        <Picker.Item label="Plant 2" value="plant2" />
        <Picker.Item label="Plant 3" value="plant3" />
      </Picker>

      {/* Image and Buttons */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }}
        />
      )}

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button title="Select from Gallery" onPress={handleSelectImage} />
        <Button title="Take Photo" onPress={handleTakePhoto} />
      </View>

      <Button title="Send Image to API" onPress={handleSendImage} />

      {/* Prediction and Confidence */}
      {prediction && <Text>Prediction: {prediction}</Text>}
      {confidence && <Text>Confidence: {confidence}%</Text>}
    </View>
  );
};

export default HomeScreen;
