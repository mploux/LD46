import * as THREE from "three";

class Camera {
    constructor(fov, near, far, renderer) {
        this.renderer = renderer;
        this.fov = fov;
        this.aspect = renderer.getWidth() / renderer.getHeight();
        this.near = near;
        this.far = far;

        this.camera = new THREE.PerspectiveCamera(
            this.fov, this.aspect, this.near, this.far
        );

        this.listener = new THREE.AudioListener();
        this.camera.add(this.listener);

        // var sound = new THREE.Audio(this.listener);

        // var audioLoader = new THREE.AudioLoader();

        // //Load a sound and set it as the Audio object's buffer
        // audioLoader.load(require("../../assets/sounds/main_theme.mp3"), function( buffer ) {
        //     sound.setBuffer( buffer );
        //     sound.setLoop(true);
        //     sound.setVolume(0.01);
        //     sound.play();
        // }, undefined, undefined);
    }

    update()
    {
        // this.camera.aspect = this.renderer.getWidth() / this.renderer.getHeight();
        // this.camera.updateProjectionMatrix();
    }

    getCamera() {
        return this.camera;
    }

    getPosition() {
        return this.camera.position;
    }

    getRotation() {
        return this.camera.rotation;
    }

    getFov() {
        return this.fov;
    }

    getAspect() {
        return this.aspect;
    }

    getNear() {
        return this.near;
    }

    getFar() {
        return this.far;
    }

    getListener() {
        return this.listener;
    }
}

export default Camera;