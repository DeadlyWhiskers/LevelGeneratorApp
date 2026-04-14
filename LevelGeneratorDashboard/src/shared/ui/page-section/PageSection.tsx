import {type ReactNode} from 'react';

type PageSectionProps = {
    children: ReactNode;
    className?: string;
}

const PageSection = ({children, className}: PageSectionProps) => {
    return (
        <div className={`flex bg-background gap-2.5 rounded-xl p-2.5  ${className}`}>
            {children}
        </div>
    );
};

export default PageSection;