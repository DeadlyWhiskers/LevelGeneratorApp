import { GenerationSettingsExperiment } from "@/features/generation-settings";
import ExperimentButtons from "./ExperimentButtons";
import InfoBlock from "@/shared/ui/info-block";
import PageSection from "@/shared/ui/page-section";

const ExperimentPage = () => {
    return (
        <PageSection className="flex-col">
            {/* Сделать либо отдельный элемент либо флаг, чтобы были разные запросы к апи и результаты */}
            <InfoBlock titleH1="Параметры эксперимента" className="w-fit"/>
            <GenerationSettingsExperiment className='flex-1'/>
                <ExperimentButtons />

        </PageSection>
    );
};

export default ExperimentPage;