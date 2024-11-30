import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

const LanguageSelectionScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Define the list of languages
  const languages = [
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'te', label: 'తెలుగు' },
  ];

  // Load language from SecureStore when component mounts
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await SecureStore.getItemAsync('userLanguage');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        setSelectedLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []); // Run once when the component mounts

  // Change language function
  const changeLanguage = async (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    await SecureStore.setItemAsync('userLanguage', language); // Save language to SecureStore
  };

  // Navigate to Home (or Tabs) after saving the language preference
  const handleSave = () => {
    navigation.navigate('Tabs'); // Navigate to Tabs after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('appLanguage')}</Text>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.languageOption, selectedLanguage === item.code && styles.selectedOption]}
            onPress={() => changeLanguage(item.code)}
          >
            <Text style={styles.languageText}>{item.label}</Text>
            {selectedLanguage === item.code && <Text style={styles.checkMark}>✓</Text>}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{t('save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e6f7e6',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  checkMark: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelectionScreen;
