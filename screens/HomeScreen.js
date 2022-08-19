import React, { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";
import {
  collection,
  getDocs,
  doc,
  orderBy,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";

import { Container } from "../styled/FeedStyle";
import PostCard from "../components/PostCard";
import { deleteObject, ref } from "firebase/storage";

function HomeScreen({ navigation }) {
  const list = [];
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users"),
      orderBy("postTime", "desc")
    );
    /* console.log("TotalSnapshots: ", querySnapshot.size); */
    querySnapshot.forEach((doc) => {
      const { post, postImg, postTime, userid, likes, comments } = doc.data();
      list.push({
        id: doc.id,
        userName: "Test name",
        userid,
        userImg: require("../assets/user-7.jpg"),
        postTime: postTime,
        post: "Hey there, this is my test for a post of my social app in React Native.",
        postImg,
        post,
        liked: false,
        likes,
        comments,
      });
    });

    setPosts(list);

    if (loading) {
      setLoading(false);
    }

    console.log("Posts: ", list);
  };

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false }
    );
  };

  const deletePost = async (postId) => {
    console.log("Current Post id: ", postId);
    const docRef = doc(db, "users", postId);
    const docsnap = await getDoc(docRef);

    if (docsnap.exists()) {
      console.log(true);
      const { postImg } = docsnap.data();

      if (postImg !== null) {
        const imgRef = ref(storage, postImg);
        const deleteImg = deleteObject(imgRef);

        try {
          await deleteImg;
          console.log("Photo deleted");
          deleteFirestoreData(postId);
        } catch (error) {
          console.log("Error deleting image", error);
        }
      } else {
        deleteFirestoreData(postId);
      }
    } else {
      deleteFirestoreData(postId);
    }
  };

  const deleteFirestoreData = async (postId) => {
    const deleteRef = deleteDoc(doc(db, "users", postId));
    try {
      await deleteRef;
      setDeleted(true);
      console.log("Document has been deleted");
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onDelete={handleDelete}
            onPress={() =>
              navigation.navigate("HomeProfile", { userid: item.userid })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

export default HomeScreen;
