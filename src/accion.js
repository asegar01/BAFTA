import Card from "./card.js";

export default class Accion extends Card {
    constructor(juego, scene, x, y, name, sprite, family, audiencemod, effect) {
        super(juego, scene, x, y, name, sprite, family, audiencemod, effect);
        this.actionEffect = effect;
    }

    onplayed() {
        let auxrec = new Phaser.Geom.Rectangle(this.x, this.y, this.imagenjuego.displayWidth, this.imagenjuego.displayHeight);
        let j = 0; // la posicion de la carta en cardsOnHandNames
        while (j < this._juego.cardsOnHandNames.length && this._juego.cardsOnHandNames[j] != this._name) j++;
        if (this.checktrash(auxrec) && this._juego.hand.length > 5) {
            this.imagenjuego.setActive(false).setVisible(false);
            // actualiza la info de hand ya que la carta ya no esta en hand
            this._juego.updateHandInfo(j, false, 'none');
        }
        else {
            let i = 0; // i representa el indice de la carta personaje a la que se asocia la carta accion
            let found = false;
            while (!found && i < this._juego.table.length) {
                let pointer = this.scene.input.activePointer;
                if (Phaser.Geom.Rectangle.Contains(this._juego.table[i].getBounds(), pointer.worldX, pointer.worldY)) {
                    if (this._name != 'entrega-paquete' || this._juego.hand.length < 7) {
                        found = true;
                        // actualiza la info de hand ya que la carta ya no esta en hand
                        this._juego.updateHandInfo(j, false, 'none');
                        // Ejecutar effecto
                        this.actionEffect.execute(i);
                        // Eliminar carta
                        this._enjuego = true;
                        this._juego.scene.input.setDraggable(this.imagenjuego, false);
                        this.imagenjuego.setActive(false);
                        if (this._name == 'norman-bates') {
                            this.imagenjuego.setScale(.2).setDepth(0);
                            this._juego.setCardOnScreen(this.imagenjuego, this._name, false);
                        }
                        else {
                            this.imagenjuego.setVisible(false);
                        }
                        this._juego.audienceFocus += this._audiencemod;
                        if (this._juego.audienceFocus > 10) this._juego.audienceFocus = 10;

                        this._juego.hud.updateTexts();

                    }

                }
                i++;
            }
            if (!found) {
                this.imagenjuego.x = this.iniX;
                this.imagenjuego.y = this.iniY;
            }
        }

    }
}