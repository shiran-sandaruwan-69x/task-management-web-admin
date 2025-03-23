import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from "@/components/tasks/TaskList.tsx";
import {TaskResValuesType} from "@/components/tasks/task-types/TaskTypes.ts";

const mockTasks:TaskResValuesType[] = [
    {
        _id: '1',
        taskName: 'Task 1',
        assignee: 'User 1',
        startDate: '2023-10-01',
        endDate: '2023-10-10',
        status: true,
        taskStatus: "complete",
    },
];

describe('TaskList Component', () => {
    it('renders the task list with tasks', () => {
        render(
            <TaskList
                tasks={null}
                onEdit={() => {}}
                onDelete={() => {}}
                isLoading={false}
            />
        );
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    it('shows loading state when isLoading is true', () => {
        render(
            <TaskList
                tasks={[]}
                onEdit={() => {}}
                onDelete={() => {}}
                isLoading={true}
            />
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});