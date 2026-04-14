import React from "react";
import hammerIcon from "@/shared/assets/icons/hammer.png";
import scalesIcon from "@/shared/assets/icons/scales.png";
import EditorPage from "@/pages/editor-page";

export const appRoutes = [
    {
        path: '/', element: <EditorPage/>,
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