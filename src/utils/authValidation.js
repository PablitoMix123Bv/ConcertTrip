import { parseJsonSourceFileConfigFileContent } from "typescript";

const emailRegex = /^[^\s@]+@[^\s@].[^\s@]+$/;

export const validateLoginData = (email, password) => {
    //1. Sanitazación: Eliminamos espacios accidentales al inicio o final.
    const cleanEmail = email.trim();

    // 2. Validación de campos vacíos
    if(!cleanEmail || !password) {
        return { isValid: false, error: "Todos los campos son obligatorios."};
    }

    // 3. Validación de formato de email
    if (!emailRegex.test(cleanEmail)) {
        return {isValid: false, error: "El formato del correo no es válido."};
    }

    // 4. VAlidación de longitud de la contraseña (mínimo 6 para Firebase)
    if (password.length < 6) {
        return {isValid : false, error: "La contraseña debe tener al menos 6 caracteres"};
    }

    return { isValid: true, cleanEmail};
};