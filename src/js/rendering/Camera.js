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
    }

    onResize()
    {
        console.log("Resize");
        this.camera.aspect = this.renderer.getWidth() / this.renderer.getHeight();
        this.camera.updateProjectionMatrix();
    }

    update()
    {
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