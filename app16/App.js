import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabBar = () => {
  const [selectedTab, setSelectedTab] = React.useState('Pessoal');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Pessoal' && styles.selectedTab]}
        onPress={() => handleTabPress('Pessoal')}
      >
        <Text style={styles.tabText}>Pessoal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Formação' && styles.selectedTab]}
        onPress={() => handleTabPress('Formação')}
      >
        <Text style={styles.tabText}>Formação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Experiência' && styles.selectedTab]}
        onPress={() => handleTabPress('Experiência')}
      >
        <Text style={styles.tabText}>Experiência</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedTab: {
    backgroundColor: '#ddd',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TabBar;