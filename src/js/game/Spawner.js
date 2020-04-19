import { EntityType } from "./entities/Entity";
import ZombieEntity from "./entities/ZombieEntity";
import * as THREE from "three";

class Spawner
{
    constructor(entityManager, entityType)
    {
        this.entityManager = entityManager;
        this.entityType = entityType;

        this.position = new THREE.Vector3();
        this.size = new THREE.Vector2(1, 1);
        this.spawneTime = 0;
    }

    setPosition(x, y, z)
    {
        this.position = new THREE.Vector3(x, y, z);
    }

    setSize(x, y)
    {
        this.size = new THREE.Vector2(x, y);
    }

    spawnEntity(position)
    {
        switch (this.entityType)
        {
            case EntityType.ZOMBIE:
                this.entityManager.add(new ZombieEntity(this.entityManager.game, position));
            return;
        }
    }

    spawn(count)
    {
        if (Date.now() - this.spawneTime < 5000)
            return;
        console.log("Spawning " + count + " " + this.entityType + " entities");
        for (let i = 0; i < count; i++)
        {
            let epos = new THREE.Vector3();

            epos.x = this.position.x - this.size.x * 0.5 + this.size.x * Math.random();
            epos.y = this.position.y;
            epos.z = this.position.z - this.size.y * 0.5 + this.size.y * Math.random();

            this.spawnEntity(epos);
        }
        this.spawneTime = Date.now();
    }
}

export default Spawner;