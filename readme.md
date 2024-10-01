# Guía de Instalación del Proyecto

## Clonar el Repositorio

Para comenzar, clone el repositorio en su máquina local:

```bash
 git clone git@github.com:dgustavocj/indigital-xp.git
```

## Requerimientos Mínimos del Proyecto

Asegúrese de tener instaladas las siguientes herramientas y versiones:

- Node.js: v18.19.0
- Angular CLI: v17
- Docker

## Ejecución de Docker Compose

1. Antes de continuar, debe ejecutar Docker Compose. Sitúese en el directorio raíz del proyecto y ejecute:

```bash
docker-compose up -d
```

## Instalación del Proyecto

### Backend (ms-claims)
Navegue hasta la carpeta ms-claims:

```bash
cd ms-claims
```

Instale las dependencias:

```bash
npm install
```

Ejecute el proyecto en modo local:

```bash
npm run local
```

### Frontend (mfe-claims)
En otra terminal, navegue hasta la carpeta mfe-claims:

```bash
cd mfe-claims
```

Instale las dependencias:

```bash
npm install
```

Ejecute el proyecto

```bash
ng serve
```

