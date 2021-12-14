import Card from "./card.js";

export default class Accion extends Card{
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect){
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
    }

    onplayed(){
        let auxrec = new Phaser.Geom.Rectangle(this.x,this.y,this.imagenjuego.displayWidth,this.imagenjuego.displayHeight);
        if (this.checktrash(auxrec) && this._juego.hand.length > 5) {
            this.imagenjuego.setActive(false).setVisible(false); //un poco chapuza pero bueno por imagenjuego
        }
        else if (this.checkboard(auxrec) && this.checkcharacter(auxrec)) {
            this.imagenjuego.setActive(false).setVisible(false);
            //this._juego.table[this.characterontable].objetopadre.executeChaEffect();
            //this._effect.execute();
            this.scene.audienceFocus += this._audiencemod;
            this._enjuego = true;
            this._juego.hud.updateTexts();
        }
        else
        {
            this.imagenjuego.x = this.iniX;
            this.imagenjuego.y = this.iniY;
        }
    }

    checkcharacter(auxrec){
        let result = false;
        for (let i = 0; i < this._juego.occupied.length && !result; i++) {
            let auxrecOn = new Phaser.Geom.Rectangle(0, 0, this.imagenjuego.width * .2, this.imagenjuego.height * .2);
            if (i < this._juego.occupied.length / 2) {
                auxrecOn.x = 75 * i + 380;
                auxrecOn.y = 120;
            }
            else {
                auxrecOn.x = (i - this._juego.occupied.length / 2) * 75 + 380;
                auxrecOn.y = 240;
            }
            if(Phaser.Geom.Rectangle.Overlaps(auxrecOn, auxrec)) {
                result=true;
                this.characterontable = i;
            }
        }
        return result;
    }
}