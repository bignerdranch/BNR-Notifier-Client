import React, { useState } from 'react';
import { View } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Button, Input } from 'react-native-elements';

const askForPushPermission = setToken => async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  console.log('push notification status ', finalStatus);
  if (finalStatus !== 'granted') {
    setToken(`(token ${finalStatus})`);
  }

  let token = await Notifications.getExpoPushTokenAsync();
  setToken(token);
};

export default function PushPermissionRequester() {
  const [token, setToken] = useState('(token not requested yet)');

  return (
    <View>
      <Input value={token} />
      <Button
        title="Ask Me for Push Permissions"
        onPress={askForPushPermission(setToken)}
      />
    </View>
  );
}
