import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/auth/AuthLayout";
import { lazy } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import ForgotPasswordForm from "@/auth/ForgotPasswordForm.tsx";
import OTPVerificationForm from "@/auth/OTPVerificationForm.tsx";
import ResetPasswordForm from "@/auth/ResetPasswordForm.tsx";

const LoginForm = lazy(() => import("@/auth/LoginForm"));
const AdminDashboard = lazy(() => import("../components/dashboard/AdminDashboard"));
const UserTaskManagement = lazy(() => import('UserDashboard/UserDashboard'));

function TaskManagementRoutes() {
    return (

        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="auth/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="auth/verify-otp" element={<OTPVerificationForm />} />
                <Route path="auth/reset-password" element={<ResetPasswordForm />} />
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
                        <UserTaskManagement />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default TaskManagementRoutes;