import React from "react";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-contents: center;
  background-color: #fff;
  padding: 20px;
  justify-contents: center;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: 100%;
  margin-bottom: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
`;

export const UserNames = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: Roboto;
`;

export const PostTime = styled.Text`
  font-size: 14px;
  font-family: Roboto;
`;

export const UserInfoText = styled.View`
  justify-content: center;
  margin-left: 10px;
`;

export const PostText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  font-family: Roboto;
  padding: 10px;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  margin-vertical: 15px;
`;

export const InteractionContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-contents: center;
  padding-bottom: 15px;
`;
export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  padding: 2px 5px;
  background-color: "transparent";
`;
export const InteractionText = styled.Text`
  font-size: 12px;
  font-family: Roboto;
  font-weight: bold;
  color: ${(props) => (props.active ? "#2e64e5" : "#333")};
  margin-left: 5px;
  margin-top: 5px;
`;

export const Divider = styled.View`
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  width: 92%;
  align-self: center;
  margin-vertical: 15px;
`;
