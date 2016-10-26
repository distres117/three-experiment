import THREE from 'lib';

export default class Camera extends THREE.PerspectiveCamera{
    constructor(){
        super(70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.position.set(0,0,400);
        //this.up.set(new THREE.Vector3(0,1,0));
    }
    set(posDir){
        let {x,y,z,pX,pY,pZ} = posDir;
        this.position.set(pX,pY,pZ);
        this.lookAt(new THREE.Vector3(x,y,z))
    }
    getPosition(){
        let dir= this.getWorldDirection();
        return {
            pX:this.position.x,
            pY:this.position.y,
            pZ:this.position.z,
            x:dir.x,
            y:dir.y,
            z:dir.z
        }
    };

}