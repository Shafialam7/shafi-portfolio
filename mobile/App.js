// mobile/App.js
import 'react-native-gesture-handler'; // Must be first import
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import ChatScreen from './components/ChatScreen';
import ConversationListScreen from './components/ConversationListScreen';
import {
  registerForPushNotificationsAsync,
  addNotificationListener,
  addNotificationResponseListener,
} from './utils/notifications';
import { setOwnerPushToken } from './utils/api';
import { storeIncomingMessage, getLatestClientId } from './utils/storage';

const Stack = createStackNavigator();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [currentClientId, setCurrentClientId] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Register for push notifications on mount
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
      if (token) {
        await setOwnerPushToken(token);
      }
    })();
  }, []);

  // Listen for incoming notifications (owner side)
  useEffect(() => {
    notificationListener.current = addNotificationListener((notification) => {
      const { title, body } = notification.request.content;
      // Expect title format: "New query from <clientId>"
      const match = title?.match(/New query from (.+)/);
      if (match) {
        const clientId = match[1];
        storeIncomingMessage(clientId, body);
        setCurrentClientId(clientId);
      }
    });

    // Handle notification taps (when user taps the notification)
    responseListener.current = addNotificationResponseListener((response) => {
      const { title } = response.notification.request.content;
      const match = title?.match(/New query from (.+)/);
      if (match) {
        setCurrentClientId(match[1]);
      }
    });

    return () => {
      if (notificationListener.current) notificationListener.current.remove();
      if (responseListener.current) responseListener.current.remove();
    };
  }, []);

  // Load most recent client id on app start
  useEffect(() => {
    (async () => {
      const id = await getLatestClientId();
      if (id) setCurrentClientId(id);
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0a0a1a' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
            cardStyle: { backgroundColor: '#0a0a1a' },
          }}
        >
          <Stack.Screen
            name="Conversations"
            options={{ title: '💬 Shafi AI Chat' }}
          >
            {(props) => (
              <ConversationListScreen
                {...props}
                currentClientId={currentClientId}
                onSelectClient={(id) => {
                  setCurrentClientId(id);
                  props.navigation.navigate('Chat', { clientId: id });
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Chat"
            options={({ route }) => ({
              title: `Chat with ${route.params?.clientId || 'Client'}`,
            })}
          >
            {(props) => (
              <ChatScreen
                {...props}
                clientId={props.route.params?.clientId || currentClientId}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
