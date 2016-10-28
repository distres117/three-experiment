export default class ActionQueue{
    constructor(){
        this.queue = [];
        this.objects = [];
    }
    addEvent(action){
        this.queue.push(action);
    }
    addCamera(camera){
        this.camera = camera;
    }
    addObject(object){
        this.objects.push(object);
    }
    addApp(app){
        this.app = app;
    }
    next(){
        if (this.queue.length > 0){
            console.log(this.queue.length);
            let action = this.queue.shift();
            action(this.app, this.objects, this.camera, this.next.bind(this));
        }else{
            console.log('queue empty');
            //this.app.attachListeners();
        }
    }
}