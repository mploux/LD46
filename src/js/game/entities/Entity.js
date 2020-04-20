import * as THREE from "three";
import TextureRenderer from "../../rendering/TextureRenderer";
import Dom from "../../Dom";
import AudioManager from "../../audio/AudioManager";

export const EntityType = {
    ZOMBIE: "zombie",
    ROCK: "rock",
    TREE: "tree",
}

class Entity
{
    constructor(game, width, height, texture, textureSize, position, type)
    {
        this.game = game;
        this.removed = false;
        this.position = position;
        this.velocity = new THREE.Vector3();
        this.renderer = new TextureRenderer(width, height, texture, textureSize);
        this.textureSize = textureSize;
        this.type = type;
        this.dead = false;
        this.hittable = false;
        this.time = 0;
        this.animationTime = Math.round(Math.random() * 60);
        this.life = 10;
    }

    update()
    {
        this.updatePosition();
        this.time++;
        this.animationTime++;
    }

    moveLat(x)
    {
        if (this.position.x + x < 2 && 
            this.position.x + x > -2)
            this.position.x += x;
        else
            this.velocity.x = 0;
    }

    walkBobbing(amnt)
    {
        this.position.y -= Math.cos(this.position.z * 3) * amnt * this.game.getSpeed() * 10;
    }

    updatePosition()
    {
        if (this.game.getCamera().getPosition().z < this.position.z)
            this.remove();

        this.renderer.setPosition(
            this.position.x,
            this.position.y,
            this.position.z,
        )
    }

    setTextureOffset(xoffs, yoffs)
    {
        this.renderer.setTextureOffset(xoffs, yoffs);
    }

    addToGame()
    {
        this.game.add(this.renderer.getMesh());
        this.game.add(this.renderer.getMeshShadow());
    }

    add(e)
    {
        this.renderer.getMesh().add(e);  
    }

    killPlayer()
    {
        if (!this.game.getPlayer().isDead())
        {
            AudioManager.newAudio("scream").play();
        }
        this.game.getPlayer().die();
        Dom.get("#deadMenu").style.display = "block";
        // AudioManager.getAudio("main_theme").stop();
        this.game.stopMusic();
        console.log("Killed by: " + this.type);
    }

    die()
    {
        if (this.type === "player")
        {
            this.setTextureOffset(2, 0);
            this.dead = true;
            return
        }
        this.game.addKill();
        this.dead = true;
    }

    applyDamage(damage)
    {
        if (this.life - damage <= 0)
        {
            this.die();
            return;
        }
        this.life -= damage;
    }

    isCloseToPlayer(radius)
    {
        let player = this.game.getPlayer();
        let ppos = player.getPosition();
        let epos = this.getPosition();

        if (epos.x > ppos.x - radius && epos.x < ppos.x + radius &&
            epos.z > ppos.z - radius && epos.z < ppos.z + radius)
        {
            return true;
        }
        return false;
    }

    remove()
    {
        this.removed = true;
    }

    getRenderer()
    {
        return this.renderer;
    }

    getPosition()
    {
        return this.position;
    }

    isRemoved()
    {
        return this.removed;
    }

    getType()
    {
        return this.type;
    }

    isDead()
    {
        return this.dead;
    }
}

export default Entity;