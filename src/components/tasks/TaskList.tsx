import React from "react";
import {Edit, Trash} from "lucide-react";
import { Table, Button} from "antd";
import {TaskResType, TaskResValuesType} from "@/components/tasks/task-types/TaskTypes.ts";

interface TaskListProps {
  tasks?: TaskResValuesType[];
  onEdit?: (record: TaskResValuesType) => void;
  onDelete?: (record: TaskResValuesType) => void;
  isLoading:boolean;
}

const TaskList = ({
                    tasks,
  onEdit,
  onDelete,
                    isLoading
}: TaskListProps) => {

  const columns = [
    { title: "Task Name", dataIndex: "taskName", key: "taskName" },
    { title: "Assignee", dataIndex: "assignee", key: "assignee" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate"},
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
      {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status: boolean) => (
              <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
              >
          {status ? "Active" : "Inactive"}
        </span>
          )
      },
      {
          title: "Task Status",
          dataIndex: "taskStatus",
          key: "taskStatus",
          render: (taskStatus: string) => (
              <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                      taskStatus === "complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
              >
          {taskStatus}
        </span>
          )
      },
    {
      title: "Actions",
      key: "actions",
      render: (record: TaskResValuesType) => (
          <div className="flex gap-2">
            <Button type="link"  size="small" icon={<Edit size={20} />} onClick={() => onEdit(record)} />
            <Button type="link" size="small" icon={<Trash size={20} />} danger onClick={() => onDelete(record)} />
          </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-md shadow-sm">
      <Table
          dataSource={tasks}
          columns={columns}
          rowKey="_id"
          pagination={false}
          loading={isLoading}
      />
    </div>
  );
};

export default TaskList;
