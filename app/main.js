import App from 'app';
import Sphere from 'sphere';
import getActions from 'actions';

let actions = getActions();
let app = new App(actions,false);
app.add(new Sphere(65, -150,125,0, 'oliver', 'red'));
app.add(new Sphere(75, -50, 50,-25, 'mcrobbie', 'blue'));
app.add(new Sphere(80, -25, 110, 25, 'software', 'purple'));
app.add(new Sphere(65,-125, -40, -100, 'engineer', 'orange'));
app.add(new Sphere(75, -210, 20, -200, 'and', 'green'));
app.add(new Sphere(75, -220, -80, 0, 'designer', 'orange'));
app.render();
actions.next();
