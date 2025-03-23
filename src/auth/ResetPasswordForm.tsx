import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, CheckCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, message } from "antd";
import {resetPassword} from "@/services/auth-services/AuthServices.ts";
import {ResetPasswordType} from "@/auth/auth-types/AuthTypes.ts";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {toast} from "react-toastify";

interface ResetPasswordFormProps {
    onSubmit?: (data: { password: string; confirmPassword: string }) => void;
    token?: string;
}

const ResetPasswordForm = ({
                               onSubmit,
                               token = "",
                           }: ResetPasswordFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const isVerified = location.state?.verified || false;
    const email = location.state?.email || "";

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        if (onSubmit) {
            onSubmit(values);
            return;
        }
        try {
            setIsLoading(true);
            const data:ResetPasswordType = {
                email:email,
                password:values.password,
            }
            await resetPassword(data);
            navigate("/auth/login");
        }catch (error){
            const isErrorResponse = (error: unknown): error is CommonErrorType => {
                return typeof error === 'object' && error !== null && 'response' in error;
            };
            if (isErrorResponse(error) && error.response) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Internal server error');
            }
        }finally {
            setIsLoading(false);
        }
    };

    if (!isVerified && !token) {
        setTimeout(() => {
            navigate("/auth/forgot-password");
        }, 0);
        return null;
    }

    return (
        <Card
            className="w-full max-w-[400px] mx-auto"
            title={
                <div  className="text-center">
                    <div style={{ marginBottom: "16px" }}>
                        <LockOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
                    </div>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Reset Password</h2>
                    <p style={{ color: "#8c8c8c" }}>Enter your new password below</p>
                </div>
            }
        >
            {isSuccess ? (
                <div  className="text-center p-[24px]">
                    <CheckCircleOutlined className="text-[64px] text-green-600" />
                    <h3 className="text-[20px] font-semibold mt-[16px]">
                        Password Reset Successful
                    </h3>
                    <p className="text-gray-400 font-[100]">
                        Your password has been reset successfully. You will be redirected to
                        the login page.
                    </p>
                </div>
            ) : (
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    {token && <input type="hidden" value={token} />}

                    <Form.Item
                        name="password"
                        label="New Password"
                        rules={[
                            { required: true, message: "Please enter your new password" },
                            { min: 8, message: "Password must be at least 8 characters" },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                                message: "Password must include uppercase, lowercase, and number",
                            },
                        ]}
                    >
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            suffix={
                                <Button
                                    type="text"
                                    icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Please confirm your new password" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords don't match"));
                                },
                            }),
                        ]}
                    >
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                            suffix={
                                <Button
                                    type="text"
                                    icon={
                                        showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />
                                    }
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            color="default"
                            variant="solid"
                            htmlType="submit"
                            block
                            loading={isLoading}
                            disabled={isLoading}
                            iconPosition="end"
                        >
                            {isLoading ? "Resetting Password..." : "Reset Password"}
                        </Button>
                    </Form.Item>
                </Form>
            )}

            {!isSuccess && (
                <div className="text-center mt-[16px]">
                    <Button className="!text-blue-900 !font-bold" type="link" onClick={() => navigate("/auth/login")}>
                        Back to Login
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default ResetPasswordForm;