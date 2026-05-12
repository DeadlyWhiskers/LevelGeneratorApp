import type { Container } from "pixi.js"
import type { dimensions } from "./dimensions"

export type field = {
    container: Container | null
    baselineWidth: number
    scale: number
    // Возможно переделаю в относительное смещение
    position: dimensions
}