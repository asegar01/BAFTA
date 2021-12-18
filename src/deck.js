import Card from "./card.js";
import Accion from "./accion.js";
import Personaje from "./personaje.js";
import Escenario from "./escenario.js";
import { CaidaRepentinaEffect, CotillearEffect, DeliveryEffect, GenerateEffect, KillEffect, MelanieEffect, MirarObraEffect, ResultarHeridoEffect } from "./effects.js";

export default class Deck {
    constructor(juego) {
        this.juego = juego;
        this.cardlist = [];
        this.createDeck();
    }

    //toda la creacion de cartas aqui
    createDeck() {
        for (let i = 0; i < 0; i++) {
            let comedyUp = new GenerateEffect(this.juego, 0, 1, 0);
            this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, '', 'card1', '', 1, comedyUp));
        }
        for (let i = 0; i < 0; i++) {
            let comedyUp = new GenerateEffect(this.juego, 0, 1, 0);
            this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, '', 'card2', '', 1, comedyUp, ''));
        }
        for (let i = 0; i < 0; i++) {
            let comedyUp = new GenerateEffect(this.juego, 0, 1, 0);
            this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, '', 'card3', '', 1, comedyUp));
        }
        let nullEffect = new GenerateEffect(this.juego, -1, 0, 0);
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'bates-motel', 'bates-motel', 'psicosis', 0, new GenerateEffect(this.juego, 2, 1, 0)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'marion-crane', 'marion-crane', 'psicosis', 2, nullEffect, new GenerateEffect(this.juego, 2, 2, 2)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'matar', 'matar', 'none', 1, new KillEffect(this.juego, false)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'norman-bates', 'norman-bates', 'psicosis', 2, new KillEffect(this.juego, true)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'cameo-hitchcock', 'cameo-hitchcock', 'none', 2, new GenerateEffect(this.juego, 0, 3, 0), nullEffect));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'cotillear', 'cotillear', 'ventana-indiscreta', 0, new CotillearEffect(this.juego)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'jeff', 'jeff', 'ventana-indiscreta', 2, nullEffect, new GenerateEffect(this.juego, 2, 2, 0)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'bloque-vecinos', 'bloque-vecinos', 'ventana-indiscreta', 0, new GenerateEffect(this.juego, 0, 1, 0)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'circo', 'circo', 'none', 0, new GenerateEffect(this.juego, 0, 1, 0)));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'abuelo-tacataca', 'abuelo-tacataca', 'none', -1, nullEffect, nullEffect));
        this.cardlist.push(new Personaje(this.juego, this.juego.scene, 0, 0, 'vieja-visillo', 'vieja-visillo', 'none', 1, new GenerateEffect(this.juego, 0, 2, 0), new CotillearEffect(this.juego)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'mirar-obra', 'mirar-obra', 'none', -2, new MirarObraEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'caseron-abandonado', 'caseron-abandonado', 'none', 0, new GenerateEffect(this.juego, 2, 1, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'echar-loteria', 'echar-loteria', 'none', 1, new GenerateEffect(this.juego, this.randomIntFromInterval(0, 2), 3, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'entrega-paquete', 'entrega-paquete', 'none', 1, new DeliveryEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, 'cementerio', 'cementerio', 'none', 0, new GenerateEffect(this.juego, 1, 1, 0)));
        this.cardlist.push(new Accion(this.juego, this.juego.scene, 0, 0, 'caida-repentina', 'caida-repentina', 'none', 0, new CaidaRepentinaEffect(this.juego)));
        this.cardlist.push(new Personaje(this.juego,this.juego.scene,0,0,'bandada-pajaros','bandada-pajaros','pajaros',0,new GenerateEffect(this.juego,2,1,0),nullEffect));
        this.cardlist.push(new Personaje(this.juego,this.juego.scene,0,0,'melanie-daniels','melanie-daniels','pajaros',2,new MelanieEffect(this.juego),nullEffect));
        this.cardlist.push(new Accion(this.juego,this.juego.scene,0,0,'resultar-herido','resultar-herido','none',0,new ResultarHeridoEffect(this.juego)));
        this.cardlist.push(new Escenario(this.juego,this.juego.scene,0,0,'bodega-bay','bodega-bay','pajaros',0,new GenerateEffect(this.juego,0,1,0)));
        
        // dejar esta linea al final siempre
        this.shuffle();
    }
    dealNcard(n, hand) {
        for (let i = 0; i < n; i++) {
            if (this.cardlist.length > 0) {
                let posX = 180 + (100 * i);
                let posY = 400;

                let imagen = this.juego.scene.add.image(posX, posY, this.cardlist[this.cardlist.length - 1].texture);
                imagen.setInteractive().setScale(.3);
                this.juego.scene.input.setDraggable(imagen);
                imagen.objetopadre = this.cardlist[this.cardlist.length - 1];
                this.cardlist[this.cardlist.length - 1].imagenjuego = imagen;

                imagen.objetopadre.iniX = posX;
                imagen.objetopadre.iniY = posY;

                hand.push(imagen);
                this.cardlist.pop();
            }
        }
    }
    // Generar numero aleatorio
    randomIntFromInterval(min, max) { // min y max incluidos 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    shuffle(){
        for(let i = 0; i < this.cardlist.length; i++){
            let aux = this.cardlist[i];
            let j = this.randomIntFromInterval(i,this.cardlist.length-1);
            this.cardlist[i]=this.cardlist[j];
            this.cardlist[j]=aux;
        }
    }
}