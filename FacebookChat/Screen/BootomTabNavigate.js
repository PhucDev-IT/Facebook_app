import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Story from "./Story/Story.js";
import Infor from "./Infor/Infor.js";
import Home from "./Home/Home.js";
import Chat from "./Chat/Chat.js";
import Banbe from "./Banbe/Banbe.js";
const Tab = createBottomTabNavigator();

const BootomTabNavigate = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Home") {
            iconComponent = (
              <Entypo
                name="home"
                size={focused ? 26 : 20}
                color={focused ? "white" : "#888888"}
              />
            );
          } else if (route.name === "Chat") {
            iconComponent = (
              <FontAwesome5
                name="facebook-messenger"
                size={focused ? 26 : 20}
                color={focused ? "white" : "#888888"}
              />
            );
          } else if (route.name === "Story") {
            iconComponent = (
              <Ionicons
                name="add-circle"
                size={focused ? 30 : 27}
                    color={focused ? "white" : "#888888"}
              />
            );
          } else if (route.name === "Friend") {
            iconComponent = (
              <FontAwesome5
                name="user-friends"
                size={focused ? 26 : 20}
                color={focused ? "white" : "#888888"}
              />
            );
          }else if (route.name === "Infor") {
            iconComponent = (
              <Feather
                name="user"
                size={focused ? 26: 20}
                color={focused ? "white" : "#888888"}
              />
            );
          }
          return iconComponent;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Story"  component={Story} />
      <Tab.Screen name="Friend" component={Banbe} />
      <Tab.Screen name="Infor" component={Infor} />
    </Tab.Navigator>
  );
};
export default BootomTabNavigate;
const styles = StyleSheet.create({});
