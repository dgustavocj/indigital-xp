/**
 * Clase que representa el resultado de una operación de paginación.
 * Incluye los datos paginados, los cursores que indican la posición en la paginación
 * y el número de elementos restantes.
 */
export class PaginationResult {
	data: any[]; // Datos paginados.
	cursors: Cursors; // Cursores para navegación entre páginas.
	remainingItems!: number; // Número de elementos restantes después de la paginación.
  
	/**
	 * Constructor de la clase PaginationResult.
	 * @param {any[]} data - Array de datos resultantes de la consulta paginada.
	 * @param {Cursors} cursor - Objeto con los cursores 'before' y 'after' para paginación.
	 * @param {number} remainingItems - Número de elementos restantes.
	 */
	constructor(data: any[], cursor: Cursors, remainingItems: number) {
	  this.data = data;
	  this.cursors = cursor;
	  this.remainingItems = remainingItems;
	}
  }
  
  /**
   * Interfaz que define la estructura de los cursores usados en la paginación.
   * Cada cursor indica la posición en la lista de resultados para moverse
   * hacia adelante o hacia atrás en la paginación.
   */
  interface Cursors {
	before: object | null; // Cursor que indica el primer elemento de la página actual.
	after: object | null;  // Cursor que indica el último elemento de la página actual.
  }
  