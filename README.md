# Cavca - Aplicación de Gestión de Tareas

Aplicación full-stack para la gestión de tareas construida con React, Node.js, Express y MongoDB.

## Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm (versión 10.17.0 o superior)
- MongoDB (versión 4.0 o superior)

## Estructura del Proyecto

```
Cavca/
├── API/          # Backend (Node.js + Express + MongoDB)
└── FrontEnd/     # Frontend (React + Vite + TailwindCSS)
```

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/erick-rodriguez-dev/Cavca-TodoApp.git
cd Cavca
```

### 2. Configurar el Backend (API)

#### 2.1. Navegar al directorio del API

```bash
cd API
```

#### 2.2. Instalar dependencias

```bash
pnpm install
```

#### 2.3. Configurar variables de entorno

Crear un archivo `.env` basado en el archivo `.env.example`:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/test
```

#### 2.4. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo en tu sistema:

```bash
# macOS (usando Homebrew)
brew services start mongodb-community

# Linux (usando systemd)
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### 2.5. (Opcional) Cargar datos de prueba

```bash
pnpm run seed
```

### 3. Configurar el Frontend

#### 3.1. Navegar al directorio del Frontend

Desde la raíz del proyecto:

```bash
cd FrontEnd
```

#### 3.2. Instalar dependencias

```bash
pnpm install
```

## Ejecución del Proyecto

### Opción 1: Ejecutar en Modo Desarrollo

#### Terminal 1 - Backend

```bash
cd API
pnpm run dev
```

El servidor API estará disponible en `http://localhost:3000`

#### Terminal 2 - Frontend

```bash
cd FrontEnd
pnpm run dev
```

La aplicación frontend estará disponible en `http://localhost:5173`

### Opción 2: Ejecutar en Modo Producción

#### Backend

```bash
cd API
pnpm start
```

#### Frontend

Primero construir la aplicación:

```bash
cd FrontEnd
pnpm run build
```

Luego previsualizar:

```bash
pnpm run preview
```

## Scripts Disponibles

### Backend (API)

- `pnpm start` - Inicia el servidor en modo producción
- `pnpm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `pnpm run seed` - Carga datos de prueba en la base de datos

### Frontend

- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye la aplicación para producción
- `pnpm run preview` - Previsualiza la versión de producción
- `pnpm run lint` - Ejecuta el linter ESLint

## Tecnologías Utilizadas

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- CORS
- dotenv

### Frontend

- React 19
- Vite
- TailwindCSS 4
- Zustand (State Management)
- Axios
- Lucide React (Iconos)

## Verificación de la Instalación

1. Verifica que el backend esté corriendo accediendo a `http://localhost:3000`
2. Verifica que el frontend esté corriendo accediendo a `http://localhost:5173`
3. La aplicación frontend debería poder comunicarse con el backend automáticamente
