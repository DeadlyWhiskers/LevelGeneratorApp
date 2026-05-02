// Тут полный рефактор это пипес
import React, {useEffect, useState} from "react";

type ColorCodedValueProps = {
    className?: string;
    children?: React.ReactNode;
    value?: string | number;
}

const ColorCodedValue = ({className, children, value}: ColorCodedValueProps) => {
    // const [colorCodes, setColorCodes] = useState<{background: string, text: string}>({background: 'background', text: 'accentBlue'})

    const getColors = (): {background: string, text: string} => {
        if (!value) return {background: 'bg-background', text: 'text-accentBlue'};
        let colorCode = 'text-accentBlue'
        let colorBackground = 'bg-background'
        // Проверка
        if(typeof value === 'string') {
            const s = value.toLowerCase() as string;
            if (s === 'yes' || s === 'да') {
                colorCode = 'text-highColor'
                colorBackground = 'bg-highBackground'
            } else if (s === 'no' || s === 'нет') {
                colorCode = 'text-lowColor'
                colorBackground = 'bg-lowBackground'
            }
        }
        if(typeof value === 'number') {
            if (value < 35) {
                colorCode = 'text-lowColor'
                colorBackground = 'bg-lowBackground'
            }
            else if (value >= 35 && value < 70 ) {
                colorCode = 'text-mediumColor'
                colorBackground = 'bg-mediumBackground'
            }
            else {
                colorCode = 'text-highColor'
                colorBackground = 'bg-highBackground'
            }
        }

        return {background: colorBackground, text: colorCode}
    }

    const colorCodes: {background: string, text: string} = getColors()

    return (
        <div className={`flex flex-row text-xl py-1 px-1.5  gap-2.5 rounded-md ${colorCodes.background} ${colorCodes.text}`}>
            {value}
            {children}
        </div>
    );
};

export default ColorCodedValue;