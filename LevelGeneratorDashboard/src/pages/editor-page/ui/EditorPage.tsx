import PageSection from "@/shared/ui/page-section";
import EditorWidget from "@/widgets/editor-widget";
import InfoBlock from "@/shared/ui/info-block";
import BasicRow from "@/shared/ui/basic-row";
import ColorCodedValue from "@/shared/ui/color-coded-value";
import FinishingPassPlaceholder from "@/shared/assets/images/FinishingPassPlaceholder.png"

const EditorPage = () => {
    return (
        <>
            <EditorWidget/>
            {/*Вынести в виджет gen results*/}
            <PageSection className='flex-row'>
                {/*Столбик 1*/}
                <div className='flex flex-col gap-2.5 flex-1 h-fit'>
                    <InfoBlock childrenClassName='flex-col' className={`flex-1 w-fit h-fit`} titleH1={'Результаты оценки'}/>
                    <InfoBlock childrenClassName='flex-col'>
                        <BasicRow>
                            Время генерации: <ColorCodedValue value={'120мс'}/>
                        </BasicRow>
                        <BasicRow>
                            Сложность: <ColorCodedValue value={66}/>
                        </BasicRow>
                        <BasicRow>
                            Разветвлённость: <ColorCodedValue value={25}/>
                        </BasicRow>
                        <BasicRow>
                            Разнообразие: <ColorCodedValue value={55}/>
                        </BasicRow>
                    </InfoBlock>
                </div>
                {/*Столбик 2*/}
                <div className='flex flex-col gap-2.5 flex-1 h-fit'>
                    <InfoBlock className={`flex-1`} childrenClassName='flex-row' titleH1='Проходимость'>
                        <div className='flex flex-col flex-1 gap-2.5'>
                            <BasicRow>
                                Проходимость: <ColorCodedValue value={"Да"}/>
                            </BasicRow>
                            <BasicRow>
                                Длина пути: 26
                            </BasicRow>
                        </div>
                        <img src={FinishingPassPlaceholder} alt="Упрощённая схема карты с нарисованным путём"
                        className='flex-2 h-100px w-auto'/>
                    </InfoBlock>
                </div>
            </PageSection>
        </>
    );
};

export default EditorPage;