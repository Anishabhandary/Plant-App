import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import CommunityScreen from '../Screen/CommunityScreen';
import ProfileViewScreen from '../Screen/ProfileViewScreen';
import SettingsScreen from '../Screen/SettingsScreen';
import { MaterialIcons } from 'react-native-vector-icons'; // Import icons

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // Show header for all screens
        headerTitle: 'PlantDoctor', // Set the title for the header
        tabBarActiveTintColor: 'blue', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileViewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen} // Add the Settings screen as a new tab
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
