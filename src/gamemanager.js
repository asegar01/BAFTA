import HudManager from "./hudmanager.js";
import Deck from "./deck.js";
import EventDispatcher from "./eventdispatcher.js";

export default class GameManager {
    constructor(scene) {
        this.scene = scene;
        this.hud = new HudManager(this.scene, this);
    }
    create() {
        this.occupiedHand = Array(7).fill(false); // las posiciones de hand ocupadas son true
        this.cardsOnHandNames = Array(7).fill('none'); // los nombres de las cartas de hand

        this.emitter = EventDispatcher.getInstance(); // emisor de eventos
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

        this.stage = null; // por defecto no hay escenario

        // Construcción de mano
        this.hand = [];
        this.deck.dealNcard(5, this.hand);

        // Creación del array para administrar el orden de las cartas jugadas
        this.occupied = Array(8).fill(false);
        this.table = []; // las cartas que estan en juego
        this.cardsOnTableNames = []; // el nombre de las cartas que estan en juego
        this.cardsOnTableFocus = []; // la cantidad de atencion de la audiencia que generan las cartas que estan en juego
        this.screenIsFull = false;

        this.moviesCompleted = Array(4).fill(0); // guarda el numero de cartas jugadas que completan una pelicula de hitchcock
        this.movieCompleted = 'none'; // la pelicula que se ha completado
    }

    // coloca la carta en la pantalla en el primer hueco libre
    setCardOnScreen(card, cardName, isStage, audienceFocusAmount) {
        if (!isStage) {
            let i = 0;
            while (i < this.occupied.length && this.occupied[i]) i++;
            this.screenIsFull = (i >= 7);
            if (i < this.occupied.length) {
                if (i < this.occupied.length / 2) {
                    card.x = 75 * i + 380;
                    card.y = 120;
                }
                else {
                    card.x = (i - this.occupied.length / 2) * 75 + 380;
                    card.y = 240;
                }
                this.occupied[i] = true;
                this.table.push(card);
                this.cardsOnTableNames.push(cardName);
                this.cardsOnTableFocus.push(audienceFocusAmount);
            }
        }
        else {
            card.x = 70;
            card.y = 185;
            card.setScale(.4);
        }
    }

    // funcion para pasar de acto
    nextact() {
        if (this.numActo < 5 && this.hand.length <= 5) {
            // Emision del evento pasar de acto
            this.emitter.emit("next_act");
            // Capricho de la audiencia
            if (this.capricho != -1 && this.capricho != 3) this.audienceFocus -= 2;
            this.capricho = Math.floor((Math.random() * 3) + 0);

            // Robo de cartas
            this.deck.dealNcard(2, this.hand);

            //Acto siguiente
            this.numActo++;

            // actualizacion del hud
            this.hud.updateTexts();
            this.hud.caprichoSetVisible();
        }
        else {
            if (this.hand.length <= 5) {
                this.gameover = 1;
            }
            else this.hud.demasiadasCartasSetVisible();
        }
    }

    // Emite el evento cuando alguna carta muere con el nombre como parametro
    onDead(victimName) {
        this.emitter.emit("someone_died", victimName);
    }

    // Emite el evento con el nombre de la carta a la que se asocia "Cotillear"
    onCotillear(name) {
        this.emitter.emit("cotillear_played", name);
    }

    // devuelve el indice del primer hueco libre de hand
    getFirstEmptyOnHand() {
        let j = 0;
        while (j < 7 && this.occupiedHand[j]) j++;
        return j;
    }

    // actualiza la info de hand
    // se llama al robar y jugar cartas
    updateHandInfo(posOnHand, value, cardName) {
        this.occupiedHand[posOnHand] = value;
        this.cardsOnHandNames[posOnHand] = cardName;
    }

    // actualiza el array que determina que pelicula se ha completado
    updateMoviesCompleted(family) {
        // solo se actualiza si todavia no se ha completado ninguna pelicula
        if (this.movieCompleted == 'none') {
            if (family == 'psicosis') {
                this.moviesCompleted[0]++;
                if (this.moviesCompleted[0] == 3) this.movieCompleted = 'psicosis';
            }
            else if (family == 'pajaros') {
                this.moviesCompleted[1]++;
                if (this.moviesCompleted[1] == 3) this.movieCompleted = 'pajaros';
            }
            else if (family == 'ventana-indiscreta') {
                this.moviesCompleted[2]++;
                if (this.moviesCompleted[2] == 3) this.movieCompleted = 'ventana-indiscreta';
            }
            else if (family == 'vertigo') {
                this.moviesCompleted[3]++;
                if (this.moviesCompleted[3] == 3) this.movieCompleted = 'vertigo';
            }
        }

    }

    update() {
        if (this.audienceFocus <= 0) {
            this.gameover = -1;
        }

        // Pantalla de fin de juego
        if (this.gameover !== 0) {
            let data = [this.gameover, this.movieCompleted, this.trophies];
            this.scene.scene.start('end', data);
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