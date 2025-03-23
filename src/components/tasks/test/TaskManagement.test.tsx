import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskManagement from "@/components/tasks/TaskManagement.tsx";
import * as TaskServices from "@/services/task-services/TaskServices.ts";

jest.mock("@/services/task-services/TaskServices.ts", () => ({
    deleteTaskById: jest.fn(),
    getAllTasksApi: jest.fn(),
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

describe('TaskManagement Component', () => {
    const mockTasks = [
        {
            _id: '1',
            taskName: 'Task 1',
            assignUser: { firstName: 'User 1' },
            startDate: '2023-10-01',
            endDate: '2023-10-10',
            status: true,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the TaskManagement component', () => {
        render(<TaskManagement />);
        expect(screen.getByText('Task Management')).toBeInTheDocument();
    });

    it('fetches and displays tasks on load', async () => {
        (TaskServices.getAllTasksApi as jest.Mock).mockResolvedValueOnce({
            data: mockTasks,
        });

        render(<TaskManagement />);

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
        });
    });

    it('opens the task creation modal when "Create Task" button is clicked', () => {
        render(<TaskManagement />);
        const createTaskButton = screen.getByText('Create Task');
        fireEvent.click(createTaskButton);
        expect(screen.getByText('Create New Task')).toBeInTheDocument();
    });
});
