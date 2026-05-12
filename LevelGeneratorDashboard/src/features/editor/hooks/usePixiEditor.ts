import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import Editor from '../model/editor';
// import picture from '@/shared/assets/images/editor-placeholder.png'

export const usePixiEditor = () => {


    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);

    // Этот реф возможно будет глобальным для загрузки внутрь уровня и взаимодействия с ui
    const editorRef = useRef<Editor>(null)

    useEffect(() => {

        // Checks for element and canvas
        const current = containerRef.current;
        if (!current) return;
        if (appRef.current) return;

        // Preventing mouse scroll
        const preventDefaultScroll = (e: WheelEvent) => {
            e.preventDefault();
        };
        current.addEventListener('wheel', preventDefaultScroll, { passive: false });

        // Init app
        const app = new PIXI.Application()
        appRef.current = app

        // Creating the pixi app
        const initPixi = async () => {
            await app.init({
                background: 'black',
                autoDensity: true
            })

            current?.appendChild(app.canvas);

            // Canvas resize
            const width = current.clientWidth;
            app.renderer.resize(width, width)

        }
        initPixi()
        
        // Here lies all the logic for editor
        editorRef.current = new Editor(app, current)
        editorRef.current.resizeObserver.observe(current)

        // console.log(current.clientWidth)

        return () => {
            // Если руки дойдут, переделать всё на editor
            if (app.renderer) {
                app.destroy();
                appRef.current = null;
                editorRef.current?.resizeObserver.unobserve(current)
                editorRef.current?.resizeObserver.disconnect()
                // Удаление вроде работает
                editorRef.current?.editor.destroy()
                editorRef.current = null
            }
        }
    }, [])

    return { containerRef, pixiApp: appRef }
}