<<<<<<< HEAD
import { COLORS } from "../constants/theme";
=======
import {COLORS, SIZES} from "../constants/theme";
>>>>>>> origin/main
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

const NavigationMenu = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleActiveTab = (TabName) => {
        setActiveTab(TabName)
<<<<<<< HEAD
    }
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleActiveTab('home')} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'home' ? COLORS.background : '#ececec', borderRadius: 20 }}>
                <Ionicons name="home" size={24} color={activeTab === 'home' ? COLORS.primary : '#9e9e9e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActiveTab('search')} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'search' ? COLORS.background : '#ececec', borderRadius: 20 }}>
                <Ionicons name="search" size={24} color={activeTab === 'search' ? COLORS.primary : '#9e9e9e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActiveTab('ticket')} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'ticket' ? COLORS.background : '#ececec', borderRadius: 20 }}>
                <Ionicons name="ticket" size={24} color={activeTab === 'ticket' ? COLORS.primary : '#9e9e9e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActiveTab('person')} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'person' ? COLORS.background : '#ececec', borderRadius: 20 }}>
                <Ionicons name="person" size={24} color={activeTab === 'person' ? COLORS.primary : '#9e9e9e'} />
=======
    }   
    return(
        <View style = {styles.menuContainer}>
            <TouchableOpacity onPress = {() => handleActiveTab('home')} style = {[styles.touchableStyles,{backgroundColor: activeTab === 'home' ? COLORS.secondary : COLORS.background,}]}>
                <Ionicons name = "home" size = {SIZES.MenuIconSize} color = {activeTab === 'home' ? COLORS.primaryDark : COLORS.secondary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('search')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'search' ? COLORS.secondary : COLORS.background}]}>
                <Ionicons name = "search" size = {SIZES.MenuIconSize} color = {activeTab === 'search' ? COLORS.primaryDark : COLORS.secondary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('ticket')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'ticket' ? COLORS.secondary : COLORS.background}]}>
                <Ionicons name = "ticket" size = {SIZES.MenuIconSize} color = {activeTab === 'ticket' ? COLORS.primaryDark : COLORS.secondary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('person')} style = {[styles.touchableStyles, {backgroundColor: activeTab === 'person' ? COLORS.secondary : COLORS.background}]}>
                <Ionicons name = "person" size = {SIZES.MenuIconSize} color = {activeTab === 'person' ? COLORS.primaryDark : COLORS.secondary}/>
>>>>>>> origin/main
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
        backgroundColor: COLORS.background,
        borderTopColor: COLORS.secondary,
        borderWidth: 0.5,
    },
    touchableStyles: {
        padding: 12,
        backgroundColor: COLORS.background,
        borderRadius: 14,
    },
})
export default NavigationMenu;