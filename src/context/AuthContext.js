import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from "../config/FirebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { validateLoginData } from '../utils/authValidation';

// Proveedor de autenticación/ Servicio que gestiona la identidad e inicio de sesión de los usuarios
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); //Se almacenará al usuario loggeado
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); //Verificación de la sesión.


    // Login 
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

    // Registro
    const signUp = async (userData) => {
        const { email, password, nombre, ciudad, rol } = userData;

        // Paso 1. Creación del usuario en Auth
        let userCredential;
        try {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Paso 2: Crear documento en Firestore con el mismo UID
            await setDoc(doc(db, "usuarios", uid), {
                nombre: nombre,
                ciudad: ciudad,
                rol: rol,
                createdAt: new Date()
            });

            // Si pasa este punto significa que el usuario ya debe de estar registrado en la BD

        } catch (error) {
            // Eliminicion del usuario registrado en Auth en caso de algún error 
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
        // Se ejecuta automáticamente cuando el usuario inicia o cierra sesión
        // Monitorea de forma asincrona el token de sesión del usuario.
        const unsubscribe = auth.onAuthStateChanged(async (userFirebase) => {
            if (userFirebase) {
                // Si hay usuario, buscamos su perfil en Firestore
                const docRef = doc(db, "usuarios", userFirebase.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData({ uid: userFirebase.uid, ...docSnap.data() });
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setUser(userFirebase);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, loading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};