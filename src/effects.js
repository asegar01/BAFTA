export default class Effect{
    execute(){}
    updatetexts(){
        this.scene.comedylabel.text = "Comedy: " + this.scene.comedy;
        this.scene.dramalabel.text ="Drama: " + this.scene.drama;
        this.scene.suspenselabel.text = "Suspense: " + this.scene.suspense;
        this.scene.trophieslabel.text ="Trophies: " + this.scene.trophies;
        this.scene.focuslabel.text = "Focus: " + this.scene.audienceFocus;
        this.scene.capricholabel.text ="Capricho: " + this.scene.capricho;
    }
}

export class GenerateEffect extends Effect{
    constructor(scene, type, amount){
        super();
        this.scene = scene;
        this.type = type;
        this.amount = amount;
    }
    execute(){
        switch(this.type){
            case 0:
                this.scene.comedy+=this.amount;
                this.scene.drama-=this.amount;
                if(this.scene.drama<0)this.scene.drama=0;
                break;
            case 1:
                this.scene.drama+=this.amount;
                this.scene.suspense-=this.amount;
                if(this.scene.suspense<0)this.scene.suspense=0;
                break;
            case 2:
                this.scene.suspense+=this.amount;
                this.scene.comedy-=this.amount;
                if(this.scene.comedy<0)this.scene.comedy=0;
                break;
        }
        if(this.scene.capricho===this.type)this.scene.capricho=-1;
        this.updatetexts();
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
        this.updatetexts();
    }
}