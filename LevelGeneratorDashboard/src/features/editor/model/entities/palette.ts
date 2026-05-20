import { Application, Assets, Container, Graphics, Sprite, type Size } from "pixi.js";
import type { dimensions } from "../types/dimensions";
import appleAsset from '@/features/editor/model/assets/applePlaceholder.png'
import type TilesetManager from "../lib/TilesetManager";
import type Editor from "../editor";
import type { paletteButton } from "../types/paletteButton";

export default class Palette {
    public paletteContainer: Container
    public paletteBackground: Graphics
    private tilesetManager: TilesetManager | null = null
    // Пока что не вижу смысла в ресайзе тулбокса, возможно, потом он будет подстраиваться под экран йоу
    public baselineDimensions: dimensions = { x: 56, y: 456 }
    public baselineMargin: dimensions = { x: 12, y: 12 }
    public baselinePadding: number = 8
    public baselineGap: number = 8

    private buttonScale: number = 1
    private buttonSize: Size = { width: 0, height: 0 }

    private paletteBlocks: Array<string> = ['Wall', 'Floor', 'Collectable', 'Enemy', 'Hero', 'Start', 'Finish']
    private paletteButtons: Array<paletteButton> = []
    private selectedBlockButton: paletteButton | null = null

    constructor() {


        this.paletteContainer = new Container()

        this.paletteBackground = new Graphics()
        this.paletteContainer.addChild(this.paletteBackground)
    }

    // Загрузка объектов в палитру (потом переделать, передав сюда тайлсет и создавать кликабельные)
    async load(tilesetManager: TilesetManager, editorContext: Editor) {
        this.tilesetManager = tilesetManager
        // Создание кнопок палитры
        for (const block of this.paletteBlocks) {
            const texture = tilesetManager.getTexture(block)
            this.paletteButtons.push({
                blockName: block,
                sprite: new Sprite(texture),
                container: new Container,
                background: new Graphics().rect(0, 0, 20, 20).fill({ color: 'white', alpha: 0.6 })
            })

            const currentButton = this.paletteButtons.at(-1)
            if (currentButton) {
                // Размещаем элементы на кнопке
                currentButton?.container.addChild(currentButton.background)
                currentButton?.container.addChild(currentButton.sprite)
                currentButton?.sprite.position.set(2, 2)
                currentButton?.sprite.setSize(16, 16)

                // Красим кнопку
                currentButton.background.alpha = 0.6
                // Это в зависимости от текущего блока в редакторе
                if(currentButton.blockName === editorContext.selectedBlock) this.highlightButton(currentButton)
                    else this.unHighlightButton(currentButton)


                // Добавляем выбор блоков
                currentButton.container.eventMode = 'static'
                currentButton.container.on('pointerover', () => {
                    currentButton.container.cursor = 'pointer'   
                    currentButton.background.alpha = 1
                    currentButton.container.scale = this.buttonScale * 1.1                               
                })

                currentButton.container.on('pointerout', () => {
                    currentButton.container.cursor = 'auto'                                    
                    currentButton.background.alpha = 0.6
                    currentButton.container.scale = this.buttonScale                              
                })

                currentButton.container.on('pointerup', (e) => {
                    if(e.button === 0){
                        if(this.selectedBlockButton !== null){
                            this.unHighlightButton(this.selectedBlockButton)
                        }
                        this.selectedBlockButton = currentButton
                        this.highlightButton(this.selectedBlockButton)
                        editorContext.setSelectedBlock(this.selectedBlockButton.blockName)
                    }
                })
            }
        }
    }

    private highlightButton(button: paletteButton){
        button.background.tint = 'white'
    }

    private unHighlightButton(button: paletteButton){
        button.background.tint = '#676767'
    }
    // Отрисовка во флексбоксе
    public async render() {
        this.paletteBackground.x = this.baselineMargin.x
        this.paletteBackground.y = this.baselineMargin.y


        const contentWidth =
            this.baselineDimensions.x - this.baselinePadding * 2

        // Запоминаем масштаб кнопки (Для анимации наведеняи)
        const firstButton = this.paletteButtons.at(0)
        // Первоначальный размер для установки масштаба
        this.buttonSize = firstButton !== undefined && firstButton.container !== undefined ? firstButton.container.getSize() : { width: 1, height: 1 }
        this.buttonScale = contentWidth / this.buttonSize.width
        // Обновляем размер, чтобы он отражал масштабируемую кнопку
        this.buttonSize.height = this.buttonScale * this.buttonSize.height
        this.buttonSize.width = this.buttonScale * this.buttonSize.width

        let y = this.baselinePadding

        for (const button of this.paletteButtons) {
            button.container.scale.set(this.buttonScale)
            button.container.pivot.set(this.buttonSize.width / 4, this.buttonSize.height / 4)

            button.container.x = this.baselineMargin.x + this.baselinePadding + this.buttonSize.width/2
            button.container.y = this.baselineMargin.y + y + this.buttonSize.height/2

            this.paletteContainer.addChild(button.container)

            y += this.buttonSize.height + this.baselineGap


        }
        // Установка размеров фона палитры (после того, как узнали количество кнопок)
        this.paletteBackground
            .clear()
            .rect(
                0,
                0,
                this.baselineDimensions.x,
                y - this.baselineGap + this.baselinePadding
            )
            .fill({ color: '#676767', alpha: 0.6 })
    }

    public async init(tilesetManager: TilesetManager, editorContext: Editor) {
        await this.load(tilesetManager, editorContext)
        this.paletteContainer.eventMode = 'static'

        this.paletteContainer.on('wheel', (e) => {
            e.stopPropagation()
        })
        await this.render()
    }

}