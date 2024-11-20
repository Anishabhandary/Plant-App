import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Screen/HomeScreen"
import CommunityScreen from "../Screen/CommunityScreen"
import ProfileViewScreen from '../Screen/ProfileViewScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileViewScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
