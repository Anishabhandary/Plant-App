// import { StatusBar } from 'expo-status-bar';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';


// export default function App() {
//   return (
//     <View>
//       <Text>Plant App</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#1f992f',
//   },
//   name: {
//     fontSize: 50,
//   },
  
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './Navigations/BottomTabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
