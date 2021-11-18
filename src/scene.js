import Card from './card.js';
import Effect from './effects.js';
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
    //medidores de recursos
    this.comedy=0;
    this.drama=0;
    this.suspense=0;


    this.scale.updateBounds();
    let cinema = this.add.image(500, 250, 'cinema');
    cinema.setScale(.5);
    
    // cosas importantes
    this.gameover=-1;
    this.audienceFocus = 5;

    //capricho de la audiencia
    this.capricho = -1;
    //------------------
    

    // UI
    let next_act_button = this.add.sprite(900,400,'next-act-button').setInteractive();
    next_act_button.setScale(.4);
    let act_counter=this.add.sprite(930,50,'act-counter');
    act_counter.setScale(.5);
    let trash_can=this.add.sprite(55,420,'trash-can');
    let trash_can_scale=.3;
    trash_can.setScale(trash_can_scale);
    let numActo=1;
    next_act_button.on('pointerdown',pointer=>{
      if(numActo<5){
        if(cartas_en_mano<=5){
          //capricho de la audiencia
          if(this.capricho!==-1)this.audienceFocus -= 2;
          this.capricho=Math.floor((Math.random()*2)+0); 
          console.log("capricho: " + this.capricho);
          console.log("focus: " + this.audienceFocus);
          console.log("end: " + this.gameover);
          //------------------
          numActo++;
          let act_counter=this.add.sprite(930,50,'act-counter');
          act_counter.setScale(.5);
          this.label = this.add.text(915, 20, "ACTO");
          this.label = this.add.text(930, 40, numActo);
          console.log('Acto '+ numActo);
        }
        else console.log("No puedes tener mas de 5 cartas al pasar de acto");
        
      }
      else {
        this.gameover=1;
        console.log('Fin de la partida');
      }
      
    });
    this.label = this.add.text(915, 20, "ACTO");
    this.label = this.add.text(930, 40, numActo);

    // Carta prueba
    
    let cartas_en_mano=0;;
    let posX=200;
    let effectforcard = new Effect();
    for(let i=0;i<6;i++){
      let pruebacarta = new Card(this,posX,400,"",'card',"",1,effectforcard.generate(this,0,1));
      //pruebacarta.onplayed();//test
      cartas_en_mano++;
      posX+=100;
    }
    if(cartas_en_mano<=5)trash_can.setTint(0x707070);
    console.log("cartas en mano: "+cartas_en_mano);

    
    console.log(this.audienceFocus);
    console.log(this.comedy);

    // Mover objectos que sean draggable
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;
      if(cartas_en_mano>5){
        if(gameObject.x<(trash_can.x+320*trash_can_scale/2)&&gameObject.y>trash_can.y-400*trash_can_scale/2)
        gameObject.setTint(0xff0000);
      else gameObject.clearTint();
      }
      

    });
    
    this.input.on('dragend', function (pointer, gameObject) {
      if(cartas_en_mano>5){
        if(gameObject.x<(trash_can.x+320*trash_can_scale/2)&&gameObject.y>trash_can.y-400*trash_can_scale/2){
          cartas_en_mano--;
          gameObject.setActive(false).setVisible(false);
          console.log("cartas en mano: "+cartas_en_mano);
          if(cartas_en_mano<=5)trash_can.setTint(0x707070);
        }
      }
      
    });
    
  }

  update(){
    if(this.audienceFocus<=0){
      this.gameover=0;
      //console.log("END: " + this.gameover);
    }
    if(this.gameover!==-1);//hacer el cambio de escena a la de gameover aqui
    
  }
  
  // La carta se encuentra pulsada
  /* startDrag(pointer, targets)
  {
    //if(this.dragObj.constructor.name=="Card")console.log("Es Card");
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj = targets[0];
    //console.log(this.dragObj.constructor.name);
    this.input.on('pointermove', this.onDrag, this);
    this.input.on('pointerup', this.endDrag, this);
  }

  // La carta se encuentra en movimiento
  onDrag(pointer)
  {
    if(this.constructor.name=="Card")console.log("Es Card");
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  }

  // La carta ha dejado de ser pulsada
  endDrag()
  {
    if(this.constructor.name=="Card")console.log("Es Card");
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.onDrag, this);
    this.input.off('pointerup', this.endDrag, this);
  } */
}