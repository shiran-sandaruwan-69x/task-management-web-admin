import React, {useEffect, useState} from "react";
import {Form, Input, Select, Button, Switch, Row, Col, DatePicker, Modal} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import {TaskFormValuesType} from "@/components/tasks/task-types/TaskTypes.ts";
import {toast} from "react-toastify";
import {CommonErrorType} from "@/components/common-types/CommonTypes.ts";
import {createTask} from "@/services/task-services/TaskServices.ts";
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
    status: string;
}
interface TaskFormProps {
    isFormOpen:boolean;
    toggleModal:()=>void;
    isEditing?: boolean;
    task:Task;
    getAllTasks:()=>void;
}
const TaskForm: React.FC<TaskFormProps> = ({
                                               isFormOpen,
                                               toggleModal,
                                               isEditing,
                                               task,
                                               getAllTasks
                                           }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                ...task,
                status: task.status === "active",
            });
        } else {
            form.resetFields();
            form.setFieldsValue({
                status: true,
            });
        }
    }, [task, form]);

    const handleSubmit = async (values: TaskFormValuesType) => {
        const formattedValues:TaskFormValuesType = {
            ...values,
            description:values.description ?? null,
            assignUser:values.assignUser ?? null,
            startDate: values.startDate ? moment(values.startDate).format("YYYY-MM-DD") : null,
            endDate: values.endDate ? moment(values.endDate).format("YYYY-MM-DD") : null,
        };
        try {
            setIsLoading(true);
            await createTask(formattedValues);
            getAllTasks();
            toast.success('Created successfully!');
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
    };

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
            <Form form={form} onFinish={handleSubmit} layout="vertical" className="w-full mx-auto">
                <Row>
                    <Col xs={24}>
                        <Form.Item
                            label="Task Name"
                            name="taskName"
                            rules={[{ required: true, message: "Please enter the task name" }]}
                        >
                            <Input placeholder="Enter task name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                { max: 1250, message: "Description must be less than 1250 characters" }
                            ]}
                        >
                            <TextArea rows={4} placeholder="Enter description of the task" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Assignee"
                            name="assignUser"
                            rules={[]}
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
                            rules={[]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                suffixIcon={<CalendarOutlined />}
                                // disabledDate={(current) => current && current < moment().startOf('day')}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            rules={[]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                suffixIcon={<CalendarOutlined />}
                                // disabledDate={(current) => current && current < moment().startOf('day')}
                            />
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
                        <Button loading={isLoading} color="default" variant="solid" htmlType="submit">
                            {isEditing ? "Update Task" : "Create Task"}
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default TaskForm;