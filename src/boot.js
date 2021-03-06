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
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(340, 230, 320, 50);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(350, 240, 300 * value, 30);
    });

    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('logo', 'AH_LOGO.png');
    this.load.image('cinema', 'cinema.png');
    this.load.image('next-act-button', 'next-act-button.png');
    this.load.image('act-counter', 'act-counter.png');
    this.load.image('card', 'CardTemplate.png');
    this.load.image('trash-can', 'trash-can.png');
    this.load.image('screen', 'screen.png');
    this.load.image('finalScreen', 'finalScreen.png');

    // HUD
    this.load.image('hud-background', 'hud-background.png');
    this.load.image('hud-drama', 'hud-drama.png');
    this.load.image('hud-comedy', 'hud-comedy.png');
    this.load.image('hud-suspense', 'hud-suspense.png');
    this.load.image('hud-trophy', 'hud-trophy.png');
    this.load.image('hud-audience', 'hud-audience.png');
    this.load.image('hud-capricho', 'hud-capricho.png');
    this.load.image('cartel-drama', 'cartel-drama.png');
    this.load.image('cartel-comedy', 'cartel-comedy.png');
    this.load.image('cartel-suspense', 'cartel-suspense.png');
    this.load.image('cartel-trophies', 'cartel-trophies.png');
    this.load.image('cartel-audience', 'cartel-audience.png');
    this.load.image('cartel-capricho', 'cartel-capricho.png');
    this.load.image('cartel-demasiadas-cartas', 'cartel-demasiadas-cartas.png');
    this.load.image('marco-escenario', 'marco-escenario.png');
    this.load.image('no-escenario', 'no-escenario.png');

    this.load.setPath('assets/sprites/cards/');
    this.load.image('card1', 'test1.png');
    this.load.image('card2', 'test2.png');
    this.load.image('card3', 'test3.png');
    this.load.image('card4', 'test4.png');
    this.load.image('card5', 'test5.png');
    this.load.image('card6', 'test6.png');

    // Carga de los sprites de las cartas
    this.load.setPath('assets/sprites/cartas/');
    this.load.image('bates-motel', 'bates-motel.png');
    this.load.image('marion-crane', 'marion-crane.png');
    this.load.image('matar', 'matar.png');
    this.load.image('norman-bates', 'norman-bates.png');
    this.load.image('cameo-hitchcock', 'cameo-hitchcock.png');
    this.load.image('cotillear', 'cotillear.png');
    this.load.image('jeff', 'jeff.png');
    this.load.image('bloque-vecinos', 'bloque-vecinos.png');
    this.load.image('circo', 'circo.png');
    this.load.image('abuelo-tacataca', 'abuelo-tacataca.png');
    this.load.image('vieja-visillo', 'vieja-visillo.png');
    this.load.image('mirar-obra', 'mirar-obra.png');
    this.load.image('caseron-abandonado', 'caseron-abandonado.png');
    this.load.image('echar-loteria', 'echar-loteria.png');
    this.load.image('entrega-paquete', 'entrega-paquete.png');
    this.load.image('cementerio', 'cementerio.png');
    this.load.image('caida-repentina', 'caida-repentina.png');
    this.load.image('bandada-pajaros', 'bandada-pajaros.png');
    this.load.image('melanie-daniels', 'melanie-daniels.png');
    this.load.image('resultar-herido', 'resultar-herido.png');
    this.load.image('bodega-bay', 'bodega-bay.png');
    this.load.image('comedia-trofeos', 'comedia-trofeos.png');
    this.load.image('drama-trofeos', 'drama-trofeos.png');
    this.load.image('suspense-trofeos', 'suspense-trofeos.png');
    this.load.image('perro-escarbando', 'perro-escarbando.png');
    this.load.image('madeleine', 'madeleine.png');
    this.load.image('suicidio', 'suicidio.png');
    this.load.image('campanario', 'campanario.png');

    // Carga de los carteles de info de las cartas
    this.load.setPath('assets/sprites/info-cartas/');
    this.load.image('bates-motel-info', 'bates-motel-info.png');
    this.load.image('marion-crane-info', 'marion-crane-info.png');
    this.load.image('matar-info', 'matar-info.png');
    this.load.image('norman-bates-info', 'norman-bates-info.png');
    this.load.image('cameo-hitchcock-info', 'cameo-hitchcock-info.png');
    this.load.image('cotillear-info', 'cotillear-info.png');
    this.load.image('jeff-info', 'jeff-info.png');
    this.load.image('bloque-vecinos-info', 'bloque-vecinos-info.png');
    this.load.image('circo-info', 'circo-info.png');
    this.load.image('abuelo-tacataca-info', 'abuelo-tacataca-info.png');
    this.load.image('vieja-visillo-info', 'vieja-visillo-info.png');
    this.load.image('mirar-obra-info', 'mirar-obra-info.png');
    this.load.image('caseron-abandonado-info', 'caseron-abandonado-info.png');
    this.load.image('echar-loteria-info', 'echar-loteria-info.png');
    this.load.image('entrega-paquete-info', 'entrega-paquete-info.png');
    this.load.image('cementerio-info', 'cementerio-info.png');
    this.load.image('caida-repentina-info', 'caida-repentina-info.png');
    this.load.image('bandada-pajaros-info', 'bandada-pajaros-info.png');
    this.load.image('melanie-daniels-info', 'melanie-daniels-info.png');
    this.load.image('resultar-herido-info', 'resultar-herido-info.png');
    this.load.image('bodega-bay-info', 'bodega-bay-info.png');
    this.load.image('comedia-trofeos-info', 'comedia-trofeos-info.png');
    this.load.image('drama-trofeos-info', 'drama-trofeos-info.png');
    this.load.image('suspense-trofeos-info', 'suspense-trofeos-info.png');
    this.load.image('perro-escarbando-info', 'perro-escarbando-info.png');
    this.load.image('madeleine-info', 'madeleine-info.png');
    this.load.image('suicidio-info', 'suicidio-info.png');
    this.load.image('campanario-info', 'campanario-info.png');

    // Carga de los carteles de las peliculas que se pueden completar
    this.load.setPath('assets/sprites/carteles-peliculas/');
    this.load.image('psicosis-poster', 'psicosis-poster.png');
    this.load.image('pajaros-poster', 'pajaros-poster.png');
    this.load.image('ventana-indiscreta-poster', 'ventana-indiscreta-poster.png');
    this.load.image('vertigo-poster', 'vertigo-poster.png');

    // Banda sonora del juego
    this.load.setPath('./assets/audio')
    this.load.audio('theme', 'theme.mp3');

    this.load.on('fileprogress', function (file) {
      console.log(file.src);
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
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
  }
}