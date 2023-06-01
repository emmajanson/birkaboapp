import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Button from './Button';
import { AntDesign } from '@expo/vector-icons';

export default function LoginModal({ visible, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Här skall backend med email och password anropas.
    onLogin();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Logga in</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-post</Text>
            <TextInput
              style={styles.input}
              placeholder="E-post"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Lösenord</Text>
            <TextInput
              style={styles.input}
              placeholder="Lösenord"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Logga in" onPress={handleLogin} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    width: '65%',
    height: 'auto',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    marginTop: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    padding: 8,
  },
  buttonContainer: {
    width: '90%',
    marginTop: 16,
    marginBottom: 16,
  },
});
