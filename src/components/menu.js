import {COLORS, SIZES} from "../constants/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

const NavigationMenu = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleActiveTab = (TabName) => {
        setActiveTab(TabName)
    }   
    return(
        <View style = {styles.menuContainer}>
            <TouchableOpacity onPress = {() => handleActiveTab('home')} style = {[styles.touchableStyles,{backgroundColor: activeTab === 'home' ? COLORS.borders : '#ececec',}]}>
                <Ionicons name = "home" size = {SIZES.MenuIconSize} color = {activeTab === 'home' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('search')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'search' ? COLORS.borders : '#ececec'}]}>
                <Ionicons name = "search" size = {SIZES.MenuIconSize} color = {activeTab === 'search' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('ticket')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'ticket' ? COLORS.borders : '#ececec'}]}>
                <Ionicons name = "ticket" size = {SIZES.MenuIconSize} color = {activeTab === 'ticket' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('person')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'person' ? COLORS.borders : '#ececec'}]}>
                <Ionicons name = "person" size = {SIZES.MenuIconSize} color = {activeTab === 'person' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "space-around",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ececec"
    },
    touchableStyles: {
        padding: 12,
        backgroundColor: COLORS.background,
        borderRadius: 14,
    },
})
export default NavigationMenu;