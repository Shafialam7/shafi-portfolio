// mobile/utils/notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure how notifications are handled when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Registers the device for push notifications and returns the Expo push token.
 * On Android it also creates a notification channel.
 */
export async function registerForPushNotificationsAsync() {
  let token;

  // Push notifications only work on physical devices
  if (!Device.isDevice) {
    alert('Must use physical device for push notifications');
    return '';
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6c63ff',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Push notification permission not granted!');
    return '';
  }

  // Get the Expo push token
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  token = (await Notifications.getExpoPushTokenAsync({
    projectId,
  })).data;

  return token;
}

/**
 * Listen for incoming notifications while the app is in foreground.
 * Caller provides a callback to handle the notification object.
 */
export function addNotificationListener(callback) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Listen for notification interactions (user tapped the notification).
 */
export function addNotificationResponseListener(callback) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}
