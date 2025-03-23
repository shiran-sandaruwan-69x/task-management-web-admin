import React from "react";
import { Table, Button} from "antd";
import { Edit, Trash } from "lucide-react";
import {UserResType} from "@/components/users/user-types/UserTypes.ts";

interface UserListProps {
  users?: UserResType[];
  onEdit?: (user: UserResType) => void;
  onDelete?: (user: UserResType) => void;
  isLoading:boolean;
}
const UserList: React.FC<UserListProps> = ({
                                             users = [],
                                             onEdit = () => {},
                                             onDelete = () => {},
                                               isLoading
                                           }) => {
  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
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
      title: "Actions",
      key: "actions",
      render: (record: UserResType) => (
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
            rowKey="_id"
            pagination={false}
            loading={isLoading}
        />
      </div>
  );
};

export default UserList;