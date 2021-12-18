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

        // para el cartel de info de la carta
        this.cardInfoName = this._name + '-info';
        this.cardInfo = scene.add.sprite(0, 0, this.cardInfoName).setVisible(false);
    }

    // Carta jugada
    // En la clase Accion se hace override de este metodo
    onplayed() {
        let auxrec = new Phaser.Geom.Rectangle(this.x, this.y, this.imagenjuego.displayWidth, this.imagenjuego.displayHeight);
        let i = 0; // la posicion de la carta en cardsOnHandNames
        while (i < this._juego.cardsOnHandNames.length && this._juego.cardsOnHandNames[i] != this._name) i++;
        if (this.checktrash(auxrec) && this._juego.hand.length > 5) {
            this.imagenjuego.setActive(false).setVisible(false); //un poco chapuza pero bueno por imagenjuego
            // actualiza la info de hand ya que la carta ya no esta en hand
            this._juego.updateHandInfo(i, false, 'none');
        }
        else if (this.checkboard(auxrec)) {
            // Si es un Personaje y hay 8 cartas en la mesa, la carta no se juega
            if (this.constructor.name == "Personaje" && this._juego.screenIsFull) {
                this.imagenjuego.x = this.iniX;
                this.imagenjuego.y = this.iniY;
            }
            else {
                this._enjuego = true;
                // actualiza la info de hand ya que la carta ya no esta en hand
                this._juego.updateHandInfo(i, false, 'none');
                this._juego.scene.input.setDraggable(this.imagenjuego, false);
                this.imagenjuego.setActive(false);
                this.imagenjuego.setScale(.2).setDepth(0);
                let isStage = (this.constructor.name == "Escenario");
                this._juego.setCardOnScreen(this.imagenjuego, this._name, isStage, this._audiencemod);
                if (isStage) {
                    if (this._juego.stage != null) {
                        this._juego.stage._enjuego = false;
                        this._juego.stage.setVisible(false);
                    }
                    this._juego.stage = this;
                }
                // Ejecuta el efecto de la carta utilizada
                this._effect.execute();

                this._juego.audienceFocus += this._audiencemod;
                if (this._juego.audienceFocus > 10) this._juego.audienceFocus = 10;

                this._juego.hud.updateTexts();
            }
        }
        else // Si no es jugada, la carta vuelve a su posicion inicial
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

    // mostrar info de la carta cuando se situa el cursor sobre ella
    cartaInfo(img) {
        this.cardInfo.setDepth(2);
        this.cardInfo.alpha = .95;
        let cartel_dX = 150;
        let cartel_dY = 10;
        img.on('pointermove', pointer => {
            this.cardInfo.setVisible(true);
            this.cardInfo.x = pointer.x + cartel_dX;
            this.cardInfo.y = pointer.y + cartel_dY;

        })
        img.on('pointerout', pointer => {
            this.cardInfo.setVisible(false);
        })
    }
}