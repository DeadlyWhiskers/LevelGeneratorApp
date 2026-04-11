import {createBrowserRouter} from "react-router";
import React from "react";
import Layout from "@/widgets/layout";

export const router = createBrowserRouter([{
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true, element: React.createElement(
                    'div',
                    {className: 'h-[200px]'},
                    'А тут контент')
            },
            {
                path: 'something', element: React.createElement(
                    'div',
                    {className: 'h-[200px]'},
                    'А тут что-то другое')
            },
            {
                path: 'thirdlink', element: React.createElement(
                    'div',
                    {className: 'h-[200px]'},
                    'Третья страничка')
            }
        ]
    }
    ])
;