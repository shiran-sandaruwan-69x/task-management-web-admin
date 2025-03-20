import React, {useEffect, useState} from "react";
import {Form, Input, Select, Button, Switch, Row, Col, AutoComplete, Modal} from "antd";
import { User, Mail, Shield, MapPin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import {toast} from "react-toastify";

const { Option } = Select;

interface UserFormValues {
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    status?: string;
}

interface UserFormProps {
    isFormOpen:boolean;
    toggleModal:()=>void;
    user?: UserFormValues;
    isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
                                               isFormOpen,
                                               toggleModal,
                                               user,
                                               isEditing ,
                                           }) => {
    const [form] = Form.useForm();
    const apiKey: string = import.meta.env.VITE_GOOGLE_API_KEY as string;
    const [address, setAddress] = useState<string>("");
    const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);

    // Fetch address suggestions from Google Places API
    const fetchAddressSuggestions = async (query: string) => {
        if (!query) return;
        try {
            const response = await axios.post(
                "https://places.googleapis.com/v1/places:searchText",
                {
                    textQuery: query,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": apiKey,
                        "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
                    },
                }
            );

            const places = response.data.places || [];
            const formattedSuggestions = places.map((place: any) => ({
                value: place.formattedAddress,
            }));
            setSuggestions(formattedSuggestions);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
        }
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                ...user,
                status: user.status === "active",
            });
        } else {
            form.resetFields();
            form.setFieldsValue({
                status: true,
            });
        }
    }, [user, form]);

    // Handle address input change
    const handleAddressChange = (value: string) => {
        setAddress(value);
        fetchAddressSuggestions(value);
    };

    // Handle address selection from suggestions
    const handleAddressSelect = (value: string) => {
        setAddress(value);
        form.setFieldsValue({ address: value });
    };

    const handleSubmit = (values: UserFormValues) => {
        toast.error('Internal server error');
         form.resetFields();
    };


    return (
        <Modal
            title={isEditing ? "Edit User" : "Create New User"}
            style={{ top: 20 }}
            open={isFormOpen}
            onCancel={toggleModal}
            footer={null}
        >
        <Form className="w-full mx-auto" form={form} onFinish={handleSubmit} layout="vertical">
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter the full name" }]}
                    >
                        <Input prefix={<User size={18} />} placeholder="Enter full name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[{ required: true, message: "Please enter a valid email" }]}
                    >
                        <Input prefix={<Mail size={18} />} placeholder="Enter email address" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="User Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select prefix={<Shield size={18} />} placeholder="Select a role">
                            <Option value="admin">Administrator</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="user">Regular User</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            { required: true, message: "Please enter your phone number" },
                            {
                                pattern: /^\+?[1-9]\d{1,14}$/,
                                message: "Please enter a valid phone number",
                            },
                        ]}
                    >
                        <PhoneInput
                            country={"lk"}
                            inputClass="ant-input"
                            enableSearch={true}
                            placeholder="Enter phone number"
                            specialLabel=""
                            containerStyle={{ width: "100%" }}
                            inputStyle={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item label="Address (Optional)" name="address">
                        <AutoComplete
                            options={suggestions}
                            onSearch={handleAddressChange}
                            onSelect={handleAddressSelect}
                            value={address}
                        >
                            <Input
                                prefix={<MapPin size={18} />}
                                placeholder="Enter address"
                                allowClear
                            />
                        </AutoComplete>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item label="Status" name="status" valuePropName="checked">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked
                                className="custom-switch"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item className="flex justify-end">
                        <Button color="default" variant="solid" htmlType="submit">
                            {isEditing ? "Update User" : "Create User"}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </Modal>
    );
};

export default UserForm;