import React from "react";
import { Suspense, lazy } from "react";
import TaskManagementRoutes from "@/routes/TaskManagementRoutes.tsx";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
        </div>
      }
    >
      <TaskManagementRoutes/>
        <ToastContainer
            progressStyle={{
                transformOrigin: 'right',
                transform: 'scaleX(-1)'
            }}
            autoClose={3000}
            position="bottom-right"
            style={{ zIndex: 15000 }}
        />
    </Suspense>
  );
}

export default App;
