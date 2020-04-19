import "../styles/style.scss";
import Renderer from "./rendering/Renderer";
import Dom from "./Dom";
import Game from "./game/Game";
import Input from "./Input";

class Main
{
    constructor(rendererElementName)
    {
        this.rendererElement = Dom.get("#" + rendererElementName);
    
        this.renderer = new Renderer(this.rendererElement);
        this.renderer.bind();

        Dom.get("#controls").addEventListener("click", () => {
            Dom.get("#startMenu").style.display = "none";
            Dom.get("#controlsMenu").style.display = "block";
        })
        Dom.get("#start").addEventListener("click", () => {
            Dom.get("#controlsMenu").style.display = "none";
            Dom.get("#game_center").style.display = "block";
            this.start();
        })
        Dom.get("#restart").addEventListener("click", () => {
            Dom.get("#deadMenu").style.display = "none";
            Dom.get("#game_center").style.display = "block";
            this.game = new Game(this.renderer);
        })
    }

    update()
    {
        this.game.update();
        this.renderer.update();
    }

    render()
    {
        this.renderer.render(this.game);
    }
    
    onFocusStart()
    {
        this.renderer.onFocusStart();
    }

    onFocusStop()
    {
        this.renderer.onFocusStop();
    }

    onResize()
    {
        this.renderer.onResize();
    }

    start()
    {
        this.game = new Game(this.renderer);

        Dom.get("#header").style.display = "block";
        this.running = true;
        this.lastTime = performance.now();
        this.initEvents();
        requestAnimationFrame(() => this.loop());
    }

    stop()
    {
        this.running = false;
    }

    loop()
    {
        if (!this.running)
            return;

        const frameCap = 60;

        this.update();
        this.render();

        setTimeout( () => {
            requestAnimationFrame(() => this.loop());
        }, 1000.0 / frameCap );
    }

    initEvents()
    {
        window.addEventListener("mousedown", () => this.onFocusStart());
        window.addEventListener("mouseup", () => this.onFocusStop());
        window.addEventListener("touchstart", () => this.onFocusStart());
        window.addEventListener("touchend", () => this.onFocusStop());
        window.addEventListener("resize", () => this.onResize());

        Input.initEvents();
    }
}

window.onload = () => new Main("three-canvas");