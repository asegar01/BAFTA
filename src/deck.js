import Card from "./card.js";
import Accion from "./accion.js";
import Personaje from "./personaje.js";
import Escenario from "./escenario.js";
import { GenerateEffect } from "./effects.js";

export default class Deck
{
    constructor(juego)
    {
        this.juego = juego;
        this.cardlist = [];
        this.createDeck();
    }

    //toda la creacion de cartas aqui
    createDeck(){
        for(let i = 0; i < 3; i++){
            let comedyUp = new GenerateEffect(this.juego, 0, 1);
            this.cardlist.push(new Accion(this.juego,this.juego.scene,0,0,'','card','',1,comedyUp));
        }
        for(let i = 0; i < 3; i++){
            let comedyUp = new GenerateEffect(this.juego, 0, 1);
            this.cardlist.push(new Personaje(this.juego,this.juego.scene,0,0,'','card','',1,comedyUp,''));
        }
        for(let i = 0; i < 3; i++)
        {
            let comedyUp = new GenerateEffect(this.juego, 0, 1);
            this.cardlist.push(new Escenario(this.juego, this.juego.scene, 0, 0, '', 'card', '', 1, comedyUp));
        }
    }
    dealNcard(n, hand)
    {
        for(let i = 0; i < n; i++){
            if(this.cardlist.length>0){
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
}