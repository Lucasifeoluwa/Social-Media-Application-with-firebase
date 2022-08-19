import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Alert, Platform } from "react-native";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
} from "../styled/AddPost";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import AuthContext from "../Storage/context";

import { storage } from "../config/firebase";
import { db } from "../config/firebase";

function AddPostScreen(props) {
  const [image, setImage] = useState();
  const [posts, setposts] = useState();
  const [uploading, setUploading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permissions");
  };

  const takePictureUsingCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.cancelled) return null;

      const source = { uri: result.uri };
      console.log(source);
      setImage(source);
    } catch (error) {
      console.log("Error reading an Image", error);
    }
  };

  const pickPictureFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.cancelled) return null;

      const source = { uri: result.uri };
      console.log(source);
      setImage(source);
    } catch (error) {
      console.log("Error reading an Image", error);
    }
  };

  const submitPost = async () => {
    if (posts == null) {
      return null;
    }
    const imageUrl = await uploadImage();
    console.log("Image Url: ", imageUrl);

    const docRef = await addDoc(collection(db, "users"), {
      userid: user.uid,
      post: posts,
      postImg: imageUrl,
      postTime: Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    });

    try {
      setposts(null);
      console.log("Post Added");
      return docRef;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }

    setUploading(true);
    const respone = await fetch(image.uri);
    const blob = await respone.blob();
    let fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);

    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    fileName = name + Date.now() + "." + extension;

    const imageRef = ref(storage, `photos/${fileName}`);
    const task = uploadBytes(imageRef, blob).then(() => {
      Alert.alert(
        "Image Uploaded",
        "Your image has been uploaded to the firebase store"
      );
    });
    try {
      await task;
      const url = await getDownloadURL(imageRef);

      setUploading(false);
      setImage(null);

      return url;
    } catch (error) {
      console.log("there was an error", error);
    }
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image ? <AddImage source={{ uri: image.uri }} /> : null}
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberoflines={4}
          value={posts}
          onChangeText={(content) => setposts(content)}
        />
        <SubmitBtn onPress={submitPost}>
          <SubmitBtnText>Post</SubmitBtnText>
        </SubmitBtn>
      </InputWrapper>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePictureUsingCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose photo"
          onPress={pickPictureFromGallery}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default AddPostScreen;
