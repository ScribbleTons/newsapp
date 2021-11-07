/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, ToastAndroid } from "react-native";
import { Appbar, Switch, useTheme} from "react-native-paper";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import NewsScreen from "../screens/NewsScreen";
import AboutMeScreen from "../screens/AboutMeScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import RegisterScreen from "./../screens/RegisterScreen";
import LoginScreen from "./../screens/LoginScreen";
import { toggleTheme } from "./../features/colorScheme/colorSchemSlice";
import { useAppDispatch, useAppSelector } from "./../hooks/useReduxHooks";
import {logOut, setUser} from '../features/auth/authSlice'

export default function Navigation({ theme }: { theme: any }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
 
 
function RootNavigator() {
const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  return (
    <Stack.Navigator
	initialRouteName={isAuthenticated?"Root":"Login"}
      screenOptions={{
        header: ({ navigation, back, title }) => (
          <CustomNavigationBar navigation={navigation} back={back} title={title} />
        ),
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
	  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="Root" component={BottomTabNavigator}  />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

interface CustomNavigationBarProps {
  navigation: any;
  back: any;
}

function CustomNavigationBar({ navigation, back, title }: CustomNavigationBarProps) {
  const dispatch = useAppDispatch();
 const isThemeDark = useAppSelector((state) => state.theme.isThemeDark);
  const {colors}= useTheme();
  const toggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Appbar.Header style={{backgroundColor:isThemeDark?colors.background : colors.tint}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} color={colors.accent} /> : null}
      <Appbar.Content title={"Newsbull"|| title} titleStyle={{color: colors.accent}} />
      <Switch
        color={"red"}
        value={isThemeDark}
        onValueChange={toggle}
      />
    </Appbar.Header>
  );
}
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({navigation}) {
  const {colors} = useTheme();
 const email = useAppSelector((state) => state.user.user.email);
 const dispatch = useAppDispatch();
 
 const callLogout = () => {
	logOut(email).then((res)=>{
		if(res) {
			setUser({password: "", email:""});
			navigation.navigate("Register");
			return;
		}
		ToastAndroid.show("Unable to logout. Try again later", ToastAndroid.SHORT)
	
	}).catch(console.error);
 }
  return (
    <BottomTab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: colors["tint"] ,
        tabBarStyle: { paddingVertical: 10, paddingBottom: 12, height: 60 },
        tabBarLabelStyle: { marginTop: 3 },
      }}
    >
      <BottomTab.Screen
        name="News"
        component={NewsScreen}
        options={({ navigation }: RootTabScreenProps<"News">) => ({
          title: "News",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={colors.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="About"
        component={AboutMeScreen}
        options={{
          title: "About Me",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
		  headerRight: () => (
            <Pressable
              onPress={callLogout}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="sign-out"
                size={25}
                color={colors.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
