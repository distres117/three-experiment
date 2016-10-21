import THREE from 'lib';

export default class Label{
    constructor(text){
        this.element = document.createElement('div');
        this.position = new THREE.Vector3(0,0,0);
        this.element.style = {
            width: 100,
            height: 100,
            top: -1000,
            left: -1000,
        };
        this.element.className = 'label';
        this.element.innerHTML = text;
    }
    setPosition(newPos, camera){
        this.position.copy(newPos);
        let vector = this.position.project(camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        this.element.style.left = vector.x + 'px';
        this.element.style.top = vector.y + 'px';
    }
}