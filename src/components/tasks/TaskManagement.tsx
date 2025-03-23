import React, { useState, useEffect, useMemo } from "react";
import {Plus, Search, Shield} from "lucide-react";
import {Button, Input, Pagination, Modal, Col, Row, DatePicker, Select} from "antd";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import DeleteAlertModal from "@/components/common-comp/DeleteAlertModal.tsx";
import {
  TaskFilteredValuesType,
  TaskResApiValuesType,
  TaskResValuesType
} from "@/components/tasks/task-types/TaskTypes.ts";
import {deleteTaskById, getAllTasksApi} from "@/services/task-services/TaskServices.ts";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {toast} from "react-toastify";
import {UserFilteredValuesType, UserRolesType} from "@/components/users/user-types/UserTypes.ts";
import useDebounce from "@/components/common-comp/useDebounce.tsx";
import {CalendarOutlined} from "@ant-design/icons";
import moment from "moment/moment";

const { Option } = Select;

const TaskManagement: React.FC  = () => {
  const [isTableLoading, setTableLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<TaskResValuesType>(null);
  const [deleteTask, setDeleteTask] = useState<TaskResValuesType>(null);
  const [allTasks, setAllTasks] = useState( []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search state
  const [searchTaskName, setTaskName] = useState("");
  const [searchUserName, setUserName] = useState("");
  const [searchEndDate, setEndDate] = useState<moment.Moment | null>(null);
  const [searchStartDate, setStartDate] = useState<moment.Moment | null>(null);
  const [searchDescription, setDescription] = useState("");
  const [searchStatus, setSearchStatus] = useState("Select status");

  const toggleModal = () => setIsFormOpen(!isFormOpen);
  const toggleEditModal = () => setIsEditFormOpen(!isEditFormOpen);
  const toggleDeleteModal = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  const isUserStatus:UserRolesType[] = [
    { id: "true", name: "Active" },
    { id: "false", name: "Inactive" }
  ];

  const [filteredValues, setFilteredValues] = useState<TaskFilteredValuesType>({
    taskName:null,
      firstName:null,
    endDate:null,
    startDate:null,
    status:null,
    description:null
  });

  const debouncedFilter = useDebounce<TaskFilteredValuesType>(filteredValues, 1000);

  useEffect(() => {
    if (debouncedFilter) changePageNoOrPageSize(filteredValues);
  }, [debouncedFilter]);

  const handleCreateTask = () => {
    setEditingTask(null);
    toggleModal();
  };

  const handleEditTask = (record: TaskResValuesType) => {
    setEditingTask(record);
    toggleEditModal();
  };

  const handleDeleteTask = (record: TaskResValuesType) => {
    setDeleteTask(record);
    toggleDeleteModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    toggleDeleteModal();
    try {
      const id:string = deleteTask._id ?? null;
      await deleteTaskById(id);
      getAllTasks();
    }catch (error){
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

  const getAllTasks = async ()=>{
    try {
      const response:TaskResApiValuesType = await getAllTasksApi(null,null,null,null,null,null,null,null,itemsPerPage,currentPage);
      const data:TaskResValuesType[] = response.data.map((records:TaskResValuesType)=>({
        ...records,
        assignee:records?.assignUser?.firstName,
        startDate: moment(records.startDate).format("YYYY-MM-DD"),
        endDate: moment(records.endDate).format("YYYY-MM-DD")
      }))
      setAllTasks(data);
    }catch (error){
      const isErrorResponse = (error: unknown): error is CommonErrorType => {
        return typeof error === 'object' && error !== null && 'response' in error;
      };
      if (isErrorResponse(error) && error.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Internal server error');
      }
    }
  }

  const changePageNoOrPageSize = async (filteredValues: TaskFilteredValuesType) => {
    try {
      const response:TaskResApiValuesType = await getAllTasksApi(
          filteredValues.taskName,
          null,
          filteredValues.status,
          filteredValues.description,
          filteredValues.startDate,
          filteredValues.endDate,
          null,
          filteredValues.firstName,
          itemsPerPage,
          currentPage
      );
      const data:TaskResValuesType[] = response.data.map((records:TaskResValuesType)=>({
        ...records,
        assignee:records?.assignUser?.firstName,
        startDate: moment(records.startDate).format("YYYY-MM-DD"),
        endDate: moment(records.endDate).format("YYYY-MM-DD")
      }))
      setAllTasks(data);
    }catch (error){
      const isErrorResponse = (error: unknown): error is CommonErrorType => {
        return typeof error === 'object' && error !== null && 'response' in error;
      };
      if (isErrorResponse(error) && error.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Internal server error');
      }
    }
  }

  return (
      <div className="container mx-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Management</h1>

        <div className="flex justify-between items-center mb-6">
          <Row className="w-full flex gap-1">
            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="first Name"
                  value={searchTaskName}
                  onChange={(e) => {
                    setTaskName(e.target.value)
                    setFilteredValues({
                      ...filteredValues,
                      taskName: e.target.value
                    });
                  }}
              />
            </Col>
            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="First Name"
                  value={searchUserName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                    setFilteredValues({
                      ...filteredValues,
                      firstName: e.target.value
                    });
                  }}
              />
            </Col>
            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <DatePicker
                  style={{ width: "100%" }}
                  value={searchStartDate}
                  suffixIcon={<CalendarOutlined />}
                  placeholder="Start Date"
                  allowClear
                  onChange={(date: moment.Moment | null) => {
                    setStartDate(date);
                    setFilteredValues({
                      ...filteredValues,
                      startDate: date ? date.format("YYYY-MM-DD") : null,
                    });
                  }}
              />
            </Col>
            <Col xs={12} md={8} lg={5} xl={3}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <DatePicker
                  style={{ width: "100%" }}
                  value={searchEndDate}
                  suffixIcon={<CalendarOutlined />}
                  placeholder="End Date"
                  allowClear
                  onChange={(date: moment.Moment | null) => {
                    setEndDate(date);
                    setFilteredValues({
                      ...filteredValues,
                      endDate: date ? date.format("YYYY-MM-DD") : null
                    });
                  }}
              />
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
                    const status:boolean = value === undefined ? null : value === "true" ? true : false;
                    setSearchStatus(value);
                    setFilteredValues({
                      ...filteredValues,
                      status: status
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
              <Button onClick={handleCreateTask} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create Task
              </Button>
            </Col>
          </Row>
        </div>

        <TaskList
            tasks={allTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isLoading={isTableLoading}
        />

        <div className="flex justify-center mt-4">
          <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={allTasks.length}
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
                getAllTasks={getAllTasks}
            />
        )}

        {isEditFormOpen && (
            <TaskForm
                isFormOpen={isEditFormOpen}
                toggleModal={toggleEditModal}
                isEditing
                task={editingTask}
                getAllTasks={getAllTasks}
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