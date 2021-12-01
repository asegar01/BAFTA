import Effect, { GenerateEffect } from './effects.js';

const CARD_TYPE = ["STAGE", "CHARACTER", "ACTION"]
const CARD_MOVIE = ["1", "2", "3", "4", "5"]

let stage = false;

export default class Card extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, name, sprite, family, audiencemod, effect){
        super(scene,x,y,sprite);
        this._name = name;
        this._enjuego = false;
        this._family = family;
        this._audiencemod = audiencemod;
        this._drawn = false;
        this._effect = effect;

        this.CARD_TYPE = family;
    }

    ondrawn()
    {
        this.drawn = true;
    }

    onplayed()
    {
        console.log(this.CARD_TYPE);
        if(this.CARD_TYPE == 'STAGE')
        {
            if(stage != true)
            {
                stage = true;

                console.log("Escenario utilizado");
            }
            else
            {
                console.log("Escenario cambiado");
            }
            this.onGenerate();
        }

        this._effect.execute();
        this.scene.audienceFocus += this._audiencemod;
        this.scene.focuslabel.text=this.scene.audienceFocus;
        this._enjuego = true;
    }
    
    onGenerate()
    {
        let stageEffect = new GenerateEffect(this, this._audiencemod, this._effect);
        console.log(stageEffect);
        // stageEffect.execute();
    }
}