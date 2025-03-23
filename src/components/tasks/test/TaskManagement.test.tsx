import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TaskManagement from "@/components/tasks/TaskManagement.tsx";

jest.mock('axios');

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
    it('renders the TaskManagement component', () => {
        render(<TaskManagement />);
        expect(screen.getByText('Task Management')).toBeInTheDocument();
    });

    it('opens the task creation modal when "Create Task" button is clicked', () => {
        render(<TaskManagement />);
        const createTaskButton = screen.getByText('Create Task');
        fireEvent.click(createTaskButton);
        expect(screen.getByText('Create New Task')).toBeInTheDocument();
    });

    it('fetches and displays tasks on load', async () => {
        const mockTasks = [
            {
                _id: '1',
                taskName: 'Task 1',
                assignUser: 'User 1',
                startDate: '2023-10-01',
                endDate: '2023-10-10',
                status: true,
                taskStatus: "complete",
            },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: mockTasks } });

        render(<TaskManagement />);
        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
        });
    });
});