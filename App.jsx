import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageSelectionScreen from './Screen/LanguageSelectionScreen'; // Language selection screen
import BottomTabNavigator from './Navigations/BottomTabNavigator'; // Bottom tab navigation
import DiagnosisTreatmentScreen from './Screen/DiagnosisTreatmentScreen'; // Disease and treatment screen
import * as SecureStore from 'expo-secure-store'; // For checking the saved language
import './i18n'; // Import i18n configuration

const Stack = createStackNavigator();

const App = () => {
  const [isLanguageSet, setIsLanguageSet] = useState(false);

  console.log("isLanguageSet : ",isLanguageSet)
  useEffect(() => {
    const checkLanguagePreference = async () => {
      const savedLanguage = await SecureStore.getItemAsync('userLanguage');
      if (savedLanguage) {
        setIsLanguageSet(true); // Language is set, navigate to the main app (Tabs)
      } else {
        setIsLanguageSet(false); // Language is not set, show the language selection screen
      }
    };
    checkLanguagePreference();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLanguageSet ? 'Tabs' : 'LanguageSelection'}
      >
        {/* Language Selection Screen should be available, but only shown if language is not set */}
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
          options={{ headerShown: true, headerTitle: "PlantDoctor" }}
        />
        
        {/* Bottom Tab Navigator, shown once the language is set */}
        <Stack.Screen
          name="Tabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }} // Hide header for bottom tab navigator
        />

        {/* Diagnosis & Treatment Screen */}
        <Stack.Screen
          name="DiagnosisTreatment"
          component={DiagnosisTreatmentScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
