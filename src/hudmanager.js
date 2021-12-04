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
        this.scene.screen = this.scene.add.sprite(490, 180, 'screen').setInteractive();
        let screen_scale = .5;
        this.scene.screen.setScale(screen_scale).setVisible(false);

        // HUD
        this.scene.add.image(500, 35, 'hud-background');

        // emociones
        this.makehud(this.juego.drama,0,'hud-drama','cartel-drama');
        this.makehud(this.juego.comedy,1,'hud-comedy','cartel-comedy');
        this.makehud(this.juego.suspense,2,'hud-suspense','cartel-suspense');
        // puntuacion y audiencia
        this.makehud(this.juego.trophies,3,'hud-trophy','cartel-trophies');
        this.makehud(this.juego.audienceFocus,4,'hud-audience','cartel-audience');
        this.makehud('',5,'hud-capricho','cartel-capricho');
        // botones
        // paso de acto
        this.scene.cartel[6] = this.scene.add.sprite(0, 0, 'cartel-demasiadas-cartas').setVisible(false);
        this.scene.cartel[6].setDepth(1);
        this.scene.cartel[6].alpha = .85;

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
        
        // texto de acto
        let act_counter = this.scene.add.sprite(930, 50, 'act-counter');
        act_counter.setScale(.5);
        this.scene.label[6] = this.scene.add.text(915, 20, "ACTO");
        this.scene.label[6].text = this.scene.add.text(920, 40, '');
        
        // update general para estar acuerdo con el comeienzo de la partida
        this.updatetexts();
    }

    makehud(variable1, i, string1, string2) {
        this.scene.hud[i] = this.scene.add.sprite(40 + (i * 100), 35, string1).setInteractive();
        this.scene.hud[i].setScale(.2);
        this.scene.label[i] = this.scene.add.text(70 + (i * 100), 25, variable1, { fontSize: '40px' });

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

    updatetexts(){
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
            default:
                this.scene.label[5].text = "Completado";
                break;
        }
        this.scene.label[6].text = this.juego.numActo + '/5';
    }
}



       // Pasar de acto
/*
        
       
        

        // Mover objectos que sean draggable
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            this.scene.children.bringToTop(gameObject);

            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setDepth(0);

            if (gameObject.x < (this.scene.trash_can.x + 320 * trash_can_scale / 2) && gameObject.y > (this.scene.trash_can.y - 400 * trash_can_scale / 2)
                && gameObject.x > (this.scene.trash_can.x - 320 * trash_can_scale / 2) && gameObject.y < (this.scene.trash_can.y + 400 * trash_can_scale / 2)) {
                if (this.scene.hand.length > 5) {
                    gameObject.setTint(0xff0000);
                }
            }
            else if (gameObject.x < (this.scene.screen.x + 580 * screen_scale / 2) && gameObject.x > (this.scene.screen.x - 580 * screen_scale / 2)
                && gameObject.y > (this.scene.screen.y - 450 * screen_scale / 2) && gameObject.y < (this.scene.screen.y + 450 * screen_scale / 2)) {
                gameObject.setTint(0x32CD32);
            }
            else gameObject.clearTint();
        });


        this.input.on('dragend', function (pointer, gameObject) {
            // Tirar cartas
            if (this.scene.hand.length > 5) {
                if (gameObject.x < (this.scene.trash_can.x + 320 * trash_can_scale / 2) && gameObject.y > (this.scene.trash_can.y - 400 * trash_can_scale / 2)
                    && gameObject.x > (this.scene.trash_can.x - 320 * trash_can_scale / 2) && gameObject.y < (this.scene.trash_can.y + 400 * trash_can_scale / 2)) {
                    gameObject.setActive(false).setVisible(false);
                    console.log("cartas en mano: " + this.scene.hand.length);
                    if (this.scene.hand.length <= 5) this.scene.trash_can.setTint(0x707070);
                }
            }




            // Poner cartas en juego
            if ((gameObject.x < (this.scene.screen.x + 580 * screen_scale / 2) && gameObject.x > (this.scene.screen.x - 580 * screen_scale / 2)
                && gameObject.y > (this.scene.screen.y - 450 * screen_scale / 2) && gameObject.y < (this.scene.screen.y + 450 * screen_scale / 2))) {
                this.scene.input.setDraggable(gameObject, false);
                gameObject.setActive(false);
                gameObject.objetopadre.onplayed();
                gameObject.setScale(.2);
                gameObject.clearTint();
                gameObject.setDepth(0);

                // Carta eliminada de la mano
                this.scene.deck.onCardPlay();

                // Ordenar cartas jugadas
                for (let i = 1; i <= occupied.length; i++) {
                    if (occupied[i] != true) {
                        if (i <= occupied.length / 2) {
                            gameObject.x = i * 75 + 305;
                            gameObject.y = 120;
                        }
                        else {
                            j++;
                            gameObject.x = j * 75 + 305;
                            gameObject.y = 230;
                        }
                        occupied[i] = true;
                        break;
                    }
                }

                console.log("cartas en mano: " + this.scene.hand.length);
            }
        });*/