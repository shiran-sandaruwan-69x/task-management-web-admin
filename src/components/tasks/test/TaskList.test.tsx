import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "@/components/tasks/TaskList.tsx";
import { TaskResValuesType } from "@/components/tasks/task-types/TaskTypes.ts";
import userEvent from "@testing-library/user-event";

const mockTasks: TaskResValuesType[] = [
    {
        _id: "1",
        taskName: "Task 1",
        assignee: "User 1",
        startDate: "2023-10-01",
        endDate: "2023-10-10",
        status: true,
        taskStatus: "complete",
    },
];

describe("TaskList Component", () => {
    it("renders the task list with tasks", () => {
        render(
            <TaskList
                tasks={mockTasks}
                onEdit={() => {}}
                onDelete={() => {}}
                isLoading={false}
            />
        );

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("User 1")).toBeInTheDocument();
        expect(screen.getByText("complete")).toBeInTheDocument();
    });

    it("shows loading state when isLoading is true", () => {
        render(<TaskList tasks={[]} onEdit={() => {}} onDelete={() => {}} isLoading={true} />);

        expect(document.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("calls onEdit when edit button is clicked", async () => {
        const mockOnEdit = jest.fn();
        render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={() => {}} isLoading={false} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons.length).toBeGreaterThan(0);

        await userEvent.click(buttons[0]);

        expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
    });

    it("calls onDelete when delete button is clicked", async () => {
        const mockOnDelete = jest.fn();
        render(<TaskList tasks={mockTasks} onEdit={() => {}} onDelete={mockOnDelete} isLoading={false} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons.length).toBeGreaterThan(1);

        await userEvent.click(buttons[1]);

        expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[0]);
    });
});
