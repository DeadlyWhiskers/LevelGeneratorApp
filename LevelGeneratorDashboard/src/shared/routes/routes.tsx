import React from "react";
import hammerIcon from "@/shared/assets/icons/hammer.png";
// import scalesIcon from "@/shared/assets/icons/scales.png";
import flaskIcon from "@/shared/assets/icons/flask15.png"
import clipboardIcon from "@/shared/assets/icons/clipboard15.png"
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
        path: 'experiment', element: React.createElement(
            'div',
            {className: 'h-[200px]'},
            'А тут что-то другое'),
        handle: {
            title: 'Тестирование',
            icon: flaskIcon
        }
    },
    {
        path: 'experiments', element: React.createElement(
            'div',
            {className: 'h-[200px]'},
            'А тут что-то другое'),
        handle: {
            title: 'Эксперименты',
            icon: clipboardIcon
        }
    }
]