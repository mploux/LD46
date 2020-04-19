import * as THREE from "three";

import Entity from "./Entity";
import { Textures } from "../Game";
import Dom from "../../Dom";

class ZombieEntity extends Entity
{
    constructor(game, position)
    {
        super(
            game, 
            1, 1, 
            Textures.ZOMBIE,
            new THREE.Vector2(4, 5),
            position,
            "zombie"
        );
        
        this.life = 3;

        const rand = Math.floor(Math.random() * 4);
        console.log(rand);
        this.zombieType = rand;
        this.setTextureOffset(this.zombieType, 1);
        this.latSpeed = Math.random();
    }

    update()
    {
        super.update();
        
        
        if (this.life === 3)
        {
            this.setTextureOffset(this.zombieType, this.animationTime % 60 < 30 ? 1 : 2);
            this.moveLat(Math.sin(this.animationTime * 0.01 * this.latSpeed) * 0.005);
        }

        if (this.life < 3)
            this.setTextureOffset(this.zombieType, 3);
        if (this.life < 2)
            this.setTextureOffset(this.zombieType, 4);
        if (this.dead)
            this.setTextureOffset(this.zombieType, 5);
        
        if (this.isCloseToPlayer(0.5) && !this.dead)
        {
            console.log("Close to player !");

            this.game.getPlayer().die();

            Dom.get("#deadMenu").style.display = "block";
        }

        super.updatePosition();
    }
}

export default ZombieEntity;