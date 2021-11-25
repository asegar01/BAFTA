const CARD_TYPE = ["STAGE", "CHARACTER", "ACTION"]
const CARD_MOVIE = ["1", "2", "3", "4", "5"]

export default class Card extends Phaser.GameObjects.Sprite{

constructor(scene, x, y, name, sprite, family, audiencemod, effect){
    super(scene,x,y,sprite);
    this._name=name;
    this._enjuego = false;
    this._family=family;
    this._audiencemod = audiencemod;
    this._drawn = false;
    this._effect=effect;
}


ondrawn(){
    this.drawn = true;
}

onplayed(){
    this.scene.audienceFocus += this._audiencemod;
    this._enjuego=true;
    this._effect.execute();
}



}