export default class HudManager {
    constructor(scene, juego) {
        this.scene = scene;
        this.juego = juego;
    }

    create() {
        // Escenario de juego
        let cinema = this.scene.add.image(500, 260, 'cinema');
        cinema.setScale(.5);

        // Escenario para jugar cartas
        let screen = this.scene.add.image(490, 180, 'screen');
        screen.setScale(.5);
        this.gamearea = new Phaser.Geom.Rectangle(400, 180, screen.displayWidth, screen.displayHeight - (screen.displayHeight/6));

        // HUD
        this.scene.add.image(500, 35, 'hud-background');

        // emociones
        this.makehud(this.juego.drama, 0, true, 'hud-drama', 'cartel-drama');
        this.makehud(this.juego.comedy, 1, true, 'hud-comedy', 'cartel-comedy');
        this.makehud(this.juego.suspense, 2, true, 'hud-suspense', 'cartel-suspense');
        // puntuacion y audiencia
        this.makehud(this.juego.trophies, 3, false, 'hud-trophy', 'cartel-trophies');
        this.makehud(this.juego.audienceFocus, 4, false, 'hud-audience', 'cartel-audience');
        this.makehud('', 5, false, 'hud-capricho', 'cartel-capricho');
        this.scene.hud[5].setVisible(false);
        // botones
        // paso de acto
        this.scene.cartel[6] = this.scene.add.sprite(0, 0, 'cartel-demasiadas-cartas').setVisible(false);
        this.scene.cartel[6].setDepth(1);
        this.scene.cartel[6].alpha = .85; 1

        let next_act_button = this.scene.add.sprite(900, 400, 'next-act-button').setInteractive();
        next_act_button.setScale(.4);
        next_act_button.on('pointerdown', pointer => {
            this.juego.nextact();
        });
        next_act_button.on('pointerout', pointer => {
            this.scene.cartel[6].setVisible(false);
        });
        // papelera
        this.trash_can = this.scene.add.sprite(55, 420, 'trash-can');
        let trash_can_scale = .3;
        this.trash_can.setScale(trash_can_scale);
        this.trash_rect = new Phaser.Geom.Rectangle(this.trash_can.x, this.trash_can.y, this.trash_can.displayWidth, this.trash_can.displayHeight); //vigilar por si no se borra en el paso de escena also numeros magicos

        // texto de acto
        let act_counter = this.scene.add.sprite(930, 50, 'act-counter');
        act_counter.setScale(.5);
        this.scene.label[6] = this.scene.add.text(915, 25, "ACTO");
        this.scene.label[7] = this.scene.add.text(920, 45, '');

        // marco donde se situa la carta escenario puesta en juego
        this.no_stage = this.scene.add.sprite(70, 187, 'no-escenario');
        let no_stage_scale = .4;
        this.no_stage.setScale(no_stage_scale);
        this.stage_hud = this.scene.add.sprite(70, 220, 'marco-escenario');
        let stage_hud_scale = .25;
        this.stage_hud.setScale(stage_hud_scale);

        // update general para estar acuerdo con el comeienzo de la partida
        this.updateTexts();
    }

    makehud(variable1, i, isMainResource, string1, string2) { // isMainResource es true para drama, comedia y suspense
        let icon_x0, icon_dx, text_x0, icon_y, text_y, scale;
        if (isMainResource) {
            icon_x0 = 40;
            icon_dx = 100;
            text_x0 = 70;
            icon_y = 35;
            text_y = 25;
            scale = .2;
        }
        else {
            icon_x0 = 20;
            icon_dx = 120;
            text_x0 = 50;
            icon_y = 25;
            text_y = 15;
            scale = .15;
        }
        this.scene.hud[i] = this.scene.add.sprite(icon_x0 + (i * icon_dx), icon_y, string1).setInteractive();
        this.scene.hud[i].setScale(scale);
        this.scene.label[i] = this.scene.add.text(text_x0 + (i * icon_dx), text_y, variable1, { fontSize: '40px' });

        this.scene.cartel[i] = this.scene.add.sprite(0, 0, string2).setVisible(false);
        let cartel_alpha = .85;
        let cartel_dX = 150;
        let cartel_dY = 80;
        this.scene.cartel[i].alpha = cartel_alpha;
        this.scene.cartel[i].setDepth(1);

        this.scene.hud[i].on('pointermove', pointer => {
            this.scene.cartel[i].setVisible(true);
            this.scene.cartel[i].x = pointer.x + cartel_dX;
            this.scene.cartel[i].y = pointer.y + cartel_dY;
        });
        this.scene.hud[i].on('pointerout', pointer => {
            this.scene.cartel[i].setVisible(false);
        });
    }

    updateTexts() {
        this.scene.label[0].text = this.juego.drama;
        this.scene.label[1].text = this.juego.comedy;
        this.scene.label[2].text = this.juego.suspense;
        this.scene.label[3].text = this.juego.trophies;
        this.scene.label[4].text = this.juego.audienceFocus;
        switch (this.juego.capricho) {
            case -1:
                this.scene.label[5].text = "";
                break;
            case 0:
                this.scene.label[5].text = "Comedia";
                break;
            case 1:
                this.scene.label[5].text = "Drama";
                break;
            case 2:
                this.scene.label[5].text = "Suspense";
                break;
            case 3:
                this.scene.label[5].text = "Completado";
                break;
        }
        this.scene.label[7].text = this.juego.numActo + '/5';
    }

    updatehud() {
        if (this.juego.hand.length <= 5) this.trash_can.setTint(0x707070);
        else this.trash_can.setTint(0xffffff);
    }

    caprichoSetVisible() {
        this.scene.hud[5].setVisible(true);
    }
    demasiadasCartasSetVisible() {
        this.scene.cartel[6].setVisible(true);
        this.scene.cartel[6].x = 850;
        this.scene.cartel[6].y = 250;
    }
}