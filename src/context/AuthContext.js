import React, {createContext, useState, useEffect} from 'react';
import { auth, db } from "../config/FirebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "../config/FirebaseConfig";
import { signOut } from 'firebase/auth';
import { validateLoginData } from '../utils/authValidation';

// Proveedor de autenticación/ Servicio que gestiona la identidad e inicio de sesión de los usuarios
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); //Se almacenará al usuario loggeado
    const [loading, setLoading] = useState(true); //Verificación de la sesión.

    const login = async (email, password) => {
        const validation = validateLoginData(email, password);

        if (!validation.isValid) {
            // Si la validación falla, lanzamos el error específico para que sea mostrado dentro de la UI
            throw new Error(validation.error);
        }

        try {
            // Validación de las credenciales
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error en login:", error.code);
            throw error; //Lanzamos el error para mostrar una alerta dentro del dispositivo
        }
    };

    const signUp = async (userData) => {
        const { email, password, nombre, ciudad, rol } = userData;

        try {
            // Paso 1. Creación del usuario en Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Paso 2: Crear el perfil del Firestore usando el misomo UID
            await setDoc(doc(db, "usuarios", uid), {
                nombre: nombre,
                ciudad: ciudad,
                rol: rol,
                createdAt: new Date()
            });
        } catch (error) {
            // Eliminicion del usuario registrado en Auth
            if (userCredential?.user) {
                await userCredential.user.delete();
                console.log("Limpieza exitosa: Usuario eliminado de Auth por fallo en la base de datos")
            }
            throw error;
        }

    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    useEffect(() => {
        // onAuthStateChanged se activa automáticamente cada vez que alguien o sale de la app.
        // Monitorea de forma asincrona el token de sesión del usuario.
        const unsubscribe = auth.onAuthStateChanged((userFirebase) => {
            setUser(userFirebase) //Se guardan los datos (o null si no hay nadie).
            setLoading(false);
        });
        return unsubscribe
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};