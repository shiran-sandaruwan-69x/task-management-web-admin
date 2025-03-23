import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from "@/components/tasks/TaskForm.tsx";
import * as TaskServices from "@/services/task-services/TaskServices";

jest.mock("@/services/task-services/TaskServices", () => ({
    createTask: jest.fn(),
    updateTask: jest.fn(),
}));

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

    it('renders the TaskForm component for updating a task', () => {
        const mockTask = {
            _id: "1",
            taskName: "Task 1",
            description: "Task description",
            assignUser: { _id: "123" },
            startDate: "2023-10-01",
            endDate: "2023-10-10",
            status: true,
        };

        render(
            <TaskForm
                isFormOpen={true}
                toggleModal={() => {}}
                isEditing={true}
                task={mockTask}
                getAllTasks={() => {}}
            />
        );
        expect(screen.getByText('Edit Task')).toBeInTheDocument();
    });

    it('submits the form when "Create Task" button is clicked', async () => {
        const mockSubmit = jest.fn();
        (TaskServices.createTask as jest.Mock).mockResolvedValueOnce({ success: true });

        render(
            <TaskForm
                isFormOpen={true}
                toggleModal={() => {}}
                isEditing={false}
                task={null}
                getAllTasks={mockSubmit}
            />
        );

        const taskInput = screen.getByPlaceholderText('Enter task name');
        fireEvent.change(taskInput, { target: { value: 'New Task' } });

        const submitButton = screen.getByRole('button', { name: /create task/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(TaskServices.createTask).toHaveBeenCalledTimes(1);
            expect(mockSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
