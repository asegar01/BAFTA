import Player from './player.js';
import Platform from './platform.js';

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
  create() {
    let cinema = this.add.image(500, 250, 'cinema');
    cinema.setScale(.5);
    this.stars = 10;
    this.bases = this.add.group();
    this.player = new Player(this, 200, 300);

    new Platform(this, this.player, this.bases, 150, 350);
    new Platform(this, this.player, this.bases, 850, 350);
    new Platform(this, this.player, this.bases, 500, 200);
    new Platform(this, this.player, this.bases, 150, 100);
    new Platform(this, this.player, this.bases, 850, 100);
    this.spawn();

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
      
    })
    this.label = this.add.text(915, 20, "ACTO");
    this.label = this.add.text(930, 40, numActo);
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}