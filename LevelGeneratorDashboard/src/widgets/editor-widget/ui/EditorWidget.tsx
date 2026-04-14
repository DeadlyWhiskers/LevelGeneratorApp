import PageSection from "@/shared/ui/page-section";
import Editor from "@/features/editor";
import GenerationSettings from "@/features/generation-settings";
import EditorButtons from "@/widgets/editor-widget/ui/EditorButtons.tsx";

const EditorWidget = () => {
    return (
        <PageSection className='flex-row'>
            <Editor className='flex-1'/>
            <GenerationSettings className='flex-1'>
                <EditorButtons/>
            </GenerationSettings>

        </PageSection>
    );
};

export default EditorWidget;