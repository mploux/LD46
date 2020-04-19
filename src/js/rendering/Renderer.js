import * as THREE from "three";

class Renderer 
{
    constructor(rendererElement)
    {
        this.rendererElement = rendererElement;

        this.renderer = new THREE.WebGLRenderer()
        this.init();
    }

    init()
    {
        this.width = this.rendererElement.offsetWidth;
        this.height = this.rendererElement.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    onFocusStart()
    {}
    
    onFocusStop()
    {}

    onResize()
    {
        this.width = this.rendererElement.offsetWidth;
        this.height = this.rendererElement.offsetHeight;
        this.renderer.setSize(this.width, this.height);
    }

    setFrameTime(time)
    {
        this.frameTime = time;
    }

    update()
    {
    }

    render(game)
    {
        this.renderer.render(game.getScene(), game.getCamera().getCamera());
    }

    bind()
    {
        this.rendererElement.appendChild(this.renderer.domElement);
    }

    getRenderer()
    {
        return this.renderer;
    }

    getDomElement()
    {
        return this.rendererElement;
    }

    getWidth()
    {
        return this.width;
    }

    getHeight()
    {        
        return this.height;
    }

    getFogColor()
    {
        return this.fogColor;
    }
}

export default Renderer;