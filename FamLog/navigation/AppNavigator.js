// アプリのメインナビゲーター
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 画面コンポーネントをインポート
import TimelinePage from '../screens/Main/TimelinePage';
import PostPage from '../screens/Main/PostPage';
import DashboardPage from '../screens/Main/DashboardPage';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="タイムライン" // アプリ起動時に表示される初期画面
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato', // 選択中のタブの色
        tabBarInactiveTintColor: 'gray',  // 非選択のタブの色
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingBottom: 5, height: 60 },
      }}
    >
      <Tab.Screen name="タイムライン" component={TimelinePage} />
      <Tab.Screen name="投稿" component={PostPage} />
      <Tab.Screen name="ダッシュボード" component={DashboardPage} />
    </Tab.Navigator>
  );
}