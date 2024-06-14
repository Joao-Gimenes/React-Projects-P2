import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Pessoal');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => handleTabPress('Pessoal')} style={[styles.tab, selectedTab === 'Pessoal' && styles.selectedTab]}>
          <Text style={styles.tabText}>Pessoal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Formação')} style={[styles.tab, selectedTab === 'Formação' && styles.selectedTab]}>
          <Text style={styles.tabText}>Formação</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Experiência')} style={[styles.tab, selectedTab === 'Experiência' && styles.selectedTab]}>
          <Text style={styles.tabText}>Experiência</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Display content based on selected tab */}
        {selectedTab === 'Pessoal' && (
          <View>
            <Text style={styles.contentText}>Conteúdo Pessoal</Text>
          </View>
        )}
        {selectedTab === 'Formação' && (
          <View>
            <Text style={styles.contentText}>Conteúdo Formação</Text>
          </View>
        )}
        {selectedTab === 'Experiência' && (
          <View>
            <Text style={styles.contentText}>Conteúdo Experiência</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedTab: {
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;