import * as THREE from "three";

import Entity from "./Entity";
import { Textures } from "../Game";

import AudioManager from "../../audio/AudioManager";

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
        this.hittable = true;

        const rand = Math.floor(Math.random() * 4);
        this.zombieType = rand;
        this.setTextureOffset(this.zombieType, 1);
        this.latSpeed = Math.random();
        this.soundRandom = Math.random();
        this.audioClipRandom = Math.round(Math.random() * 4);
        console.log(this.audioClipRandom);
    }

    update()
    {
        super.update();

        if (this.life === 3)
        {
            this.setTextureOffset(this.zombieType, this.animationTime % 60 < 30 ? 1 : 2);
            this.moveLat(Math.sin(this.animationTime * 0.01 * this.latSpeed) * 0.005);
        
            this.attacking = false;
            if (this.game.getPlayer().hasFlashLight())
            {
                this.attacking = true;
                let distToPlayer = Math.abs(this.game.getPlayer().getPosition().z - this.getPosition().z) * 0.15;
                if (distToPlayer < 0.5)
                    distToPlayer = 0.5;
                const movement = (this.game.getPlayer().getPosition().x - this.getPosition().x) * 0.015 * (this.latSpeed + 0.2);
                let finalLatMovement = movement / distToPlayer;
                if (finalLatMovement > 0.15)
                    finalLatMovement = 0.15;
                this.moveLat(finalLatMovement);
                this.getPosition().z -= finalLatMovement;

                if (this.time % Math.round(120 + this.soundRandom * 60) === 0)
                {
                    this.audio = AudioManager.newPositionalAudio("zombieB" + this.audioClipRandom);
                    this.add(this.audio);
                    this.audio.setVolume(this.soundRandom);
                    this.audio.play();
                    this.soundRandom = Math.random();
                }
            }
        }

        if (this.life < 3)
            this.setTextureOffset(this.zombieType, 3);
        if (this.life < 2)
            this.setTextureOffset(this.zombieType, 4);
        if (this.dead)
        {
            this.setTextureOffset(this.zombieType, 5);
            this.hittable = false;
            if (this.audio)
                this.audio.stop();
        }
        else
        {
            if (this.animationTime % Math.round(120 + this.soundRandom * 60) === 0 && !this.attacking)
            {
                this.audio = AudioManager.newPositionalAudio("zombieA" + this.audioClipRandom);
                this.add(this.audio);
                this.audio.setVolume(this.soundRandom);
                this.audio.play();
                this.soundRandom = Math.random();
            }
        }
        
        if (this.isCloseToPlayer(0.5) && !this.dead)
            this.killPlayer();

        super.updatePosition();
    }
}

export default ZombieEntity;