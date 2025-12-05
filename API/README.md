# API - Backend

API REST para la gestión de tareas construida con Node.js, Express y MongoDB.

## Requisitos

- Node.js (versión 18 o superior)
- pnpm (versión 10.17.0 o superior)
- MongoDB (versión 4.0 o superior)

## Instalación

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Configurar las siguientes variables:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/test
API_KEY=your_api_key_here
```

### 3. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo:

```bash
# macOS (usando Homebrew)
brew services start mongodb-community

# Linux (usando systemd)
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. (Opcional) Cargar datos de prueba

```bash
pnpm run seed
```

## Ejecución

### Modo Desarrollo

```bash
pnpm run dev
```

El servidor se iniciará en `http://localhost:3000` con hot-reload habilitado.

### Modo Producción

```bash
pnpm start
```

## Scripts Disponibles

- `pnpm start` - Inicia el servidor en modo producción
- `pnpm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `pnpm run seed` - Carga datos de prueba en la base de datos

## Estructura del Proyecto

```
API/
├── index.js                 # Punto de entrada de la aplicación
├── seed.js                  # Script para cargar datos de prueba
├── package.json             # Dependencias y scripts
├── .env                     # Variables de entorno (no versionado)
├── .env.example             # Ejemplo de variables de entorno
├── Dockerfile               # Configuración de Docker
├── postman/                 # Colección de Postman para testing
│   └── Cavca_API.postman_collection.json
└── src/
    ├── controllers/         # Lógica de negocio
    │   └── task.controller.js
    ├── middleware/          # Middleware de autenticación y validación
    │   └── auth.middleware.js
    ├── models/              # Modelos de MongoDB
    │   └── task.model.js
    └── routes/              # Definición de rutas
        ├── index.js
        └── tasks.route.js
```

## Endpoints de la API

### Tareas

- `GET /tasks` - Obtener todas las tareas
- `GET /tasks/:id` - Obtener una tarea por ID
- `POST /tasks` - Crear una nueva tarea
- `PUT /tasks/:id` - Actualizar una tarea existente
- `DELETE /tasks/:id` - Eliminar una tarea

### Ejemplo de petición con cURL

```bash
curl -X GET http://localhost:3000/tasks \
  -H "x-api-key: your-secret-api-key-here"
```

### Códigos de respuesta de autenticación

- `401 Unauthorized` - No se proporcionó el header `x-api-key`
- `403 Forbidden` - La API key proporcionada no es válida
- `500 Server Error` - La API key no está configurada en el servidor

## Tecnologías Utilizadas

- **Express 5** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para permitir peticiones cross-origin
- **dotenv** - Gestión de variables de entorno

## Testing con Postman

En la carpeta `postman/` se encuentra una colección de Postman con ejemplos de todas las peticiones disponibles.

Para importarla:

1. Abrir Postman
2. Click en "Import"
3. Seleccionar el archivo `Cavca_API.postman_collection.json`
