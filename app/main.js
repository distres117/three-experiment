import App from 'app';
import Sphere from 'sphere';
import ActionQueue from 'actionQueue';

//create intro
let q = new ActionQueue();
q.addEvent({
    type: 'object',
    fn: (app, objects, next)=>{
        app.override = true;
        let counter = 0;
        let t = window.setInterval(()=>{
            app.flush();
            if (!objects[counter]) {
                app.override = false;
                window.clearInterval(t);
                next();
            }else{
                objects[counter++].hover();
            }
        },1000);
     

    }
})


let app = new App(q,true);
app.add(new Sphere(100, 90, 0, 0, 'oliver', 'red'));
app.add(new Sphere(200,-200,200,0, 'mcrobbie', 'blue'));
app.add(new Sphere(175,-300, 100, 0, 'software engineer', 'purple'));
app.add(new Sphere(150,-600, 100, 0, 'designer', 'green'));
app.add(new Sphere(125,400, 100, 0, 'disruptor', 'orange'));
app.render();
app.actionQueue.next();
