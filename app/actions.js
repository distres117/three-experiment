import ActionQueue from 'actionQueue';
import * as TWEEN from 'tween.js';
import $ from 'jquery';
import THREE from 'lib';
import GroupTween from 'lib/GroupTween';

function makeTween(from, to, duration, onUpdate, onComplete){
    let tween = new TWEEN.Tween(from).to(to, duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(onUpdate);
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
        let opacityState = {v:0};
        let objectTweens = ends.map((end,i)=>makeTween(states[i], ends[i], 800, ()=>objects[i].position.set(states[i].x,states[i].y,states[i].z)));
        let cameraTween = makeTween(cameraState, 
        {
            x:0.0015092980750329894, 
            y:0.8403262631527222, 
            z:-0.542078841836944, 
            pX:-0.6037183036804029, 
            pY:-400.1305069650319,
             pZ:216.8315424739669
        },1000, ()=>camera.set(cameraState));
        let opacityTween = makeTween(opacityState, {v:1}, 800, ()=>app.opacity=opacityState.v);
        //make the tweens
        let t = new GroupTween([...objectTweens, cameraTween, opacityTween]);
        t.start(()=>next());
        //let o = makeTween(s2,{v:1},200,()=>app.opacity=s2.v);
        
    });

    //camera move step
    // actions.addEvent((app, objects, camera, next) => {
    //     let from = {
    //         x: camera.position.x,
    //         y: camera.position.y,
    //         z: camera.position.z
    //     };
    //     let to = {
    //         x: 385.75017812036015,
    //         y: -321.7758130986984,
    //         z: 12.534998395844406
    //     };
    //     makeTween(from,to,1000,()=>camera.position.set(from.x,from.y,from.z), ()=>next()).start();
    // });
    return actions;

}

