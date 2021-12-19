import Card from "./card.js";
import Accion from "./accion.js";
import Personaje from "./personaje.js";
import Escenario from "./escenario.js";
import { CaidaRepentinaEffect, CotillearEffect, DeliveryEffect, GenerateEffect, KillEffect, MelanieEffect, MirarObraEffect, ResultarHeridoEffect, SuicidioEffect, TrophyEffect } from "./effects.js";

export default class Deck {
    constructor(juego) {
        this.juego = juego;
        this.cardlist = [];
        this.createDeck();
    }

    //toda la creacion de cartas aqui
    createDeck() {
        let nullEffect = new GenerateEffect(this.juego, -1, 0, 0);
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'bates-motel', 'bates-motel', 'psicosis', 0, new GenerateEffect(this.juego, 2, 1, 0)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'marion-crane', 'marion-crane', 'psicosis', 2, nullEffect, new GenerateEffect(this.juego, 2, 2, 2)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'matar', 'matar', 'none', 1, new KillEffect(this.juego, false)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'norman-bates', 'norman-bates', 'psicosis', 1, new KillEffect(this.juego, true)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'cameo-hitchcock', 'cameo-hitchcock', 'none', 2, new GenerateEffect(this.juego, 0, 3, 0), nullEffect));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'cotillear', 'cotillear', 'ventana-indiscreta', -1, new CotillearEffect(this.juego)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'jeff', 'jeff', 'ventana-indiscreta', 2, nullEffect, new GenerateEffect(this.juego, 2, 2, 0)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'bloque-vecinos', 'bloque-vecinos', 'ventana-indiscreta', 0, new GenerateEffect(this.juego, 0, 1, 0)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'circo', 'circo', 'none', 0, new GenerateEffect(this.juego, 0, 1, 0)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'abuelo-tacataca', 'abuelo-tacataca', 'none', -1, nullEffect, nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'vieja-visillo', 'vieja-visillo', 'none', 1, new GenerateEffect(this.juego, 0, 2, 0), new CotillearEffect(this.juego)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'mirar-obra', 'mirar-obra', 'none', -2, new MirarObraEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'caseron-abandonado', 'caseron-abandonado', 'none', 0, new GenerateEffect(this.juego, 2, 1, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'echar-loteria', 'echar-loteria', 'none', 0, new GenerateEffect(this.juego, this.randomIntFromInterval(0, 2), 3, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'entrega-paquete', 'entrega-paquete', 'none', 0, new DeliveryEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'cementerio', 'cementerio', 'none', 0, new GenerateEffect(this.juego, 1, 1, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'caida-repentina', 'caida-repentina', 'none', -1, new CaidaRepentinaEffect(this.juego)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'bandada-pajaros', 'bandada-pajaros', 'pajaros', -1, new GenerateEffect(this.juego, 2, 1, 0), nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'melanie-daniels', 'melanie-daniels', 'pajaros', 2, new MelanieEffect(this.juego), nullEffect));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'resultar-herido', 'resultar-herido', 'none', -1, new ResultarHeridoEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'bodega-bay', 'bodega-bay', 'pajaros', 0, new GenerateEffect(this.juego, 0, 1, 0)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'comedia-trofeos', 'comedia-trofeos', 'trophies', 0, new TrophyEffect(this.juego, 0), nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'drama-trofeos', 'drama-trofeos', 'trophies', 0, new TrophyEffect(this.juego, 1), nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'suspense-trofeos', 'suspense-trofeos', 'trophies', 0, new TrophyEffect(this.juego, 2), nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'perro-escarbando', 'perro-escarbando', 'ventana-indiscreta', -1, new GenerateEffect(this.juego, 0, 2, 0), nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'madeleine', 'madeleine', 'vertigo', 2, nullEffect, new GenerateEffect(this.juego, 1, 2, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'suicidio', 'suicidio', 'vertigo', 1, new SuicidioEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'campanario', 'campanario', 'vertigo', 0, new GenerateEffect(this.juego, 1, 1, 0)));


        //this.shuffle(); // baraja las cartas
    }
    dealNcard(n, hand) {
        for (let i = 0; i < n; i++) {
            if (this.cardlist.length > 0) {
                let j = this.juego.getFirstEmptyOnHand();
                let posX = 180 + (100 * j);
                let posY = 400;
                let cardName = this.cardlist[this.cardlist.length - 1].texture.key;

                // actualiza la info de hand porque se introduce una carta
                this.juego.updateHandInfo(j, true, cardName);

                let imagen = this.juego.scene.add.sprite(posX, posY, this.cardlist[this.cardlist.length - 1].texture);
                imagen.setInteractive().setScale(.3);
                this.juego.scene.input.setDraggable(imagen);
                imagen.objetopadre = this.cardlist[this.cardlist.length - 1];
                this.cardlist[this.cardlist.length - 1].imagenjuego = imagen;
                imagen.objetopadre.iniX = posX;
                imagen.objetopadre.iniY = posY;

                // se llama a la funcion que muestra la info de las cartas
                this.cardlist[this.cardlist.length - 1].cartaInfo(imagen);

                hand.push(imagen);
                this.cardlist.pop();
            }
        }
    }
    
    // Generar numero aleatorio
    randomIntFromInterval(min, max) { // min y max incluidos 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // Baraja las cartas
    shuffle() {
        for (let i = 0; i < this.cardlist.length; i++) {
            let aux = this.cardlist[i];
            let j = this.randomIntFromInterval(i, this.cardlist.length - 1);
            this.cardlist[i] = this.cardlist[j];
            this.cardlist[j] = aux;
        }
    }
}