export default class Deck extends Phaser.GameObjects.Sprite{
constructor(scene,x,y,sprite){
    super(scene,x,y,sprite);
    //dibujar el deck
    this.cardlist=[];
}

addCard(card){
this.cardlist.push(card);
card.active=false;
}

dealNcard(n, hand){
for(let i = 0; i < n; i++){
    //habria que borrar de cardlist?
    let carta = this.cardlist[Math.floor((Math.random()*this.cardlist.length)+0)];
    //no funca el cambio de posicion y tengo que ver por que
    carta.x=200+(100*hand.length);
    carta.y=400;
    carta.scene.add.image(carta.x,carta.y,'card').setInteractive({ draggable: true }).setScale(.3);
    hand.push(carta);
}
}

}