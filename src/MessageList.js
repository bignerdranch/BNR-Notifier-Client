import React, { useState, useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

const httpUrl = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
});

const loadInitialData = async setMessages => {
  const messages = await axios.get(`${httpUrl}/list`);
  setMessages(messages.data);
};

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadInitialData(setMessages);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ListItem title={item.text} bottomDivider />}
      />
    </View>
  );
}
