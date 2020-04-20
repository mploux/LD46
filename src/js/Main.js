import "../styles/style.scss";
import Renderer from "./rendering/Renderer";
import Dom from "./Dom";
import Game from "./game/Game";
import Input from "./Input";
import AudioManager from "./audio/AudioManager";

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
            Dom.get("#loading").style.display = "block";
            AudioManager.loadSounds().then(() => {
                Dom.get("#loading").style.display = "none";
                Dom.get("#game_center").style.display = "block";
                this.game = new Game(this.renderer);
                this.start();
            })
        })
        Dom.get("#restart").addEventListener("click", () => {
            Dom.get("#deadMenu").style.display = "none";
            Dom.get("#game_center").style.display = "block";
            AudioManager.clearAudios();
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

        this.update();
        this.render();

        requestAnimationFrame(() => this.loop());
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