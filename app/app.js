import THREE from 'lib';

export default class App{
    constructor(debug=true){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.objects = [];
        this.debug = debug;
        this.mouse = new THREE.Vector2();
        this.moved = false;
        this.init();
    }
    init(){
        this.scene = new THREE.Scene();
        this.hoverScene = new THREE.Scene();
        this.labelScene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000 );
        this.rayCaster = new THREE.Raycaster();
        this.camera.position.z = 500;
        this.camera.position.y = 50;
        if (this.debug){
            this.track = true;
            this.controls = new THREE.TrackballControls(this.camera);
            document.addEventListener('keydown', (e)=> {
                if (e.key==='s') this.controls.enabled=!this.controls.enabled;}, false)
        }
        // //set lights
        let light = new THREE.PointLight(0xffffff);
        light.position.set(500,500,500);
        this.scene.add(light);
        this.effect = this.getRenderer('defaultContainer').effect;
        this.hoverEffect = this.getRenderer('hoverContainer').effect;
        this.labelRenderer = new THREE.WebGLRenderer({alpha:true});
        this.labelRenderer.setSize(window.innerWidth,window.innerHeight);
        this.labelRenderer.setPixelRatio(window.devicePixelRatio);
        let container = document.getElementById('labelsContainer');
        container.appendChild(this.labelRenderer.domElement);
        //add listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false );
        document.addEventListener( 'click', this.onClick.bind(this), false);
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
            this.intersected = this.objects.filter(obj=>intersects[0].object===obj.getMesh())[0];
            this.hoverScene.add(this.intersected.clone());
        }
        else if (this.moved && !intersects.length){
            this.flushHoverScene();
            this.intersected = undefined;
        }
        if (this.debug){
            let {x,y,z} = this.controls.object.getWorldDirection();
            let pos = this.controls.object.position;
            document.getElementById('info').innerHTML= `x:${x}, y:${y}, z:${z}, pX:${pos.x}, pY:${pos.y}, pZ:${pos.z} (tracking: ${this.controls.enabled})`;
        }
        
        this.objects.forEach(o=>o.updateLabel(this.camera));
        this.hoverEffect.render(this.hoverScene, this.camera, this.intersected ? this.intersected.hoverColor : 'black', !!this.intersected);
        this.effect.render(this.scene, this.camera, 'default' );
        this.labelRenderer.render(this.labelScene, this.camera);
        
    }
    flushHoverScene(){
        this.hoverScene.children.forEach(child=>this.hoverScene.remove(child));
    }
    add(obj){
        this.objects.push(obj);
        this.scene.add(obj.mesh);
        obj.updateLabel(this.camera);
        document.getElementById('labelsContainer').appendChild(obj.label.element);
        
    }
    onMouseMove(event){
        this.moved = true;
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    onClick(event){
        if (this.intersected){
            this.setCamera({x:-0.7676715477620297, y:0.6403577964996368, z:-0.024945613176517528, pX:385.75017812036015, pY:-321.7758130986984, pZ:12.534998395844406});    
        }
    }
    setCamera(posDir){
        let {x,y,z,pX,pY,pZ} = posDir;
        this.camera.position.set(pX,pY,pZ);
        this.camera.lookAt(new THREE.Vector3(x,y,z))
    }

}