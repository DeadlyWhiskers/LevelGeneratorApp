// import React from 'react';
import {Outlet} from "react-router";
import DesktopSidebar from "@/widgets/sidebar";
import PageName from "@/features/page-name/ui/PageName.tsx";
import ThemeToggle from "@/features/theme-switcher";

const Layout = () => {
    return (
        <div className="flex flex-row w-full p-[50px] justify-between gap-[30px]">
            {/*<div className="bg-green-500 w-[250px] flex flex-col h-fit">*/}
            {/*    <NavLink to="/" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Главная*/}
            {/*        страничка</NavLink>*/}
            {/*    <NavLink to="/something" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Другая*/}
            {/*        страничка</NavLink>*/}
            {/*    <NavLink to="/thirdlink" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Третий вариант*/}
            {/*        страничка</NavLink>*/}
            {/*</div>*/}
            <DesktopSidebar/>
            <div className="flex-1">
                <div className="flex flex-row justify-between">

                    {/*<div className="bg-green-500 h-[50px]">Это название страницы</div>*/}
                    <PageName/>

                    {/*Выбор темы приклеен к потолку*/}
                    {/*<div className="bg-green-500 h-fit">*/}
                    {/*    Это выбор темы*/}
                    {/*</div>*/}
                    <ThemeToggle/>
                </div>
                <div className="bg-blockColor h-fit flex flex-row justify-center p-2.5 rounded-r-2xl rounded-bl-2xl">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Layout;