export default class Deck
{
    constructor(juego)
    {
        this.juego = juego;
        this.cardlist = [];
    }

    //toda la creacion de cartas aqui
    createdeck(){

    }

    dealNcard(n, hand)
    {
        if(this.cardlist.length>0)
        for(let i = 0; i < n; i++){
            let imagen = this.juego.scene.add.image(180 + (100 * i), 400, this.cardlist[this.cardlist.length - 1].texture);
            imagen.setInteractive({ draggable: true }).setScale(.3);
            imagen.objetopadre = carta;
            hand.push(imagen);
            this.cardlist.pop();
        }
    }
}