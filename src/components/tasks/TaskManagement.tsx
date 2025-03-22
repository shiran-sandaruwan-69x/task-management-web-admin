import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { Button, Input, Pagination, Modal, Col, Row } from "antd";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import DeleteAlertModal from "@/components/common-comp/DeleteAlertModal.tsx";

interface Task {
  id: string;
  title: string;
  assignee: {
    id: string;
    name: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  description: string;
}

const TaskManagement = () => {
  const [isTableLoading, setTableLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task>(null);
  const [deleteTask, setDeleteTask] = useState<Task>(null);
  const [allTasks, setAllTasks] = useState( [
    {
      id: "1",
      title: "Complete project documentation",
      assignee: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Write comprehensive documentation for the new feature.",
    },
    {
      id: "2",
      title: "Review pull requests",
      assignee: {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Review and approve pending pull requests for the sprint.",
    },
    {
      id: "3",
      title: "Deploy application to production",
      assignee: {
        id: "user3",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description:
          "Deploy the latest version of the application to production servers.",
    },
    {
      id: "4",
      title: "Implement user authentication",
      assignee: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Implement OAuth2 authentication for the application.",
    },
    {
      id: "5",
      title: "Fix navigation bug",
      assignee: {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Fix the navigation bug in the mobile view.",
    },
    {
      id: "6",
      title: "Update dependencies",
      assignee: {
        id: "user3",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Update all dependencies to their latest versions.",
    },
    {
      id: "7",
      title: "Create user dashboard",
      assignee: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Design and implement the user dashboard.",
    },
    {
      id: "8",
      title: "Write unit tests",
      assignee: {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      startDate: "2025-03-10",
      endDate: "2025-04-14",
      description: "Write unit tests for the new features.",
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => setIsFormOpen(!isFormOpen);
  const toggleEditModal = () => setIsEditFormOpen(!isEditFormOpen);
  const toggleDeleteModal = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    return allTasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.endDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTasks, searchQuery]);

  // Paginate tasks
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, itemsPerPage]);

  useEffect(()=>{
    getAllTask();
  },[currentPage,itemsPerPage])

  const handleCreateTask = () => {
    setEditingTask(null);
    toggleModal();
  };

  const handleEditTask = (record: Task) => {
    setEditingTask(record);
    toggleEditModal();
  };

  const handleDeleteTask = (record: Task) => {
    setDeleteTask(record);
    toggleDeleteModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAllTask =()=>{
    console.log('currentPage',currentPage)
    console.log('itemsPerPage',itemsPerPage)
  }

  const confirmDelete = () => {
    toggleDeleteModal();
  };

  return (
      <div className="container mx-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Management</h1>

        <div className="flex justify-between items-center mb-6">
          <Row className="w-full">
            <Col xs={12} sm={8}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
              />
            </Col>
            <Col xs={12} sm={16} className="flex justify-end">
              <Button onClick={handleCreateTask} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create Task
              </Button>
            </Col>
          </Row>
        </div>

        <TaskList
            tasks={paginatedTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isLoading={isTableLoading}
        />

        <div className="flex justify-center mt-4">
          <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredTasks.length}
              onChange={handlePageChange}
              showSizeChanger={false}
          />
        </div>

        {isFormOpen && (
            <TaskForm
                isFormOpen={isFormOpen}
                toggleModal={toggleModal}
                isEditing={false}
                task={editingTask}
            />
        )}

        {isEditFormOpen && (
            <TaskForm
                isFormOpen={isEditFormOpen}
                toggleModal={toggleEditModal}
                isEditing
                task={editingTask}
            />
        )}

        {isDeleteDialogOpen && (
            <DeleteAlertModal
                isFormOpen={isDeleteDialogOpen}
                toggleModal={toggleDeleteModal}
                confirmDelete={confirmDelete}
                message="Are you sure you want to delete this task?"
            />
        )}

      </div>
  );
};

export default TaskManagement;