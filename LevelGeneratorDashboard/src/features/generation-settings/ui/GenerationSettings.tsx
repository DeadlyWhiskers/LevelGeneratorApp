import React from 'react';
import InfoBlock from "@/shared/ui/info-block";
import BasicRow from "@/shared/ui/basic-row";
import Dropdown from "@/shared/ui/dropdown";
import TextInput from "@/shared/ui/text-input";

type GenerationSettingsProps = {
    className?: string;
    children: React.ReactNode;
}

const GenerationSettings = ({className, children}: GenerationSettingsProps) => {
    return (
        <InfoBlock className={`${className}`} titleH1='Параметры уровня'>
            <BasicRow>
                <label htmlFor="genMethods">Метод генерации:</label>
                <Dropdown name={"genMethods"} id={"genMethods"} options={[
                    {option: 'Номер 1', id: 'Первый'},
                    {option: 'Номер 2', id: 'Второй'}
                ]}/>
            </BasicRow>
            {/*Опции дальше будут подгружаться в зависимости от типа генерации, не забываем*/}
            <BasicRow>
                Сид: <TextInput placeholder={'99992222'} className='w-[120px]'/>
            </BasicRow>
            <BasicRow>
                Количество врагов: <TextInput placeholder={'10'} className='w-8'/>
            </BasicRow>
            <BasicRow>
                Количество сокровищ: <TextInput placeholder={'10'} className='w-8'/>
            </BasicRow>
            <BasicRow>
                Размер уровня: <TextInput placeholder={'10'} className='w-8'/>
            </BasicRow>
            {/*------------------------------------------------------------------*/}
            {children}
        </InfoBlock>
    );
};

export default GenerationSettings;