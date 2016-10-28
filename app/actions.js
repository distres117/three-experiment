import ActionQueue from 'actionQueue';
import * as TWEEN from 'tween.js';
import THREE from 'lib';
import GroupTween from 'lib/GroupTween';

function makeTween(from, to, duration, onUpdate, easing = TWEEN.Easing.Sinusoidal.InOut, onComplete){
    let tween = new TWEEN.Tween(from).to(to, duration).easing(easing).onUpdate(onUpdate);
    if (onComplete)
        tween.onComplete(onComplete);
    return tween;
}

//create intro
export default () => {
    let actions = new ActionQueue();
    //highlighting step
    actions.addEvent((app, objects, camera, next) => {
        app.override = true;
        app.opacity = 0;
        let counter = 0;
        let t = window.setInterval(() => {
            app.flush();
            if (!objects[counter]) {
                app.override = false;
                window.clearInterval(t);
                next();
            } else {
                objects[counter++].hover();
            }
        }, 1000);
    });

    //spheres relocate, fade in, camera moves
    actions.addEvent((app, objects, camera, next)=>{
        //define the target states
        let states = objects.map(o=>o.getPosition());
        let ends = [
            {x:-330,y:170,z:0},
            {x:-30,y:230,z:70 },
            {x:250,y:150,z:0},
            {x:220,y:-120,z:-50},
            {x:-30, y:-200,z:0},
            {x:-270,y:-150,z:0}
        ];
        let cameraState = camera.getPosition();
        let cameraTo = {pX:-35.47057399020848, pY:-463.5420302612777, pZ:168.33810378414358, rX:1.2241342464734717, rY:-0.021618349507295975, rZ:-0.04417979255883771};
        let opacityState = {v:0};
        let objectTweens = ends.map((end,i)=>makeTween(states[i], ends[i], 800, ()=>objects[i].position.set(states[i].x,states[i].y,states[i].z)));
        let cameraTween = makeTween(cameraState, cameraTo,1500, ()=>camera.set(cameraState));
        let opacityTween = makeTween(opacityState, {v:1}, 800, ()=>app.opacity=opacityState.v);
        //make the tweens
        let t = new GroupTween([...objectTweens, cameraTween, opacityTween]);
        t.start(()=>{
            app.attachListeners();
            next()
        });
        let newText = ['skills', 'projects', 'experience', 'education', 'contact', 'credits'];
        objects.forEach((o,i)=>o.changeText(newText[i]));
        
    });
    actions.addEvent((app, objects, camera, next)=>{
        let cameraState = camera.getPosition();
        let cameraTo = {pX:-372.23708483158487, pY:-336.31056223672164, pZ:108.37958123974735, rX:1.1781445910500097, rY:-0.731066029494897, rZ:-0.18991356402826853};
        makeTween(cameraState, cameraTo, 10000, ()=>camera.set(cameraState)).repeat(2).yoyo(true).start();
    });

    return actions;

}

