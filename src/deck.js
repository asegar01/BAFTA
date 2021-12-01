export default class Deck extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite);
        //dibujar el deck
        this.cardlist=[];
    }

    addCard(card)
    {
        this.cardlist.push(card);
        card.active=false;
    }

    dealNcard(n, hand)
    {
        for(let i = 0; i < n; i++)
        {
            //habria que borrar de cardlist?
            let carta = this.cardlist[Math.floor((Math.random()*this.cardlist.length)+0)];
            let imagen = carta.scene.add.image(200+(100*hand.length),400,carta.texture);
            imagen.setInteractive({ draggable: true }).setScale(.3);
            imagen.objetopadre = carta;
            hand.push(imagen);
        }
    }
}