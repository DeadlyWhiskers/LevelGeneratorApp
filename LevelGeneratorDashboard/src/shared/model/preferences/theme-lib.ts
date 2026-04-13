const THEME_KEY = 'dashboard-theme-lib';

const getTheme = (): 'light' | 'dark' => {
//     Проверка темы в хранилище
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme !== undefined) return savedTheme as 'light' | 'dark';

//     Проверка на наличие предпочитаемой темы если не нашли сохранённую
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const setTheme = (theme: 'dark' | 'light') => {
    localStorage.setItem(THEME_KEY, theme);

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

const toggleTheme = () => {
    const currentTheme = getTheme();
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export {getTheme, setTheme, toggleTheme};