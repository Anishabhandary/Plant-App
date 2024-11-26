import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import useImagePicker from '../hooks/useImagePicker';
import sendImageToApi from '../services/apiService';

const HomeScreen = ({ navigation }) => {
  const { imageUri, handleSelectImage, handleTakePhoto } = useImagePicker();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleSendImage = async () => {
    try {
      const { prediction, confidence } = await sendImageToApi(imageUri, selectedPlant);
      setPrediction(prediction);
      setConfidence(confidence);

      // Navigate to the DiagnosisTreatmentScreen after predicting the disease
      navigation.navigate('DiagnosisTreatment', {
        imageUri: imageUri,
        prediction: prediction,
        confidence: confidence,
        selectedPlant: selectedPlant,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerText}>Choose Your Plant</Text>

      {/* Plant Icons Section */}
      <View style={styles.plantSelector}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('tomato')}>
          <Image source={require('../assets/Images/Tomato.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>Tomato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('potato')}>
          <Image source={require('../assets/Images/Tomato.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>Potato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('corn')}>
          <Image source={require('../assets/Images/Tomato.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>Corn</Text>
        </TouchableOpacity>
      </View>

      {/* Display selected plant */}
      {selectedPlant && <Text style={styles.selectedText}>Selected: {selectedPlant}</Text>}

      {/* Image and Buttons */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendImage}>
        <Text style={styles.buttonText}>Send Image to API</Text>
      </TouchableOpacity>

      {/* Prediction and Confidence */}
      {/* {prediction && <Text>Prediction: {prediction}</Text>}
      {confidence && <Text>Confidence: {confidence}%</Text>} */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plantSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 10, // Added space between icons
  },
  plantIcon: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  plantLabel: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Custom button background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
