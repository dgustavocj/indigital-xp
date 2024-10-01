import { Pool, PoolConfig } from 'pg';
import Cursor from 'pg-cursor';
import { PaginationResult } from './config';
import { PostgresError } from './error';
import EnvConfig from '../config';

/**
 * Clase que maneja las conexiones a la base de datos PostgreSQL utilizando un pool de conexiones.
 */
export class Database {
  private pool: Pool;

  /**
   * Constructor que inicializa el pool de conexiones de la base de datos.
   * @param {PoolConfig} config - Configuración del pool de conexiones.
   */
  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  /**
   * Cierra todas las conexiones activas en el pool.
   * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando el pool ha sido cerrado.
   * @throws {PostgresError} - Si ocurre un error al cerrar el pool.
   */
  async closePool(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Pool de conexiones cerrado.');
    } catch (error) {
      console.error('Error cerrando el pool de conexiones:', error);
      throw new PostgresError({
        name: 'PG_POOL_CLOSE_ERROR',
        message: 'Error closing the connection pool',
        cause: error,
      });
    }
  }

  /**
   * Obtiene el número total de filas resultantes de un query.
   * @param {string} query - La consulta SQL que se ejecutará.
   * @param {any[]} [params] - Parámetros opcionales para la consulta.
   * @returns {Promise<number>} - Retorna el número total de filas.
   * @throws {PostgresError} - Si ocurre un error al ejecutar la consulta.
   */
  private async getTotalRowCount(query: string, params?: any[]): Promise<number> {
    const countQuery = `SELECT COUNT(*) AS total_count FROM (${query}) AS subquery`;
    const countResult = await this.pool.query(countQuery, params);
    const totalCount = parseInt(countResult.rows[0].total_count, 10);
    return totalCount;
  }

  /**
   * Lee un conjunto de filas de la base de datos usando un cursor.
   * @param {Cursor} cursor - Cursor PostgreSQL para recorrer los resultados.
   * @param {number} limit - Número máximo de filas a leer por lote.
   * @returns {Promise<any[]>} - Retorna un array con las filas leídas.
   * @throws {Error} - Si ocurre un error al leer las filas.
   */
  private fetchRows(cursor: Cursor, limit: number): Promise<any[]> {
    const batchSize = limit;
    return new Promise((resolve, reject) => {
      cursor.read(batchSize, (err, rows) => {
        cursor.close(() => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  /**
   * Ejecuta la lógica de paginación basada en cursor o keySet.
   * @param {"cursor" | "keySet"} queryType - Tipo de paginación ("cursor" o "keySet").
   * @param {number} limit - Número máximo de filas por página.
   * @param {string} query - La consulta SQL a ejecutar.
   * @param {any[]} [params] - Parámetros opcionales para la consulta.
   * @param {boolean} [returnRemainingItems=true] - Indica si se debe calcular el número de elementos restantes.
   * @returns {Promise<PaginationResult>} - Resultado de la paginación con los datos solicitados.
   * @throws {PostgresError} - Si ocurre un error durante la ejecución de la consulta.
   */
  private async performPagination(
    queryType: 'cursor' | 'keySet',
    limit: number,
    query: string,
    params?: any[],
    returnRemainingItems: boolean = true
  ): Promise<PaginationResult> {
    if (typeof query !== 'string' || query.trim().length === 0) {
      throw new PostgresError({
        name: 'PG_PARAMETER_ERROR',
        message: 'The query must be a non-empty string',
      });
    }

    if (!Number.isInteger(limit) || limit <= 0) {
      throw new PostgresError({
        name: 'PG_PARAMETER_ERROR',
        message: 'The limit must be a positive integer',
      });
    }

    let client;
    try {
      client = await this.pool.connect();

      let queryset: any[] = [];

      if (queryType === 'cursor') {
        const cursor = client.query(new Cursor(query, params));
        queryset = await this.fetchRows(cursor, limit);
      } else if (queryType === 'keySet') {
        const paginationQuery = `${query} LIMIT ${limit}`;
        const { rows } = await client.query(paginationQuery, params);
        queryset = rows;
      }

      let remainingItems = 0;
      const paginationCursor = {
        before: queryset ? queryset[0] ?? null : null,
        after: queryset ? queryset[queryset.length - 1] ?? null : null,
      };

      if (returnRemainingItems) {
        const totalRecords = await this.getTotalRowCount(query, params);
        remainingItems = totalRecords - queryset.length || 0;
      }

      return new PaginationResult(queryset, paginationCursor, remainingItems);
    } catch (error) {
      throw new PostgresError({
        name: 'PG_QUERY_EXECUTION_ERROR',
        message: (error as Error).message,
        cause: error,
      });
    } finally {
      if (client) client.release();
    }
  }

  /**
   * Ejecuta una consulta SQL y retorna el resultado.
   * @param {string} query - La consulta SQL a ejecutar.
   * @param {any[]} [params] - Parámetros opcionales para la consulta.
   * @returns {Promise<any>} - Retorna el resultado de la consulta.
   * @throws {PostgresError} - Si ocurre un error durante la ejecución de la consulta.
   */
  async query(query: string, params?: any[]) {
    if (typeof query !== 'string' || query.trim().length === 0) {
      throw new PostgresError({
        name: 'PG_PARAMETER_ERROR',
        message: 'The query must be a non-empty string',
      });
    }

    try {
      const result = await this.pool.query(query, params || []);
      return result;
    } catch (error) {
      throw new PostgresError({
        name: 'PG_QUERY_EXECUTION_ERROR',
        message: (error as Error).message,
        cause: error,
      });
    }
  }

  /**
   * Realiza paginación utilizando cursor.
   * @param {number} limit - Número máximo de filas por página.
   * @param {string} query - La consulta SQL a ejecutar.
   * @param {any[]} [params] - Parámetros opcionales para la consulta.
   * @param {boolean} [returnRemainingItems=true] - Indica si se debe calcular el número de elementos restantes.
   * @returns {Promise<PaginationResult>} - Resultado de la paginación con los datos solicitados.
   */
  async cursorPagination(
    limit: number,
    query: string,
    params?: any[],
    returnRemainingItems: boolean = true
  ): Promise<PaginationResult> {
    return this.performPagination('cursor', limit, query, params, returnRemainingItems);
  }

  /**
   * Realiza paginación utilizando keySet.
   * @param {number} limit - Número máximo de filas por página.
   * @param {string} query - La consulta SQL a ejecutar.
   * @param {any[]} [params] - Parámetros opcionales para la consulta.
   * @param {boolean} [returnRemainingItems=true] - Indica si se debe calcular el número de elementos restantes.
   * @returns {Promise<PaginationResult>} - Resultado de la paginación con los datos solicitados.
   */
  async keySetPagination(
    limit: number,
    query: string,
    params?: any[],
    returnRemainingItems: boolean = true
  ): Promise<PaginationResult> {
    return this.performPagination('keySet', limit, query, params, returnRemainingItems);
  }
}

/**
 * Interfaz para los parámetros de configuración de la base de datos.
 */
interface DatabaseParams {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

/**
 * Obtiene la configuración del pool de la base de datos.
 * @param {DatabaseParams} [config] - Parámetros opcionales de configuración.
 * @returns {PoolConfig} - Configuración del pool de conexiones.
 */
const getConfig = (config?: DatabaseParams): PoolConfig => {
  if (config) return config as PoolConfig;
  return {
    host: EnvConfig().PG_HOST,
    port: Number(EnvConfig().PG_PORT),
    user: EnvConfig().PG_USER,
    password: EnvConfig().PG_PASSWORD,
    database: EnvConfig().PG_DATABASE,
    ssl: EnvConfig().PG_SSL === 'true',
    max: EnvConfig().MAX_CONNECTIONS ? Number(EnvConfig().MAX_CONNECTIONS) : 30,
    idleTimeoutMillis: EnvConfig().IDLE_TIMEOUT ? Number(EnvConfig().IDLE_TIMEOUT) : 30000,
    connectionTimeoutMillis: EnvConfig().CONNECTION_TIMEOUT
      ? Number(EnvConfig().CONNECTION_TIMEOUT)
      : 15000,
  };
};

/**
 * Clase constructora del cliente de base de datos PostgreSQL.
 */
export class PgClientBuilder {
  /**
   * Crea una instancia del cliente de base de datos.
   * @param {DatabaseParams} [config] - Parámetros opcionales de configuración.
   * @returns {Database} - Instancia del cliente de base de datos.
   */
  static getClient(config?: DatabaseParams) {
    return new Database(getConfig(config));
  }
}
