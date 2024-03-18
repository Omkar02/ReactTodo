/**
 * Singleton class for managing a connection to an in-memory SQLite database using sql.js.
 *
 * This class ensures that only one instance of the database connection exists throughout the application.
 * It provides a static method `getInstance` to retrieve the database object.
 */

import initSqlJs, { Database } from 'sql.js';

export default class DatabaseSingleton {
    private static instance?: Database;

    private constructor() {}
    /**
     * Retrieves a single instance of the in-memory SQLite database.
     *
     * This method ensures a single connection is established and reused throughout the application.
     *  1. Checks if an existing database instance exists (`DatabaseSingleton.instance`).
     *  2. If not, initializes a new SQL.js database object and sets it as the instance.
     *  3. Catches any errors during initialization and re-throws them for handling at the caller level.
     *  4. Returns the database instance.
     *
     * @throws {Error} If any errors occur during database initialization.
     * @returns {Promise<Database>} Promise resolving to the database object.
     */

    static async getInstance(): Promise<Database> {
        if (!DatabaseSingleton.instance) {
            try {
                const SQL = await initSqlJs();
                const db = new SQL.Database();
                DatabaseSingleton.instance = db;
            } catch (error) {
                console.error('Error during initialization:', error);
                // Re-throw the error to allow handling at the caller level
                throw error;
            }
        }
        return DatabaseSingleton.instance;
    }
}
