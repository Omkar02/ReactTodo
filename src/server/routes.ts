/**
 * Sets up an Express application with routes for managing a todo list.
 *
 * This module:
 *  - Creates an Express app instance.
 *  - Configures middleware for CORS and JSON parsing.
 *  - Defines API routes for GET, POST, PUT, and DELETE operations on todos.
 *  - Interacts with the database for data retrieval and manipulation.
 */

import express from 'express';
import DatabaseSingleton from './db.ts';
import bodyParser from 'body-parser';
import cors from 'cors';

export const app = express();

// Enable CORS for cross-origin requests (if needed)
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

// --------------------------- GET All Todos---------------------------
/**
 * GET /api/todos
 * Fetches all todos from the database.
 *
 * @returns {Response} JSON response containing an array of todos
 */

app.get('/api/todos', async (_, res) => {
    const db = await DatabaseSingleton.getInstance();
    try {
        const rows = db.exec('SELECT * FROM todos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching todos');
    }
});

// --------------------------- POST Create New Todo ---------------------------
/**
 * POST /api/todos
 * Creates a new todo in the database.
 *
 * @param {Request} req Request object containing todo details
 * @returns {Response} 201 Created response upon success
 */

app.post('/api/todos', async (req, res) => {
    const { _id, title, description, status, updated_at } = req.body;
    const db = await DatabaseSingleton.getInstance();
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
/**
 * PUT /api/todos/:id
 * Updates an existing todo in the database.
 *
 * @param {Request} req Request object containing updated todo data
 * @param {string} req.params.id ID of the todo to update
 * @returns {Response} 200 OK response upon success
 */

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, updated_at } = req.body;
    try {
        const db = await DatabaseSingleton.getInstance();
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

// --------------------------- DELETE Todo by ID ---------------------------\
/**
 * DELETE /api/todos/:id
 * Deletes a todo from the database.
 *
 * @param {string} req.params.id ID of the todo to delete
 * @returns {Response} 200 OK response upon success
 */

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const db = await DatabaseSingleton.getInstance();
    try {
        db.run('DELETE FROM todos WHERE _id = ?', [id]);
        res.status(200).send('Todo deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting todo');
    }
});
