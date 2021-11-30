export default class Effect{
    execute(){}
    updatetexts(){
        this.scene.comedylabel.text = this.scene.comedy;
        this.scene.dramalabel.text =this.scene.drama;
        this.scene.suspenselabel.text =  this.scene.suspense;
        this.scene.trophieslabel.text = this.scene.trophies;
        this.scene.focuslabel.text = this.scene.audienceFocus;
        if(this.scene.numActo>1){
            if(this.scene.capricho==0){ // Comedy
                this.scene.capricholabel.text ="Comedy";
            }
            else if(this.scene.capricho==1){ // Drama
                this.scene.capricholabel.text ="Drama";
            }
            else if(this.scene.capricho==2){ // Suspense
                this.scene.capricholabel.text ="Suspense";
            }
            else this.scene.capricholabel.text ="Completado";
        }
        else this.scene.capricholabel.text="";
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