// Array de cartas en la mano
let occupiedHand = Array(7).fill(false);

export default class Deck extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);

        // Dibujar el deck
        this.cardlist = [];
    }

    addCard(card)
    {
        this.cardlist.push(card);
        card.active = false;
    }

    dealNcard(n, hand)
    {
        for(let i = 0; i < n; i++)
        {
            for(let j = 0; j < occupiedHand.length; j++)
            {
                //habria que borrar de cardlist?
                let carta = this.cardlist[Math.floor((Math.random() * this.cardlist.length) + 0)];
                if(occupiedHand[j] != true)
                {
                    let imagen = carta.scene.add.image(180 + (100 * j), 400, carta.texture);
                    occupiedHand[j] = true;
                    imagen.setInteractive({ draggable: true }).setScale(.3);
                    imagen.objetopadre = carta;
                    hand.push(imagen);
                    break;
                }
            }
        }
    }

    onCardPlay()
    {
        occupiedHand[0] = false;
    }
}