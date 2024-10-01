import dotenv from 'dotenv';
const pkg = require('../../package.json');

const config = () => {

  const result = dotenv.config();
  if (result.error) {
    throw result.error;  // Lanza el error si no puede cargar el archivo
  }
  //console.log(result.parsed);  // Muestra las variables cargadas
  

  const APP_ENV = process.env.APP_ENV || "local";
  const LOG_LEVEL = process.env.LOG_LEVEL || "debug";
  const PORT = process.env.PORT || 8080;
  const NODE_ENV = process.env.NODE_ENV || "dev";
  const AWS_REGION = process.env.AWS_REGION;
  const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
  const PG_HOST = process.env.PG_HOST || "localhost";
  const PG_DATABASE = process.env.PG_DATABASE || "indigital_db";
  const PG_USER = process.env.PG_USER || "pgadmin";
  const PG_PASSWORD = process.env.PG_PASSWORD || "pgadmin";
  const PG_PORT = process.env.PG_PORT || 5432;
  const PG_TIMEOUT = process.env.PG_TIMEOUT || 2000;
  const PG_SSL = process.env.PG_TIMEOUT || true;
  const MAX_CONNECTIONS = process.env.MAX_CONNECTIONS || 30;
  const IDLE_TIMEOUT = process.env.IDLE_TIMEOUT || 30000;
  const CONNECTION_TIMEOUT = process.env.CONNECTION_TIMEOUT || 15000;

  const APP_NAME = pkg.hasOwnProperty('name') ? pkg.name : 'undefine-name';
  const APP_MODULE_NAME = pkg.hasOwnProperty('module-name') ? pkg['module-name'] : 'undefine-module-name';
  const AWS_ENDPOINT_URL = `http://${process.env.AWS_ENDPOINT_URL || 'localhost'}:4566`;




  return {
    APP_NAME,
    APP_ENV,
    LOG_LEVEL,
    PORT,
    NODE_ENV,
    AWS_REGION,
    AWS_ACCOUNT_ID,
    PG_HOST,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    PG_PORT,
    PG_TIMEOUT,
    PG_SSL,
    MAX_CONNECTIONS,
    IDLE_TIMEOUT,
    CONNECTION_TIMEOUT,
    APP_MODULE_NAME,
    AWS_ENDPOINT_URL
  };
};

export default config;
