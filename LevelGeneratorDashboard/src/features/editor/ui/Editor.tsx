import { useEffect, useState } from 'react';
import { usePixiEditor } from '../hooks/usePixiEditor';
import { GenericButton } from '@/shared/ui/button';
import fullScreenIcon from '@/shared/assets/icons/fullscreen.svg'

type EditorProps = {
    className?: string;
}

const Editor = ({ className }: EditorProps) => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }
    const { containerRef } = usePixiEditor();

    // Убираем скролл при фуллскрине и добавляем хоткей для закрытия
    useEffect(() => {
        const hotkeyEvent = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                toggleFullscreen()
            }
        }

        if (isFullscreen) {
            window.addEventListener('keydown', (e) => hotkeyEvent(e));
            document.body.style.overflow = 'hidden';
        } else {
            window.removeEventListener('keydown', (e) => hotkeyEvent(e));
            document.body.style.overflow = '';
        }
        return () => {
            window.removeEventListener('keydown', (e) => hotkeyEvent(e));
            document.body.style.overflow = '';
        };
    }, [isFullscreen]);


    return (
        //Редактор, который может быть расширен на весь экран
        <div className={isFullscreen
            ? 'fixed inset-0 z-50 flex items-center justify-center bg-neutral-700 w-screen h-screen'
            : 'relative flex ' + className}>
            {/* Сам редактор, который квадрат */}
            <div className={`${isFullscreen
                ? 'relative bg-neutral-900 overflow-hidden' :
                'w-full rounded-lg overflow-hidden aspect-square'}`} ref={containerRef}
                style={{
                    touchAction: 'none',
                    ...(isFullscreen && {
                        width: 'min(100vw, 100vh)',
                        height: 'min(100vw, 100vh)',
                    })
                }} />
            {/* Кнопка свёртки яиц */}
            <GenericButton
                onClick={toggleFullscreen}
                className="absolute bg-white text-black right-4 top-4 rounded-md p-1.5 items-center justify-center focus:outline-none">
                <img src={fullScreenIcon} alt="Свернуть редактор" className='w-4 h-4 object-contain' />
            </GenericButton>
        </div>
        // {/* <img src={editorPlaceholder} alt="Редактор уровней" className='w-full h-auto' /> */}
    );
};

export default Editor;