import {Modal} from "antd";
import React from "react";
interface UserFormProps {
    isFormOpen:boolean;
    toggleModal:()=>void;
    confirmDelete:()=>void;
    message:string;
}
const DeleteAlertModal: React.FC<UserFormProps> = ({
                                                           isFormOpen,
                                               toggleModal,
                                               confirmDelete,
                                                       message
                                           }) => {
    return(
        <Modal
            title="Confirm Delete"
            open={isFormOpen}
            onOk={confirmDelete}
            onCancel={() => toggleModal()}
            closable={false}
            okButtonProps={{
                style: {
                    backgroundColor: "#085bef",
                    borderColor: "#085bef",
                    color: "#fff",
                },
            }}
        >
            <p>{message}</p>
        </Modal>
    )
}
export default DeleteAlertModal;
