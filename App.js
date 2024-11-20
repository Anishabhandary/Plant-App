import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Indexx from './app/Indexx';


export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.name}>Hi, I am Anish</Text>
      <StatusBar style="auto" />
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
      <Indexx/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#F7F8B2',
  },
  name: {
    fontSize: 50,
  },
  
});


