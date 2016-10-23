import THREE from 'lib';
import Label from 'label';

export default class Sphere{
    constructor(size,x,y,z,labelText, hoverColor){
        let geometry = new THREE.SphereGeometry(size, 20, 10);
        let material = new THREE.MeshLambertMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x,y,z);
        this.label = new Label(labelText, size);
        this.hoverColor = hoverColor;
    }
    getMesh(){
        return this.mesh;
    }
    updateLabel(camera){
        this.label.setPosition(this.mesh.position, camera);
    }
    clone(){
        let newMesh = new THREE.Mesh(this.mesh.geometry, this.mesh.material);
        let {x,y,z} = this.mesh.position;
        newMesh.position.set(x, y, z);
        return newMesh;
    }
}