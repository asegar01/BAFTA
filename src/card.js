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
    this._effect.execute();
    this.scene.audienceFocus += this._audiencemod;
    this._enjuego=true;
}



}