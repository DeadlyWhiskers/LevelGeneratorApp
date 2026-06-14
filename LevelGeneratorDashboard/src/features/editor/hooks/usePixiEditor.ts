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
        let isDestroyed = false;

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
            try {
                await app.init({
                    background: 'black',
                    autoDensity: true,
                    antialias: true
                })

                if (isDestroyed) {
                    if (app.renderer) {
                        app.destroy(true, { children: true, texture: true });
                    }
                    appRef.current = null;
                    return;
                }

                current?.appendChild(app.canvas);

                // Canvas resize
                const width = current.clientWidth;
                app.renderer.resize(width, width)

                // Here lies all the logic for editor
                editorRef.current = new Editor(app, current)
                editorRef.current.resizeObserver.observe(current)
                console.log('Создал редактор')
            }
            catch (e) {
                console.log('Ошибка создания редактора', e)
            }
        }
        initPixi()

        return () => {
            isDestroyed = true
            console.log('Вызов return')
            if (current) {
                current.removeEventListener('wheel', preventDefaultScroll);
            }
            if (editorRef.current) {
                // Удаление редактора как класса
                editorRef.current?.resizeObserver.unobserve(current)
                editorRef.current?.resizeObserver.disconnect()
                editorRef.current?.editor.destroy()
                editorRef.current = null
                console.log('Удалил редактор')
            }
            try {
                if (appRef.current && appRef.current.renderer) {
                    // Костыльный фикс
                    if (app && !('_cancelResize' in app)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (app as any)._cancelResize = () => { };
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } else if (app && typeof (app as any)._cancelResize !== 'function') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (app as any)._cancelResize = () => { };
                    }
                    appRef.current.destroy(true, { children: true, texture: true });
                }
                appRef.current = null;
                console.log('Удалил приложение PIXI и очистил WebGL контекст');
            } catch (error) {
                console.error('Ошибка при app.destroy():', error);
            }
        }
    }, [])

    return { containerRef, pixiApp: appRef }
}