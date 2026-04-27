import {COLORS} from "../constants/theme";
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
            <TouchableOpacity onPress = {() => handleActiveTab('home')} style = {{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'home' ? COLORS.background : '#ececec', borderRadius: 20}}>
                <Ionicons name = "home" size = {24} color = {activeTab === 'home' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('search')} style = {{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'search' ? COLORS.background : '#ececec', borderRadius: 20}}>
                <Ionicons name = "search" size = {24} color = {activeTab === 'search' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('ticket')} style = {{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'ticket' ? COLORS.background : '#ececec', borderRadius: 20}}>
                <Ionicons name = "ticket" size = {24} color = {activeTab === 'ticket' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleActiveTab('person')} style = {{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: activeTab === 'person' ? COLORS.background : '#ececec', borderRadius: 20}}>
                <Ionicons name = "person" size = {24} color = {activeTab === 'person' ? COLORS.primary : '#9e9e9e'}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        width: "100%",
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ececec"
    }
})
export default NavigationMenu;