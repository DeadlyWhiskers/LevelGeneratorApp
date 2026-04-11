import {router} from "@/app/router/router.tsx";
import {RouterProvider} from "react-router";

const App = () => {

    return (
        // <div className="bg-background text-3xl font-bold underline">
        //     hello world <br/>
        //     matchmedia {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}<br/>
        //     <ThemeToggle/>
        // </div>
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
