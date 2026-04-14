// import React from 'react';
import {NavLink} from "react-router";
import '@/shared/ui/animated'

type SidebarNavlinkProps = {
    to: string;
    isCollapsed?: boolean;
    title: string;
    iconPath: string;
}

const SidebarNavlink = ({to, isCollapsed, title, iconPath}: SidebarNavlinkProps) => {
    return (
        <NavLink to={to} className={({isActive}) => `${isActive ? "bg-background" : "bg-blockColor"}
        animated  min-h-8 flex flex-row justify-between items-center rounded-md px-2.5 py-1 text-text text-base transition-all duration-100 ease-in-out 
        hover:text-accentBlue
        // Это прикольно, может даже оставлю
        hover:scale-105
        hover:shadow-md
        active:scale-95
        active:shadow-none
        active:shadow-inner
        `}>
        {/*hover:brightness-95*/}
            <span className={`${isCollapsed ? "opacity-0" : "opacity-100"} overflow-hidden`}>{title}</span>
            <img src={iconPath} alt="Открыть редактор"/>
        </NavLink>
    );
};


export default SidebarNavlink;