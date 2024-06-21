import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../../src/redux/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? 'home' : 'home-outline'}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='explore'
            options={{
              title: 'Explore',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? 'list-outline' : 'list-outline'}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </PersistGate>
    </ReduxProvider>
  );
}
