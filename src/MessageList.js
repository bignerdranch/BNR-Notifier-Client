import React, { useState, useEffect } from 'react';
import { FlatList, Linking, Platform, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

const httpUrl = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
});
const wsUrl = Platform.select({
  ios: 'ws://localhost:3000',
  android: 'ws://10.0.2.2:3000',
});

let socket;

const setUpWebSocket = addMessage => {
  if (!socket) {
    socket = new WebSocket(wsUrl);
    console.log('Attempting Connection...');

    socket.onopen = () => {
      console.log('Successfully Connected');
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
      socket = null;
    };

    socket.onerror = error => {
      console.log('Socket Error: ', error);
    };
  }

  socket.onmessage = event => {
    addMessage(JSON.parse(event.data));
  };
};

const loadInitialData = async setMessages => {
  const messages = await axios.get(`${httpUrl}/list`);
  setMessages(messages.data);
};

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadInitialData(setMessages);
  }, []);

  useEffect(() => {
    setUpWebSocket(newMessage => {
      setMessages([newMessage, ...messages]);
    });
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            title={item.text}
            bottomDivider
            onPress={() => item.url && Linking.openURL(item.url)}
          />
        )}
      />
    </View>
  );
}
