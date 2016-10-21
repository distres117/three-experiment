import THREE from 'lib';
import Label from 'label';

export default class Sphere{
    constructor(size,x,y,z,labelText){
        let geometry = new THREE.SphereGeometry(size, 20, 10);
        let material = new THREE.MeshLambertMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x,y,z);
        this.label = new Label(labelText);
    }
    getMesh(){
        return this.mesh;
    }
    updateLabel(camera){
        this.label.setPosition(this.mesh.position, camera);
    }
}