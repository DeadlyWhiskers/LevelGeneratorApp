const SIDEBAR_KEY = 'sidebar-state';

const getSidebarState = (): 'full' | 'minimised' => {
//     Проверка состояния сайдбара в хранилище
    const savedSidebarState = localStorage.getItem(SIDEBAR_KEY);
    if (savedSidebarState !== undefined) return savedSidebarState as 'full' | 'minimised';
    return 'full';
}

const setSidebarState = (sidebarState: 'full' | 'minimised') => {
    localStorage.setItem(SIDEBAR_KEY, sidebarState);

    if (sidebarState === 'full') {
        document.documentElement.classList.add('full');
    } else {
        document.documentElement.classList.remove('minimised');
    }
}

export {getSidebarState, setSidebarState};