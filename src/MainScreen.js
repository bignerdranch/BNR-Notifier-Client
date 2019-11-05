import React from 'react';
import { View } from 'react-native';
import PushPermissionRequester from './PushPermissionRequester';
import MessageList from './MessageList';

export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PushPermissionRequester />
      <MessageList />
    </View>
  );
}
