import React, {useEffect, useState} from "react";
import {Form, Input, Select, Button, Switch, Row, Col, AutoComplete, Modal} from "antd";
import { User, Mail, Shield, MapPin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import {toast} from "react-toastify";
import {CreateUserType, UserResType, UserRolesType} from "@/components/users/user-types/UserTypes.ts";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {createUser, updateUser} from "@/services/user-services/UserSerives.ts";

const { Option } = Select;

interface UserFormProps {
    isFormOpen:boolean;
    toggleModal:()=>void;
    user?: UserResType;
    isEditing?: boolean;
    getAllTableUsers:()=>void;
}

const UserForm: React.FC<UserFormProps> = ({
                                               isFormOpen,
                                               toggleModal,
                                               user,
                                               isEditing ,
                                               getAllTableUsers
                                           }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const apiKey: string = process.env.VITE_GOOGLE_API_KEY as string;
    const [address, setAddress] = useState<string>("");
    const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);

    const isUserRoles:UserRolesType[] = [
        { id: "admin", name: "Admin" },
        { id: "user", name: "User" }
    ];

    // Fetch address from Google Places API
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
            toast.error('Error fetching google places api');
        }
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                ...user
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

    // create and update user
    const handleSubmit = async (values: CreateUserType) => {
        if (user?._id){
           try {
               const data:CreateUserType = {
                   ...values,
                   userId:user._id ?? null
               }
               setIsLoading(true);
               await updateUser(data);
               getAllTableUsers();
               toast.success("User updated successfully!");
               form.resetFields();
               toggleModal();
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
        }else {
            try {
                setIsLoading(true);
                await createUser(values);
                getAllTableUsers();
                toast.success("User created successfully! , An invitation email has been sent to email");
                form.resetFields();
                toggleModal();
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
        }

    };


    return (
        <Modal
            title={isEditing ? "Edit User" : "Create New User"}
            style={{ top: 10 }}
            open={isFormOpen}
            onCancel={toggleModal}
            footer={null}
        >
        <Form className="w-full mx-auto" form={form} onFinish={handleSubmit} layout="vertical">
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Please enter the first name" }]}
                    >
                        <Input prefix={<User size={18} />} placeholder="Enter first name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter the last name" }]}
                    >
                        <Input prefix={<User size={18} />} placeholder="Enter last name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter a valid email" },
                            { type: "email", message: "Please enter a valid email address" }
                        ]}
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
                            {isUserRoles.map((user:UserRolesType) => (
                                <Option key={user.id} value={user.id}>
                                    {user.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item
                        label="Phone Number"
                        name="mobileNumber"
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
            <Row className="flex justify-between items-center">
                <Col xs={24} sm={12}>
                    <Form.Item label="Status" name="status" valuePropName="checked">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked
                                className="custom-switch"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} className="sm:mt-10">
                    <Form.Item className="flex justify-end">
                        <Button loading={isLoading} color="default" variant="solid" htmlType="submit"
                                iconPosition="end"
                        >
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