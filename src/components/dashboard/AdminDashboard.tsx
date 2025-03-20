import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/layout/Sidebar";
import UserManagement from "../users/UserManagement";
import TaskManagement from "../tasks/TaskManagement";
import Header from "@/layout/Header.tsx";
import {CheckSquare, Users} from "lucide-react";

interface navItemsTypes {
    title?:string;
    icon?:React.ReactElement;
    path?:string;
}

interface AdminDashboardProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const AdminDashboard = ({ user: propUser }: AdminDashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

    const navItems:navItemsTypes[] = [
        {
            title: "User Management",
            icon: <Users size={24}/>,
            path: "/admin/users",
        },
        {
            title: "Task Management",
            icon: <CheckSquare size={24}/>,
            path: "/admin/tasks",
        },
    ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} navItems={navItems}/>

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
       <Header user={propUser} sidebarCollapsed={sidebarCollapsed} headerText="Admin Dashboard"/>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/" element={<Navigate to="/admin/users" replace />} />
            <Route path="*" element={<Navigate to="/admin/users" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
