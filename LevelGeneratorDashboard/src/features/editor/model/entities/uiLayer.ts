import { RenderLayer } from "pixi.js";

export default class UiLayer {
    public renderLayer: RenderLayer

    constructor(){
        this.renderLayer = new RenderLayer()
    }
}