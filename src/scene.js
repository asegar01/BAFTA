import Card from './card.js';
import Effect, { GenerateEffect, TrophyEffect } from './effects.js';
import Deck from './deck.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    this.scale.updateBounds();
    let cinema = this.add.image(500, 250, 'cinema');
    cinema.setScale(.5);

    this.screen = this.add.sprite(490, 170, 'screen').setInteractive();
    let screen_scale = .5;
    this.screen.setScale(screen_scale);

    //medidores de recursos
    this.comedy = 0;
    this.drama = 0;
    this.suspense = 0;

    this.comedylabel = this.add.text(50,50,"Comedy: " + this.comedy);
    this.dramalabel = this.add.text(50,70,"Drama: " + this.drama);
    this.suspenselabel = this.add.text(50,90,"Suspense: " + this.suspense);
    
    
    // cosas importantes
    this.gameover = -1;
    this.audienceFocus = 5;
    this.focuslabel = this.add.text(200,50,"Focus: " + this.audienceFocus);
    this.trophies = 0;
    this.trophieslabel = this.add.text(50,130,"Trophies: " + this.trophies);

    //capricho de la audiencia
    this.capricho = -1;
    this.capricholabel = this.add.text(200, 70, "Capricho: " + this.capricho);
    //------------------
    
    //construccion de deck
    this.deck = new Deck(this, 0, 0,'');

    let comedy1up = new GenerateEffect(this,0,1);
    this.deck.addCard(new Card(this,0,0,"",'card1',"",1,comedy1up));
    let drama1up = new GenerateEffect(this,1,1);
    this.deck.addCard(new Card(this,0,0,"",'card2',"",0,drama1up));
    let suspense1up = new GenerateEffect(this,2,1);
    this.deck.addCard(new Card(this,0,0,"",'card3',"",-1,suspense1up));

    let comedy2t = new TrophyEffect(this,0,1);
    this.deck.addCard(new Card(this,0,0,"",'card4',"",-1,comedy2t));
    let drama2t = new TrophyEffect(this,1,1);
    this.deck.addCard(new Card(this,0,0,"",'card5',"",0,drama2t));
    let suspense2t = new TrophyEffect(this,2,1);
    this.deck.addCard(new Card(this,0,0,"",'card6',"",1,suspense2t));
    
    //---------------------

    //construccion de mano
    this.hand = [];
    this.deck.dealNcard(5,this.hand);

    this.trash_can = this.add.sprite(55,420,'trash-can');
    let trash_can_scale = .3;
    this.trash_can.setScale(trash_can_scale);
    if(this.hand.length <= 5) this.trash_can.setTint(0x707070);
    //---------------

    // UI
    let next_act_button = this.add.sprite(900, 400, 'next-act-button').setInteractive();
    next_act_button.setScale(.4);
    let act_counter = this.add.sprite(930, 50, 'act-counter');
    act_counter.setScale(.5);
    
    let numActo = 1;
    next_act_button.on('pointerdown', pointer=>{
      if(numActo < 5){
        if(this.hand.length<=5){
          //capricho de la audiencia
          if(this.capricho != -1) this.audienceFocus -= 2;
          this.capricho = Math.floor((Math.random() * 2) + 0); 
          console.log("capricho: " + this.capricho);
          console.log("focus: " + this.audienceFocus);
          console.log("end: " + this.gameover);
          //------------------
          //robo de cartas
          this.deck.dealNcard(2, this.hand);
          //------------------
          numActo++;
          let act_counter = this.add.sprite(930,50,'act-counter');
          act_counter.setScale(.5);
          this.label = this.add.text(915, 20, "ACTO");
          this.label = this.add.text(930, 40, numActo);
          this.focuslabel.text = "Focus: " + this.audienceFocus;
          this.capricholabel.text ="Capricho: " + this.capricho;
          console.log('Acto '+ numActo);
        }
        else console.log("No puedes tener mas de 5 cartas al pasar de acto");
        
      }
      else {
        this.gameover = 1;
        console.log('Fin de la partida');
      }
      
    });
    this.label = this.add.text(915, 20, "ACTO");
    this.label = this.add.text(930, 40, numActo);

    // Mover objectos que sean draggable
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      this.scene.children.bringToTop(gameObject);

      gameObject.x = dragX;
      gameObject.y = dragY;
      
      if(gameObject.x < (this.scene.trash_can.x + 320 * trash_can_scale / 2) && gameObject.y > (this.scene.trash_can.y - 400 * trash_can_scale / 2) 
        && gameObject.x > (this.scene.trash_can.x - 320 * trash_can_scale / 2) && gameObject.y < (this.scene.trash_can.y + 400 * trash_can_scale / 2))
        {
          if(this.scene.hand.length > 5)
          {
            gameObject.setTint(0xff0000);
          }
        }
      else if(gameObject.x < (this.scene.screen.x + 580 * screen_scale / 2) && gameObject.x > (this.scene.screen.x - 580 * screen_scale / 2)
        && gameObject.y > (this.scene.screen.y - 450 * screen_scale / 2) && gameObject.y < (this.scene.screen.y + 450 * screen_scale / 2))
        {
          gameObject.setTint(0x32CD32);
        }
      else gameObject.clearTint();
    });


    this.input.on('dragend', function (pointer, gameObject) {
      // Tirar cartas
      if(this.scene.hand.length > 5)
      {
        if(gameObject.x < (this.scene.trash_can.x + 320 * trash_can_scale / 2) 
          && gameObject.y > this.scene.trash_can.y - 400 * trash_can_scale / 2)
        {
          gameObject.setActive(false).setVisible(false);
          console.log("cartas en mano: "+this.scene.hand.length);
          if(this.scene.hand.length <= 5) this.scene.trash_can.setTint(0x707070);
        }
      }
      // Poner cartas en juego
      if((gameObject.x < (this.scene.screen.x + 580 * screen_scale / 2) && gameObject.x > (this.scene.screen.x - 580 * screen_scale / 2)
      && gameObject.y > (this.scene.screen.y - 450 * screen_scale / 2) && gameObject.y < (this.scene.screen.y + 450 * screen_scale / 2)))
      {
        this.scene.input.setDraggable(gameObject,false);
        gameObject.setActive(false);
        gameObject.objetopadre.onplayed();
        console.log("cartas en mano: "+this.scene.hand.length);
      }
    });
  }

  update(){
    if(this.audienceFocus<=0){
      this.gameover=0;
      //console.log("END: " + this.gameover);
    }
    if(this.gameover!==-1){
      if(this.gameover===1)this.add.text(400,10,"VICTORY");
      else this.add.text(400,10,"NOT victory");
    }
    if(this.hand.length <= 5) this.trash_can.setTint(0x707070);
    else this.trash_can.setTint(0xffffff);

    let i = 0;
    while(i<this.hand.length){
      if(this.hand[i].active===false)
      this.hand.splice(i,1);
      i++;
    }
  }
}