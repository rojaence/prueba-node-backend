# Proyecto de Backend con Node, Express y TypeScript

Este proyecto es un servidor backend básico construido con Node.js, Express y TypeScript.

## Requisitos

- [Node.js](https://nodejs.org/) (versión 22.12 o superior)
- [npm](https://www.npmjs.com/) (normalmente incluido con Node.js)

## Instalación

1. Clona el repositorio:

```bash
  git clone https://github.com/rojaence/prueba-node-backend.git
```

2. Navega al directorio del proyecto
```bash
  cd prueba-node-backend
```

3. Instala las dependencias
```bash
  npm install
```

4. Crear un archivo .env en base a .env.example
5. Configurar una base de datos postgresql con los datos del .env

## Scripts disponibles
npm run dev: Inicia el servidor en modo desarrollo con recarga automática  
npm db:seed: Ejecuta los seeders para datos iniciales en la base de datos

## Uso
1. Ejecutar los seeders
```bash
  npm run db:seed
```
2. Ejecutar el servidor
```bash
  npm run dev
```
El servidor se ejecutará en 'https://localhost:3000' de forma predeterminada


