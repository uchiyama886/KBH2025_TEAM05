import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// propsからstateとnavigationを受け取る
const Footer = ({ state, navigation }) => {
  const getIconColor = (index) => {
    return state.index === index ? '#FF69B4' : 'gray';
  };

  const getTextColor = (index) => {
    return state.index === index ? '#FF69B4' : 'gray';
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Timeline')}>
        <Ionicons name="home-outline" size={24} color={getIconColor(0)} />
        <Text style={[styles.tabText, { color: getTextColor(0) }]}>タイムライン</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Post')}>
        <Ionicons name="add-circle-outline" size={24} color={getIconColor(1)} />
        <Text style={[styles.tabText, { color: getTextColor(1) }]}>とうこう</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="person-outline" size={24} color={getIconColor(2)} />
        <Text style={[styles.tabText, { color: getTextColor(2) }]}>ダッシュボード</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
  },
});

export default Footer;