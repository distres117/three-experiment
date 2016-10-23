import App from 'app';
import Sphere from 'sphere';

let app = new App(true);
app.add(new Sphere(100, 90, 0, 0, 'oliver', 'red'));
app.add(new Sphere(200,-200,200,0, 'mcrobbie', 'blue'));
app.add(new Sphere(175,-300, 100, 0, 'software engineer', 'purple'));
app.add(new Sphere(150,-600, 100, 0, 'designer', 'green'));
app.add(new Sphere(125,400, 100, 0, 'disruptor', 'orange'));
app.render();