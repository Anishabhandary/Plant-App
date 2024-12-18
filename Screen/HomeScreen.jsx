import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import useImagePicker from '../hooks/useImagePicker';
import sendImageToApi from '../services/apiService';
import { useTranslation } from 'react-i18next'; // Import i18next hook

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Access translation function
  const { imageUri, handleSelectImage, handleTakePhoto } = useImagePicker();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSendImage = async () => {
    if (!imageUri || !selectedPlant) {
      Alert.alert('Error', t('InvalidPlantSelected'));
      return;
    }
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerText}>{t('choosePlant')}</Text> 
      
      {/* Plant Icons Section */}
      <View style={styles.plantSelector}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('tomato')}>
          <Image source={require('../assets/Images/Tomato.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>{t('tomato')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('potato')}>
          <Image source={require('../assets/Images/Potato.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>{t('potato')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePlantSelect('corn')}>
          <Image source={require('../assets/Images/Corn.png')} style={styles.plantIcon} />
          <Text style={styles.plantLabel}>{t('corn')}</Text>
        </TouchableOpacity>
      </View>

      {/* Display selected plant */}
      {selectedPlant && <Text style={styles.selectedText}>{t('selectedPlant')}: {t(selectedPlant)}</Text>} 

      {/* Image and Buttons */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>{t('selectFromGallery')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>{t('takePhoto')}</Text> 
        </TouchableOpacity>
      </View>

      {/* Loader & Send Image Button */}
      <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={handleSendImage} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('sendImageToApi')}</Text>
        )}
      </TouchableOpacity>

      {/* Prediction and Confidence */}
      {/* {prediction && <Text>{t('prediction')}: {prediction}</Text>} */}
      {/* {confidence && <Text>{t('confidence')}: {confidence}%</Text>} */}

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
    lineHeight: 50, // Adjust based on your font size
    paddingBottom: 5, 
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
    lineHeight:35
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight:30
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
  disabledButton: {
    backgroundColor: '#A9A9A9', // Grey color for disabled state
  }
});

export default HomeScreen;
