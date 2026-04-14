import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button = ({children, onClick, className}: ButtonProps) => {
    return (
        <button onClick={onClick}
                className={`animated flex flex-row gap-2.5 p-1.5 rounded-md text-white text-2xl font-bold h-fit w-fit
                 transition-all duration-100 ease-in-out
        // Это прикольно, может даже оставлю
        hover:scale-105
        hover:shadow-md
        active:scale-95
        active:shadow-none
        active:shadow-inner
        ${className}`}>
                 {/*hover:text-accentBlue*/}
            {children}
        </button>
    );
};

export {Button};