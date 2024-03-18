import request from 'supertest';
import { app } from '../src/server/routes.ts';
import DatabaseSingleton from '../src/server/db.ts';

describe('Testing Todo Routes', () => {
    beforeAll(async () => {
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
    });

    afterAll(async () => {
        const db = await DatabaseSingleton.getInstance();
        db.close();
    });

    it('should return 0 todos', async () => {
        jest.useFakeTimers();

        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([]);
    });

    it('Get all todos', async () => {
        // Seed some sample data
        const db = await DatabaseSingleton.getInstance();
        db.run(
            'INSERT INTO todos VALUES (1, "Buy groceries", "Milk, eggs, bread", "pending", "18/03/2024, 08:48:14")',
        );

        const resp = await request(app).get('/api/todos');

        expect(resp.status).toBe(200);
        expect(resp.body).toEqual([
            {
                columns: [
                    '_id',
                    'title',
                    'description',
                    'status',
                    'updated_at',
                ],
                values: [
                    [
                        1,
                        'Buy groceries',
                        'Milk, eggs, bread',
                        'pending',
                        '18/03/2024, 08:48:14',
                    ],
                ],
            },
        ]);
    });

    // Test POST /api/todos
    it('Create a new todo', async () => {
        const response = await request(app).post('/api/todos').send({
            _id: 2,
            title: 'Write a report',
            description: 'Project status',
            status: 'pending',
            updated_at: new Date(),
        });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Todo created successfully');
    });

    // Test PUT /api/todos/:id
    it('Update a todo', async () => {
        // Seed initial data
        const db = await DatabaseSingleton.getInstance();
        db.run(
            'INSERT INTO todos VALUES (3, "Call John", NULL, "pending", "18/03/2024, 08:48:14")',
        );

        const response = await request(app).put('/api/todos/3').send({
            title: 'Call Jane',
            description: 'Reschedule meeting',
            status: 'done',
            updated_at: new Date(),
        });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Todo updated successfully');
    });

    // Test DELETE /api/todos/:id
    it('Delete a todo', async () => {
        // Seed initial data
        const db = await DatabaseSingleton.getInstance();
        db.run(
            'INSERT INTO todos VALUES (4, "Pay bills", NULL, "pending", "18/03/2024, 08:48:14")',
        );

        const response = await request(app).delete('/api/todos/4');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Todo deleted successfully');
    });
});
