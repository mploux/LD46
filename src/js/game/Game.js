import * as THREE from "three";
import Camera from "../rendering/Camera";
import Ground from "./Ground";
import PlayerEntity from "./entities/PlayerEntity";
import ZombieEntity from "./entities/ZombieEntity";
import EntityManager from "./EntityManager";
import Spawner from "./Spawner";
import { EntityType } from "./entities/Entity";
import Dom from "../Dom";

export const Textures = {
    GROUND: new THREE.TextureLoader().load(require("../../assets/textures/ground.png")),
    GRASS: new THREE.TextureLoader().load(require("../../assets/textures/grass.png")),
    PLAYER: new THREE.TextureLoader().load(require("../../assets/textures/playerShadow.png")),
    FENCE: new THREE.TextureLoader().load(require("../../assets/textures/fence.png")),
    ZOMBIE: new THREE.TextureLoader().load(require("../../assets/textures/zombie.png")),
}

class Game
{
    constructor(renderer)
    {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new Camera(75, 0.1, 1000, this.renderer);
        this.camera.getPosition().set(0, 1.2, 0);
        this.speed = 0.02; //0.08;
        this.time = 0;
        this.clock = new THREE.Clock();
        this.clock.start();
        this.score = 0;
        this.kills = 0;

        let ambient = new THREE.AmbientLight( 0xffffff, 0.3);
        this.add(ambient);

        this.entityManager = new EntityManager(this);

        this.ground = new Ground(this, Textures.GROUND);
        this.ground.addToGame();

        this.player = new PlayerEntity(this);
        this.player.addToGame();

        this.spawner = new Spawner(this.entityManager, EntityType.ZOMBIE);
        this.spawner.setPosition(0, 0, -40);
        this.spawner.setSize(4, 40);
        this.spawner.spawn(10);

        this.scene.fog = new THREE.Fog(0x000000, -10, 25);
    }

    update()
    {
        if (!this.player.isDead())
        {
            this.camera.update();
            this.ground.update();
            this.player.update();
            this.camera.getPosition().z -= this.speed;
            this.camera.getPosition().x = this.player.getPosition().x;
            this.score += this.speed;

            this.spawner.setPosition(0, 0, this.camera.getPosition().z - 40);
    
            if (parseInt(-this.camera.getPosition().z) % 40 === 0)
                this.spawner.spawn(Math.ceil(10 + this.time / 500));
    
            this.entityManager.update();
    
            this.time += this.clock.getDelta();
    
            if (this.speed < 0.11)
                this.speed += 0.00001;
        }

        Dom.get("#score").innerText = "Score: " + this.getScore();
        Dom.get("#deathScore").innerText = "Score: " + this.getScore();
        Dom.get("#distance").innerText = "Distance: " + Math.ceil(-this.player.getPosition().z) + "m";
        Dom.get("#kills").innerText = "Kills: " + this.kills;
    }

    addKill()
    {
        this.score += 10;
        this.kills++;
    }

    addEntity(e)
    {
        this.entityManager.add(e);
    }

    removeEntity(e)
    {
        this.entityManager.remove(e);
    }

    getEntityManager()
    {
        return this.entityManager;
    }

    add(e)
    {
        this.scene.add(e);
    }

    remove(e)
    {
        this.scene.remove(e);
    }

    getScore()
    {
        return Math.ceil(this.score);
    }

    getScene()
    {
        return this.scene;
    }

    getPlayer()
    {
        return this.player;
    }

    getCamera()
    {
        return this.camera;
    }

    getSpeed()
    {
        return this.speed;
    }

    getTime()
    {
        return this.time;
    }

    getClock()
    {
        return this.clock;
    }
}

export default Game;