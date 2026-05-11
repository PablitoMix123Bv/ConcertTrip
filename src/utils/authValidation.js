// Validación de datos para Login
// Se usa en AuthContext antes de llamar a Firebase

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginData = (email, password) => {
    //1. Sanitazación: Eliminamos espacios accidentales al inicio o final.
    const cleanEmail = email.trim();

    // 2. Validación de campos vacíos
    if (!cleanEmail || !password) {
        return { isValid: false, error: "Todos los campos son obligatorios." };
    }

    // 3. Validación de formato de email
    if (!emailRegex.test(cleanEmail)) {
        return { isValid: false, error: "El formato del correo no es válido." };
    }

    // 4. VAlidación de longitud de la contraseña (mínimo 6 para Firebase)
    if (password.length < 6) {
        return { isValid: false, error: "La contraseña debe tener al menos 6 caracteres" };
    }

    return { isValid: true, cleanEmail };
};

export const validateRegisterData = (form) => {
    const { nombre, email, ciudad, password } = form;
    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!email.trim()) {
        newErrors.email = 'El correo es obligatorio.';
    } else if (!emailRegex.test(email.trim())) {
        newErrors.email = 'El formato no es válido.';
    }
    if (!ciudad.trim()) newErrors.ciudad = 'La ciudad es obligatoria.';
    if (!password) {
        newErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
        newErrors.password = 'Mínimo 6 caracteres.';
    }

    return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors
    };
};