import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#505B59',
    borderRadius: 6,
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default button;
