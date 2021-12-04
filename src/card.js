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

    // Carta jugada
    onplayed()
    {
        console.log(this.CARD_TYPE);
        if(this.CARD_TYPE == 'STAGE')
        {
            stageEffect = this._effect;
            this.onGenerate();
        }
        else this._effect.execute();

        this.scene.audienceFocus += this._audiencemod;
        this.scene.focuslabel.text=this.scene.audienceFocus;
        this._enjuego = true;
    }
    
    // Generar efecto del escenario
    onGenerate()
    {
        stageEffect.execute();
    }
}