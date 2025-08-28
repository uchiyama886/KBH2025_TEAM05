import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Footer from '../components/organisms/Footer';

// 画面コンポーネントをインポート
import TimelinePage from '../screens/Main/TimelinePage';
import PostPage from '../screens/Main/PostPage';
import DashboardPage from '../screens/Main/DashboardPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Footer {...props} />} // ここでカスタムフッターを渡す
    >
      <Tab.Screen name="Timeline" component={TimelinePage} />
      <Tab.Screen name="Post" component={PostPage} />
      <Tab.Screen name="Dashboard" component={DashboardPage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;