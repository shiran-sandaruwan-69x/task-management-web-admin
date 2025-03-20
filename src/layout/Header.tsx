import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Dropdown, Menu, Button, Avatar, MenuProps} from "antd";
import {LogOut} from "lucide-react";
interface AdminDashboardProps {
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    sidebarCollapsed?: boolean;
    headerText?: string;
}

type MenuItem = Required<MenuProps>["items"][number];

const Header = ({ user: propUser, sidebarCollapsed,headerText}: AdminDashboardProps) => {
    const [user, setUser] = useState(propUser);
    const navigate = useNavigate();

    // Check if user is logged in and is admin
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/auth/login");
    };

    // Define the menu items
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
        <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>{headerText}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* User menu */}
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button type="text" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Avatar src="/user.jpg" alt={user?.name} size="default">
                            {user?.name}
                        </Avatar>
                        {!sidebarCollapsed && (
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>{user?.name}</span>
                        )}
                    </Button>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;