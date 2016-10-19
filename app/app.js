import THREE from 'lib';

export default class App{
    constructor(width,height, debug=true){
        this.width = width;
        this.height = height;
        this.objects = [];
        this.debug = debug;
        this.init();
    }
    init(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000 );
        this.camera.position.z = 500;
        this.camera.position.y = 50;
        if (this.debug)
            this.controls = new THREE.TrackballControls(this.camera);
        let renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setSize(this.width, this.height);
        this.effect = new THREE.AsciiEffect(renderer);
        this.effect.setSize(this.width, this.height);
        //set lights
        let light = new THREE.PointLight(0xffffff);
        light.position.set(500,500,500);
        this.scene.add(light);
        let container = document.getElementById('app');
        container.appendChild(this.effect.domElement);
        this.render();
        
    }
    render(){
        requestAnimationFrame(()=>this.render());
        if (this.controls)
            this.controls.update();
        this.effect.render(this.scene, this.camera);
    }
    add(obj){
        this.objects.push(obj);
        this.scene.add(obj.mesh);
        
    }

}