import Card from "./card.js";
import EventDispatcher from "./eventdispatcher.js";

export default class Personaje extends Card{
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect, chaEffect){
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
        this._chaEffect = chaEffect;
        this.alive=true;
        this.emitter=EventDispatcher.getInstance();
        this.emitter.on("someone_died",this.onDead.bind(this));
    }

    executeChaEffect(){
        this._chaEffect.execute();
    }
    onDead(victim){
        if(victim==this._name){
            this._chaEffect.execute();
            this._enjuego=false;
        }
        
    }
}