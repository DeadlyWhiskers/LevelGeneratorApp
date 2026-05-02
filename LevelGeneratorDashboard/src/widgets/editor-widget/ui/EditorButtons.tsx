import {Button} from "@/shared/ui/button";

const EditorButtons = () => {
    return (
        <div className='flex flex-col gap-2.5 w-full pt-2 mt-auto'>
            <Button className='w-full bg-accentGreen justify-center'>
                Сгенерировать
            </Button>
            <Button className='w-full bg-accentBlue justify-center'>
                Оценка уровня
            </Button>
            <Button className='w-full bg-accentRed justify-center'>
                Экспортировать
            </Button>
        </div>
    );
};

export default EditorButtons;