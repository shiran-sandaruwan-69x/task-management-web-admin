import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from "@/components/tasks/TaskForm.tsx";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('TaskForm Component', () => {
    it('renders the TaskForm component for creating a new task', () => {
        render(
            <TaskForm
                isFormOpen={true}
                toggleModal={() => {}}
                isEditing={false}
                task={null}
                getAllTasks={() => {}}
            />
        );
        expect(screen.getByText('Create New Task')).toBeInTheDocument();
    });

    it('renders the TaskForm component for editing a task', () => {
        const mockTask = {
            _id: '1',
            taskName: 'Task 1',
            assignUser: 'User 1',
            startDate: '2023-10-01',
            endDate: '2023-10-10',
            status: true,
            taskStatus: "complete",
        };
        render(
            <TaskForm
                isFormOpen={true}
                toggleModal={() => {}}
                isEditing={true}
                task={null}
                getAllTasks={() => {}}
            />
        );
        expect(screen.getByText('Edit Task')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    });

    it('submits the form when "Create Task" button is clicked', async () => {
        const mockSubmit = jest.fn();
        render(
            <TaskForm
                isFormOpen={true}
                toggleModal={() => {}}
                isEditing={false}
                task={null}
                getAllTasks={mockSubmit}
            />
        );

        fireEvent.change(screen.getByPlaceholderText('Enter task name'), {
            target: { value: 'New Task' },
        });

        fireEvent.click(screen.getByText('Create Task'));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalled();
        });
    });
});