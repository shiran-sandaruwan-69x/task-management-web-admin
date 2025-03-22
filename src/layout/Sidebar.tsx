import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, CheckSquare,ArrowLeftToLine,ArrowRightToLine } from "lucide-react";
import { Layout, Menu } from "antd";
import {navItemsTypes} from "@/components/common-types/CommonTypes.ts";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
    navItems:navItemsTypes[]
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
                     navItems
}: SidebarProps) => {
  const location = useLocation();
  const { Sider } = Layout;


  return (
      <Sider
          width={collapsed ? 80 : 250}
          className="h-screen bg-background border-r transition-all duration-300 ease-in-out"
          collapsible
          collapsed={collapsed}
          onCollapse={onToggleCollapse}
          trigger={
            <div
                className="flex items-center justify-center bg-background py-[12px] font-bold cursor-pointer"
            >
              {collapsed ? <ArrowRightToLine size={24} className="text-black" /> : <ArrowLeftToLine size={24} className="text-black" />}
            </div>
          }
      >
        <div className="flex items-center justify-center mb-8 py-4">
          {collapsed ? (
              <div className="w-20 h-20 rounded-full flex items-center justify-center ">
                <img src="/logo3.png" alt="Logo" className="h-20 w-20 mx-auto" />
              </div>
          ) : (
           <span>
             <img src="/logo3.png" alt="Logo" className="h-20 w-20 mx-auto" />
             <h1 className="text-2xl font-bold text-black">Task Manager</h1>
           </span>
          )}
        </div>

        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={navItems.map((item:navItemsTypes) => ({
              key: item.path,
              icon: item.icon,
              label: <Link to={item.path}>{item.title}</Link>,
            }))}
        />
      </Sider>
  );
};

export default Sidebar;
