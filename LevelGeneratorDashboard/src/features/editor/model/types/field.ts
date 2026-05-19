import type { Container, Graphics, Sprite, TilingSprite } from "pixi.js"
import type { dimensions } from "./dimensions"

export type field = {
    container: Container 
    baselineWidth: number
    scale: number
    // Возможно переделаю в относительное смещение
    position: dimensions,
    tiles: Sprite[][],
    hoverSelection: Graphics,
    backgroundTilingSprite: TilingSprite
}