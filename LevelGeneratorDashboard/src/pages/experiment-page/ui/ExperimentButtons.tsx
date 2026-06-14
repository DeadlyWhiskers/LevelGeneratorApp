import BasicRow from "@/shared/ui/basic-row";
import { Button } from "@/shared/ui/button";
import InfoBlock from "@/shared/ui/info-block";
import NumberInput from "@/shared/ui/number-input";

const EditorButtons = () => {
    return (
        <div className='flex flex-row gap-2.5 w-full pt-2 mt-auto items-baseline'>
            <InfoBlock>
                <BasicRow>
                    Количество уровней: <NumberInput placeholder={'0'} className='w-[100px]'/>
                </BasicRow>
            </InfoBlock>
            <Button className='w-fit bg-accentGreen justify-center'>
                Запуск эксперимента
            </Button>
        </div>
    );
};

export default EditorButtons;