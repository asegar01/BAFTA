
export default class Card extends Phaser.GameObjects.Sprite {
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect) {
        super(scene, x, y, sprite);
        this._name = name;
        this._enjuego = false;
        this._family = family;
        this._audiencemod = audiencemod;
        this._drawn = false;
        this._effect = effect;
        this._juego = juego;
    }

    // Carta jugada
    onplayed() 
    {
        if (this.checktrash() && this._juego.hand.length > 5) {
            this.imagenjuego.setActive(false).setVisible(false); //un poco chapuza pero bueno por imagenjuego
        }
        else if (this.checkboard()) {
            this._juego.scene.input.setDraggable(this.imagenjuego, false);
            this.imagenjuego.setActive(false);
            this.imagenjuego.setScale(.2);

            this._juego.setCardScreen(this.imagenjuego);

            //this._effect.execute();
            this.scene.audienceFocus += this._audiencemod;
            this._enjuego = true;
            this._juego.hud.updatetexts();
        }
        else
        {
            this.imagenjuego.x = this.iniX;
            this.imagenjuego.y = this.iniY;
        }
    }

    checktrash() {
        return this._juego.hud.trash_rect.contains(this.x, this.y);
    }

    checkboard() {
        return this._juego.hud.gamearea.contains(this.x, this.y);
    }
}