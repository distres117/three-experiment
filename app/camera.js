import THREE from 'lib';

export default class Camera extends THREE.PerspectiveCamera{
    constructor(){
        super(70, window.innerWidth / window.innerHeight, 1, 1000 );
    }
    set(posDir){
        let {x,y,z,pX,pY,pZ} = posDir;
        this.position.set(pX,pY,pZ);
        this.lookAt(new THREE.Vector3(x,y,z))
    }

}