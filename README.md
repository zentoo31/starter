# 🚀 Starter

**Starter** es una aplicación de escritorio desarrollada con **Electron**, **React** y **TypeScript** cuyo objetivo es automatizar las tareas más comunes después de instalar Windows.

En lugar de descargar e instalar manualmente cada programa o realizar configuraciones una por una, Starter centraliza todo en una única aplicación con una interfaz moderna y fácil de usar.

> ⚠️ **Proyecto en desarrollo.** Muchas características aún están en construcción.

---

# ✨ Características

## 🖥 Información del sistema

Visualiza información detallada del equipo:

* Procesador
* Memoria RAM
* Tarjeta gráfica
* Sistema operativo
* Almacenamiento
* Arquitectura del sistema

---

## 📦 Instalación de programas *(En desarrollo)*

Instala rápidamente aplicaciones populares como:

* Google Chrome
* Firefox
* Brave
* Visual Studio Code
* Git
* Node.js
* Discord
* VLC
* OBS Studio
* Spotify

La aplicación utilizará automáticamente el mejor método disponible:

* Winget
* Instaladores silenciosos
* (Próximamente) Chocolatey
* (Próximamente) Scoop

---

## ⚙ Configuración del sistema *(Próximamente)*

Automatización de configuraciones comunes de Windows:

* Configuración de privacidad
* Opciones de rendimiento
* Ajustes de Windows Update
* Configuración del Explorador de archivos
* Otras optimizaciones

---

## 🧹 Mantenimiento *(Próximamente)*

Funciones para facilitar el mantenimiento del sistema:

* Limpieza de archivos temporales
* Gestión de programas instalados
* Información de almacenamiento
* Herramientas del sistema

---

# 🛠 Tecnologías

* Electron
* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* Lucide Icons
* systeminformation

---

# 📂 Estructura del proyecto

```text
starter/
│
├── electron/
│   ├── ipc/
│   ├── managers/
│   ├── preload.cjs
│   └── main.js
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── public/
└── package.json
```
---

# 📖 Objetivo

Starter busca convertirse en una herramienta todo en uno para preparar un equipo recién instalado, permitiendo automatizar la instalación de software, consultar información del sistema y aplicar configuraciones de Windows desde una única aplicación.

---

# 📄 Licencia

Este proyecto se distribuye bajo la licencia **GNU**.
