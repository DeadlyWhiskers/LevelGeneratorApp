import PageSection from "@/shared/ui/page-section";
import Editor from "@/features/editor";
import EditorButtons from "@/widgets/editor-widget/ui/EditorButtons.tsx";
import { useLocation } from "react-router";
import { GenerationSettings } from "@/features/generation-settings";

const EditorWidget = () => {

    const location = useLocation();
    console.log(location)
    const isEditorRoute = location.pathname === '/';


    if (!isEditorRoute) return null;
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