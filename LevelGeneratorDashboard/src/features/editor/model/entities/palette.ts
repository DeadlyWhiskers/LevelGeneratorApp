import { Assets, Container, Graphics, Sprite } from "pixi.js";
import type { dimensions } from "../types/dimensions";
import appleAsset from '@/features/editor/model/assets/applePlaceholder.png'

export default class Palette {
    public paletteContainer: Container
    public paletteBackground: Graphics
    // Пока что не вижу смысла в ресайзе тулбокса, возможно, потом он будет подстраиваться под экран йоу
    public baselineDimensions: dimensions = { x: 64, y: 456 }
    public baselineMargin: dimensions = { x: 16, y: 16 }
    public baselinePadding: number = 8
    public baselineGap: number = 8
    private sprites: Array<Sprite> = []

    constructor() {


        this.paletteContainer = new Container()

        this.paletteBackground = new Graphics().rect(0, 0, this.baselineDimensions.x, this.baselineDimensions.y).fill('green')
        this.paletteContainer.addChild(this.paletteBackground)
    }

    // Загрузка объектов в палитру (потом переделать, передав сюда тайлсет и создавать кликабельные)
    async load() {
        const texture = await Assets.load(appleAsset)

        this.sprites = Array.from({ length: 5 }, () => new Sprite(texture))
    }

    // Отрисовка во флексбоксе
    public render() {
        this.paletteBackground.x = this.baselineMargin.x
        this.paletteBackground.y = this.baselineMargin.y

        this.paletteBackground
            .clear()
            .rect(
                0,
                0,
                this.baselineDimensions.x,
                this.baselineDimensions.y
            )
            .fill('green')

        const contentWidth =
            this.baselineDimensions.x - this.baselinePadding * 2

        let y = this.baselinePadding

        for (const sprite of this.sprites) {
            const scale = contentWidth / sprite.width
            sprite.scale.set(scale)

            sprite.x = this.baselineMargin.x + this.baselinePadding
            sprite.y = this.baselineMargin.y + y

            this.paletteContainer.addChild(sprite)

            y += sprite.height + this.baselineGap
        }
    }

    public async init() {
        await this.load()
        this.paletteContainer.eventMode = 'static'

        this.paletteContainer.on('wheel', (e) => {
            e.stopPropagation()
        })
        this.render()
    }

}