import { TextureSource, type Application } from "pixi.js";
import Palette from "./entities/palette";
import UiLayer from "./entities/uiLayer";
import WorldLayer from "./entities/worldLayer";
import World from "./entities/world";
import TilesetManager from "./lib/TilesetManager";
import tilesetPath from "@/features/editor/model/assets/tileset.json?url"

export default class Editor {
    public editor: Application
    public editorContainer: HTMLDivElement
    public resizeObserver: ResizeObserver
    private timeoutId: number | null
    private palette: Palette | null = null
    private world: World | null = null

    private uiLayer: UiLayer | null = null
    private worldLayer: WorldLayer | null = null
    
    private tilesetManager: TilesetManager




    constructor(pixiApp: Application, editorContainer: HTMLDivElement){ 
        // Удаление сглаживания с текстур
        TextureSource.defaultOptions.scaleMode = 'nearest';

        this.timeoutId = null
        this.editor = pixiApp
        this.editorContainer = editorContainer
        this.tilesetManager = new TilesetManager()

        // ResizeObserver
        this.resizeObserver = new ResizeObserver((entries => {

            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.timeoutId = setTimeout(() => this.resize(entries[0]), 80)

        }))

        this.createInitialObjects()
    }

    // Method to resize the canvas
    private resize = (el: ResizeObserverEntry) => {
            const width = el.contentRect.width;

            this.editor.renderer.resize(width, width);
            this.editor.canvas.style.width = '100%';
            this.editor.canvas.style.height = '100%';

            // Перерисовка под новый размер
            this.world?.recalculatePosition(this.editor)
            this.world?.render(this.editor)
            console.log('Chaged renderer resolution')

    };

    private createInitialObjects = async () => {
        // Загрузка тайлсета
        await this.tilesetManager.load(tilesetPath)

        // Создание палитры (ахахахах ну типа политра)
        this.palette = new Palette()

        // Создание сетки уровня
        this.world = new World()

        // Создание слоёв рендера
        this.worldLayer = new WorldLayer()
        this.uiLayer = new UiLayer()
        
        // Добавление объектов на слои
        this.worldLayer.renderLayer.attach(this.world.field.container, this.world.worldContainer)
        this.uiLayer.renderLayer.attach(this.palette.paletteContainer)

        // Добавление объектов на сцену
        this.editor.stage.addChild(this.world.field.container, this.world.worldContainer, this.palette.paletteContainer)

        // Добавление слоёв на сцену
        this.editor.stage.addChild(this.worldLayer.renderLayer, this.uiLayer.renderLayer)

        // Инициализация ui и мира
        this.world.init(this.editor, this.tilesetManager, [['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
        ['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
    ['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor']])
        this.palette.init()
        
        console.log('Scene created')
    }
    
}