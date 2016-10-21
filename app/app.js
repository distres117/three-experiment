import THREE from 'lib';

export default class App{
    constructor(width,height, debug=true){
        this.width = width;
        this.height = height;
        this.objects = [];
        this.debug = debug;
        this.mouse = new THREE.Vector2();
        this.moved = false;
        this.init();
    }
    init(){
        this.scene = new THREE.Scene();
        this.hoverScene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000 );
        this.rayCaster = new THREE.Raycaster();
        this.camera.position.z = 500;
        this.camera.position.y = 50;
        if (this.debug)
            this.controls = new THREE.TrackballControls(this.camera);
        //set lights
        let light = new THREE.PointLight(0xffffff);
        light.position.set(500,500,500);
        this.scene.add(light);
        this.effect = this.getRenderer('defaultContainer').effect;
        this.hoverEffect = this.getRenderer('hoverContainer').effect;
        console.log(this.hoverEffect);
        //add listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false );
        this.render();
        
    }
    getRenderer(elemId){
        let renderer = new THREE.CanvasRenderer({alpha:true});
        renderer.setSize(this.width, this.height);
        let effect = new THREE.AsciiEffect(renderer);
        effect.setSize(this.width, this.height);
        let container = document.getElementById(elemId);
        container.appendChild(effect.domElement);
        return {container, effect}
    }
    render(){
        requestAnimationFrame(()=>this.render());
        if (this.controls)
            this.controls.update();
        this.rayCaster.setFromCamera(this.mouse,this.camera);
        let intersects = this.rayCaster.intersectObjects(this.scene.children);
        if (this.moved && intersects.length > 0 && intersects[0].object !== this.intersected ){
            this.flushHoverScene();
            this.intersected = intersects[0].object;
            this.hoverScene.add(this.cloneMesh(this.intersected));
        }
        else if (this.moved && !intersects.length){
            this.flushHoverScene();
            this.intersected = undefined;
        }
        this.hoverEffect.render(this.hoverScene, this.camera, 'hover', !!this.intersected);
        this.effect.render(this.scene, this.camera, 'default' );
        
    }
    flushHoverScene(){
        this.hoverScene.children.forEach(child=>this.hoverScene.remove(child));
    }
    cloneMesh(mesh){
        let newMesh = new THREE.Mesh(mesh.geometry, mesh.material);
        newMesh.position.set(mesh.position.x,mesh.position.y, mesh.position.z);
        return newMesh;
    }
    add(obj){
        this.objects.push(obj);
        this.scene.add(obj.mesh);
        
    }
    onMouseMove(event){
        this.moved = true;
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

}