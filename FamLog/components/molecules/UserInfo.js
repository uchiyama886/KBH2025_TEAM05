import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfo = () => {
  return (
    <View style={styles.userInfoSection}>
      {/* Dummy User Avatar */}
      <View style={styles.avatarPlaceholder} />
      <View>
        <Text style={styles.userName}>太郎</Text>
        <View style={styles.committerBadge}>
          <Text style={styles.committerText}>コミッター</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  committerBadge: {
    backgroundColor: '#b3e0ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  committerText: {
    fontSize: 12,
  },
});

export default UserInfo;