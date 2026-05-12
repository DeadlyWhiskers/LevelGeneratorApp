import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import picture from '@/shared/assets/images/editor-placeholder.png'

export const usePixiEditor = () => {


    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);

    useEffect(() => {
        // Test area
        const rectangleRelative = new PIXI.Graphics()
            .rect(50, 50, 100, 100)
            .stroke({ color: "red", pixelLine: true });
        const resizableClickableSprite = new PIXI.Sprite()
        // ---------

        let timeoutId: number | null = null;
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
            // app.canvas.style.width = '100%';
            // app.canvas.style.height = '100%';
            // app.canvas.style.display = 'block';

            // Test area
            let isDragging = false
            const dragOffset = { x: 0, y: 0 };
            const texture = await PIXI.Assets.load(picture)


            const rectangleAbsolute = new PIXI.Graphics()
                .rect(200, 50, 100, 100)
                .stroke({ color: "red", pixelLine: true });

            resizableClickableSprite.texture = texture
            resizableClickableSprite.anchor.set(.5)
            resizableClickableSprite.position.set(100, 100)
            resizableClickableSprite.scale.set(.2)
            resizableClickableSprite.eventMode = 'static'
            resizableClickableSprite.on('wheel', e => {
                // e.preventDefault()
                resizableClickableSprite.scale.set(resizableClickableSprite.scale.x + .01 * (e.deltaY > 1 ? -1 : 1))
                console.log(e.deltaY)
            })
            resizableClickableSprite.on('pointertap', () => {
                resizableClickableSprite.rotation += Math.PI/4
            })
            resizableClickableSprite.on('pointerdown', (e) => {
                isDragging = true
                dragOffset.x = resizableClickableSprite.x - e.globalX
                dragOffset.y = resizableClickableSprite.y - e.globalY
            })
            resizableClickableSprite.on('pointerup', () => {
                isDragging = false
            })
            resizableClickableSprite.on('globalpointermove', (e) => {
                if(isDragging) resizableClickableSprite.position.set(e.global.x + dragOffset.x, e.globalY + dragOffset.y)
            })


            rectangleRelative.pivot.set(-25, -25)
            rectangleRelative.width = app.renderer.width / 5
            rectangleRelative.height = app.renderer.height / 5

            app.stage.addChild(rectangleRelative);
            app.stage.addChild(rectangleAbsolute);
            app.stage.addChild(resizableClickableSprite)
            // ---------------

        }
        initPixi()

        // Size change observer for resizing renderer
        const resize = (el: ResizeObserverEntry) => {
            const width = el.contentRect.width;

            app.renderer.resize(width, width);
            app.canvas.style.width = '100%';
            app.canvas.style.height = '100%';
            console.log('Chaged renderer resolution')

            // Test area
            rectangleRelative.width = width / 5
            rectangleRelative.height = width / 5

        };


        const pixiResizeObserver = new ResizeObserver((entries => {

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => resize(entries[0]), 80)

        }))
        pixiResizeObserver.observe(current)

        // console.log(current.clientWidth)

        return () => {
            if (app.renderer) {
                app.destroy();
                appRef.current = null;
                pixiResizeObserver.unobserve(current)
                pixiResizeObserver.disconnect()
            }
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [])

    return { containerRef, pixiApp: appRef }
}