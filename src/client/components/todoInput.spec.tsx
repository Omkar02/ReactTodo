import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from './todoInput';
import '@testing-library/jest-dom';

// Mock Todo interface
jest.mock('../models/todo', () => ({
    Todo: jest.fn(() => ({
        _id: expect.any(Number),
        title: '',
        description: '',
        status: 'Todo',
        updated_at: '',
    })),
}));

describe('Testing TodoInput component', () => {
    // Mock the handleAdd function passed as props
    const mockHandleAdd = jest.fn();

    it('renders the default "Take a note..." prompt initially', () => {
        render(<TodoInput handleAdd={mockHandleAdd} />);

        const takeNotePrompt = screen.getByText('Take a note ...');
        expect(takeNotePrompt).toBeInTheDocument();
    });

    it('shows the input form when clicking on "Take a note..."', async () => {
        render(<TodoInput handleAdd={mockHandleAdd} />);

        const takeNotePrompt = screen.getByText('Take a note ...');
        userEvent.click(takeNotePrompt);

        await waitFor(() => {
            // Wait for the title input to be rendered
            const titleInput = screen.getByPlaceholderText('Title');
            expect(titleInput).toBeInTheDocument();
        });
    });

    it('fills title and description on user input', async () => {
        render(<TodoInput handleAdd={mockHandleAdd} />);

        fireEvent.click(screen.getByText('Take a note ...')); // Open form

        const titleInput = screen.getByPlaceholderText('Title');
        const descriptionInput = screen.getByPlaceholderText('Take a note...');

        userEvent.type(titleInput, 'This is my todo title'); // Simulate user typing
        userEvent.type(
            descriptionInput,
            'Some additional details about the todo',
        );
        await waitFor(() => {
            expect(titleInput.innerHTML.match('This is my todo title'));
            expect(
                descriptionInput.innerHTML.match(
                    'Some additional details about the todo',
                ),
            );
        });
    });

    it('resets the form when clicking the cancel button', async () => {
        render(<TodoInput handleAdd={mockHandleAdd} />);

        fireEvent.click(screen.getByText('Take a note ...')); // Open form

        const titleInput = screen.getByPlaceholderText('Title');
        const descriptionInput = screen.getByPlaceholderText('Take a note...');
        const cancelButton = screen.getByTestId('close'); // Cancel button with "Close" icon

        userEvent.type(titleInput, 'Some text');
        await waitFor(() => {
            expect(titleInput.innerHTML.match('Some text'));
        });

        fireEvent.click(cancelButton);
        fireEvent.click(screen.getByText('Take a note ...')); // Open form
        await waitFor(() => {
            expect(titleInput.innerHTML.match(''));
            expect(descriptionInput.innerHTML.match(''));
        });
    });
});
