import React from "react";
import {Edit, Trash} from "lucide-react";
import { Table, Button} from "antd";
import {TaskResType} from "@/components/tasks/task-types/TaskTypes.ts";

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

interface TaskListProps {
  tasks?: TaskResType[];
  onEdit?: (record: TaskResType) => void;
  onDelete?: (record: TaskResType) => void;
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
    { title: "Status", dataIndex: "status", key: "status",render:(record: TaskResType)=>(
          <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.status === true ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
          >
          {record.status === true ? "Active" : "Inactive"}
        </span>
      ) },
    {
      title: "Actions",
      key: "actions",
      render: (record: TaskResType) => (
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
          rowKey="id"
          pagination={false}
          loading={isLoading}
      />
    </div>
  );
};

export default TaskList;
