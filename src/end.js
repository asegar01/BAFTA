/**
 * Escena de fin de juego. Cuando se llega al último acto o la atención de la audiencia llega a cero, 
 * se presenta un texto de fin de juego, indicando si has ganado o perdido.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() 
  {
    super({ key: 'end' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() 
  {    
    this.add.image(500, 250, 'finalScreen');

    if(this.scene.gameover === 1)
    {
      this.victory = this.add.text(600, 50, "VICTORY", {fontSize: '80px'}).setTint(0xADFF2F);
    }
    else 
    {
      this.defeat = this.add.text(600, 50, "DEFEAT", {fontSize: '80px'}).setTint(0xDC143C);
    }

    // this.add.text(500, 250, 'Se acabó!\nPulsa cualquier tecla para volver a jugar')
    //     .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
    //     .setAlign('center');  // Centramos el texto dentro del cuadro de texto


    // Añadimos el listener para cuando se haya pulsado una tecla.
    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('level');
    }, this);
  }
}