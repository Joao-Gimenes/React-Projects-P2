// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isDayMode, setIsDayMode] = useState(true);
  const [isSmallFont, setIsSmallFont] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const dayMode = await AsyncStorage.getItem('isDayMode');
        const smallFont = await AsyncStorage.getItem('isSmallFont');
        if (dayMode !== null) setIsDayMode(dayMode === 'true');
        if (smallFont !== null) setIsSmallFont(smallFont === 'true');
      } catch (error) {
        console.error('Failed to load preferences.', error);
      }
    };

    loadPreferences();
  }, []);

  const toggleDayMode = async () => {
    try {
      await AsyncStorage.setItem('isDayMode', (!isDayMode).toString());
      setIsDayMode(!isDayMode);
    } catch (error) {
      console.error('Failed to save day mode preference.', error);
    }
  };

  const toggleFontSize = async () => {
    try {
      await AsyncStorage.setItem('isSmallFont', (!isSmallFont).toString());
      setIsSmallFont(!isSmallFont);
    } catch (error) {
      console.error('Failed to save font size preference.', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDayMode ? '#fff' : '#333' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Frases</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Dia</Text>
          <Switch value={isDayMode} onValueChange={toggleDayMode} />
          <Text style={styles.switchLabel}>Pequeno</Text>
          <Switch value={isSmallFont} onValueChange={toggleFontSize} />
        </View>
      </View>
      <View style={styles.phraseContainer}>
        <Text style={[styles.phrase, { fontSize: isSmallFont ? 16 : 24, color: isDayMode ? '#000' : '#fff' }]}>
          "A vingança nunca é plena, mata a alma e envenena (Seu Madruga)"
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginHorizontal: 8,
  },
  phraseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  phrase: {
    textAlign: 'center',
  },
});

export default App;
