import THREE from 'lib';
import * as TWEEN from 'tween.js';

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
        if (this.queue.length){
            let action = this.queue.pop();
            if (action.type==='object')
                action.fn(this.app, this.objects, this.next.bind(this));
        }
    }
}