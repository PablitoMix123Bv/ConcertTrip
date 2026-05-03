#CONCERT TRIP

Estructura de ficheros

```

/concert-trip
├── assets/              # Imágenes, fuentes y el logo de ConcertTrip.
├── src/
│   
├── components/      # Componentes UI reutilizables (Botones, Tarjetas, Inputs).
│   
├── screens/         # Vistas completas (Inicio, Mapa, Perfil, Boletos).
│   ├── navigation/      # Configuración de React Navigation.
│   ├── store/           # Tiendas de estado global utilizando Zustand.
│   ├── services/        # Lógica de conexión con Firebase (Auth y Firestore).
│   
├── hooks/           # Lógica compartida extraída en hooks personalizados.
│   
├── utils/           # Funciones de ayuda y constantes (formateo de fechas, etc.).
│   
└── constants/       # Definición de colores, temas y estilos globales.
├── app.json             # Configuración del entorno Expo.
└── package.json         # Dependencias y scripts del proyecto.

```

## 🔐 Módulo de Autenticación (Firebase)
Se implementó el proveedor de contexto (AuthContext) para gestionar el estado global del usuario.

Funciones disponibles:

login(email, password): Valida credenciales e inicia sesión.

signUp(email, password, extraData): Registra usuario en Auth y crea perfil en Firestore.

logout(): Cierra la sesión activa.

user: Objeto con los datos del usuario actual (null si no hay sesión).

loading: Booleano para manejar pantallas de carga.

Validaciones:

Se creó src/utils/authValidation.js para limpiar correos (trim) y validar formatos de email y longitud de password antes de disparar peticiones a Firebase.