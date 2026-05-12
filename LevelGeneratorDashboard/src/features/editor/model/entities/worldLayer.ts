import { RenderLayer } from "pixi.js";

export default class WorldLayer {
    public renderLayer: RenderLayer

    constructor(){
        this.renderLayer = new RenderLayer()
    }
}