import React from "react";
import { Navigate, useLocation } from "react-router-dom";

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

    const user = JSON.parse(savedUser);

    if (user.role !== requiredRole) {
        return <Navigate to={user.role === "admin" ? "/admin" : "/users"} replace />;
    }

    return children;
};

export default ProtectedRoute;