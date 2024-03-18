import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoStats from './todoStats.tsx';
import { TodoStatsProps } from '../models/todo';

jest.mock('../util', () => ({
    getTodoColor: jest.fn(),
}));

// Mock Todo interface
jest.mock('../models/todo', () => ({
    Todo: jest.fn(() => ({
        _id: expect.any(Number),
        title: '',
        description: '',
        status: 'Todo', // Initial status
        updated_at: '',
    })),
}));

// Mock handleFilter function
const mockHandleFilter = jest.fn();

describe('Testing TodoStats component', () => {
    it('renders the initial button statistics correctly', () => {
        const todoList = [
            {
                _id: expect.any(Number),
                title: '',
                description: '',
                updated_at: '',
                status: 'Todo',
            },
            {
                _id: expect.any(Number),
                title: '',
                description: '',
                updated_at: '',
                status: 'In Progress',
            },
            {
                _id: expect.any(Number),
                title: '',
                description: '',
                updated_at: '',
                status: 'Done',
            },
        ];
        const currFilter = { query: '', filterKey: '' };

        render(
            <TodoStats
                todoList={todoList}
                currFilter={currFilter}
                handleFilter={mockHandleFilter}
            />,
        );

        // Assert button text and counts
        const allButton = screen.getByText('All');
        waitFor(() => {
            expect(allButton).toBeInTheDocument();
            expect(allButton).toHaveTextContent('3');
        });

        const todoButton = screen.getByText('Todo');
        waitFor(() => {
            expect(todoButton).toHaveTextContent('1');
        });

        const inProgressButton = screen.getByText('In Progress');
        waitFor(() => {
            expect(inProgressButton).toHaveTextContent('1');
        });

        const doneButton = screen.getByText('Done');
        waitFor(() => {
            expect(doneButton).toHaveTextContent('1');
        });
    });

    it('filters todos based on button clicks', async () => {
        const todoList = [
            {
                _id: expect.any(Number),
                title: '',
                description: '',
                updated_at: '',
                status: 'In Progress',
            },
        ];
        let inProgressCount = 0;
        // ? Checking for single status i.e `In Progress`
        todoList.forEach((el) => {
            el.status === 'In Progress' ? (inProgressCount += 1) : '';
        });

        const currFilter = { query: 'In Progress', filterKey: '' };
        const { container } = render(
            <TodoStats
                todoList={todoList}
                currFilter={currFilter}
                handleFilter={mockHandleFilter}
            />,
        );

        const inProgressButton = container.getElementsByClassName('outline-4');
        await waitFor(() => {
            expect(inProgressButton[0].textContent).toBe(
                `In Progress${inProgressCount}`,
            );
        });
    });
});
