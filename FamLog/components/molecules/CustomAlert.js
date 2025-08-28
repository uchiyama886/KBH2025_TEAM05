import React from 'react'; // Reactもインポートされていることを確認
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.overlay}>
        <View style={style.container}>
          <Text style={style.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={style.okButton}>
            <Text style={style.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomAlert;