import React, {useEffect} from "react";
import {Form, Input, Select, Button, Switch, Row, Col, DatePicker, Modal} from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

interface Task {
    id: string;
    title: string;
    assignee: {
        id: string;
        name: string;
        email: string;
    };
    startDate: string;
    endDate: string;
    description: string;
}
interface TaskFormProps {
    isFormOpen:boolean;
    toggleModal:()=>void;
    isEditing?: boolean;
    task:Task;
}
const TaskForm: React.FC<TaskFormProps> = ({
                                               isFormOpen,
                                               toggleModal,
                                               isEditing,
                                               task
                                           }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            status: true,
            // startDate: moment("2025-03-20"),
        });
    }, []);

    const handleSubmit = (values: any) => {

        // Format the date values to 'YYYY-MM-DD'
        const formattedValues = {
            ...values,
            startDate: values.startDate ? moment(values.startDate).format("YYYY-MM-DD") : null,
            endDate: values.endDate ? moment(values.endDate).format("YYYY-MM-DD") : null,
        };
    };

    // Mock data for users
    const users = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
        { id: "3", name: "Robert Johnson" },
        { id: "4", name: "Emily Davis" },
    ];

    return (
        <Modal
            title={isEditing ? "Edit Task" : "Create New Task"}
            style={{ top: 20 }}
            open={isFormOpen}
            onCancel={() => toggleModal()}
            footer={null}
            width={800}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical" className="w-full">
                <Row>
                    <Col xs={24}>
                        <Form.Item
                            label="Task Title"
                            name="title"
                            rules={[{ required: true, message: "Please enter the task title" }]}
                        >
                            <Input placeholder="Enter task title" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please enter the task description" }]}
                        >
                            <TextArea rows={4} placeholder="Enter detailed description of the task" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Assignee"
                            name="assignee"
                            rules={[{ required: true, message: "Please select an assignee" }]}
                        >
                            <Select placeholder="Select a user to assign">
                                {users.map((user) => (
                                    <Option key={user.id} value={user.id}>
                                        {user.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[10, 0]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            rules={[{ required: true, message: "Please select a start date" }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                suffixIcon={<CalendarOutlined />}
                                disabledDate={(current) => current && current < moment().startOf('day')}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            rules={[{ required: true, message: "Please select a end date" }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                suffixIcon={<CalendarOutlined />}
                                disabledDate={(current) => current && current < moment().startOf('day')}
                            />
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
                    <Col xs={24} className="flex justify-end space-x-4 pt-4">
                        <Button color="default" variant="solid" htmlType="submit">
                            {isEditing ? "Update Task" : "Create Task"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default TaskForm;