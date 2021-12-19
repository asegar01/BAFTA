export default class Effect {
    constructor() {

    }
    // execute(){}
}

export class GenerateEffect extends Effect {
    constructor(scene, type, amount, audienceFocusAmount) {
        super();
        this.scene = scene;
        this.type = type;
        this.amount = amount;
        this.audienceFocusAmount = audienceFocusAmount;
    }

    execute() {
        if (this.type != -1) { // -1 para no generar nada
            switch (this.type) {
                case 0: // Comedy
                    this.scene.comedy += this.amount;
                    this.scene.drama -= this.amount;
                    if (this.scene.drama < 0) this.scene.drama = 0;
                    break;
                case 1: // Drama
                    this.scene.drama += this.amount;
                    this.scene.suspense -= this.amount;
                    if (this.scene.suspense < 0) this.scene.suspense = 0;
                    break;
                case 2: // Suspense
                    this.scene.suspense += this.amount;
                    this.scene.comedy -= this.amount;
                    if (this.scene.comedy < 0) this.scene.comedy = 0;
                    break;
            }
            if (this.scene.capricho === this.type) this.scene.capricho = 3;
            this.scene.audienceFocus += this.audienceFocusAmount;

            // this.updateTexts();
        }

    }
}

export class TrophyEffect extends Effect {
    constructor(scene, type) {
        super();
        this.scene = scene;
        this.type = type;
        //this.amount = amount;

    }

    execute() {
        switch (this.type) {
            case 0: // Comedy
                this.scene.trophies += this.scene.comedy;
                this.scene.comedy = 0;
                break;
            case 1: // Drama
                this.scene.trophies += this.scene.drama;
                this.scene.drama = 0;
                break;
            case 2: // Suspense
                this.scene.trophies += this.scene.suspense;
                this.scene.suspense = 0;
                break;
        }
        // this.updateTexts();
    }
}

export class KillEffect extends Effect {
    constructor(scene, isNormanBates) {
        super();
        this.scene = scene;
        this.isNormanBates = isNormanBates;
    }
    execute(i) {
        let resourceGener;
        if (this.isNormanBates) {
            resourceGener = new GenerateEffect(this.scene, 2, 3, 0);
        }
        else {
            resourceGener = new GenerateEffect(this.scene, 1, 1, 0);
        }
        resourceGener.execute();
        this.scene.onDead(this.scene.cardsOnTableNames[i]);
        this.scene.table[i].setVisible(false);
        this.scene.occupied[i] = false;
        this.scene.table.splice(i, 1);
        this.scene.cardsOnTableNames.splice(i, 1);
    }
}

export class CotillearEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute(i) {
        // Numero personajes en la mesa
        let persEnMesa = this.scene.table.length;
        this.scene.onCotillear(this.scene.cardsOnTableNames[i]);
        let effect = new GenerateEffect(this.scene, 2, persEnMesa - 1, 0);
        effect.execute();
    }
}

export class MirarObraEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute(i) {
        let amount = 1;
        if (this.scene.cardsOnTableNames[i] == 'vieja-visillo' || this.scene.cardsOnTableNames[i] == 'abuelo-tacataca') amount = 2;
        let effect = new GenerateEffect(this.scene, 2, amount, 0);
        effect.execute();
    }
}

export class DeliveryEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute() {
        // Roba 2 cartas
        this.scene.deck.dealNcard(2, this.scene.hand);
    }
}

export class CaidaRepentinaEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute(i) {
        let type = 0;
        if (this.scene.cardsOnTableNames[i] == 'vieja-visillo' || this.scene.cardsOnTableNames[i] == 'abuelo-tacataca') {
            type = 1;
        }
        let effect = new GenerateEffect(this.scene, type, 2, 0);
        effect.execute();
    }
}

export class MelanieEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute() {
        let pajarosFound = false;
        let it = 0, resource = 0;
        while (!pajarosFound && it < this.scene.cardsOnTableNames.length) {
            if (this.scene.cardsOnTableNames[it] == 'bandada-pajaros') pajarosFound = true;
            it++;
        }
        if (pajarosFound) resource = 2;
        let effect = new GenerateEffect(this.scene, resource, 1, 0);
        effect.execute();
    }
}

export class ResultarHeridoEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute(i) {
        let amount = this.scene.cardsOnTableFocus[i];
        // el tipo de recurso es irrelevante ya que genera 0 del mismo.
        // solo genera atencion de la audiencia
        let effect = new GenerateEffect(this.scene, 0, 0, amount);
        effect.execute();

    }
}

export class SuicidioEffect extends Effect {
    constructor(scene) {
        super();
        this.scene = scene;
    }
    execute(i) {
        if (this.scene.cardsOnTableNames[i] == 'madeleine') {
            // se genera +2 de atencion de la audiencia
            let effect = new GenerateEffect(this.scene, 0, 0, 2);
            effect.execute();
        }
        let suicideEffect = new KillEffect(this.scene, false);
        suicideEffect.execute(i);
    }
}

