import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Dropdown, Menu, Button, Avatar, MenuProps} from "antd";
import {LogOut} from "lucide-react";
import {SignInResType} from "@/auth/auth-types/AuthTypes.ts";
import {axiosApi} from "@/services/axios_instances.ts";
interface AdminDashboardProps {
    sidebarCollapsed?: boolean;
    headerText?: string;
}
type MenuItem = Required<MenuProps>["items"][number];

const Header = ({sidebarCollapsed,headerText}: AdminDashboardProps) => {
    const [user, setUser] = useState<SignInResType>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser:SignInResType = JSON.parse(savedUser);
            axiosApi.defaults.headers.common.Authorization = `Bearer ${parsedUser?.token}`;
            setUser(parsedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        axiosApi.defaults.headers.common.Authorization = "";
        navigate("/auth/login");
    };

    const menuItems:MenuItem[] = [
        {
            key: "logout",
            label: "Logout",
            icon: <LogOut className="mr-2 h-4 w-4" />,
            className: "!text-red-500",
            onClick: handleLogout,
        },
    ];

    return (
        <header className="bg-white border-b border-[#f0f0f0] p-[16px_24px] flex items-center justify-between">
            <h1 className="text-[20px] font-semibold m-0">{headerText}</h1>

            <div className="flex items-center gap-[16px]">
                {/* User menu */}
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button type="text" className="flex items-center gap-[8px]">
                        <Avatar src="/user.jpg" alt={user?.user?.firstName} size="default">
                            {user?.user?.firstName}
                        </Avatar>
                        {!sidebarCollapsed && (
                            <span className="text-[14px] font-[500]">{user?.user?.firstName}</span>
                        )}
                    </Button>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;