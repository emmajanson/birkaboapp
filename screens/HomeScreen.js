import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import Button from '../components/Button';
import LoginModal from '../components/LoginModal';

export default function HomeScreen({ navigation }) {
  const HomeBg = require('../assets/home.jpg');
  const BirkaboLogo = require('../assets/BirkaboLogga/whitelogo.png')

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogin = () => {
    toggleModal();
    navigation.navigate('Inloggad');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={HomeBg}
        resizeMode="cover"
        style={styles.background}
        blurRadius={10}
      >
        <View style={styles.overlay} />
        <View style={styles.logoContainer}>
          <Image source={BirkaboLogo} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Logga in" onPress={toggleModal} />
        </View>
      </ImageBackground>
      <LoginModal
        visible={modalVisible}
        onClose={toggleModal}
        onLogin={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 170,
  },
  logo: {
    width: '80%',
    height: '26%',
  },
  buttonContainer: {
    marginHorizontal: 100,
    paddingBottom: 200,
  },
});
