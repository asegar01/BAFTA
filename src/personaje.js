import Card from "./card.js";
import EventDispatcher from "./eventdispatcher.js";

export default class Personaje extends Card {
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect, chaEffect) {
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
        this._chaEffect = chaEffect;
        this.alive = true;
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("someone_died", this.onDead.bind(this));
        this.emitter.on("cotillear_played", this.onCotillear.bind(this));
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
    // Funcion para cuando se le asocia "Cotillear" a "Jeff"
    onCotillear(characterName) {
        if (characterName == 'jeff' && this._name == 'jeff') {
            this._chaEffect.execute();
        }
    }
}