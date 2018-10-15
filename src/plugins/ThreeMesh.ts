import {IMesh, IGeometry} from './IMesh';
import {IVector3} from './IVector3';
import {ThreeVertex} from './ThreeVertex';

import {MeshProxy} from '../core/MeshProxy';
import {FaceProxy} from '../core/FaceProxy';

import {Vector3} from '../math/Vector3';
import {Dictionary} from '../util/Dictionary';

declare var THREE: any;

export class ThreeMesh extends MeshProxy {

    private mesh: IMesh;

    public uvsAndColorUpdate: boolean = false;

    public setMesh(mesh: any): void {
        this.mesh = <IMesh>mesh;

        let geometry: IGeometry = this.mesh.geometry;

        if (this.mesh.geometry.attributes) {

            let array = geometry.attributes.position.array;
            let len = array.length;
            for (let i = 0; i < len - 2; i += 3) {
                let vector: ThreeVertex = new ThreeVertex();
                vector.setArrIndex(i, array);
                this.vertices.push(vector);
            }

            if (!geometry.index) {
                // todo проверить правильность не индексированой гермерии
                for (let i = 0; i < len - 2; i += 3) {
                    let vertexA = this.vertices[i];
                    let vertexB = this.vertices[i + 1];
                    let vertexC = this.vertices[i + 2];

                    let face: FaceProxy = new FaceProxy();
                    face.addVertex(vertexA);
                    face.addVertex(vertexB);
                    face.addVertex(vertexC);
                    this.faces.push(face);
                }

            } else {

                array = geometry.index.array;
                len = array.length;
                for (let i = 0; i < len - 2; i += 3) {
                    let vertexA = this.vertices[array[i]];
                    let vertexB = this.vertices[array[i + 1]];
                    let vertexC = this.vertices[array[i + 2]];

                    let face: FaceProxy = new FaceProxy();
                    face.addVertex(vertexA);
                    face.addVertex(vertexB);
                    face.addVertex(vertexC);
                    this.faces.push(face);
                }
            }

        } else {

            let lookUp: Dictionary = new Dictionary();
            let vertices: any[] = geometry.vertices;
            let verticesLength: number = vertices.length;
            let faces: any[] = geometry.faces;
            let facesLength: number = faces.length;

            for (let i: number = 0; i < verticesLength; i++) {
                let vector: ThreeVertex = new ThreeVertex();
                vector.setVertex(<IVector3>vertices[i]);
                this.vertices.push(vector);
                lookUp.setVal(vertices[i], vector);
            }

            for (let i: number = 0; i < facesLength; i++) {
                let face: FaceProxy = new FaceProxy();
                let v0: IVector3 = vertices[faces[i].a];
                let v1: IVector3 = vertices[faces[i].b];
                let v2: IVector3 = vertices[faces[i].c];

                face.addVertex(lookUp.getVal(v0));
                face.addVertex(lookUp.getVal(v1));
                face.addVertex(lookUp.getVal(v2));
                this.faces.push(face);
            }
        }

    }

    public postApply(): void {
        if (this.mesh.geometry.attributes) {
            this.mesh.geometry.attributes.position.needsUpdate = true;
        }
        let geometry: IGeometry = this.mesh.geometry;
        geometry.verticesNeedUpdate = true;
        geometry.normalsNeedUpdate = true;


        if (this.uvsAndColorUpdate) {
            try {
                geometry.colorsNeedUpdate = true;
                geometry.uvsNeedUpdate = true;
                geometry.groupsNeedUpdate = true;
                geometry.elementsNeedUpdate = true;
                geometry.lineDistancesNeedUpdate = true;
            } catch (e) {

            }
        }
    }


    public updateMeshPosition(p: Vector3): void {
        this.mesh.position.x += p.x;
        this.mesh.position.y += p.y;
        this.mesh.position.z += p.z;
    }
}