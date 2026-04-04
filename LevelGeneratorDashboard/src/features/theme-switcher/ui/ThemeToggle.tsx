// import React from 'react';
import {toggleTheme} from "../../../shared/lib/theme-lib";

const ThemeToggle = () => {
    return (
        <div className="bg-blue-100 size-fit">
            this is a placeholder for future better theme swithcer <br/>
            <button className="bg-accentGreen text-text text-2xl" onClick={toggleTheme}>
                click here to toggle theme
            </button>
        </div>
    );
};

export default ThemeToggle;