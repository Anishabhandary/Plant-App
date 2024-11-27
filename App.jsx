import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageSelectionScreen from './Screen/LanguageSelectionScreen'; // Language selection screen
import BottomTabNavigator from './Navigations/BottomTabNavigator';
import DiagnosisTreatmentScreen from './Screen/DiagnosisTreatmentScreen'; // Disease and treatment screen
import './i18n'; // Import i18n configuration

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguageSelection">
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen} // Language selection screen
          options={{ headerShown: true, headerTitle:"PlantDoctor" }}
        />
        <Stack.Screen
          name="Tabs" // Navigating to BottomTabNavigator instead of Home
          component={BottomTabNavigator} // Bottom tab navigation after language selection
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiagnosisTreatment"
          component={DiagnosisTreatmentScreen} // Diagnosis & Treatment Screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
