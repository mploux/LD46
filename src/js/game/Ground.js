import * as THREE from "three";

import InstancedTextureRenderer from "../rendering/InstancedTextureRenderer";
import { Textures } from "./Game";

class Ground
{
    constructor(game)
    {
        this.game = game;
        
        this.initGround();
        this.initFence();
    }

    initGround()
    {
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});

        let texture = Textures.GROUND;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.repeat.set(10, 100);

        material.map = texture;
        material.alphaTest = 1;

        this.groundMesh = new THREE.Mesh(geometry, material);

        this.groundMesh.position.set(0, 0, -25);
        this.groundMesh.scale.set(5, 50, 1);
        this.groundMesh.rotation.x = -Math.PI * 0.5;

        this.groundMesh.receiveShadow = true;
    }

    initFence()
    {
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});

        let texture = Textures.FENCE;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.repeat.set(50, 1);

        material.map = texture;
        material.alphaTest = 1;

        this.fenceRightMesh = new THREE.Mesh(geometry, material);
        this.fenceRightMesh.position.set(2.5, 0.5, -25);
        this.fenceRightMesh.scale.set(50, 1, 1);
        this.fenceRightMesh.rotation.y = -Math.PI * 0.5;

        this.fenceLeftMesh = new THREE.Mesh(geometry, material);
        this.fenceLeftMesh.position.set(-2.5, 0.5, -25);
        this.fenceLeftMesh.scale.set(50, 1, 1);
        this.fenceLeftMesh.rotation.y = -Math.PI * 0.5;

        this.fenceRightMesh.receiveShadow = true;
        this.fenceLeftMesh.receiveShadow = true;
    }

    update()
    {
        this.groundMesh.material.map.offset.y += this.game.getSpeed() * 2;
        this.groundMesh.position.z -= this.game.getSpeed();

        this.fenceRightMesh.material.map.offset.x -= this.game.getSpeed();
        this.fenceRightMesh.position.z -= this.game.getSpeed();

        this.fenceLeftMesh.position.z -= this.game.getSpeed();
    }

    addToGame()
    {
        this.game.add(this.groundMesh);
        this.game.add(this.fenceRightMesh);
        this.game.add(this.fenceLeftMesh);
    }
}

export default Ground;