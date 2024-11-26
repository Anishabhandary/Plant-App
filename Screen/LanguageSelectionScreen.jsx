import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSelectionScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log(i18n.language);
    navigation.navigate('Tabs'); // Navigate to Tabs after language selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('choosePlant')}</Text>
      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="हिन्दी" onPress={() => changeLanguage('hi')} />
      <Button title="ಕನ್ನಡ" onPress={() => changeLanguage('kn')} />
      <Button title="മലയാളം" onPress={() => changeLanguage('ml')} />
      <Button title="తెలుగు" onPress={() => changeLanguage('te')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LanguageSelectionScreen;
