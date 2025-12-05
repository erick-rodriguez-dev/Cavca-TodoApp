import 'dotenv/config'
import mongoose from 'mongoose'
import Task from './src/models/task.model.js'

const seedTasks = [
  {
    title: 'Completar documentación del proyecto',
    description: 'Escribir la documentación técnica y el README con instrucciones de instalación y uso',
    completed: false
  },
  {
    title: 'Implementar autenticación de usuarios',
    description: 'Agregar JWT para autenticación y autorización en la API',
    completed: false
  },
  {
    title: 'Configurar variables de entorno',
    description: 'Migrar configuraciones hardcodeadas a variables de entorno',
    completed: true
  },
  {
    title: 'Diseñar interfaz de usuario',
    description: 'Crear mockups y diseño responsive para la aplicación web',
    completed: false
  },
  {
    title: 'Optimizar consultas a la base de datos',
    description: 'Revisar y optimizar queries lentas, agregar índices necesarios',
    completed: false
  },
  {
    title: 'Configurar tests unitarios',
    description: 'Implementar Jest y escribir tests para los controladores principales',
    completed: false
  },
  {
    title: 'Revisar código con el equipo',
    description: 'Code review de las últimas features implementadas',
    completed: true
  },
  {
    title: 'Deploy a producción',
    description: 'Configurar CI/CD y hacer el primer deploy a servidor de producción',
    completed: false
  },
  {
    title: 'Implementar validación de datos',
    description: 'Agregar validaciones robustas en todos los endpoints de la API',
    completed: true
  },
  {
    title: 'Agregar logs y monitoreo',
    description: 'Implementar sistema de logs y herramientas de monitoreo de errores',
    completed: false
  }
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')

    await Task.deleteMany({})
    console.log('🗑️  Colección limpiada')

    const tasks = await Task.insertMany(seedTasks)
    console.log(`${tasks.length} tareas insertadas correctamente`)

    console.log('\nTareas creadas:')
    tasks.forEach((task, index) => {
      const status = task.completed ? '✓' : '○'
      console.log(`${index + 1}. [${status}] ${task.title}`)
    })

    await mongoose.connection.close()
    console.log('\nConexión cerrada')
    process.exit(0)
  } catch (error) {
    console.error('Error al ejecutar seed:', error)
    process.exit(1)
  }
}

seedDatabase()
