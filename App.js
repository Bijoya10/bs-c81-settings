import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator";

export default class App extends React.Component {
  render(){ 
    return (
      <AppContainer/>
  );}
}

const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppDrawerNavigator:{screen:AppDrawerNavigator}
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
