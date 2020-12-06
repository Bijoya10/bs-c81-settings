import * as React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import BookDonateScreen from "../screens/BookDonateScreen";
import BookRequestScreen from "../screens/BookRequestScreen";

export const AppTabNavigator=createBottomTabNavigator({
    Donate:{screen:BookDonateScreen},
    Request:{screen:BookRequestScreen}
})