import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import {Card, Form, Input, Button, message, Row, Col} from "antd";
import {getOtp} from "@/services/auth-services/AuthServices.ts";
import {toast} from "react-toastify";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";

const ForgotPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: { email: string }) => {
        setIsSubmitting(true);
        try {
            setIsSubmitted(true);
            await getOtp(values.email);
            navigate("/auth/verify-otp", { state: { email: values.email } });
        } catch (error) {
            const isErrorResponse = (error: unknown): error is CommonErrorType => {
                return typeof error === 'object' && error !== null && 'response' in error;
            };
            if (isErrorResponse(error) && error.response) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Internal server error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card
            className="w-full max-w-[400px] mx-auto"
            title="Forgot Password"
        >
            <Card.Meta
                description="Enter your email address and we'll send you a OTP to reset your password."
                className="text-center mb-[24px]"
            />
            {isSubmitted ? (
                <div className="text-center">
                    <MailOutlined
                        className="text-[48px] text-blue-600"/>
                    <h3 className="text-[18px] font-[500] mt-[16px]">
                        Check your email
                    </h3>
                    <p className="text-gray-400">
                        We've sent a password reset link to your email address. Please check
                        your inbox.
                    </p>
                </div>
            ) : (
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Row className="w-full">
                    <Col xs={24}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter your email address" },
                            { type: "email", message: "Please enter a valid email address" },
                        ]}
                    >
                        <Input placeholder="Enter your email address" />
                    </Form.Item>
                    </Col>
                        <Col xs={24}>
                    <Form.Item>
                        <Button
                            color="default"
                            variant="solid"
                            htmlType="submit"
                            block
                            loading={isSubmitting}
                            iconPosition="end"
                        >
                            {isSubmitting ? "Sending..." : "Send Reset OTP"}
                        </Button>
                    </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
            <div className="text-center mt-[16px]">
                <Link to="/auth/login" className="!text-blue-900 !font-bold">
                    Back to Login
                </Link>
            </div>
        </Card>
    );
};

export default ForgotPasswordForm;