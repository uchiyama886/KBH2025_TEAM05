import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';


import TimelinePage from '../screens/Main/TimelinePage';
import PostPage from '../screens/Main/PostPage';
import DashboardPage from '../screens/Main/DashboardPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      tabBar={props => <Footer {...props} />}
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