import type { Container, Graphics, TilingSprite } from "pixi.js"
import type { dimensions } from "./dimensions"
import type { mapTile } from "./mapTile"

export type field = {
    container: Container 
    baselineWidth: number
    scale: number
    // Возможно переделаю в относительное смещение
    position: dimensions,
    tiles: mapTile[][],
    hoverSelection: Graphics,
    backgroundTilingSprite: TilingSprite
}