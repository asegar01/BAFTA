import Card from "./card.js";
import { GenerateEffect } from "./effects.js";
import EventDispatcher from "./eventdispatcher.js";

export default class Escenario extends Card
{
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect) {
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);

        this.emitter=EventDispatcher.getInstance();
        this._stageEffect = effect;
        this.emitter.on("next_act",this.onNextAct.bind(this));
    }
    

    onNextAct()
    {
        if(this._enjuego){
        this._stageEffect.execute();
        }
    }
}