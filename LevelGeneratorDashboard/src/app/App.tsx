import ThemeToggle from "../features/theme-switcher/ui/ThemeToggle.tsx";

const App = () => {

    return (

        <div className="bg-background text-3xl font-bold underline">
            hello world <br/>
            matchmedia {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}<br/>
            <ThemeToggle/>
        </div>
    )
}

export default App
