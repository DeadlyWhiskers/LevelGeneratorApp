import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Sprite } from "pixi.js";
import type { dimensions } from "../types/dimensions";
import type { field } from "../types/field";
import type TilesetManager from "../lib/TilesetManager";

export default class World {
    private isDragging = false
    // Управляет движением камеры/приближением
    public worldContainer: Container = new Container()
    public worldBaselineDimensions: dimensions = { x: 640, y: 480 }
    private worldLastDimensions: dimensions = { x: 640, y: 480 }

    private tilesetManager: TilesetManager | null = null

    // Непосроедственно поле для строительства
    // 
    // Сделать хранение блок + имя для экспорта
    // 
    public field: field = {
        container: new Container(),
        baselineWidth: 480,
        scale: 1, // Зум КАМЕРЫ
        position: { x: 64, y: 64 }, // Не используем
        tiles: [[]]
    }

    constructor() {

    }
    // ----------------------------------------------------------
    // Сделать так, чтобы задний фон состоял из повторяющейся текстуры пола, а на неё уже добавлялись элементы
    // ----------------------------------------------------------

    private async load(tilesetManager: TilesetManager, editorApp: Application, tileMap: string[][]) {

        // Берем менеджер
        this.tilesetManager = tilesetManager
        // Добавляем детишек в контейнер мира
        this.field.container.removeChildren().map(e => e.destroy())
        this.field.tiles = []
        if (this.tilesetManager) {
            tileMap.forEach((row, rn) => {
                const spriteRow: Sprite[] = []
                row.forEach((el, cn) => {
                    const tile = new Sprite()
                    tile.texture = (this.tilesetManager as TilesetManager).getTexture(el)
                    this.field.container?.addChild(tile)
                    spriteRow.push(tile)

                    tile.position.set(cn * 16, rn * 16)
                })
                this.field.tiles.push(spriteRow)
            })
        }

        this.field.container.pivot.set(this.field.container.width / 2, this.field.container.height / 2)
        this.field.container.position.set(editorApp.canvas.width / 2, editorApp.canvas.height / 2)
        // Высчитывать из соотношения, что одна клетка = 16 пискелей
        // Заменить якорь на пивот и устанавливать его при рендере
        // this.worldSprite.anchor.set(0.5)
        // this.worldSprite.scale.set(this.field.baselineWidth / this.worldSprite?.texture.width)
    }

    // Рендер вызывается из вне
    public render(editorApp: Application) {

        // Получение соотношения мира к базе
        const worldScale = editorApp.renderer.width / this.worldBaselineDimensions.x

        // Установка размера поля
        const finalScale = worldScale * this.field.scale
        this.field.container?.scale.set(finalScale)

        // Установка положения
        // this.field.container?.position.set(this.field.position.x, this.field.position.y)
    }

    // Подгонка положения под ресайз
    public recalculatePosition(editorApp: Application) {
        // Изменение положения согласно изменеию масштаба
        this.field.container?.position.set(
            this.field.container.position.x * editorApp.renderer.width / this.worldLastDimensions.x,
            this.field.container.position.y * editorApp.renderer.height / this.worldLastDimensions.y
        )

        // Получение последних актуальных размеров холста
        this.worldLastDimensions.x = editorApp.renderer.width
        this.worldLastDimensions.y = editorApp.renderer.height
    }

    public async init(editorApp: Application, tilesetManager: TilesetManager, tileMap: string[][]) {
        await this.load(tilesetManager, editorApp, tileMap)
        // Установка размера хитбокса
        this.worldContainer.hitArea = editorApp.screen

        // Добавление масштабирования и перемещения
        editorApp.canvas.addEventListener('contextmenu', e => e.preventDefault());
        this.worldContainer.eventMode = 'static'
        this.worldContainer.on('wheel', e => {
            this.zoom(e, editorApp)
        })
        this.worldContainer.on('pointerdown', () => {
            this.isDragging = true
        })
        this.worldContainer.on('pointerup', (e) => {
            this.isDragging = false
            // Установка блока
            if (e.button === 0) {
                this.handlePlacement(e)
            }
        })
        this.worldContainer.on('pointermove', e => {
            if (!this.isDragging) return
            if (e.buttons === 2) {
                const movement = e.movement

                this.field.container.position.set(
                    this.field.container.position.x + movement.x,
                    this.field.container.position.y += movement.y
                )

            }
        })
        this.render(editorApp)

        // Получение последних актуальных размеров холста
        this.worldLastDimensions.x = editorApp.renderer.width
        this.worldLastDimensions.y = editorApp.renderer.height
    }

    // Каким-то образом сделать приближение в нужную точку
    private zoom(e: FederatedWheelEvent, editorApp: Application) {

        const oldScale = this.field.container.scale.x;

        const mouseX = e.globalX
        const mouseY = e.globalY;

        // позиция на карте
        const mapX = (mouseX - this.field.container.position.x) / oldScale;
        const mapY = (mouseY - this.field.container.position.y) / oldScale;

        const zoomFactor = e.deltaY * 0.001
        this.field.scale = Math.min((Math.max(0.1, this.field.scale - zoomFactor)), 8)

        this.render(editorApp)

        const newScale = this.field.container.scale.x;

        this.field.container.position.set(
            mouseX - mapX * newScale,
            mouseY - mapY * newScale
        )

    }

    private handlePlacement(e: FederatedPointerEvent) {
        // Получаем координаты
        const pointerCoords = this.field.container.toLocal(e.global)
        
        const col = Math.floor(pointerCoords.x / 16);
        const row = Math.floor(pointerCoords.y / 16);
                
        if (row >= 0 && row < this.field.tiles.length && col >= 0 && col < this.field.tiles[row].length) {
            
            const activeBrush = 'Wall';

            if(this.tilesetManager) this.field.tiles[row][col].texture = this.tilesetManager?.getTexture(activeBrush);

            console.log(`Placed block at (${row}, ${col}) [${activeBrush}]`);
        }
    }
}