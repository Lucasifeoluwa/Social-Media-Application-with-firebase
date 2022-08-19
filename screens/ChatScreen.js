import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ChatScreen(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello User",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={38}
            color="#2e64e5"
            style={{ marginBottom: 5, marginRight: 10 }}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <MaterialCommunityIcons
        name="chevron-double-down"
        size={22}
        color="#333"
      />
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreen;
