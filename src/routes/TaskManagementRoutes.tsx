import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/auth/AuthLayout";
import { lazy } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";

const LoginForm = lazy(() => import("@/auth/LoginForm"));
const AdminDashboard = lazy(() => import("../components/dashboard/AdminDashboard"));
const UserDashboard = lazy(() => import("../components/dashboard/UserDashboard"));

function TaskManagementRoutes() {
    return (

        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<LoginForm />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<LoginForm />} />
            </Route>
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users/*"
                element={
                    <ProtectedRoute requiredRole="user">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default TaskManagementRoutes;