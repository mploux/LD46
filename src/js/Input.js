class Input
{
    constructor()
    {
        this.keys = [];
    }
    
    initEvents()
    {
        window.addEventListener("keydown", e => this.onKeyDown(e));
        window.addEventListener("keyup", e => this.onKeyUp(e));
    }
    
    getKey(key)
    {
        if (this.keys[key] !== undefined)
            return this.keys[key];
        this.keys[key] = false;
    }
    
    onKeyDown(e)
    {
        e.preventDefault();
        this.keys[e.key] = true;
    }
    
    onKeyUp(e)
    {
        e.preventDefault();
        this.keys[e.key] = false;
    }
}

export default new Input();