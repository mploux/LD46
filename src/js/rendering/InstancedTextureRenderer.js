import * as THREE from "three";

class TextureRenderer
{
    constructor(width, height, texture, count)
    {
        this.width = width;
        this.height = height;

        var geometry = new THREE.PlaneGeometry(width, height);
        var material = new THREE.MeshBasicMaterial();

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

        material.map = texture;
        material.alphaTest = 1;

        this.mesh = new THREE.InstancedMesh(geometry, material, count);
    }

    setPosition(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;

        this.mesh.position.set(x, y + this.height * 0.5, z);
    }

    setMatrixAt(index, matrix)
    {
        this.mesh.setMatrixAt(index, matrix);
    }

    getMesh()
    {
        return this.mesh;
    }
}

export default TextureRenderer;