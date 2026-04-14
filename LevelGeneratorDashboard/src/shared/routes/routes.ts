import React from "react";
import hammerIcon from "@/shared/assets/icons/hammer.png";
import scalesIcon from "@/shared/assets/icons/scales.png";

export const appRoutes = [
    {
        path: '/', element: React.createElement(
            'div',
            {className: 'h-[200px]'},
            'А тут контент'),
        handle: {
            title: 'Редактор',
            icon: hammerIcon
        }
    },
    {
        path: 'something', element: React.createElement(
            'div',
            {className: 'h-[200px]'},
            'А тут что-то другое'),
        handle: {
            title: 'Сравнение',
            icon: scalesIcon
        }
    }
]