import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';

const Profile = () => {
  const [name, setName] = useState('Emma Janson');
  const [address, setAddress] = useState('Birkagatan 55A');
  const [floor, setFloor] = useState('3');
  const [apartment, setApartment] = useState('1201');
  const [email, setEmail] = useState('janson.emma@outlook.com');
  const [phone, setPhone] = useState('0735252688');
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleEditPress = () => {
    if (editing) {
      // Sparar ändringar
      setEditing(false);
    } else {
      // Aktiverar ändringsläget
      setEditing(true);
    }
  };

  const handleSavePress = () => {
    // Sparar ändringar
    setEditing(false);
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Åtkomst till kamerarullen nekades');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setProfileImage(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        <View style={styles.profileImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <Text style={styles.addImageText}>Lägg till profilbild</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Namn:</Text>
        <Text style={styles.info}>{name}</Text>

        <Text style={styles.label}>Adress:</Text>
        <Text style={styles.info}>{address}</Text>

        <Text style={styles.label}>Våning:</Text>
        <Text style={styles.info}>{floor}</Text>

        <Text style={styles.label}>Lägenhet:</Text>
        <Text style={styles.info}>{apartment}</Text>

        {editing ? (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />

            <Text style={styles.label}>Telefonnummer:</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
          </>
        ) : (
          <>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{email}</Text>

            <Text style={styles.label}>Telefonnummer:</Text>
            <Text style={styles.info}>{phone}</Text>
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {editing ? (
          <Button title="Spara" onPress={handleSavePress} />
        ) : (
          <Button title="Ändra" onPress={handleEditPress} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  addImageText: {
    fontSize: 16,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
});

export default Profile;
