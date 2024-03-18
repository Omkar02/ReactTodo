/**
 * Starts the Express server using ViteExpress and initializes the database connection.
 *
 * This function listens on port 3000 and performs the following actions:
 *  1. Creates an Express server instance from the provided `app` object (imported from your routes file).
 *  2. Starts the server using ViteExpress on port 3000.
 *  3. Asynchronously retrieves an instance of the database singleton (`DatabaseSingleton`).
 *  4. Executes a SQL statement to create the `todos` table if it doesn't already exist, using the provided `todosTable` schema.
 *  5. Logs a message to the console indicating the server is listening on port 3000.
 *
 * @param app The Express server application instance.
 */

import ViteExpress from 'vite-express';
import DatabaseSingleton from './db.ts';
import { app } from './routes.ts';

// --------------------------- start the server ---------------------------

ViteExpress.listen(app, 3000, async () => {
    const todosTable = `
            CREATE TABLE IF NOT EXISTS todos (
                _id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL,
                updated_at TIMESTAMP NOT NULL
            );
            `;
    const db = await DatabaseSingleton.getInstance();
    db.run(todosTable);
    console.log('Server is listening on port 3000...');
});
