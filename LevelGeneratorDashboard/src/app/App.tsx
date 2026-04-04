const App = () => {

    const handleThemeChange = () => {
        document.documentElement.classList.toggle('dark');
    }

    return (

        <div className="bg-background text-3xl font-bold underline">
            hello world <br/>
            matchmedia {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}<br/>
            <button type="button" className={"bg-accentGreen text-text"}
                    onClick={handleThemeChange}>
                Mega theme changer 3000
            </button>
        </div>
    )
}

export default App
