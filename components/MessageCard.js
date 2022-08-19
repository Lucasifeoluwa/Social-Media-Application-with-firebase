import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Card,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from "../styled/MessageStyle";

function MessageCard({ item, navigation }) {
  return (
    <Card onPress={navigation.navigate("Chat")}>
      <UserInfo>
        <UserInfo>
          <UserImgWrapper>
            <UserImg source={item.userImg} />
          </UserImgWrapper>
          <TextSection>
            <UserInfoText>
              <UserName>{item.userName}</UserName>
              <PostTime>{item.messageTime}</PostTime>
            </UserInfoText>
            <MessageText>{item.messageText}</MessageText>
          </TextSection>
        </UserInfo>
      </UserInfo>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MessageCard;
