import ActionQueue from 'actionQueue';
import * as TWEEN from 'tween.js';
import THREE from 'lib';

//create intro
export default () => {
    let actions = new ActionQueue();

    //highlighting step
    actions.addEvent((app, objects, camera, next) => {
        app.override = true;
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
    }
    );

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
    //     let tween = new TWEEN.Tween(from)
    //         .to(to, 2000)
    //         .easing(TWEEN.Easing.Linear.None)
    //         .onUpdate(() => {
    //             camera.position.set(from.x,from.y,from.z);
    //         })
    //         .onComplete(() => {
    //             next();
    //         })
    //         .start();
    // });
    return actions;

}

