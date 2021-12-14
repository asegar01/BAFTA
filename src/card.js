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
        let auxrec = new Phaser.Geom.Rectangle(this.x,this.y,this.imagenjuego.displayWidth,this.imagenjuego.displayHeight);
        if (this.checktrash(auxrec) && this._juego.hand.length > 5) {
            this.imagenjuego.setActive(false).setVisible(false); //un poco chapuza pero bueno por imagenjuego
        }
        else if (this.checkboard(auxrec)) {
            this._juego.scene.input.setDraggable(this.imagenjuego, false);
            this.imagenjuego.setActive(false);
            this.imagenjuego.setScale(.2).setDepth(0);
            this._juego.setCardScreen(this.imagenjuego);

            // Ejecuta el efecto de la carta utilizada
            this._effect.execute();

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

    checktrash(auxrec) {
        return Phaser.Geom.Rectangle.Overlaps(this._juego.hud.trash_rect, auxrec);
    }

    checkboard(auxrec) {
        return Phaser.Geom.Rectangle.Overlaps(this._juego.hud.gamearea, auxrec);
    }
}