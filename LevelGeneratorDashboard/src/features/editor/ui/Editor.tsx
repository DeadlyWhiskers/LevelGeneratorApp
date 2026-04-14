import editorPlaceholder from '@/shared/assets/images/editor-placeholder.png'

type EditorProps = {
    className?: string;
}

const Editor = ({className}: EditorProps) => {
    return (
        <div className={`${className} rounded-lg overflow-hidden`}>
            <img src={editorPlaceholder} alt="Редактор уровней" className='w-full h-auto' />
        </div>
    );
};

export default Editor;