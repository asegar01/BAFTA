export default class Effect{
    generate(scene,type,amount){
        switch(type){
            case 0:
                scene.comedy+=amount;
                scene.drama-=amount;
                if(scene.drama<0)scene.drama=0;
                break;
            case 1:
                scene.drama+=amount;
                scene.suspense-=amount;
                if(scene.suspense<0)scene.suspense=0;
                break;
            case 2:
                scene.suspense+=amount;
                scene.comedy-=amount;
                if(scene.comedy<0)scene.comedy=0;
                break;
        }
        if(scene.capricho===type)scene.capricho=-1;
    }
}

