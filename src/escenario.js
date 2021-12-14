import Card from "./card.js";
import { GenerateEffect } from "./effects.js";

export default class Escenario extends Card
{
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect) {
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);

        this.stageEffect = effect;
    }

    onNextAct()
    {
        this.stageEffect.execute();
    }
}