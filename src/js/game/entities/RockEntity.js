import * as THREE from "three";

import Entity from "./Entity";
import { Textures } from "../Game";

class RockEntity extends Entity
{
    constructor(game, position)
    {
        super(
            game, 
            0.5, 0.5, 
            Textures.ROCK,
            new THREE.Vector2(2, 1),
            position,
            "rock"
        );
        this.life = 1;
        this.dead = true;
        this.hittable = false;
    }

    update()
    {
        super.update();

        // if (this.dead)
        // {
        //     this.setTextureOffset(1, 0);
        //     this.hittable = false;
        // }
        // else
        if (this.isCloseToPlayer(0.5))
            this.killPlayer();

        super.updatePosition();
    }
}

export default RockEntity;