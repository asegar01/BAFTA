import Card from "./card.js";
import { GenerateEffect } from "./effects.js";
import EventDispatcher from "./eventdispatcher.js";

export default class Personaje extends Card {
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect, chaEffect) {
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
        this._chaEffect = chaEffect;
        this.alive = true;
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("someone_died", this.onDead.bind(this));
        this.emitter.on("cotillear_played", this.onCotillear.bind(this));
        this.emitter.on("next_act", this.onNextAct.bind(this));
    }

    executeChaEffect() {
        this._chaEffect.execute();
    }

    onDead(victim) {
        if (victim == this._name) {
            this._chaEffect.execute();
            this._enjuego = false;
        }

    }

    // Funcion para cuando se le asocia "Cotillear" a "Jeff" o a "Vieja al visillo"
    onCotillear(characterName) {
        if (characterName == 'jeff' && this._name == 'jeff') {
            this._chaEffect.execute();
        }
        else if(characterName == 'vieja-visillo' && this._name == 'vieja-visillo') {
            this._chaEffect.execute();
        }
    }

    // Funcion para la cartas que generan un recurso por acto
    onNextAct() {
        if (this._enjuego&&(this._name=='melanie-daniels'||this._name=='bandada-pajaros')) {
            this._effect.execute();
        }
    }
}