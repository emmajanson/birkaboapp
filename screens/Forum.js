import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState({});

  const handlePost = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      text: inputText,
      image: selectedImage,
      comments: [],
      authorName: "Emma Janson", // Namnet på författaren
      authorImage: require('../assets/profile-picture.jpg'), // Sökvägen till författarens profilbild
    };

    setPosts([newPost, ...posts]);
    setInputText('');
    setSelectedImage(null);
  };

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleComment = (postId, commentText) => {
    if (commentText.trim() === '') {
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      authorName: "Emma Janson", // Namnet på kommentarförfattaren
      authorImage: require('../assets/profile-picture.jpg'), // Sökvägen till kommentarförfattarens profilbild
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setComments({ ...comments, [postId]: '' });
  };

  const renderComments = (postId) => {
    const postComments =
      posts.find((post) => post.id === postId)?.comments || [];

    return (
      <FlatList
        data={postComments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image
              source={item.authorImage}
              style={styles.profilePicture}
            />
            <Text>{item.authorName}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grannskapsforum</Text>
      <View style={styles.inputContainer}>
        <View style={styles.postInput}>
          <Image
            source={require('../assets/profile-picture.jpg')}
            style={styles.profilePicture}
          />
          <TextInput
            style={styles.input}
            placeholder="Skriv ditt inlägg här..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Lägg till bild" onPress={handleChooseImage} />
          </View>
          <View style={styles.button}>
            <Button title="Publicera inlägg" onPress={handlePost} />
          </View>
        </View>
      </View>

      <FlatList
        style={styles.postContainer}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <View style={styles.postHeader}>
              <Image
                source={item.authorImage}
                style={styles.profilePicture}
              />
              <Text style={styles.postAuthor}>{item.authorName}</Text>
            </View>
            <Text style={styles.postText}>{item.text}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Skriv en kommentar..."
                value={comments[item.id]}
                onChangeText={(text) =>
                  setComments({ ...comments, [item.id]: text })
                }
              />
              <Button
                title="Kommentera"
                onPress={() => handleComment(item.id, comments[item.id])}
              />
            </View>
            {renderComments(item.id)}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
    borderRadius: 8,
  },
  postInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    marginRight: 10,
  },
  selectedImage: {
    width: '20%',
    height: '100%',
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  postContainer: {
    width: '90%',
  },
  postWrapper: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentInput: {
    flex: 1,
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
    fontSize: 12,
  },
  commentContainer: {
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 8,
  },
});

export default Forum;