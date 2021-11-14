/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */

export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(340, 230, 320, 50);

    this.load.on('progress', function (value) {
      console.log(value);
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(350, 240, 300 * value, 30);
    });

    this.load.setPath('assets/sprites/');
    this.load.image('logo', 'AH_LOGO.png');
    for (var i = 0; i < 1; i++) {
      this.load.image('logo'+ i, 'AH_LOGO.png');
    }
    this.load.image('cinema', 'cinema.png');
    this.load.image('next-act-button','next-act-button.png');
    this.load.image('act-counter','act-counter.png');
    this.load.image('card', 'CardTemplate.png');
    this.load.image('trash-can','trash-can.png');

    this.load.setPath('assets/audio/')
    this.load.audio('theme', 'theme.mp3')
              
    this.load.on('fileprogress', function (file) {
      console.log(file.src);
    });
    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
    let theme = this.add.sound('theme', { loop: true });
  }
}