import React from "react";
import { Table, Button} from "antd";
import { Edit, Trash, UserPlus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

interface UserListProps {
  users?: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  isLoading:boolean;
}

const UserList: React.FC<UserListProps> = ({
                                             users = [],
                                             onEdit = () => {},
                                             onDelete = () => {},
                                               isLoading
                                           }) => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      key: "status",
      render: (record: User) => (
          <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
          >
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: User) => (
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
            dataSource={users}
            columns={columns}
            rowKey="id"
            pagination={false}
            loading={isLoading}
        />
      </div>
  );
};

export default UserList;