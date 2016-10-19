import * as Three from 'three';

export default class App{
    constructor(){
        this.objects = [];
        this.init();
    }
    init(){
        this.scene =  new Three.Scene();
        document.write('it works');
    }
}