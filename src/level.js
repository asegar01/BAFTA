import GameManager from "./gamemanager.js";

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
    this.juego = new GameManager(this);
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    // Variables donde guardar los distintos elementos del hud
    this.hud = []; this.label = []; this.cartel = [];
    //Contruccion del juego
    this.juego.create();

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {gameObject.x = dragX;gameObject.y = dragY; gameObject.objetopadre.x=dragX;gameObject.objetopadre.y=dragY;  });
    this.input.on('dragend', function (pointer, gameObject) {      gameObject.objetopadre.onplayed();  });
  }

  update()
  {
    this.juego.update();
  }

  

}