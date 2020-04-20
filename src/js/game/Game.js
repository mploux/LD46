import * as THREE from "three";
import Camera from "../rendering/Camera";
import Ground from "./Ground";
import PlayerEntity from "./entities/PlayerEntity";
import EntityManager from "./EntityManager";
import Spawner from "./Spawner";
import { EntityType } from "./entities/Entity";
import Dom from "../Dom";
import AudioManager from "../audio/AudioManager";
import Input from "../Input";

export const Textures = {
    GROUND: new THREE.TextureLoader().load(require("../../assets/textures/ground.png")),
    GRASS: new THREE.TextureLoader().load(require("../../assets/textures/grass.png")),
    PLAYER: new THREE.TextureLoader().load(require("../../assets/textures/playerShadow.png")),
    FENCE: new THREE.TextureLoader().load(require("../../assets/textures/fence.png")),
    ZOMBIE: new THREE.TextureLoader().load(require("../../assets/textures/zombie.png")),
    ROCK: new THREE.TextureLoader().load(require("../../assets/textures/rock.png")),
    TREE: new THREE.TextureLoader().load(require("../../assets/textures/tree.png")),
}

class Game
{
    constructor(renderer)
    {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new Camera(75, 0.1, 1000, this.renderer);
        this.camera.getPosition().set(0, 1.2, 0);
        this.playMusic = false;
        
        AudioManager.setListener(this.camera.getListener());

        AudioManager.bindAudio("intro");
        AudioManager.bindAudio("mid");
        AudioManager.bindAudio("loop");

        this.introAudio = AudioManager.getAudio("intro");
        this.midAudio = AudioManager.getAudio("mid");
        this.loopAudio = AudioManager.getAudio("loop");

        this.introAudio.play();

        this.themeMusic = this.introAudio;

        setTimeout(() => {
            console.log("Starting music: " + this.playMusic)
            if (this.playMusic)
                return;
            this.midAudio.play();
            this.themeMusic = this.midAudio;
            setTimeout(() => {
                console.log("Starting music: " + this.playMusic)
                if (this.playMusic)
                    return;
                this.themeMusic = this.loopAudio;
                this.loopAudio.setLoop(true);
                this.loopAudio.play();
            }, this.midAudio.buffer.duration * 1000 - 100)
        }, this.introAudio.buffer.duration * 1000 - 100)

        this.speed = 0.04; //0.08;
        this.time = 0;
        this.clock = new THREE.Clock();
        this.clock.start();
        this.score = 0;
        this.kills = 0;
        this.engageStart = false;

        let ambient = new THREE.AmbientLight( 0xffffff, 0.2);
        this.add(ambient);

        this.entityManager = new EntityManager(this);

        this.ground = new Ground(this, Textures.GROUND);
        this.ground.addToGame();

        this.player = new PlayerEntity(this);
        this.player.addToGame();

        this.zombieSpawner = new Spawner(this.entityManager, EntityType.ZOMBIE);
        this.zombieSpawner.setPosition(0, 0, -40);
        this.zombieSpawner.setSize(4, 40);
        this.zombieSpawner.spawn(4);

        this.rockSpawner = new Spawner(this.entityManager, EntityType.ROCK);
        this.rockSpawner.setPosition(0, 0, -40);
        this.rockSpawner.setSize(4, 40);
        this.rockSpawner.spawn(2);

        this.treeSpawner = new Spawner(this.entityManager, EntityType.TREE);
        this.treeSpawner.setPosition(0, 0, -40);
        this.treeSpawner.setSize(4, 40);
        this.treeSpawner.spawn(10);

        this.scene.fog = new THREE.Fog(0x000000, -10, 25);
    }

    update()
    {
        this.player.update();
        if (!this.player.isDead() && this.started)
        {
            this.camera.update();
            this.ground.update();
            this.camera.getPosition().z -= this.speed;
            this.camera.getPosition().x = this.player.getPosition().x;
            this.score += this.speed;

            this.zombieSpawner.setPosition(0, 0, this.camera.getPosition().z - 40);
            this.rockSpawner.setPosition(0, 0, this.camera.getPosition().z - 40);
            this.treeSpawner.setPosition(0, 0, this.camera.getPosition().z - 40);
    
            if (parseInt(-this.camera.getPosition().z) % 40 === 0)
            {
                this.zombieSpawner.spawn(Math.ceil(4 + this.time / 800));
                this.rockSpawner.spawn(2);
                this.treeSpawner.spawn(10);
            }
    
            this.entityManager.update();
    
            this.time += this.clock.getDelta();
    
            if (this.speed < 0.11)
                this.speed += 0.00004;

            if (this.player.hasFlashLight())
            {
                this.scene.fog.far = 30;
            }
            else
            {
                this.scene.fog.far = 15;
            }
        }

        Dom.get("#score").innerText = "Score: " + this.getScore();
        Dom.get("#distance").innerText = "Distance: " + Math.ceil(-this.player.getPosition().z) + "m";
        Dom.get("#kills").innerText = "Kills: " + this.kills;
    }

    onResize()
    {
        this.camera.onResize();
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

    start()
    {
        this.started = true;
    }

    isStarted()
    {
        return this.started;
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

    getThemeMusic()
    {
        return this.themeMusic;
    }

    stopMusic()
    {
        this.themeMusic.stop();
        this.playMusic = true;
    }
}

export default Game;