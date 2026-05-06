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

### Pantallas implementadas

**WelcomeScreen** — Pantalla de bienvenida principal de la app. Incluye animaciones 
de entrada en secuencia (círculos decorativos, logo, título, slogan y botones). 
Botones funcionales que navegan a Register y Login. Usa la paleta de colores 
definitiva del proyecto (#3E63E6).

**SplashScreen** — Pantalla de carga que se muestra mientras Firebase verifica 
si hay una sesión activa. Animación diferente al WelcomeScreen: contenido entra 
desde abajo con fade. Incluye barra de progreso dorada animada. Recibe una prop 
`onFinish` que avisa al App.js cuando terminar de cargar.

**RegisterScreen** — Formulario de registro con 4 campos: Nombre completo, 
Correo electrónico, Ciudad y Contraseña. Incluye validación local antes de 
llamar al `signUp` del AuthContext. Manejo de errores de Firebase traducidos 
al español. Animación de entrada de la card. Conectado al `signUp` del AuthContext.

**LoginScreen** — Formulario de inicio de sesión con Correo y Contraseña. 
Validación local y manejo de errores de Firebase en español. Conectado al 
`login` del AuthContext. Mismo estilo visual que RegisterScreen para consistencia.

### Componentes y archivos creados

**`src/constants/input.js`** — Componente reutilizable de inputField con animación 
de borde al hacer focus. Exporta `InputField` e `inputStyles`. Se usa en 
RegisterScreen y LoginScreen para evitar código repetido.

**`src/constants/theme.js`** — Paleta de colores actualizada    

### Navegación configurada (App.js)

Se configuró React Navigation con dos stacks separados:
- **AuthStack** — para usuarios sin sesión: Welcome → Register → Login
- **AppStack** — para usuarios con sesión activa (pendiente de pantallas)

La lógica de navegación lee el estado `user` del AuthContext. Si hay sesión 
activa va al AppStack, si no va al AuthStack. El SplashScreen aparece mientras 
Firebase verifica la sesión con `onAuthStateChanged`.

### Bugs corregidos en código del backend de lo que hiciste de Firebase que me dijo Chat

- `signInWithEmailAndPassword` estaba importado de FirebaseConfig en lugar 
  de `firebase/auth` — corregido en AuthContext.
- `db` no estaba exportado en FirebaseConfig — se agregó `getFirestore`.
- `userCredential` declarada dentro del `try`, el `catch` no podía accederla 
  — movida fuera del bloque try.
- Regex de validación de email en `authValidation.js` tenía un `+` faltante 
  — `/^[^\s@]+@[^\s@].[^\s@]+$/` corregido a `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

  ### Dependencias que instale, no se si ya las habias instalado

  ```bash
npx expo install @react-navigation/native @react-navigation/stack react-native-screens
```
