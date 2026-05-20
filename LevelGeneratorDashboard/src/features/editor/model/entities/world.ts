import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import type { dimensions } from "../types/dimensions";
import type { field } from "../types/field";
import type TilesetManager from "../lib/TilesetManager";
import type Editor from "../editor";
import type { mapTile } from "../types/mapTile";

export default class World {
    // Флаги
    private isDragging = false
    private isDrawing = false

    // Лимит-флаги блоков старт/финиш
    private hasHero = false
    private heroTileName = 'Hero'
    private hasFinish = false
    private finishTileName = 'Finish'

    private lastPlacedCoords: dimensions = { x: -1, y: -1 }
    // Управляет движением камеры/приближением
    public worldContainer: Container = new Container()
    public worldBaselineDimensions: dimensions = { x: 640, y: 480 }
    private worldLastDimensions: dimensions = { x: 640, y: 480 }

    private tilesetManager: TilesetManager | null = null
    private editorContext: Editor | null = null

    // Непосроедственно поле для строительства
    // 
    // Сделать хранение блок + имя для экспорта
    // 
    public field: field = {
        container: new Container(),
        baselineWidth: 480,
        scale: 1, // Зум КАМЕРЫ
        position: { x: 64, y: 64 }, // Не используем
        tiles: [],
        hoverSelection: new Graphics(),
        backgroundTilingSprite: new TilingSprite()
    }

    constructor() {

    }
    // ----------------------------------------------------------

    private async load(editorApp: Application, tileMap: string[][]) {

        // Без менеджера не грузим
        if (this.tilesetManager === null) return
        // Добавляем детишек в контейнер мира
        this.field.container.removeChildren().map(e => e.destroy())
        this.field.tiles = []

        // Добавляем задний фон
        this.field.backgroundTilingSprite = new TilingSprite({
            texture: this.tilesetManager.getTexture('Floor'),
            width: tileMap[0].length * 16,
            height: tileMap.length * 16
        })
        this.field.container.addChild(this.field.backgroundTilingSprite)

        // Добавляем удалённый ранее курсор
        this.field.hoverSelection = new Graphics()
            .rect(0, 0, 16, 16)
            .fill({ color: '8040C0', alpha: 0.3 })
            .stroke({ pixelLine: true, color: 'black' })
        this.field.container.addChild(this.field.hoverSelection)
        this.field.hoverSelection.zIndex = 99
        this.field.hoverSelection.visible = false


        if (this.tilesetManager) {
            tileMap.forEach((row, rn) => {
                const tileRow: mapTile[] = []
                row.forEach((el, cn) => {
                    const sprite = new Sprite()
                    if (el === 'Floor') sprite.texture = Texture.EMPTY
                    else sprite.texture = (this.tilesetManager as TilesetManager).getTexture(el)

                    this.field.container?.addChild(sprite)
                    tileRow.push({tileName: el, sprite: sprite})

                    sprite.position.set(cn * 16, rn * 16)
                })
                this.field.tiles.push(tileRow)
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

    public async init(editorApp: Application, tilesetManager: TilesetManager, editorContext: Editor, tileMap: string[][]) {
        this.editorContext = editorContext
        this.tilesetManager = tilesetManager
        await this.load(editorApp, tileMap)
        // Установка размера хитбокса
        this.worldContainer.hitArea = editorApp.screen
        this.worldContainer.eventMode = 'static'

        // Добавление масштабирования и перемещения
        editorApp.canvas.addEventListener('contextmenu', e => e.preventDefault());
        this.worldContainer.on('wheel', e => {
            this.zoom(e, editorApp)
        })
        this.worldContainer.on('pointerdown', (e) => {
            if (e.button === 0) {
                this.isDrawing = true
            }
            if (e.button === 2) {
                this.isDragging = true
                this.worldContainer.cursor = 'move'
            }
        })
        this.worldContainer.on('pointerup', (e) => {
            this.isDragging = false
            this.isDrawing = false
            this.worldContainer.cursor = 'auto'

            // Установка блока
            // Получаем координаты курсора
            const pointerCoords = this.field.container.toLocal(e.global)
            // Высчитываем колонку и строку
            const col = Math.floor(pointerCoords.x / 16);
            const row = Math.floor(pointerCoords.y / 16);

            // Не ставим блок в то же место, где уже поставили
            if (e.button === 0 && (this.lastPlacedCoords.x != col || this.lastPlacedCoords.y != row)) {
                this.handlePlacement(e)
            }
            this.lastPlacedCoords = { x: -1, y: -1 }
        })
        this.worldContainer.on('pointermove', e => {
            // Обработка перетаскивания
            if (this.isDragging && e.buttons === 2) {
                const movement = e.movement

                this.field.container.position.set(
                    this.field.container.position.x + movement.x,
                    this.field.container.position.y += movement.y
                )
                return
            }

            // Получаем координаты курсора
            const pointerCoords = this.field.container.toLocal(e.global)
            // Высчитываем колонку и строку
            const col = Math.floor(pointerCoords.x / 16);
            const row = Math.floor(pointerCoords.y / 16);

            // Установка выдилителя
            const cursorOnField = row >= 0 && row < this.field.tiles.length && col >= 0 && col < this.field.tiles[row].length

            if (cursorOnField) {
                this.worldContainer.cursor = 'pointer'
                this.field.hoverSelection.visible = true;
                this.field.hoverSelection.position.set(col * 16, row * 16);
            } else {
                this.worldContainer.cursor = 'auto'
                this.field.hoverSelection.visible = false;
            }

            // Рисование
            // console.log(this.lastPlacedCoords, '- последние')
            // console.log(row, col, '- текущие')
            if (this.isDrawing && (this.lastPlacedCoords.x != col || this.lastPlacedCoords.y != row)) {
                this.handlePlacement(e)
                this.lastPlacedCoords = { x: col, y: row }
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

        const cursorOnField = row >= 0 && row < this.field.tiles.length && col >= 0 && col < this.field.tiles[row].length

        if (cursorOnField) {
            const activeBrush = this.editorContext?.selectedBlock
            // Если флаг не позволяет - не ставим блок
            if(activeBrush === this.heroTileName && this.hasHero === true) {
                console.log('Cannot place another hero')
                return
            }
            if(activeBrush === this.finishTileName && this.hasFinish === true) {
                console.log('Cannot place another finish')
                return
            }

            // Проверяем наличие блока финиша и старта и освобождаем флаги
            if(this.field.tiles[row][col].tileName === this.finishTileName) this.hasFinish = false
            if(this.field.tiles[row][col].tileName === this.heroTileName) this.hasHero = false

            // Ставим блок
            if (this.tilesetManager && activeBrush) {
                this.field.tiles[row][col].tileName = activeBrush
                if (activeBrush !== 'Floor') this.field.tiles[row][col].sprite.texture = this.tilesetManager?.getTexture(activeBrush)
                    else this.field.tiles[row][col].sprite.texture = Texture.EMPTY
            }

            // Устанавливаем флаги уникальных блоков
            if(activeBrush === this.heroTileName) this.hasHero = true
            if(activeBrush === this.finishTileName) this.hasFinish = true

            console.log(`Placed block at (${row}, ${col}) [${activeBrush}]`);
        }
    }
}