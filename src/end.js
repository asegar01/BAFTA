/**
 * Escena de fin de juego. Cuando se llega al último acto o la atención de la audiencia llega a cero, 
 * se presenta un texto de fin de juego, indicando si has ganado o perdido.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
  }

  init(data) {
    //console.log(gameover);
    this.gameover = data[0];
    this.movieCompleted = data[1];
  }
  /* init(gameover) {
    console.log(gameover);
    this.gameover = gameover;
    this.movieCompleted=movieCompleted;
  } */

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() {
    this.add.image(500, 250, 'finalScreen');
    console.log(this.gameover);

    if (this.gameover !== -1) {
      this.victory = this.add.text(450, 50, "VICTORIA", { fontSize: '80px' }).setTint(0xADFF2F);
      if (this.movieCompleted != 'none') {
        let movieTextX = 700, movieTextY = 150, posterX = 850, posterY = 350, posterScale = .2, movieCompletedX = 400;
        this.victory = this.add.text(movieCompletedX, movieTextY, "¡Has completado\n una película\n de Hitchcock!", { fontSize: '30px' });
        if (this.movieCompleted == 'psicosis') {
          this.victory = this.add.text(movieTextX, movieTextY, "PSICOSIS", { fontSize: '40px' });
          this.add.image(posterX, posterY, 'psicosis-poster').setScale(posterScale);
        }
        else if (this.movieCompleted == 'pajaros') {
          this.victory = this.add.text(movieTextX, movieTextY, "LOS PÁJAROS", { fontSize: '40px' });
          this.add.image(posterX, posterY, 'pajaros-poster').setScale(posterScale);
        }
        else if (this.movieCompleted == 'ventana-indiscreta') {
          this.victory = this.add.text(movieTextX, movieTextY, "LA VENTANA\nINDISCRETA", { fontSize: '40px' });
          this.add.image(posterX, posterY, 'ventana-indiscreta-poster').setScale(posterScale);
        }
        else if (this.movieCompleted == 'vertigo') {
          this.victory = this.add.text(movieTextX, movieTextY, "VERTIGO", { fontSize: '40px' });
          this.add.image(posterX, posterY, 'ventana-indiscreta-poster').setScale(posterScale);
        }
      }

    }
    else {
      this.defeat = this.add.text(450, 50, "DERROTA", { fontSize: '80px' }).setTint(0xDC143C);
      this.defeat = this.add.text(400, 150, "Has aburrido a la audiencia \ny se ha ido", { fontSize: '30px' });
      //this.defeat = this.add.text(400, 100, "y se han ido.", { fontSize: '40px' });

    }

    this.add.text(600, 400, 'Pulsa cualquier tecla para volver a jugar')
      .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
      .setAlign('center');  // Centramos el texto dentro del cuadro de texto


    // Añadimos el listener para cuando se haya pulsado una tecla.
    this.input.keyboard.on('keydown', function (event) {
      this.scene.start('level');
    }, this);
  }
}