import THREE from 'lib';
import Camera from 'camera';
import * as TWEEN from 'tween.js';

export default class App{
    constructor(actionQueue, debug=true){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.actionQueue = actionQueue;
        this.objects = [];
        this.debug = debug;
        this.mouse = new THREE.Vector2();
        this.moved = false;
        this.override = false;
        this.opacity = 1;
        this.init();
    }
    init(){
        this.scene = this.setScene();
        this.hoverScene = new THREE.Scene();
        this.labelScene = new THREE.Scene();
        this.camera = new Camera();
        this.actionQueue.addApp(this);
        this.actionQueue.addCamera(this.camera);
        this.rayCaster = new THREE.Raycaster();
        if (this.debug){
            this.clock = new THREE.Clock();
            let axes = new THREE.AxisHelper(50,0x0000ff, 0x808080);
            let helper = new THREE.GridHelper(1000, 10);
            this.labelScene.add(axes);
            this.labelScene.add(helper);
            this.track = true;
            this.controls = new THREE.FlyControls(this.camera);
            this.controls.movementSpeed = 200;
            this.controls.domElement = document.getElementById('defaultContainer');
            this.controls.rollSpeed = Math.PI / 24;
            this.controls.autoForward = false;
            this.controls.dragToLook = false;
            console.log(this.controls);
            document.addEventListener('keydown', (e)=> {
                if (e.key==='l') this.controls.enabled=!this.controls.enabled;}, false)
        }
        this.effect = this.getRenderer('defaultContainer').effect;
        this.hoverEffect = this.getRenderer('hoverContainer').effect;
        this.labelRenderer = new THREE.WebGLRenderer({alpha:true});
        this.labelRenderer.setSize(window.innerWidth,window.innerHeight);
        this.labelRenderer.setPixelRatio(window.devicePixelRatio);
        let container = document.getElementById('labelsContainer');
        container.appendChild(this.labelRenderer.domElement);
        //this.render();
        
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
    setScene(){
        let scene = new THREE.Scene();
        let light = new THREE.PointLight(0xffffff);
        let light2 = new THREE.PointLight(0xffffff);
        light.position.set(500,500,500);
        light2.position.set(-500,-500,-500);
        scene.add(light);
        scene.add(light2);
        return scene;
    }
    render(){
        TWEEN.update();
        requestAnimationFrame(()=>this.render());
        if (this.controls){
            this.controls.update(this.clock.getDelta());
        }
        this.rayCaster.setFromCamera(this.mouse,this.camera);
        let intersects = this.rayCaster.intersectObjects(this.scene.children);
        if (this.moved && intersects.length > 0 && intersects[0].object !== this.intersected ){
            this.flush();
            this.intersected = this.objects.filter(obj=>intersects[0].object===obj)[0];
            //this.hoverScene.add(this.intersected.clone());
        }
        else if (this.moved && !intersects.length){
            this.flush();
            this.intersected = undefined;
        }
        if (this.debug){
            //let {x,y,z} = this.controls.object.getWorldDirection();
            let pos = this.controls.object.position;
            let rot = this.controls.object.rotation;
            document.getElementById('info').innerHTML= `pX:${pos.x}, pY:${pos.y}, pZ:${pos.z}, rX:${rot.x}, rY:${rot.y}, rZ:${rot.z} (tracking: ${this.controls.enabled})`;
        }
        this.objects.forEach(o=>o.updateLabel(this.camera));
        if (this.intersected)
            this.intersected.hover();
        // else if (!this.override)
        //     this.hoverEffect.render(this.hoverScene, this.camera, 'black', false);
        this.hoverEffect.render(this.hoverScene, this.camera, 'black', !!this.intersected || this.override);
        this.effect.render(this.scene, this.camera, 'black', true, this.opacity);
        this.labelRenderer.render(this.labelScene, this.camera);
    }
    flush(){
        this.hoverScene.children.forEach((child)=>this.hoverScene.remove(child));
    }
    add(obj){
        obj.setHover(this.hoverScene);
        this.objects.push(obj);
        this.scene.add(obj);
        this.actionQueue.addObject(obj);
        obj.updateLabel(this.camera);
        document.getElementById('labelsContainer').appendChild(obj.label.element);
        
    }
    onMouseMove(event){
        this.moved = true;
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    onClick(event){
        if (!this.debug || this.controls.enabled){
            if (this.intersected)
                this.intersected.onClick();
            else{
                this.goHome();
            }
        }
        
            
    }
    attachListeners(){
         //add listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false );
        document.addEventListener( 'click', this.onClick.bind(this), false);
    }

}