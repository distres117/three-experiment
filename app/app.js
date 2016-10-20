import THREE from 'lib';

export default class App{
    constructor(width,height, debug=true){
        this.width = width;
        this.height = height;
        this.objects = [];
        this.debug = debug;
        this.mouse = new THREE.Vector2();
        this.init();
    }
    init(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000 );
        this.rayCaster = new THREE.Raycaster();
        this.camera.position.z = 500;
        this.camera.position.y = 50;
        if (this.debug)
            this.controls = new THREE.TrackballControls(this.camera);
        let renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setSize(this.width, this.height);
        this.effect = new THREE.AsciiEffect(renderer, undefined, undefined,(color)=> this.hover ? 'red':'black' );
        this.effect.setSize(this.width, this.height);
        //set lights
        let light = new THREE.PointLight(0xffffff);
        light.position.set(500,500,500);
        this.scene.add(light);
        let container = document.getElementById('app');
        container.appendChild(this.effect.domElement);
        //add listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false );
        this.render();
        
    }
    render(){
        requestAnimationFrame(()=>this.render());
        if (this.controls)
            this.controls.update();
        this.rayCaster.setFromCamera(this.mouse,this.camera);
        let intersects = this.rayCaster.intersectObjects(this.scene.children);
        this.effect.render(this.scene, this.camera, intersects.length ? 'hover' : 'default' );
    }
    add(obj){
        this.objects.push(obj);
        this.scene.add(obj.mesh);
        
    }
    onMouseMove(event){
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

}