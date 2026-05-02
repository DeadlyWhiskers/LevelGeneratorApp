import {type ReactNode} from 'react';

type BasicRowProps = {
    className?: string;
    children: ReactNode;
}

const BasicRow = ({className, children}: BasicRowProps) => {
    return (
        <div className={`${className} flex flex-row w-fit -py-2.5- gap-2.5 items-center text-text text-2xl`}>
            {children}
        </div>
    );
};

export default BasicRow;