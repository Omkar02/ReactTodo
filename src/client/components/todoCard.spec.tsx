import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoCard from './todoCard';
import '@testing-library/jest-dom';

describe('Testing TodoCard Component', () => {
    test('renders todo card with title', () => {
        const todo = {
            _id: 1,
            title: 'Test Todo',
            description: 'This is a test todo',
            status: 'Todo',
            updated_at: new Date(),
        };
        const mockHandleUpdate = jest.fn();
        const mockHandleDelete = jest.fn();
        render(
            <TodoCard
                todo={todo}
                handleUpdate={mockHandleUpdate}
                handleDelete={mockHandleDelete}
            />,
        );
        expect(screen.getByText(todo.title).innerHTML.match(todo['title']));
    });

    it('renders todo title, description, status button, and delete button', () => {
        const mockTodo = {
            _id: 123,
            title: 'Buy groceries',
            description: 'Milk, eggs, bread',
            status: 'Todo',
            updated_at: new Date(2024, 2, 17), // March 17, 2024
        };
        // getTodoColor.mockReturnValueOnce('bg-blue-500'); // Mock getTodoColor for status button

        render(
            <TodoCard
                todo={mockTodo}
                handleUpdate={jest.fn()}
                handleDelete={jest.fn()}
            />,
        );

        const title = screen.getByText('Buy groceries');
        const description = screen.getByText('Milk, eggs, bread');
        const statusButton = screen.getByRole('button', { name: /Todo/i });
        const deleteButton = screen.getByTestId('delete-button');

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(statusButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveClass(
            'p-1 my-1 rounded-md bg-red-500 hover:bg-fuchsia-500',
        ); // Check delete button styles
    });

    it('renders title & description with line-through for completed tasks', () => {
        const mockTodo = {
            _id: 123,
            title: 'Buy groceries',
            description: 'Milk, eggs, bread',
            status: 'Done',
            updated_at: new Date(2024, 2, 17), // March 17, 2024
        };

        render(
            <TodoCard
                todo={mockTodo}
                handleUpdate={jest.fn()}
                handleDelete={jest.fn()}
            />,
        );

        const title = screen.getByText('Buy groceries');
        expect(title).toHaveClass('line-through');
        const description = screen.getByText('Milk, eggs, bread');
        expect(description).toHaveClass('line-through');
    });
});
