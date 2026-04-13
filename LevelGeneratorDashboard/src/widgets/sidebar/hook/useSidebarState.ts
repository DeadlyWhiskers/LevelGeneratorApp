import {useEffect, useState} from "react";
import {getSidebarState, setSidebarState} from "@/widgets/sidebar/model/sidebar-state.ts";

export const useSidebarState = () => {
    const [sidebarState, setState] = useState<'full' | 'minimised'>(getSidebarState());

    const toggleSidebar = () => {
        setState(prev => {
                const next = prev === 'full' ? 'minimised' : 'full'
                setSidebarState(next)
                return next;
            }
        )
    }

    useEffect(() => {
        setSidebarState(sidebarState)
    }, [sidebarState]);

    return {sidebarState, toggleSidebar};
}