import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { signOut } = useAuth(); // useAuthからsignOut関数を取得します

  return (
    <View style={styles.header}>
      {/* 左側のログアウトボタン */}
      <TouchableOpacity style={styles.iconButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={28} color="#000" />
      </TouchableOpacity>
      {/* ...中央と右側のコンポーネントはそのまま... */}
      <View style={styles.centerContainer}>
        <Ionicons name="heart" size={24} color="#FF69B4" style={styles.heartIcon} />
        <Text style={styles.titleText}>FamLog</Text>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={28} color="#000" />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF69B4',
  },
});

export default Header;