import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Card,
  UserImg,
  UserInfo,
  UserNames,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionContainer,
  Interaction,
  InteractionText,
  Divider,
} from "../styled/FeedStyle";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../Storage/context";
import moment from "moment";

import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const PostCard = ({ item, onDelete, onPress }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const likedIcon = item.liked ? "heart" : "heart-outline";
  const likedIconColor = item.liked ? "#2e64e5" : "#333";
  let likeText;
  let commentText;

  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  if (item.comments == 1) {
    commentText = "1 Comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " Comments";
  } else {
    commentText = "Comment";
  }

  const getUser = async () => {
    const docRef = doc(collection(db, "user"), item.userid);
    const documentSnapshot = await getDoc(docRef);
    try {
      if (documentSnapshot.exists()) {
        console.log("User data");
        setUserData(documentSnapshot.data());
      } else {
        console.log("No doc");
      }
    } catch (error) {
      console.log("There's error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card>
      <UserInfo>
        <Image
          source={{
            uri: userData
              ? userData.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
          style={styles.image}
        />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserNames>
              {userData ? userData.fname : "Update your profile"}{" "}
              {userData ? userData.lname : ""}
            </UserNames>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? (
        <Image source={{ uri: item.postImg }} style={styles.postImg} />
      ) : (
        <Divider />
      )}
      <InteractionContainer>
        <Interaction active={item.liked}>
          <Ionicons name={likedIcon} size={25} color={likedIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid === item.userid ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionContainer>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postImg: {
    width: "100%",
    height: 250,
  },
});

export default PostCard;
