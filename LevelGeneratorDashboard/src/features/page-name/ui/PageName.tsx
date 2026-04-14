import {useMatches} from "react-router";

const PageName = () => {
        const routeMatch = useMatches()

    return (
        <div className='flex flex-row justify-center p-3.5 rounded-t-2xl bg-blockColor
        text-2xl font-bold text-text'>
            {(routeMatch.at(-1)?.handle as {title: string})?.title}
        </div>
    );
};

export default PageName;