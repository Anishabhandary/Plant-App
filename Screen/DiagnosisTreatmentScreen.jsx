import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import getTreatmentRecommendation from '../services/treatmentService';
import { useTranslation } from 'react-i18next';

const DiagnosisTreatmentScreen = ({ route }) => {
  const { imageUri, prediction, confidence, selectedPlant } = route.params;
  const [treatmentRecommendations, setTreatmentRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handleGetTreatmentRecommendation = async () => {
    setIsLoading(true);
    try {
      const { treatment, duration } = await getTreatmentRecommendation(selectedPlant, prediction, language);
      setTreatmentRecommendations({ treatment, duration });
    } catch (error) {
      Alert.alert('Error', t('failedToGetTreatmentRecommendation'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.headerText}>{t('diagnosisAndTreatment')}</Text>

      {/* Display the selected image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}

      {/* Display instructions if confidence is less than 80 */}
      {confidence && confidence < 80 ? (
        <>
          <Text style={styles.diseaseFailedText}>{t('diseaseDetectionFailed')}</Text>
          <Text style={styles.instructions}>
            {t('lowConfidenceInstructions')} {/* Instruction text for low confidence */}
          </Text>
        </>
      ) : (
        <>
          {/* Display predicted disease and confidence value if confidence >= 80 */}
          {prediction && <Text style={styles.predictionText}>{t('predictedDisease')}: {t(prediction)}</Text>}
          {confidence && <Text style={styles.predictionText}>{t('confidenceValue')}: {confidence}</Text>}

          {/* Button to fetch treatment recommendation */}
          <TouchableOpacity style={styles.button} onPress={handleGetTreatmentRecommendation} disabled={isLoading}>
            <Text style={styles.buttonText}>{t('getTreatmentRecommendation')}</Text>
          </TouchableOpacity>

          {/* Display treatment recommendations */}
          {isLoading && <Text>Loading...</Text>}
          {treatmentRecommendations && (
            <View>
              <Text style={styles.recommendationHeader}>{t('recommendedTreatments')}:</Text>
              <Text style={styles.durationText}>{t('treatmentDuration')}: {treatmentRecommendations.duration}</Text>
              {treatmentRecommendations.treatment.map((rec, index) => (
                <Text key={index} style={styles.recommendationText}>
                  {index + 1}. {rec}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 40,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 30,
  },
  recommendationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 30,
  },
  durationText: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
    lineHeight: 30,
  },
  recommendationText: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 30,
  },
  diseaseFailedText: {
    fontSize: 23,
    color: '#f44336', // Red color for failure message
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 50,
  },
  instructions: {
    fontSize: 17,
    color: '#555', // Dark grey for readability
    textAlign: 'center',
    lineHeight: 20, // Adds spacing between lines for better clarity
    marginBottom: 20,
    lineHeight: 25,
  },
});

export default DiagnosisTreatmentScreen;
