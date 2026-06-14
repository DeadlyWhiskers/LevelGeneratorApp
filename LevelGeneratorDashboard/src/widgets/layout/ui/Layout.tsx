// import React from 'react';
import {Outlet} from "react-router";
import DesktopSidebar from "@/widgets/sidebar";
import PageName from "@/features/page-name/ui/PageName.tsx";
import ThemeToggle from "@/features/theme-switcher";

const Layout = () => {
    return (
        <div className="flex flex-row w-full p-[50px] justify-between gap-[30px]">
            <DesktopSidebar/>
            <div className="flex-1">
                <div className="flex flex-row justify-between">
                    <PageName/>
                    <ThemeToggle/>
                </div>
                <div className="bg-blockColor h-fit flex flex-col gap-5 justify-center p-2.5 rounded-r-2xl rounded-bl-2xl">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Layout;