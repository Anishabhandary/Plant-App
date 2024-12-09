import i18n from 'i18next';
import { TOMATO_API_URL, POTATO_API_URL, CORN_API_URL } from '@env';

const sendImageToApi = async (imageUri, selectedPlant) => {
    if (!imageUri) {
      throw new Error('No image selected');
    }
  
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
  
    let apiUrl = '';
  
    // Use a different API URL depending on the selected plant
    switch (selectedPlant) {
      case 'tomato':
        apiUrl = TOMATO_API_URL;
        break;
      case 'potato':
        apiUrl = POTATO_API_URL;
        break;
      case 'corn':
        apiUrl = CORN_API_URL;
        break;
      default:
        throw new Error(i18n.t('InvalidPlantSelected'));
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Network response was not ok: ' + errorData.message);
      }
  
      const data = await response.json();
      return { prediction: data.class, confidence: data.confidence };
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  };
  
  export default sendImageToApi;
  