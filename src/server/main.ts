import express from 'express';
import ViteExpress from 'vite-express';
import initSqlJs from 'sql.js';
import bodyParser from 'body-parser';
import cors from 'cors';

export const app = express();

// Enable CORS for cross-origin requests (if needed)
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

async function databaseInit() {
    try {
        const SQL = await initSqlJs();
        const db = new SQL.Database();

        const todosTable = `
      CREATE TABLE IF NOT EXISTS todos (
        _id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );
    `;

        db.run(todosTable);

        // --------------------------- GET All Todos---------------------------
        app.get('/api/todos', (_, res) => {
            try {
                const rows = db.exec('SELECT * FROM todos');
                res.json(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error fetching todos');
            }
        });

        // --------------------------- POST Create New Todo ---------------------------
        app.post('/api/todos', (req, res) => {
            const { _id, title, description, status, updated_at } = req.body;
            try {
                db.run(
                    'INSERT INTO todos (_id, title, description, status, updated_at) VALUES (?, ?, ?, ?, ?)',
                    [_id, title, description, status, updated_at],
                );
                res.status(201).send('Todo created successfully');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error creating todo');
            }
        });

        // --------------------------- PUT Update Todo by ID ---------------------------
        app.put('/api/todos/:id', (req, res) => {
            const { id } = req.params;
            const { title, description, status, updated_at } = req.body;
            try {
                db.run(
                    'UPDATE todos SET title = ?, description = ?, status = ?, updated_at = ? WHERE _id = ?',
                    [title, description, status, updated_at, id],
                );
                res.status(200).send('Todo updated successfully');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error updating todo');
            }
        });

        // --------------------------- DELETE Todo by ID ---------------------------
        app.delete('/api/todos/:id', (req, res) => {
            const { id } = req.params;
            try {
                db.run('DELETE FROM todos WHERE _id = ?', [id]);
                res.status(200).send('Todo deleted successfully');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error deleting todo');
            }
        });
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}
databaseInit();

// --------------------------- start the server ---------------------------
ViteExpress.listen(app, 3000, async () => {
    console.log('Server is listening on port 3000...');
});
