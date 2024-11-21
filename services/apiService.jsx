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
      case 'Tomato':
        apiUrl = 'https://asia-south1-carbon-aquifer-439615-g0.cloudfunctions.net/predict';
        break;
      case 'Potato':
        apiUrl = 'https://asia-south1-carbon-aquifer-439615-g0.cloudfunctions.net/predict';
        break;
      case 'Corn':
        apiUrl = 'https://asia-south1-carbon-aquifer-439615-g0.cloudfunctions.net/predict';
        break;
      default:
        throw new Error('Invalid plant selected');
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
  