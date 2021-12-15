export default class Effect{
     constructor()
    {

    }
     // execute(){}
}

export class GenerateEffect extends Effect{
    constructor(scene, type, amount, audienceFocusAmount){
        super();
        this.scene = scene;
        this.type = type;
        this.amount = amount;
        this.audienceFocusAmount=audienceFocusAmount;
    }

    execute(){
        if(this.type!=-1){ // -1 para no generar nada
            switch(this.type)
            {
                case 0: // Comedy
                    this.scene.comedy += this.amount;
                    this.scene.drama -= this.amount;
                    if(this.scene.drama < 0) this.scene.drama = 0;
                    break;
                case 1: // Drama
                    this.scene.drama += this.amount;
                    this.scene.suspense -= this.amount;
                    if(this.scene.suspense < 0) this.scene.suspense = 0;
                    break;
                case 2: // Suspense
                    this.scene.suspense += this.amount;
                    this.scene.comedy -= this.amount;
                    if(this.scene.comedy < 0) this.scene.comedy = 0;
                    break;
            }
            if(this.scene.capricho === this.type) this.scene.capricho = 3;
            this.scene.audienceFocus+=this.audienceFocusAmount;

            // this.updateTexts();
        }
        
    }
}

export class TrophyEffect extends Effect{
    constructor(scene,type,amount){
        super();
        this.scene = scene;
        this.type=type;
        this.amount=amount;
        
    }
    
    execute(){
        switch(this.type){
            case 0:
                if(this.scene.comedy-this.amount>=0)this.scene.comedy-=this.amount;
                else {
                    this.amount=this.scene.comedy;
                    this.scene.comedy=0;
                }
                this.scene.trophies += this.amount;
                break;
            case 1:
                if(this.scene.drama-this.amount>=0)this.scene.drama-=this.amount;
                else {
                    this.amount=this.scene.drama;
                    this.scene.drama=0;
                }
                this.scene.trophies += this.amount;
                break;
            case 2:
                if(this.scene.suspense-this.amount>=0)this.scene.suspense-=this.amount;
                else {
                    this.amount=this.scene.suspense;
                    this.scene.suspense=0;
                }
                this.scene.trophies += this.amount;
                break;
        }
        // this.updateTexts();
    }
}

export class KillEffect extends Effect{
    constructor(scene, isNormanBates){
        super();
        this.scene=scene;
        this.isNormanBates=isNormanBates;
    }
    execute(i){
        if(this.isNormanBates){
            this.scene.suspense+=3;
            this.scene.comedy-=3;
        } 
        else{
            this.scene.drama++;
            this.scene.suspense--;
        } 
        this.scene.onDead(this.scene.cardsOnTableNames[i]);
        this.scene.table[i].setVisible(false);
        this.scene.occupied[i]=false;
        this.scene.table.splice(i,1);
        this.scene.cardsOnTableNames.splice(i,1);
    }
}