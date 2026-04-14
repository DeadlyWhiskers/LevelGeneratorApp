// import React from 'react';
import {getTheme, toggleTheme} from "@/shared/model/preferences";
import {GenericButton} from "@/shared/ui/button/GenericButton.tsx";
import dayAndNight from "@/shared/assets/icons/day-and-night.png"
import {useState} from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(getTheme)

    const handleThemeSwitch = () => {
        toggleTheme()
        setTheme(getTheme())
    }

    // ВНИМАНИЕ СДЕЛАТЬ ХУК ДЛЯ ТЕМЫ, ЧТОБЫ БЫЛО ПРОЩЕ ОБНОВЛЯТЬ ИКОНКИ (Но потом)

    return (
        // <div className="bg-blue-100 size-fit">
        //     {/*this is a placeholder for future better theme swithcer <br/>*/}
        //     {/*<button className="bg-accentGreen text-text text-2xl" onClick={toggleTheme}>*/}
        //     {/*    click here to toggle theme*/}
        //     {/*</button>*/}
        // </div>
        // <div></div>
        <GenericButton onClick={handleThemeSwitch}
                       className='bg-blockColor text-text text-base rounded-md w-fit h-fit px-1.5 py-2 gap-x-1.5 items-center">'>
            Смена темы
            <img src={dayAndNight} alt="Смена темы"
                 className={`h-[20px] w-auto ${theme === 'dark' ? 'invert' : ''}`}/>
        </GenericButton>
    );
};

export default ThemeToggle;