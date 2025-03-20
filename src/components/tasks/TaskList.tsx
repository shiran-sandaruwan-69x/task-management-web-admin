import React from "react";
import {Edit, Trash} from "lucide-react";
import { Table, Button} from "antd";

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
  tasks?: Task[];
  onEdit?: (record: Task) => void;
  onDelete?: (record: Task) => void;
  isLoading:boolean;
}

const TaskList = ({
                    tasks,
  onEdit,
  onDelete,
                    isLoading
}: TaskListProps) => {

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Assignee", dataIndex: "email", key: "email", },
    { title: "Start Date", dataIndex: "startDate", key: "startDate"},
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: "Actions",
      key: "actions",
      render: (record: Task) => (
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
