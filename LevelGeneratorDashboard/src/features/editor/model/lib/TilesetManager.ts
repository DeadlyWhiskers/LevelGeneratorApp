import { Assets, Texture, Rectangle } from "pixi.js";

// Интерфейс для описания структуры слайса из твоего JSON
interface AsepriteSlice {
    name: string;
    keys: {
        bounds: { x: number; y: number; w: number; h: number };
    }[];
}

export default class TilesetManager {
    // Хранилище нарезанных текстур: { 'Wall': Texture, 'Floor': Texture, ... }
    private textures: Record<string, Texture> = {};

    public async load(jsonPath: string) {
        // 1. Загружаем JSON-данные атласа
        const atlasData = (await Assets.load(jsonPath)).data;
        console.log(atlasData)

        // 2. Получаем путь к картинке из мета-данных JSON
        // (Aseprite сохраняет имя картинки в meta.image, например "tileset-sheet.png")
        // Если пути лежат в одной папке, Pixi подгрузит её. 
        // Если нет — можно передать явный путь к изображению.
        // Получим ссылочку
        const lastSlashIndex = jsonPath.lastIndexOf('/');
        const basePath = lastSlashIndex !== -1 ? jsonPath.substring(0, lastSlashIndex + 1) : '';

        // Склеиваем базовый путь и имя файла из метаданных (получится "/assets/tileset-sheet.png")
        const imgPath = basePath + atlasData.meta.image;

        const baseTexture: Texture = await Assets.load(imgPath);

        // Смещение самого фрейма, если Aseprite экспортировал атлас с отступом
        const frameOffset = atlasData.frames[0].frame; // { x: 16, y: 16 }

        // 3. Проходимся по всем слайсам и нарезаем базовую текстуру
        const slices: AsepriteSlice[] = atlasData.meta.slices;

        slices.forEach(slice => {
            const bounds = slice.keys[0].bounds;

            // Вычисляем реальные координаты тайла с учетом смещения фрейма
            const realX = frameOffset.x + bounds.x;
            const realY = frameOffset.y + bounds.y;

            // Создаем дочернюю текстуру (вырезаем кусочек)
            const tileTexture = new Texture({
                source: baseTexture.source,
                frame: new Rectangle(realX, realY, bounds.w, bounds.h)
            });

            // Сохраняем под именем слайса (например, 'Wall')
            this.textures[slice.name] = tileTexture;
        });

        console.log(`Tileset loaded. Cut ${Object.keys(this.textures).length} slices.`);
    }

    // Метод для получения готовой текстуры в Palette или World
    public getTexture(name: string): Texture {
        const texture = this.textures[name];
        if (!texture) {
            console.warn(`Texture with name ${name} not found in tileset!`);
        }
        return texture;
    }
}