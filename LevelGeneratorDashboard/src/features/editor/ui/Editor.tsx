import { usePixiEditor } from '../hooks/usePixiEditor';

type EditorProps = {
    className?: string;
}

const Editor = ({ className }: EditorProps) => {

    const {containerRef} = usePixiEditor();

    return (
        //Редактор, который может быть расширен на весь экран???
        <div className={`${className} rounded-lg overflow-hidden aspect-square`} ref={containerRef} 
        style={{touchAction: 'none'}}/>
        // {/* <img src={editorPlaceholder} alt="Редактор уровней" className='w-full h-auto' /> */}
    );
};

export default Editor;