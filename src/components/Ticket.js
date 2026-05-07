import { StyleSheet, View, Image, Text } from "react-native";
import {SIZES, COLORS, COLORSCREEN} from "../constants/theme"

const Ticket = ({artisName, stadium, locationPoint, date, agency, rideType, price}) => {
    return(
        <View style = {styles.ticketContainer}>
            <View style = {{flexDirection: "row", justifyContent: "space-around", marginBottom: 30}}>
                <Image 
                    source = {{uri : "https://akamai.sscdn.co/uploadfile/letras/fotos/4/f/6/0/4f60534a0913cb593179fd87651dcef7.jpg"}}
                    style = {styles.imageTicket}   
                />
                <View style = {styles.dataTicket}>
                    <Text style = {styles.txtTitle}>{artisName}</Text>
                    <Text>No. de ticket: #67</Text>
                    <Text>{stadium}</Text>
                    <Text>Salida: {locationPoint}</Text>
                    <Text>Fecha: {date}</Text>
                    <Text>{agency}</Text>
                    <Text>{rideType}</Text>                
                </View>
            </View>
            <View style = {styles.ticketElementos}>
                <View style = {[styles.recortesTicket, {left: -6}]}></View>   
                <View style = {{borderStyle: "dashed", borderWidth: 1.5, width: "80%", height: 0, borderColor: "#36B64A"}}></View>             
                <View style = {[styles.recortesTicket, {left: 6}]}></View>                
            </View>
        </View> 
    );
};
const styles = StyleSheet.create({
    ticketContainer: {
        width: "90%",
        // alignSelf: 'center',
        // height: "25%",
        paddingBlock: 20,
        borderRadius: 25,
        backgroundColor: "#D4FFDB",
        // flexDirection: "row",
        // justifyContent: "space-around",        
    },
    imageTicket: {
        aspectRatio: 1,
        width: "35%",
        borderRadius: 20,
    },
    dataTicket: {
        width: "50%",
        height: "100%",
        // backgroundColor: "#ffff"
    },
    txtTitle: {
        fontSize: SIZES.ticketTitle,
        fontWeight: "bold"
    },
    recortesTicket: {
        height: 30,
        width: 40,
        borderRadius: 5,
        // position: "absolute",
        backgroundColor: COLORSCREEN.background,
        borderRadius: 15,
        // left: -15
    },
    ticketElementos: {
        flexDirection: "row",
        justifyContent: "space-between", 
        width: "100%", 
        alignItems: "center",
        marginBottom: 10
    }
});

export default Ticket;