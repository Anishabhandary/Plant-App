// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigator from './Navigations/BottomTabNavigator';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <BottomTabNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './Navigations/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import DiagnosisTreatmentScreen from './Screen/DiagnosisTreatmentScreen'; // Ensure it's imported

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={BottomTabNavigator} // Bottom tabs for main screens
          options={{ headerShown: false }} // Hides the header for bottom tab navigation
        />
        <Stack.Screen
          name="DiagnosisTreatment"
          component={DiagnosisTreatmentScreen} // Diagnosis & treatment screen in stack
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

