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
    }
    ])
;   