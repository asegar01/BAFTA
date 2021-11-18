export default class Effect{
    generate(scene,type,amount){
        switch(type){
            case 0:
                scene.comedy+=amount;
                break;
            case 1:
                scene.drama+=amount;
                break;
            case 2:
                scene.suspense+=amount;
                break;
        }
        if(scene.capricho===type)scene.capricho=-1;
    }
}

