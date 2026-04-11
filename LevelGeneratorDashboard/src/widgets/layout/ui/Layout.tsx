import React from 'react';
import {NavLink, Outlet} from "react-router";

const Layout = () => {
    return (
        <div className="flex flex-row w-full p-[50px] justify-between gap-[30px]">
            <div className="bg-green-500 w-[250px] flex flex-col h-fit">
                <NavLink to="/" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Главная
                    страничка</NavLink>
                <NavLink to="/something" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Другая
                    страничка</NavLink>
                <NavLink to="/thirdlink" className={({isActive}) => (isActive ? "bg-blue-100" : "bg-red-100")}>Третий вариант
                    страничка</NavLink>
            </div>
            <div className="bg-purple-500 flex-1">
                <div className="bg-blue-500 flex flex-row justify-between">
                    <div className="bg-green-500 h-[50px]">Это название страницы</div>
                    {/*Выбор темы приклеен к потолку*/}
                    <div className="bg-green-500 h-fit">
                        Это выбор темы
                    </div>
                </div>
                <div className="bg-blue-500 h-fit">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Layout;