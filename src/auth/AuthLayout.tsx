import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <img src="/logo3.png" alt="Logo" className="h-20 w-20 mx-auto" />
          <h1 className="text-2xl font-bold">Task Management System</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
