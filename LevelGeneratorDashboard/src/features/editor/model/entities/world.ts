import { Application, Assets, Container, Sprite } from "pixi.js";
import type { dimensions } from "../types/dimensions";
import worldAsset from '@/features/editor/model/assets/worldPlaceholder.jpg'
import type { field } from "../types/field";

export default class World {
    private isDragging = false
    // Управляет движением камеры/приближением
    public worldContainer: Container
    public worldBaselineDimensions: dimensions = { x: 640, y: 480 }
    // private worldLastDimensions: dimensions = { x: 640, y: 480 }

    // Временно, будет заменено на содержимое field
    private worldSprite: Sprite | null = null

    // Непосроедственно поле для строительства
    public field: field = {
        container: null,
        baselineWidth: 480,
        scale: 1,
        position: { x: 64, y: 64 }
    }

    constructor() {
        this.worldContainer = new Container()
        this.field.container = new Container()

        this.worldContainer.addChild(this.field.container)
    }

    private async load() {
        // Здеся вызвать метод загрузки клеточек, возможно, его нужно будет вызывать вручную, чтобы заргузить нужный размер/уровень
        const worldTexture = await Assets.load(worldAsset)
        this.worldSprite = new Sprite(worldTexture)
        this.field.container?.addChild(this.worldSprite)
        // Высчитывать из соотношения, что одна клетка = 16 пискелей
        // Заменить якорь на пивот
        this.worldSprite.anchor.set(0.5)
    }

    // Рендер вызывается из вне
    public render(editorApp: Application) {

        // Получение соотношения мира к базе
        const worldScale = editorApp.renderer.width / this.worldBaselineDimensions.x

        // Установка размера поля
        let finalScale = 1
        if (this.worldSprite) {
            finalScale = (this.field.baselineWidth / this.worldSprite?.texture.width) * this.field.scale
                * worldScale
        }
        this.worldSprite?.scale.set(finalScale)

        // Установка положения
        this.field.container?.position.set(this.field.position.x, this.field.position.y)
    }

    // public recalculatePosition(editorApp: Application){
    //     // Изменение положения согласно изменеию масштаба
    //     // this.field.position.x = this.field.position.x * editorApp.renderer.width / this.worldBaselineDimensions.x
    //     // this.field.position.y = this.field.position.y * editorApp.renderer.height / this.worldBaselineDimensions.y


    //     // Получение последних актуальных размеров холста
    //     this.worldLastDimensions.x = editorApp.renderer.width
    //     this.worldLastDimensions.y = editorApp.renderer.height
    // }

    public async init(editorApp: Application) {
        await this.load()
        // Установка размера хитбокса
        this.worldContainer.hitArea = editorApp.screen

        // Добавление масштабирования и перемещения
        this.worldContainer.eventMode = 'static'
        this.worldContainer.on('wheel', e => {
            this.zoom(e)
            this.render(editorApp)
        })
        this.worldContainer.on('pointerdown', () => {
            this.isDragging = true
        })
        this.worldContainer.on('pointerup', () => {
            this.isDragging = false
        })
        this.worldContainer.on('pointermove', e => {
            if(!this.isDragging) return
            const movement = e.movement

            this.field.position.x += movement.x
            this.field.position.y += movement.y
            this.render(editorApp)
        })
        this.render(editorApp)

        // Получение последних актуальных размеров холста
        // this.worldLastDimensions.x = editorApp.renderer.width
        // this.worldLastDimensions.y = editorApp.renderer.height
    }

    // Каким-то образом сделать приближение в нужную точку
    private zoom(e: WheelEvent) {
        this.field.scale -= (e.deltaY * 0.0005)
    }
}