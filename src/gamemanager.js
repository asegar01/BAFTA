import HudManager from "./hudmanager.js";
import Deck from "./deck.js";

export default class GameManager{
    constructor(scene){
        this.scene = scene;
        this.hud = new HudManager(this.scene, this);
    }
    create(){
        // Medidores de recursos
        this.comedy = 0;
        this.drama = 0;
        this.suspense = 0;
    
        // Inicialización variables principales
        this.gameover = 0;
        this.audienceFocus = 5;
        this.trophies = 0;
        this.capricho = -1;
        this.numActo = 1;

        // Construccion del HUD
        this.hud.create();

        // Construcción de Deck
        this.deck = new Deck(this);
    
        // Construcción de mano
        this.hand = [];
        this.deck.dealNcard(5,this.hand);

        // Creación del array para administrar el orden de las cartas jugadas
        this.occupied = Array(8).fill(false);
        this.table = [];
    }

    setCardScreen(card)
    {
        let i = 0;
        while(i < this.occupied.length && this.occupied[i]) i++;

        if(i < this.occupied.length)
        {
            if(i < this.occupied.length / 2)
            {
                card.x = 75 * i + 380;
                card.y = 120;
            }
            else
            {
                card.x =  (i - this.occupied.length / 2) * 75 + 380;
                card.y = 240;
            }
            this.occupied[i] = true;
            this.table.push(card);
        }
    }

    nextact(){
        if (this.numActo < 5 && this.hand.length <= 5) {
            // Capricho de la audiencia
            if (this.capricho != -1) this.audienceFocus -= 2;
            this.capricho = Math.floor((Math.random() * 3) + 0);

            // Robo de cartas
            this.deck.dealNcard(2, this.hand);

            //Acto siguiente
            this.numActo++;

            // actualizacion del hud
            this.hud.updatetexts();
            this.hud.caprichoSetVisible();
        }
        else {
            if (this.hand.length <= 5) {
                this.gameover = 1;
            }
            else this.hud.demasiadasCartasSetVisible();
        }
    }

    update(){
        if (this.audienceFocus <= 0) {
            this.gameover = -1;
        }

        // Pantalla de fin de juego
        if (this.gameover !== 0) {
            this.scene.scene.start('end', this.gameover);
        }

        let i = 0;
        while (i < this.hand.length) {
            if (this.hand[i].active === false)
                this.hand.splice(i, 1);
            i++;
        }

        this.hud.updatehud();
    }
}