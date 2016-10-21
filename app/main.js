import App from 'app';
import Sphere from 'sphere';

let app = new App(window.innerWidth, window.innerHeight);
app.add(new Sphere(100, 90, 0, 0, 'oliver'));
app.add(new Sphere(200,-200,200,0, 'mcrobbie'));
app.render();