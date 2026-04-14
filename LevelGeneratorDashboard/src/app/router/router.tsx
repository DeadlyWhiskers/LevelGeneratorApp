import {createBrowserRouter} from "react-router";
// import React from "react";
import Layout from "@/widgets/layout";
import {appRoutes} from "@/shared/routes";

export const router = createBrowserRouter([{
        path: '/',
        element: <Layout/>,
        children: appRoutes.map(route => ({
            ...route,
            index: route.path === '/'
        }))
        // {
        //     path: 'thirdlink', element: React.createElement(
        //         'div',
        //         {className: 'h-[200px]'},
        //         'Третья страничка')
        // }

    }
    ])
;