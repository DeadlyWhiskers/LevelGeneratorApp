import type {ReactNode} from "react";

type InfoBlockProps = {
    titleH1?: string;
    titleH2?: string;
    className?: string;
    childrenClassName?: string;
    children?: ReactNode;
}

const InfoBlock = ({titleH1, titleH2, className, childrenClassName, children}: InfoBlockProps) => {
    return (
        <div  className={`${className} flex flex-col rounded-md p-2.5 gap-2.5 bg-blockColor`}>
            {titleH1 && <h1 className='text-text text-2xl font-bold'>
                {titleH1}
            </h1>}
            {titleH2 && <h1>
                {titleH2}
            </h1>}
            {!!children && <div className={`${childrenClassName} flex gap-2.5`}>
                {children}
            </div>}
        </div>
    );
};

export default InfoBlock;