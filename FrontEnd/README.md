# FrontEnd - Aplicación de Tareas

Aplicación frontend para la gestión de tareas construida con React, Vite y TailwindCSS.

## Requisitos

- Node.js (versión 18 o superior)
- pnpm (versión 10.17.0 o superior)

## Instalación

### 1. Instalar dependencias

```bash
pnpm install
```

## Ejecución

### Modo Desarrollo

```bash
pnpm run dev
```

La aplicación se iniciará en `http://localhost:5173` con hot-reload habilitado.

### Modo Producción

#### Construir la aplicación

```bash
pnpm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

#### Previsualizar la construcción

```bash
pnpm run preview
```

## Scripts Disponibles

- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye la aplicación para producción
- `pnpm run preview` - Previsualiza la versión de producción
- `pnpm run lint` - Ejecuta el linter ESLint

## Estructura del Proyecto

```
FrontEnd/
├── index.html               # Plantilla HTML principal
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Configuración de ESLint
├── Dockerfile               # Configuración de Docker
├── public/                  # Archivos estáticos públicos
└── src/
    ├── main.jsx             # Punto de entrada de React
    ├── App.jsx              # Componente principal
    ├── index.css            # Estilos globales
    ├── components/          # Componentes de React
    │   ├── TaskForm.jsx     # Formulario para crear/editar tareas
    │   ├── TaskItem.jsx     # Componente individual de tarea
    │   └── TaskList.jsx     # Lista de tareas
    ├── lib/                 # Utilidades
    │   └── fetch.js         # Configuración de peticiones HTTP
    └── store/               # Estado global
        └── useTaskStore.js  # Store de Zustand para tareas
```

## Tecnologías Utilizadas

- **React 19** - Librería para construir interfaces de usuario
- **Vite** - Build tool y servidor de desarrollo
- **TailwindCSS 4** - Framework de CSS utility-first
- **Zustand** - Gestión de estado ligera
- **Axios** - Cliente HTTP para peticiones al API
- **Lucide React** - Librería de iconos

## Configuración

### Conexión con el Backend

La aplicación está configurada para conectarse al backend en `http://localhost:3000`.

Si necesitas cambiar la URL del API, edita el archivo `src/lib/fetch.js`.

## Características

- Crear nuevas tareas
- Listar todas las tareas
- Actualizar estado de tareas
- Eliminar tareas
- Interfaz responsive
- Gestión de estado con Zustand
