import * as THREE from "three";

import Entity from "./Entity";
import { Textures } from "../Game";
import Input from "../../Input";
import Dom from "../../Dom";
import AudioManager from "../../audio/AudioManager";

class PlayerEntity extends Entity
{
    constructor(game)
    {
        super(
            game, 
            1, 1, 
            Textures.PLAYER,
            new THREE.Vector2(3, 1),
            new THREE.Vector3(0, 0, -1.3),
            "player"
        );

        this.light = false;
        this.shoot = false;
        this.shootTime = Date.now();
        this.shootCoolDown = 0;

        this.initFlashLight();
        this.initShootLight();

        this.lightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.helper = new THREE.CameraHelper( this.spotLight.shadow.camera );
    }

    update()
    {
        super.update();

        if (Input.getKey("e") && !this.light && this.lightState === 0)
            this.lightState = 2;
        if (Input.getKey("e") && this.light && this.lightState === 0)
            this.lightState = 1;
        if (!Input.getKey("e") && this.lightState > 0)
        {
            this.light = this.lightState === 2;
            this.lightState = 0;
            let audio = AudioManager.newAudio("flashlight");
            audio.setVolume(4);
            audio.play();
            Dom.get("#flashlight").style.display = "none";
            this.game.start();
        }

        if (!this.game.isStarted() || this.dead)
            return;

        let speed = 0.025;

        if (this.shootCoolDown > 0)
            this.shootCoolDown--;

        if (Input.getKey("q") || Input.getKey("a") || Input.getKey("ArrowLeft"))
        {
            this.velocity.x = -speed;
        }
        if (Input.getKey("d") || Input.getKey("ArrowRight"))
        {
            this.velocity.x = speed;
        }
        if (Input.getKey(" ") && ! this.shoot && this.shootCoolDown === 0)
        {
            this.shoot = true;
            this.shootTime = Date.now();
            this.shootCoolDown = 15;

            let audio = AudioManager.newAudio("fire");
            audio.play();

            let shotEntity = this.game.getEntityManager().getFirstEntityLat(this.getPosition(), 0.5, false, 15);
            if (shotEntity)
            {
                shotEntity.applyDamage(1);
                console.log(shotEntity.getPosition());
            }
            else
                console.log("NULL");
        }
        if (!Input.getKey(" "))
            this.shoot = false;

        this.setTextureOffset(0, 0);
        if (this.shoot)
            this.setTextureOffset(1, 0);

        this.position.z -= this.game.speed;

        super.moveLat(this.velocity.x);

        this.velocity.x *= 0.9;

        super.walkBobbing(0.01);

        super.updatePosition();

        this.spotLight.intensity = this.light ? this.lightIntensity : 0;
        this.shootLight.intensity = 10 * (50 / (Date.now() - this.shootTime));

        this.spotLight.position.set(
            this.position.x - 0.2,
            this.position.y + 0.55,
            this.position.z
        );
        this.spotLight.target.position.set(
            this.position.x - 0.2,
            this.position.y - 1,
            this.position.z - 10
        );

        this.shootLight.position.set(
            this.position.x + 0.2,
            this.position.y + 0.55,
            this.position.z
        );
        this.shootLight.target.position.set(
            this.position.x - 0.2,
            this.position.y - 1,
            this.position.z - 10
        );
    }

    initFlashLight()
    {
        this.lightState = 0;
        this.lightIntensity = 3;

        this.spotLight = new THREE.SpotLight(0xffffff, 0);
        this.spotLight.angle = 0.6;
        this.spotLight.distance = 20;
        this.spotLight.penumbra = 1;
        this.spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        this.spotLight.shadow.camera.near = 0.1;
        this.spotLight.shadow.camera.far = 20;
        this.spotLight.shadow.camera.fov = 60;

        this.spotLight.position.set(
            this.position.x - 0.2,
            this.position.y + 0.55,
            this.position.z
        );
        this.spotLight.target.position.set(
            this.position.x - 0.2,
            this.position.y + 0.55,
            this.position.z - 10
        );
    }

    initShootLight()
    {
        this.shootLight = new THREE.SpotLight(0xffffaa, 0);
        this.shootLight.angle = 1.5;
        this.shootLight.distance = 20;
        this.shootLight.penumbra = 1;
        this.shootLight.castShadow = true;
        this.shootLight.shadow.mapSize.width = 1024;
        this.shootLight.shadow.mapSize.height = 1024;
        this.shootLight.shadow.camera.near = 0.1;
        this.shootLight.shadow.camera.far = 20;
        this.shootLight.shadow.camera.fov = 100;

        this.shootLight.position.set(
            this.position.x - 0.2,
            this.position.y + 0.55,
            this.position.z
        );
        this.shootLight.target.position.set(
            this.position.x - 0.2,
            this.position.y + 0.55,
            this.position.z - 10
        );
    }

    hasFlashLight()
    {
        return this.light;
    }

    addToGame()
    {
        super.addToGame();
        this.game.add(this.spotLight);
        this.game.add(this.spotLight.target);
        this.game.add(this.shootLight);
        this.game.add(this.shootLight.target);
        // this.game.add(this.lightHelper);
        // this.game.add(this.helper);
    }
}

export default PlayerEntity;