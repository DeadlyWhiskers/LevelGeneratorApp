import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const GenericButton = ({children, onClick, className}: ButtonProps) => {
    return (
        <button onClick={onClick}
                className={`animated flex flex-row
                 transition-all duration-100 ease-in-out
                 hover:text-accentBlue
        // Это прикольно, может даже оставлю
        hover:scale-105
        hover:shadow-md
        active:scale-95
        active:shadow-none
        active:shadow-inner
        ${className}`}>
            {children}
        </button>
    );
};

export {GenericButton};