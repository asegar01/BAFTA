import Card from "./card.js";

export default class Deck
{
    constructor(juego)
    {
        this.juego = juego;
        this.cardlist = [];
        this.createdeck();
    }

    //toda la creacion de cartas aqui
    createdeck(){
        this.cardlist.push(new Card(this.juego,this.juego.scene,0,0,'','card','',0,''));
    }

    dealNcard(n, hand)
    {
        for(let i = 0; i < n; i++){
            if(this.cardlist.length>0){
                let imagen = this.juego.scene.add.image(180 + (100 * i), 400, this.cardlist[this.cardlist.length - 1].texture);
                imagen.setInteractive().setScale(.3);
                this.juego.scene.input.setDraggable(imagen);
                imagen.objetopadre = this.cardlist[this.cardlist.length - 1];
                this.cardlist[this.cardlist.length - 1].imagenjuego = imagen;
                hand.push(imagen);
                this.cardlist.pop();
            }
        }
    }
}