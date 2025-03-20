import React, {useState, useMemo, useEffect} from "react";
import { Button, Input, Pagination, Modal, Row, Col } from "antd";
import { Plus, Search } from "lucide-react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import DeleteAlertModal from "@/components/common-comp/DeleteAlertModal.tsx";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  status: "active" | "inactive";
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Admin", phone: "94779187704", address: "ss", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "active" },
    { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
    { id: "4", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
    { id: "5", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
    { id: "6", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
    { id: "7", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
    { id: "8", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive" },
  ]);
  const [isTableLoading, setTableLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const toggleModal = () => setIsFormOpen(!isFormOpen);
  const toggleEditModal = () => setIsEditFormOpen(!isEditFormOpen);
  const toggleDeleteModal = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  useEffect(()=>{
    setTableLoading(false);
  },[])

  const handleAddUser = () => {
    setCurrentUser(null);
    toggleModal();
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    toggleEditModal();
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toggleDeleteModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <div className="container mx-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

        <div className="flex justify-between items-center mb-6">
          <Row className="w-full">
            <Col xs={12} sm={8}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
              />
            </Col>
            <Col xs={12} sm={16} className="flex justify-end">
              <Button
                  onClick={handleAddUser}
                  className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Create User
              </Button>
            </Col>
          </Row>
        </div>

        <UserList
            users={paginatedUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            isLoading={isTableLoading}
        />

        <div className="flex justify-center mt-4">
          <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredUsers.length}
              onChange={handlePageChange}
              showSizeChanger={false}
          />
        </div>

        {isFormOpen && (
            <UserForm
                isFormOpen={isFormOpen}
                toggleModal={toggleModal}
                user={currentUser}
                isEditing={false}
            />
        )}

        {isEditFormOpen && (
            <UserForm
                isFormOpen={isEditFormOpen}
                toggleModal={toggleEditModal}
                user={currentUser}
                isEditing
            />
        )}

        {isDeleteDialogOpen && (
            <DeleteAlertModal
                isFormOpen={isDeleteDialogOpen}
                toggleModal={toggleDeleteModal}
                confirmDelete={confirmDelete}
                message="Are you sure you want to delete this user?"
            />
        )}

      </div>
  );
};

export default UserManagement;