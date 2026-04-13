import React from 'react';
import {NavLink} from "react-router";
import '@/shared/ui/animated'

type SidebarNavlinkProps = {
    children: React.ReactNode;
    to: string;
}

const SidebarNavlink = ({children, to}: SidebarNavlinkProps) => {
    return (
        <NavLink to={to} className={({isActive}) => `${isActive ? "bg-background" : "bg-blockColor"}
        animated  min-h-8 flex flex-row justify-between items-center rounded-md px-2.5 py-1 text-base transition-all duration-100 ease-in-out 
        hover:text-accentBlue
        // Это прикольно, может даже оставлю
        hover:scale-105
        hover:shadow-md
        active:scale-95
        active:shadow-none
        active:shadow-inner
        `}>
        {/*hover:brightness-95*/}
            {children}
        </NavLink>
    );
};


export default SidebarNavlink;