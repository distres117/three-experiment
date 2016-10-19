import THREE from 'lib';

export default class Sphere{
    constructor(size,x,y,z){
        let geometry = new THREE.SphereGeometry(size, 20, 10);
        let material = new THREE.MeshLambertMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x,y,z);
        this.pos = {x,y,z};
    }
    getMesh(){
        return this.mesh;
    }
}