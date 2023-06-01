import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

import { SimpleLineIcons } from '@expo/vector-icons';

export default function LoggedInHome() {
  const HomeBg = require('../assets/home.jpg');
  const BirkaboLogo = require('../assets/BirkaboLogga/whitelogo.png');

  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Logga in');
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

        <View style={styles.iconsContainer}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconAndTitleWrapper}
              onPress={() => navigation.navigate('Boka tvättid')}
            >
            <View style={styles.iconAndTitleWrapper}>
              <View style={styles.icon}>
                <SimpleLineIcons name="calendar" size={30} color="white" />
              </View>
              <Text style={styles.iconTitle}>Boka tvättid</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconAndTitleWrapper}
              onPress={() => navigation.navigate('Forum')}
            >
              <View style={styles.icon}>
                <SimpleLineIcons name="bubble" size={30} color="white" />
              </View>
              <Text style={styles.iconTitle}>Forum</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconAndTitleWrapper}
              onPress={() => navigation.navigate('Felanmälan')}
            >
                <View style={styles.icon}>
                  <SimpleLineIcons name="wrench" size={30} color="white" />
                </View>
                <Text style={styles.iconTitle}>Felanmälan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconAndTitleWrapper}
              onPress={() => navigation.navigate('Profil')}
            >
              <View style={styles.icon}>
                <SimpleLineIcons name="user" size={30} color="white" />
              </View>
              <Text style={styles.iconTitle}>Profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Logga ut" onPress={handleLogout} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  background: {
    flex: 2,
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
    height: '60%',
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 90,
  },
  iconWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    height: '50%',
  },
  icon: {
    backgroundColor: 'rgba(141,138,136,0.4)',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 5,
  },
  buttonContainer: {
    marginHorizontal: 100,
    paddingBottom: 200,
  },
});
