import Card from './card.js';
import Effect, { GenerateEffect, TrophyEffect } from './effects.js';
import Deck from './deck.js';

/**
 * Escena principal del juego. La escena se compone de un conjunto aleatorio de cartas,
 * un escenario donde poder utilizarlas y los indicadores de recursos. 
 * El juego comienza generando aleatoriamente seis tipos de carta. 
 * Cada vez que el jugador juega una carta, se ve reflejado en el escenario.
 * El juego termina cuando se consigue llegar al último acto o cuando la atención de la audiencia llega a cero.
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
    // Creación del array para administrar el orden de las cartas jugadas
    let occupied = Array(8).fill(false);

    // Variable auxiliar
    let j = 0;

    this.input.mouse.disableContextMenu();
    this.scale.updateBounds();

    // Escenario de juego
    let cinema = this.add.image(500, 260, 'cinema');
    cinema.setScale(.5);

    // Escenario para jugar cartas
    this.screen = this.add.sprite(490, 180, 'screen').setInteractive();
    let screen_scale = .5;
    this.screen.setScale(screen_scale).setVisible(false);

    // Medidores de recursos
    this.comedy = 0;
    this.drama = 0;
    this.suspense = 0;
    
    // Inicialización variables principales
    this.gameover = 0;
    this.audienceFocus = 5;
    this.trophies = 0;

    //this.focuslabel = this.add.text(200,50,"Focus: " + this.audienceFocus);
    //this.trophieslabel = this.add.text(50,130,"Trophies: " + this.trophies);

    // Capricho de la audiencia
    this.capricho = -1;
    //this.capricholabel = this.add.text(200, 70, "Capricho: " + this.capricho);
    
    // Construcción de Deck
    this.deck = new Deck(this, 0, 0, '');

    this.card = new Card(this, 0, 0, "", '', "", 0, console.log(""));

    let comedy1up = new GenerateEffect(this,0,1);
    this.deck.addCard(new Card(this,0,0,"",'card1',"STAGE",1,comedy1up));
    let drama1up = new GenerateEffect(this,1,1);
    this.deck.addCard(new Card(this,0,0,"",'card2',"STAGE",0,drama1up));
    let suspense1up = new GenerateEffect(this,2,1);
    this.deck.addCard(new Card(this,0,0,"",'card3',"STAGE",-1,suspense1up));

    let comedy2t = new TrophyEffect(this,0,1);
    this.deck.addCard(new Card(this,0,0,"",'card4',"ACTION",-1,comedy2t));
    let drama2t = new TrophyEffect(this,1,1);
    this.deck.addCard(new Card(this,0,0,"",'card5',"ACTION",0,drama2t));
    let suspense2t = new TrophyEffect(this,2,1);
    this.deck.addCard(new Card(this,0,0,"",'card6',"CHARACTER",1,suspense2t));
    
    // Construcción de mano
    this.hand = [];
    this.deck.dealNcard(5,this.hand);

    // Papelera de descarte
    this.trash_can = this.add.sprite(55, 420, 'trash-can');
    let trash_can_scale = .3;
    this.trash_can.setScale(trash_can_scale);
    if(this.hand.length <= 5) this.trash_can.setTint(0x707070);

    // HUD
    this.add.image(500, 35, 'hud-background');

    let emotions_scale = .2;

    this.hud_drama = this.add.sprite(40, 35, 'hud-drama').setInteractive();
    this.hud_drama.setScale(emotions_scale);
    this.dramalabel = this.add.text(70, 25, this.drama, {fontSize:'40px'});
    

    this.hud_comedy = this.add.sprite(140, 35, 'hud-comedy').setInteractive();
    this.hud_comedy.setScale(emotions_scale);
    this.comedylabel = this.add.text(170, 25, this.comedy, {fontSize:'40px'});

    this.hud_suspense = this.add.sprite(240, 35, 'hud-suspense').setInteractive();
    this.hud_suspense.setScale(emotions_scale);
    this.suspenselabel = this.add.text(270, 25, this.suspense, {fontSize:'40px'});

    this.hud_trophy = this.add.sprite(380, 25, 'hud-trophy').setInteractive();
    this.hud_trophy.setScale(.14);
    this.trophieslabel = this.add.text(405, 13, this.trophies, {fontSize:'40px'});

    this.hud_audience = this.add.sprite(500, 25, 'hud-audience').setInteractive();
    this.hud_audience.setScale(.2);
    this.focuslabel = this.add.text(540, 13, this.audienceFocus, {fontSize:'40px'});

    this.hud_capricho = this.add.sprite(620, 25, 'hud-capricho');
    this.hud_capricho.setScale(.18).setVisible(false);
    this.capricholabel = this.add.text(650, 15, '', {fontSize: '35px'});
    
    let next_act_button = this.add.sprite(900, 400, 'next-act-button').setInteractive();
    next_act_button.setScale(.4);

    let act_counter = this.add.sprite(930, 50, 'act-counter');
    act_counter.setScale(.5);

    // Informacion al poner el raton sobre el HUD
    // Drama
    this.cartel_drama=this.add.sprite(0,0,'cartel-drama').setVisible(false);
    let cartel_alpha=.85;
    let cartel_dX=150;
    let cartel_dY=80;
    let cartel_grande_dy=120;
    this.cartel_drama.alpha=cartel_alpha;
    this.cartel_drama.setDepth(1);
    this.hud_drama.on('pointermove',pointer=>{
      this.cartel_drama.setVisible(true);
      this.cartel_drama.x=pointer.x+cartel_dX;
      this.cartel_drama.y=pointer.y+cartel_dY;
    })
    this.hud_drama.on('pointerout',pointer=>{
      this.cartel_drama.setVisible(false);
    })
    // Comedy
    this.cartel_comedy=this.add.sprite(0,0,'cartel-comedy').setVisible(false);
    this.cartel_comedy.alpha=cartel_alpha;
    this.cartel_comedy.setDepth(1);
    this.hud_comedy.on('pointermove',pointer=>{
      this.cartel_comedy.setVisible(true);
      this.cartel_comedy.x=pointer.x+cartel_dX;
      this.cartel_comedy.y=pointer.y+cartel_dY;
    })
    this.hud_comedy.on('pointerout',pointer=>{
      this.cartel_comedy.setVisible(false);
    })
    // Suspense
    this.cartel_suspense=this.add.sprite(0,0,'cartel-suspense').setVisible(false);
    this.cartel_suspense.setDepth(1);
    this.cartel_suspense.alpha=cartel_alpha;
    this.hud_suspense.on('pointermove',pointer=>{
      this.cartel_suspense.setVisible(true);
      this.cartel_suspense.x=pointer.x+cartel_dX;
      this.cartel_suspense.y=pointer.y+cartel_dY;
    })
    this.hud_suspense.on('pointerout',pointer=>{
      this.cartel_suspense.setVisible(false);
    })
    // Trofeos
    this.cartel_trophies=this.add.sprite(0,0,'cartel-trophies').setVisible(false);
    this.cartel_trophies.setDepth(1);
    this.cartel_trophies.alpha=cartel_alpha;
    this.hud_trophy.on('pointermove',pointer=>{
      this.cartel_trophies.setVisible(true);
      this.cartel_trophies.x=pointer.x+cartel_dX;
      this.cartel_trophies.y=pointer.y+cartel_grande_dy;
    })
    this.hud_trophy.on('pointerout',pointer=>{
      this.cartel_trophies.setVisible(false);
    })
    // Atencion de la audiencia
    this.cartel_audience=this.add.sprite(0,0,'cartel-audience').setVisible(false);
    this.cartel_audience.setDepth(1);
    this.cartel_audience.alpha=cartel_alpha;
    this.hud_audience.on('pointermove',pointer=>{
      this.cartel_audience.setVisible(true);
      this.cartel_audience.x=pointer.x+cartel_dX;
      this.cartel_audience.y=pointer.y+cartel_grande_dy;
    })
    this.hud_audience.on('pointerout',pointer=>{
      this.cartel_audience.setVisible(false);
    })
    // Capricho de la audiencia
    this.cartel_capricho=this.add.sprite(0,0,'cartel-capricho').setVisible(false);
    this.cartel_capricho.setDepth(1);
    this.cartel_capricho.alpha=cartel_alpha;
    this.hud_capricho.on('pointermove',pointer=>{
      this.cartel_capricho.setVisible(true);
      this.cartel_capricho.x=pointer.x+cartel_dX;
      this.cartel_capricho.y=pointer.y+cartel_grande_dy;
    })
    this.hud_capricho.on('pointerout',pointer=>{
      this.cartel_capricho.setVisible(false);
    })
    
    // Pasar de acto
    this.numActo = 1;
    let ultActo = 5;
    // Cartel no puedes pasar de acto
    this.cartel_demasiadas_cartas=this.add.sprite(0,0,'cartel-demasiadas-cartas').setVisible(false);
    this.cartel_demasiadas_cartas.setDepth(1);
    this.cartel_demasiadas_cartas.alpha=cartel_alpha;
    next_act_button.on('pointerdown', pointer=>
    {
      console.log(this.hand.length);
      if(this.numActo < 5)
      {
        if(this.hand.length <= 5)
        {
          // Capricho de la audiencia
          if(this.capricho != -1) this.audienceFocus -= 2;
          this.capricho = Math.floor((Math.random() * 3) + 0);

          console.log("capricho: " + this.capricho);
          console.log("focus: " + this.audienceFocus);
          console.log("end: " + this.gameover);

          // Robo de cartas
          this.deck.dealNcard(2, this.hand);

          //Acto siguiente
          this.numActo++;
          let act_counter = this.add.sprite(930,50,'act-counter');
          act_counter.setScale(.5);
          this.label = this.add.text(915, 20, "ACTO");
          this.label = this.add.text(920, 40, this.numActo + '/' + ultActo);
          this.focuslabel.text = this.audienceFocus;
          
          this.hud_capricho.setVisible(true).setInteractive();
          if(this.capricho == 0)
          { // Comedy
            this.capricholabel.text = "Comedia";
          }
          else if(this.capricho == 1)
          { // Drama
            this.capricholabel.text = "Drama";
          }
          else if(this.capricho == 2)
          { // Suspense
            this.capricholabel.text = "Suspense";
          }
          else this.capricholabel.text = "Completado";
          console.log('Acto '+ this.numActo);

          // Generar recurso de escenario activo
          this.card.onGenerate();
        }
        else{
          this.cartel_demasiadas_cartas.setVisible(true);
          this.cartel_demasiadas_cartas.x=850;
          this.cartel_demasiadas_cartas.y=250;
          console.log("No puedes tener mas de 5 cartas al pasar de acto");
        } 
      }
      else 
      {
        if(this.hand.length<=5){
          this.gameover = 1;
          console.log('Fin de la partida');
        }
        else{
          this.cartel_demasiadas_cartas.setVisible(true);
          this.cartel_demasiadas_cartas.x=850;
          this.cartel_demasiadas_cartas.y=250;
          console.log("No puedes tener mas de 5 cartas al pasar de acto");
        }
      }
    });
    next_act_button.on('pointerout',pointer=>{
      this.cartel_demasiadas_cartas.setVisible(false);
    })

    this.label = this.add.text(915, 20, "ACTO");
    this.label = this.add.text(920, 40, this.numActo + '/' + ultActo);

    // Mover objectos que sean draggable
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) 
    {
      this.scene.children.bringToTop(gameObject);

      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.setDepth(0);
      
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


    this.input.on('dragend', function (pointer, gameObject) 
    {
      // Tirar cartas
      if(this.scene.hand.length > 5)
      {
        if(gameObject.x < (this.scene.trash_can.x + 320 * trash_can_scale / 2) && gameObject.y > (this.scene.trash_can.y - 400 * trash_can_scale / 2)
        && gameObject.x > (this.scene.trash_can.x - 320 * trash_can_scale / 2) && gameObject.y < (this.scene.trash_can.y + 400 * trash_can_scale / 2))
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
        this.scene.input.setDraggable(gameObject, false);
        gameObject.setActive(false);
        gameObject.objetopadre.onplayed();
        gameObject.setScale(.2);
        gameObject.clearTint();
        gameObject.setDepth(0);

        // Carta eliminada de la mano
        this.scene.deck.onCardPlay();

        // Ordenar cartas jugadas
        for(let i = 1; i <= occupied.length; i++)
        {
          if(occupied[i] != true)
          {
            if(i <= occupied.length / 2)
            {
              gameObject.x = i * 75 + 305;
              gameObject.y = 120;
            }
            else
            {
              j++;
              gameObject.x = j * 75 + 305;
              gameObject.y = 230;
            }
            occupied[i] = true;
            break;
          }
        }

        console.log("cartas en mano: "+ this.scene.hand.length);
      }
    });
  }

  update()
  {
    // Si la atención de la audiencia llega a cero
    if(this.audienceFocus <= 0)
    {
      this.gameover = -1;
    }

    // Pantalla de fin de juego
    if(this.gameover !== 0)
    {
      this.scene.start('end', this.gameover);
    }

    if(this.hand.length <= 5) this.trash_can.setTint(0x707070);
    else this.trash_can.setTint(0xffffff);

    let i = 0;
    while(i < this.hand.length)
    {
      if(this.hand[i].active === false)
      this.hand.splice(i, 1);
      i++;
    }
  }

}