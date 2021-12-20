import Card from "./card.js";
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
  create() {
    // Configuración de la banda sonora
    const config = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    if(this.soundtrack === undefined) this.soundtrack = this.sound.add("theme", config);
    this.soundtrack.play();

    // Variables donde guardar los distintos elementos del hud
    this.hud = []; this.label = []; this.cartel = [];

    //Contruccion del juego
    this.juego.create();

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.objetopadre.x = dragX;
      gameObject.objetopadre.y = dragY;

      // Desplazamiento de la carta seleccionada a la primera capa de visualización
      gameObject.setDepth(1);
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.objetopadre.onplayed();
      // Se devuelve la carta a la capa de visualizacion por defecto 
      gameObject.setDepth(0);
    });
  }


  update() {
    this.juego.update();
  }
}