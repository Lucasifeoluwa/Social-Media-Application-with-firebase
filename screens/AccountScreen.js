import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Storage/context";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, doc, getDoc, where } from "firebase/firestore";

import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import PostCard from "../components/PostCard";

function AccountScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const list = [];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogOut = () => {
    signOut(auth);
  };

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users"),
      where("userid", "==", route.params ? route.params.userid : user.uid)
    );
    querySnapshot.forEach((doc) => {
      const { post, postImg, postTime, userid, likes, comments } = doc.data();
      {
        user.uid === userid
          ? list.push({
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
            })
          : null;
      }
    });

    setPosts(list);

    if (loading) {
      setLoading(false);
    }
    /* 
    console.log("Posts: ", list); */
  };

  const getUser = async () => {
    const docRef = doc(
      collection(db, "user"),
      route.params ? route.params.userid : user.uid
    );
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
    fetchPosts();
    setDeleted(false);
    navigation.addListener("focus", () => setLoading(!loading));
  }, [deleted, navigation, loading]);

  const handleDelete = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname : "Update your profile"}{" "}
          {userData ? userData.lname : ""}
        </Text>
        {/*  <Text>{route.params ? route.params.userid : user.uid}</Text> */}
        <Text style={styles.aboutUser}>{userData ? userData.about : ""}</Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={handleLogOut}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>22</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>22</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>

        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    top: 35,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default AccountScreen;
