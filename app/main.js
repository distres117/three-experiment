import App from 'app';
import Sphere from 'sphere';
import getActions from 'actions';

let actions = getActions();
let app = new App(actions, false);
app.add(new Sphere(65, -150,125,0, 'oliver', 'red'));
app.add(new Sphere(75, -50, 50,-25, 'mcrobbie', 'blue'));
app.add(new Sphere(90, 75, 150, 25, 'software', 'purple'));
app.add(new Sphere(85, 85, -15, -100, 'engineer', 'orange'));
app.add(new Sphere(75, -150, -50, -200, 'and', 'green'));
app.add(new Sphere(75, -220, -80, 0, 'designer', 'orange'));
app.render();
actions.next();
