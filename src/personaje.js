import Card from "./card.js";

export default class Personaje extends Card{
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect, chaEffect){
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
        this.chaEffect = chaEffect;
    }

    executeChaEffect(){
        this.chaEffect.execute();
    }
}