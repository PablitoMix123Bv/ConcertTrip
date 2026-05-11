import { requireNativeView } from 'expo';
import {Text, Image, View, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const ReviewCard = (reseña) => {
    const [liked, setLiked] = useState(false);
    const [numberLikes, setNumberLikes] = useState(0);

    const handlePress = () => {
        if (liked == true){
            setLiked(!liked);
            setNumberLikes((PrevNumber) => (PrevNumber - 1));
        } else {
            setLiked(!liked);
            setNumberLikes((PrevNumber) => (PrevNumber + 1));
        }
    }

    return(
        <View style = {styles.commentContainer}>
            <View style = {styles.dataComment}>
                <View style = {{flexDirection: "row", gap: 10, alignItems: "center"}}>
                    <Image 
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfMkrWNPmTUdgb6nXsGQ7pvWhe44YYoVFiMg&s'}}
                        style = {styles.image}
                    />
                    <Text style = {styles.txtName}>Mónica Cruz</Text>
                </View>
                    <Text style = {styles.txtFecha}>Hace un mes</Text>        

                    <View style = {{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <TouchableOpacity onPress={handlePress}>
                            <Ionicons name = { liked ? "heart" : "heart-outline" } size = {24} color = { liked ? COLORS.primaryDark : COLORS.background}/>
                        </TouchableOpacity>
                        <Text style = {styles.txtFecha}>{numberLikes}</Text>
                    </View>
            </View>
            <View style = {styles.textContainer}>
                <Text style = {styles.txtComment}>
                    ¡Increíble el tour con la agencia para ver al Conejo! 🐰🔥 Cero estrés, puro perreo y buena vibra. El bus era una fiesta, llegamos súper bien y el hotel 10/10. Gracias por hacer que este viaje a ver a Bad Bunny fuera legendario. ¡Repito fijo!
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        width: "90%",
        height: "auto",
        backgroundColor: COLORS.secondary,
        shadowColor: "gray",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 10,
        paddingVertical: 20
    },
    textContainer: {
        width: "90%",
        height: "75%",
        // borderStyle: "dashed",
        // borderWidth: 1,
        // borderColor: "white"
    },
    dataComment: {
        width: "90%",
        // height: undefined,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: 16
        // borderStyle: "dashed",
        // borderWidth: 1,
        // borderColor: "white",
    },
    txtFecha: {
        fontSize: 12,
        color: COLORS.background,
        fontWeight: "light",
    },
    txtName: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.background
    },
    txtComment: {
        fontSize: SIZES.text,
        color: COLORS.background,
        textAlign: "justify"
    },
    image: {
        width: 40,
        aspectRatio: 1,
        borderRadius: "50%",
    }
});
export default ReviewCard;