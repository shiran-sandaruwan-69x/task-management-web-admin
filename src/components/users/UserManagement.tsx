import React, {useState, useMemo, useEffect} from "react";
import {Button, Input, Pagination, Modal, Row, Col, Select} from "antd";
import {Plus, Search, Shield} from "lucide-react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import DeleteAlertModal from "@/components/common-comp/DeleteAlertModal.tsx";
import useDebounce from "@/components/common-comp/useDebounce.tsx";
import {UserFilteredValuesType, UserRolesType, UserStatusType} from "@/components/users/user-types/UserTypes.ts";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {toast} from "react-toastify";
import {getAllUsers} from "@/services/user-services/UserSerives.ts";

const { Option } = Select;
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
  const [users, setUsers] = useState<User[]>([]);
  const [isTableLoading, setTableLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search state
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchRole, setSearchRole] = useState("Select a role");
  const [searchStatus, setSearchStatus] = useState("Select status");
  const toggleModal = () => setIsFormOpen(!isFormOpen);
  const toggleEditModal = () => setIsEditFormOpen(!isEditFormOpen);
  const toggleDeleteModal = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  const isUserRoles:UserRolesType[] = [
    { id: "admin", name: "Admin" },
    { id: "user", name: "User" }
  ];

  const isUserStatus:UserRolesType[] = [
    { id: "true", name: "Admin" },
    { id: "false", name: "User" }
  ];

  const [filteredValues, setFilteredValues] = useState<UserFilteredValuesType>({
    firstName: null,
    role: null,
    status: null,
    lastName: null,
    address: null
  });

  const debouncedFilter = useDebounce<UserFilteredValuesType>(filteredValues, 1000);

  useEffect(() => {
    if (debouncedFilter) changePageNoOrPageSize(filteredValues);
  }, [debouncedFilter]);

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

  const getAllTask = async ()=>{
   try{
     const response = await getAllUsers(null,null,null,null,null,itemsPerPage,currentPage);
     console.log('res',response)
   }catch (error){
     const isErrorResponse = (error: unknown): error is CommonErrorType => {
       return typeof error === 'object' && error !== null && 'response' in error;
     };
     if (isErrorResponse(error) && error.response) {
       toast.error(error?.response?.data?.message);
     } else {
       toast.error('Internal server error');
     }
   }finally {

   }
  };

  const changePageNoOrPageSize = async (filteredValues: UserFilteredValuesType) => {
    try {
      const response = await getAllUsers(
          filteredValues.firstName,
          filteredValues.role,
          filteredValues.status,
          filteredValues.lastName,
          filteredValues.address,
          itemsPerPage,
          currentPage
      );
      console.log('res',response)
    } catch (error) {
      const isErrorResponse = (error: unknown): error is CommonErrorType => {
        return typeof error === 'object' && error !== null && 'response' in error;
      };
      if (isErrorResponse(error) && error.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Internal server error');
      }
    }
  };

  return (
      <div className="container mx-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

        <div className="flex justify-between items-center mb-6">
          <Row className="w-full flex gap-1">
            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="first Name"
                  value={searchFirstName}
                  onChange={(e) => {
                    setSearchFirstName(e.target.value)
                    setFilteredValues({
                      ...filteredValues,
                      firstName: e.target.value
                    });
                  }}
              />
            </Col>

            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Last Name"
                  value={searchLastName}
                  onChange={(e) => {
                    setSearchLastName(e.target.value);
                    setFilteredValues({
                      ...filteredValues,
                      lastName: e.target.value
                    });
                  }}
              />
            </Col>

            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Address"
                  value={searchAddress}
                  onChange={(e) => {
                    setSearchAddress(e.target.value);
                    setFilteredValues({
                      ...filteredValues,
                      address: e.target.value
                    });
                  }}
              />
            </Col>

            <Col xs={24} md={8} lg={5} xl={4}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Select
                  className="w-full"
                  prefix={<Shield size={18}/>}
                  placeholder="Select a role"
                  value={searchRole}
                  allowClear
                  onChange={(value: string) => {
                    setSearchRole(value);
                    setFilteredValues({
                      ...filteredValues,
                      role: value
                    });
                  }}
              >
                {isUserRoles.map((user: UserRolesType) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} md={8} lg={5} xl={4}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Select
                  className="w-full"
                  prefix={<Shield size={18}/>}
                  placeholder="Select a status"
                  value={searchStatus}
                  allowClear
                  onChange={(value: string) => {
                    setSearchStatus(value);
                    setFilteredValues({
                      ...filteredValues,
                      status: value === "true"
                    });
                  }}
              >
                {isUserStatus.map((user: UserRolesType) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} sm={24} md={24} lg={15} xl={6} className="flex justify-end">
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
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            isLoading={isTableLoading}
        />

        <div className="flex justify-center mt-4">
          <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={users.length}
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
                getAllTask={getAllTask}
            />
        )}

        {isEditFormOpen && (
            <UserForm
                isFormOpen={isEditFormOpen}
                toggleModal={toggleEditModal}
                user={currentUser}
                isEditing
                getAllTask={getAllTask}
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