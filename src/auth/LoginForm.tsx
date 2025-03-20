import React, {useEffect, useState} from "react";
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {Button, Form, Input, Checkbox, message, Row, Col} from "antd";

interface LoginFormValues {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

const LoginForm = ({
                     onSubmit,
                     isLoading: externalIsLoading = false,
                   }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simulate checking for existing session on component mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would check for a valid token in localStorage or cookies
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log('parsedUser',parsedUser)
          setIsAuthenticated(true);

          // Redirect to appropriate dashboard
          if (parsedUser.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/users");
          }
        } catch (error) {
          // Invalid user data in storage
          localStorage.removeItem("user");
          navigate("/auth/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const onFinish = (values: LoginFormValues) => {

    if (onSubmit) {
      onSubmit(values);
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock authentication logic
      if (
          values.email === "admin@example.com" &&
          values.password === "password"
      ) {
        // Admin user
        const adminUser = {
          id: "1",
          name: "Admin",
          email: values.email,
          role: "admin",
        };
        localStorage.setItem("user", JSON.stringify(adminUser));
        navigate("/admin");
      } else if (
          values.email === "user@example.com" &&
          values.password === "password"
      ) {
        // Regular user
        const regularUser = {
          id: "2",
          name: "John Doe",
          email: values.email,
          role: "user",
        };
        localStorage.setItem("user", JSON.stringify(regularUser));
        navigate("/users");
      } else {
        // Authentication failed
        message.error(
            "Invalid email or password. Try admin@example.com / password or user@example.com / password",
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row>
              <Col xs={24}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                  <Input
                      size="large"
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="you@example.com"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                >
                  <Input.Password
                      size="large"
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="••••••••"
                      iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                  />
                </Form.Item>
              </Col>

              <Col xs={24} className="mt-3">
                <Form.Item>
                  <Button
                      size="large"
                      color="default"
                      variant="solid"
                      htmlType="submit"
                      className="w-full"
                      loading={isLoading || externalIsLoading}
                      iconPosition="end"
                  >
                    {isLoading || externalIsLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
      </div>
  );
};

export default LoginForm;