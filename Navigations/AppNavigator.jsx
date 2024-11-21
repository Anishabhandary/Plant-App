import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DiagnosisTreatmentScreen from '../screens/DiagnosisTreatmentScreen';  // Import DiagnosisTreatmentScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DiagnosisTreatment" component={DiagnosisTreatmentScreen} /> {/* Add this line */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
