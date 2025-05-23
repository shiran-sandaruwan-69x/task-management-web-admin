import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Card, Form, Input, Button, message, Row, Col} from "antd";
import {getOtp, verifyOtp} from "@/services/auth-services/AuthServices.ts";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {toast} from "react-toastify";
import {OtpType} from "@/auth/auth-types/AuthTypes.ts";

interface OTPVerificationFormProps {
    email?: string;
    onVerify?: (otp: string) => void;
    onResend?: () => void;
    isLoading?: boolean;
}

const OTPVerificationForm = ({
                                 email: propEmail,
                                 onVerify,
                                 onResend,
                                 isLoading: propIsLoading = false,
                             }: OTPVerificationFormProps) => {
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const email = propEmail || location.state?.email || "";

    useEffect(() => {
        setResendDisabled(true);
        setCountdown(30);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleResend = async () => {
        try {
            setResendDisabled(true);
            await getOtp(email);
            setCountdown(30);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }catch (error){
            const isErrorResponse = (error: unknown): error is CommonErrorType => {
                return typeof error === 'object' && error !== null && 'response' in error;
            };
            if (isErrorResponse(error) && error.response) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Internal server error');
            }
        }
    };

    const onFinish = async (values: { otp: string }) => {
        if (onVerify) {
            onVerify(values.otp);
            return;
        }
        try {
            const data:OtpType = {
                email:email,
                otp:values.otp
            }
            await verifyOtp(data);
            navigate("/auth/reset-password", { state: { email, verified: true }});
        }catch (error){
            const isErrorResponse = (error: unknown): error is CommonErrorType => {
                return typeof error === 'object' && error !== null && 'response' in error;
            };
            if (isErrorResponse(error) && error.response) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Internal server error');
            }
        }
    };

    return (
        <Card
            title="Verify OTP"
            className="w-full max-w-[400px] mx-auto"
        >
            <Card.Meta
                description={`We've sent a verification code to ${email}. Please enter the code below.`}
                className="text-center mn-[24px]"
            />
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Row>
                    <Col xs={24}>
                <Form.Item
                    name="otp"
                    label="Verification Code"
                    rules={[
                        { required: true, message: "Please enter the 6-digit code" },
                        { len: 6, message: "OTP must be exactly 6 characters" },
                    ]}
                >
                    <Input
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="text-center text-[18px] tracking-[8px]"
                    />
                </Form.Item>
                    </Col>
                    <Col xs={24}>
                <Form.Item>
                    <Button
                        color="default"
                        variant="solid"
                        htmlType="submit"
                        block
                        loading={isLoading || propIsLoading}
                        iconPosition="end"
                    >
                        {isLoading || propIsLoading ? "Verifying..." : "Verify Code"}
                    </Button>
                </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className="text-center mt-[16px]">
                <Button
                    className="!text-blue-900 !font-bold"
                    type="link"
                    onClick={handleResend}
                    disabled={resendDisabled}
                    style={{ padding: 0 }}
                >
                    {resendDisabled
                        ? `Resend code in ${countdown}s`
                        : "Didn't receive a code? Resend"}
                </Button>
            </div>
        </Card>
    );
};

export default OTPVerificationForm;