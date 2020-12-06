import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import {AppTabNavigator} from "./components/AppTabNavigator";

export default class App extends React.Component {
  render(){ 
    return (
      <AppContainer/>
  );}
}

const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppTabNavigator:{screen:AppTabNavigator}
})

var AppContainer=createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
