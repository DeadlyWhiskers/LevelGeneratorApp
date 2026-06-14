import InfoBlock from "@/shared/ui/info-block";
import PageSection from "@/shared/ui/page-section";

const QueuePage = () => {
    return (
        <>
        {/* Добавить функцию сравнения, пока не придумал как */}
            <PageSection className="flex-col">
                <InfoBlock titleH1="В процессе" className="w-fit" />
                <InfoBlock>
                    Тут очередь экспериментов
                </InfoBlock>
            </PageSection>
            <PageSection className="flex-col">
                <InfoBlock titleH1="Завершённые" className="w-fit" />
                <InfoBlock>
                    Тут все что закончились (их можно будет посмотреть)
                </InfoBlock>
            </PageSection>
        </>
    );
};

export default QueuePage;