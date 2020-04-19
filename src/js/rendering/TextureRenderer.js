import * as THREE from "three";
import { Vector2 } from "three";

class TextureRenderer
{
    constructor(width, height, staticTexture, size = new THREE.Vector2(1, 1))
    {
        this.width = width;
        this.height = height;

        var geometry = new THREE.BoxGeometry(width, height, 0.1);
        var material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});

        let texture = staticTexture.clone();
        this.sheetSize = size;

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.repeat.set(1 / this.sheetSize.x, 1 / this.sheetSize.y);

        texture.needsUpdate = true;
        material.map = texture;
        material.alphaTest = 1;

        const emptyFace = new THREE.Vector2(0, 0);

        geometry.faceVertexUvs[0][0] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][1] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][2] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][3] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][4] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][5] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][7] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][6] = [ emptyFace, emptyFace, emptyFace ];
        // geometry.faceVertexUvs[0][8] = [ emptyFace, emptyFace, emptyFace ];
        // geometry.faceVertexUvs[0][9] = [ emptyFace, emptyFace, emptyFace ];

        geometry.faceVertexUvs[0][10] = [ emptyFace, emptyFace, emptyFace ];
        geometry.faceVertexUvs[0][11] = [ emptyFace, emptyFace, emptyFace ];

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        
        this.meshShadow = new THREE.Mesh(geometry, material);
        this.meshShadow.castShadow = true;
        this.mesh.receiveShadow = true;

        this.meshShadow.customDepthMaterial = new THREE.MeshDepthMaterial( {
            depthPacking: THREE.RGBADepthPacking,
            map: texture,
            alphaTest: 0.5
        } );
    }

    setPosition(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;

        this.mesh.position.set(x, y + this.height * 0.5, z);
        this.meshShadow.position.set(x, y + this.height * 0.5, z - 0.01);
    }

    getMesh()
    {
        return this.mesh;
    }

    getMeshShadow()
    {
        return this.meshShadow;
    }

    setTextureOffset(xoffs, yoffs)
    {
        const xx = xoffs / this.sheetSize.x;
        const yy = yoffs === 0 ? 0 : 1 - yoffs / this.sheetSize.y;

        this.mesh.material.map.offset.set(xx, yy);
        this.meshShadow.material.map.offset.set(xx, yy);
    }
}

export default TextureRenderer;