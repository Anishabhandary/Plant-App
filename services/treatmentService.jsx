const getTreatmentRecommendation = async (selectedPlant, predictedDisease, selctedLanguage) => {
    // Dynamically constructing the URL using the selected plant and predicted disease
    const apiUrl = `https://plantapi-rven.onrender.com/treatment/${selectedPlant}/${predictedDisease}?lang=${selctedLanguage}`;
    // const apiUrl = `http://localhost:5000/treatment/${selectedPlant}/${predictedDisease}?lang=${selctedLanguage}`;
    console.log(apiUrl)
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch treatment recommendations.');
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('Parsed Data:', data);

      return {
        treatment: data.treatment,  // An array of treatment steps
        duration: data.duration      // Duration of treatment
      };
    } catch (error) {
      throw new Error('Error fetching treatment recommendations: ' + error.message);
    }
  };
  
  export default getTreatmentRecommendation;
  