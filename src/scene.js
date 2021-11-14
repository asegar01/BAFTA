import Card from './card.js';
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
    this.audienceFocus = 5;
    let pruebacarta = new Card(this,500,400,"",'card',"",1,function hola() {console.log("hola")
    });

    pruebacarta.onplayed();
    console.log(this.audienceFocus);

    // UI
    let next_act_button = this.add.sprite(900,400,'next-act-button').setInteractive();
    next_act_button.setScale(.4);
    let act_counter=this.add.sprite(930,50,'act-counter');
    act_counter.setScale(.5);
    let numActo=1;
    next_act_button.on('pointerdown',pointer=>{
      if(numActo<5){
      numActo++;
      let act_counter=this.add.sprite(930,50,'act-counter');
      act_counter.setScale(.5);
      this.label = this.add.text(915, 20, "ACTO");
      this.label = this.add.text(930, 40, numActo);
      console.log('Acto '+ numActo);
      }
      else console.log('Fin de la partida');
      
    });
    this.label = this.add.text(915, 20, "ACTO");
    this.label = this.add.text(930, 40, numActo);

    // Mover objectos que sean draggable
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

  });
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