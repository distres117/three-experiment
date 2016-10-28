import THREE from 'lib';

export default class Camera extends THREE.PerspectiveCamera{
    constructor(){
        super(70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.position.set(0,0,400);
        //this.up.set(new THREE.Vector3(0,1,0));
    }
    set(posDir){
        let {pX,pY,pZ,rX,rY,rZ} = posDir;
        this.position.set(pX,pY,pZ);
        //this.lookAt(new THREE.Vector3(x,y,z));
        this.rotation.x = rX;
        this.rotation.y = rY;
        this.rotation.z = rZ;
    }
    getPosition(){
        return {
            pX:this.position.x,
            pY:this.position.y,
            pZ:this.position.z,
            rX:this.rotation.x,
            rY:this.rotation.y,
            rZ:this.rotation.z
        }
    };

}