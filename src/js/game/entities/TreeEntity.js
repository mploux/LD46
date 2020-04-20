import * as THREE from "three";

import Entity from "./Entity";
import { Textures } from "../Game";

class RockEntity extends Entity
{
    constructor(game, position)
    {
        super(
            game, 
            1.5, 1.5, 
            Textures.TREE,
            new THREE.Vector2(2, 3),
            position,
            "tree"
        );
        this.life = 1;
        this.dead = false;
        this.hittable = true;

        
        const rand = Math.floor(Math.random() * 3);
        this.treeType = rand;
        this.setTextureOffset(0, this.treeType);
    }

    update()
    {
        super.update();

        if (this.dead)
        {
            this.setTextureOffset(1, this.treeType);
            this.hittable = false;
        }
        else
            if (this.isCloseToPlayer(0.5))
                this.killPlayer();

        super.updatePosition();
    }
}

export default RockEntity;