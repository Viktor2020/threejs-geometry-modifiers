import {IVector3} from './IVector3';
import {VertexProxy} from '../core/VertexProxy';

class VertexArray implements IVector3{

    readonly index: number;
    readonly arr: Array<number>;

    constructor (index: number, arr: Array<number>) {
        this.index = index;
        this.arr = arr;
    }

    public get x(): number {
        return this.arr[this.index];
    }

    public get y(): number {
        return this.arr[this.index + 1];
    }

    public get z(): number {
        return this.arr[this.index + 2];
    }

    public set x(v: number) {
        this.arr[this.index] = v;
    }

    public set y(v: number) {
        this.arr[this.index + 1] = v;
    }

    public set z(v: number) {
        this.arr[this.index + 2] = v;
    }

}

export class ThreeVertex extends VertexProxy {

    private vertor: IVector3;

    constructor() {
        super();
    }

    public setArrIndex(index: number, arr: any[]) {
        this.vertor = new VertexArray(index, arr);
        this.ox = this.vertor.x;
        this.oy = this.vertor.y;
        this.oz = this.vertor.z;
    }

    public setVertex(vertor: any): void {
        this.vertor = <IVector3>vertor;
        this.ox = this.vertor.x;
        this.oy = this.vertor.y;
        this.oz = this.vertor.z;
    }

    public get x(): number {
        return this.vertor.x;
    }

    public get y(): number {
        return this.vertor.y;
    }

    public get z(): number {
        return this.vertor.z;
    }

    public set x(v: number) {
        this.vertor.x = v;
    }

    public set y(v: number) {
        this.vertor.y = v;
    }

    public set z(v: number) {
        this.vertor.z = v;
    }
}