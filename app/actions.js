import ActionQueue from 'actionQueue';
import * as TWEEN from 'tween.js';
import $ from 'jquery';
import THREE from 'lib';
import GroupTween from 'lib/GroupTween';

function makeTween(from, to, duration, onUpdate, onComplete){
    let tween = new TWEEN.Tween(from).to(to, duration).easing(TWEEN.Easing.Linear.None).onUpdate(onUpdate);
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
                app.opacity = 1;
                next();
            } else {
                objects[counter++].hover();
            }
        }, 1000);
    });

    //spheres relocate, fade in, camera moves
    actions.addEvent((app, objects, camera, next)=>{
        //define the target states
        let s = objects[0].getPosition();
        let s2 = {v:0};
        //make the tweens
        let t = makeTween(s,{x:0,y:0,z:0},1000,()=>objects[0].position.set(s.x,s.y,s.z));
        let o = makeTween(s2,{v:1},200,()=>app.opacity=s2.v);
        (new GroupTween([t,o], ()=>next())).start();
    });

    //camera move step
    actions.addEvent((app, objects, camera, next) => {
        let from = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };
        let to = {
            x: 385.75017812036015,
            y: -321.7758130986984,
            z: 12.534998395844406
        };
        makeTween(from,to,1000,()=>camera.position.set(from.x,from.y,from.z), ()=>next()).start();
    });
    return actions;

}

