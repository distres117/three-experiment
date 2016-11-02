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
        const homeTween = (camera)=>{
            let cameraState = camera.getPosition();
            let cameraTo = {pX:-178.5089520712535, pY:-358.9454671796889, pZ:238.242347485374, rX:0.884368926044412, rY:-0.20359807749374145, rZ:-0.021985310657996554};
        makeTween(cameraState, cameraTo, 20000, ()=>camera.set(cameraState)).yoyo(true).repeat(Infinity).start();
        };
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
        let cameraTo = {pX:-3.9962673619819107, pY:-373.8088569990897, pZ:245.46978067209486, rX:0.8900062397943256, rY:0.0552642462439195, rZ:-0.021564068897733834};
        let opacityState = {v:0};
        let objectTweens = ends.map((end,i)=>makeTween(states[i], ends[i], 800, ()=>objects[i].position.set(states[i].x,states[i].y,states[i].z)));
        let cameraTween = makeTween(cameraState, cameraTo,1500, ()=>camera.set(cameraState));
        let opacityTween = makeTween(opacityState, {v:1}, 800, ()=>app.opacity=opacityState.v);
        //make the tweens
        let t = new GroupTween([...objectTweens, cameraTween, opacityTween]);
        t.start(()=>{
            app.attachListeners();
            next();
        });
        let newText = ['skills', 'projects', 'experience', 'education', 'contact', 'credits'];
        objects.forEach((o,i)=>o.changeText(newText[i]));
    });
    actions.addEvent((app, objects,camera,next)=>{
        let cameraTos = [
            {pX:-418.1400856990614, pY:226.35127894186024, pZ:50.36610142485676, rX:-0.784466219384013, rY:-0.9107753959173707, rZ:-2.263039998316551},
            {pX:-103.16425667098683, pY:375.8512288878383, pZ:51.969523386177954, rX:-1.7705081200606978, rY:-0.5087280280764092, rZ:3.0733898146916068},
            {pX:337.8608189698965, pY:289.5567792823587, pZ:22.86513200220447, rX:-1.3849540737619261, rY:0.6950555785567467, rZ:3.005341410381048},
            {pX:357.5111978023926, pY:-177.48913627793536, pZ:11.581142836889502, rX:0.7993966058311909, rY:0.8761293404169597, rZ:0.39645549378619593},
            {pX:-15.86950087587756, pY:-312.294723156991, pZ:50.42483371110654, rX:1.1664280790342627, rY:0.04729014631398257, rZ:-0.03582277411524949},
            {pX:-385.6467888733021, pY:-239.80240293273516, pZ:-7.943565384507328, rX:1.6086288214422226, rY:-0.8083704644986809, rZ:0.22709127643867646}
        ];
        let idx = 0;
        objects.forEach((o,i)=>{
            o.onClick = ()=>{
                let cameraState = camera.getPosition();
                makeTween(cameraState, cameraTos[i], 2000, ()=>camera.set(cameraState), undefined, ()=>o.changeText('details', true)).start();
            };
        });
        app.goHome = ()=>{
            let objectsToReset = objects.filter(o=>o.oldText);
            if (objectsToReset.length)
                objectsToReset.forEach(o=>{
                    o.revertText();
                    o.oldText = undefined;
                });
            let cameraState = camera.getPosition();
            let cameraTo = {pX:-3.9962673619819107, pY:-373.8088569990897, pZ:245.46978067209486, rX:0.8900062397943256, rY:0.0552642462439195, rZ:-0.021564068897733834};
            makeTween(cameraState, cameraTo, 1500, ()=>camera.set(cameraState), undefined, ()=>home(camera)).start();
        }
    });

    return actions;

}