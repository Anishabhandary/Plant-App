import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For accessing saved language
import { useTranslation } from 'react-i18next'; // To use translation

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await SecureStore.getItemAsync('userLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage); // Set the saved language to the state
      }
    };
    loadLanguage();
  }, []);

  const handleChangeLanguage = () => {
    navigation.navigate('LanguageSelection'); // Navigate to Language Selection Screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings')}</Text>
      <Text style={styles.languageText}>
        {t('currentLanguage')}: {selectedLanguage ? t(selectedLanguage) : 'Not Set'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleChangeLanguage}>
        <Text style={styles.buttonText}>{t('changeLanguage')}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight:30
  },
  languageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
