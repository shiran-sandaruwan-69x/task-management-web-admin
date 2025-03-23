import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {SignInResType} from "@/auth/auth-types/AuthTypes.ts";

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const location = useLocation();
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    const user:SignInResType = JSON.parse(savedUser);

    if (user?.user?.role !== requiredRole) {
        return <Navigate to={user?.user?.role === "admin" ? "/admin" : "/users"} replace />;
    }

    return children;
};

export default ProtectedRoute;