export default class Effect{
    execute(){}
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
        console.log("hola");
    }
}

