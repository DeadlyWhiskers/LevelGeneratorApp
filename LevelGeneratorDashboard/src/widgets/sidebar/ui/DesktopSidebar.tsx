// import React from 'react';
import burgerIcon from '@/shared/assets/icons/burger.png'
import {Button} from "@/shared/ui/button";
import SidebarNavlink from "@/widgets/sidebar/ui/SidebarNavlink.tsx";
import {useSidebarState} from "@/widgets/sidebar/hook/useSidebarState.ts";
import {appRoutes} from "@/shared/routes";

const DesktopSidebar = () => {

    const {sidebarState, toggleSidebar} = useSidebarState()

    const isCollapsed = sidebarState === "minimised";

    return (
        <div className={`animated transition-[width] duration-100 ease-in-out
         ${isCollapsed ? 'w-[55px]' : 'w-[250px]'} flex flex-col h-fit gap-2.5
            bg-blockColor rounded-lg
            `}>
            {/*    Хедер для сайдбара (возможно в отдельный компонент)*/}
            <div className='flex flex-row justify-between items-center p-2.5 shadow h-fit whitespace-nowrap g-0'>
                {!isCollapsed && <h2 className={`text-text text-xl col-text
                 transition-all duration-100 ease-in-out `}>
                    Вкладки
                </h2>}
                <Button className="bg-accentBlue" onClick={() => {
                    toggleSidebar()
                    console.log(sidebarState)
                }}>
                    <img src={burgerIcon} alt="Retract/show sidebar"/>
                </Button>
            </div>
            {/*    Контент сайдбара*/}
            <div className="flex flex-col gap-2.5 p-2.5 w-full ">
                {
                    appRoutes.map((route) => (
                            <SidebarNavlink
                                key={route.path}
                                to={route.path}
                                isCollapsed={isCollapsed}
                                title={route?.handle?.title}
                                iconPath={route?.handle?.icon}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default DesktopSidebar;