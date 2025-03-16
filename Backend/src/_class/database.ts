import mysql from 'mysql2/promise';

/**
  * Class representing a Database connection pool.
  * 
  * By: Felipe Micheletti
  */
export class Database {
	public static pool: mysql.Pool;

	public constructor() {
		if (!Database.pool) {
			Database.pool = mysql.createPool({
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			});
		}
	}

	/**
	 *  Executes a SQL query with the provided parameters.
	 *  
	 *  This method will execute the given SQL query using the provided parameters and return the results.
	 *  
	 *  @param sql - The SQL query to be executed.
	 *  @param params - The parameters to be used in the SQL query.
	 *  @returns A promise that resolves to the results of the query.
	 *  @throws Will throw an error and save a log file if the query execution fails.
	 */
	async query(sql: string, params: any[] = []): Promise<any> {
		try {
			const [results] = await Database.pool.execute(sql, params);
			return results;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *  Executes a SELECT SQL query.
	 *  
	 *  This method will execute the given SELECT SQL query using the provided parameters
	 *  and return the results.
	 *  
	 *  @param sql - The SELECT SQL query to be executed.
	 *  @param params - The parameters to be used in the SQL query.
	 *  @returns A promise that resolves to the results of the query.
	 */
	async select(sql: string, params: any[] = []): Promise<any> {
		return this.query(sql, params);
	}

	/**
	 *  Executes an INSERT SQL query.
	 *  
	 *  This method will execute the given INSERT SQL query using the provided parameters
	 *  and return the results.
	 *  
	 *  @param sql - The INSERT SQL query to be executed.
	 *  @param params - The parameters to be used in the SQL query.
	 *  @returns A promise that resolves to the results of the query.
	 */
	async insert(sql: string, params: any[] = []): Promise<any> {
		return this.query(sql, params);
	}

	/**
	 *  Executes an UPDATE SQL query.
	 *  
	 *  This method will execute the given UPDATE SQL query using the provided parameters
	 *  and return the results.
	 *  
	 *  @param sql - The UPDATE SQL query to be executed.
	 *  @param params - The parameters to be used in the SQL query.
	 *  @returns A promise that resolves to the results of the query.
	 */
	async update(sql: string, params: any[] = []): Promise<any> {
		return this.query(sql, params);
	}

	/**
	 *  Executes a DELETE SQL query.
	 *  
	 *  This method will execute the given DELETE SQL query using the provided parameters
	 *  and return the results.
	 *  
	 *  @param sql - The DELETE SQL query to be executed.
	 *  @param params - The parameters to be used in the SQL query.
	 *  @returns A promise that resolves to the results of the query.
	 */
	async delete(sql: string, params: any[] = []): Promise<any> {
		return this.query(sql, params);
	}

	/**
	 *  Closes the database connection pool.
	 *  
	 *  This method will close the database connection pool, releasing all connections.
	 *  
	 *  @returns A promise that resolves when the connection pool is closed.
	 */
	async close():Promise<void> {
		await Database.pool.end();
	}
}