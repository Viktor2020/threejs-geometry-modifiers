import { Vector3 } from './Vector3';

export class Matrix4 {

	public n11: number;
	public n12: number;
	public n13: number;
	public n14: number;
	public n21: number;
	public n22: number;
	public n23: number;
	public n24: number;
	public n31: number;
	public n32: number;
	public n33: number;
	public n34: number;
	public n41: number;
	public n42: number;
	public n43: number;
	public n44: number;

	constructor(
		pn11: number = 1, pn12: number = 0, pn13: number = 0, pn14: number = 0,
		pn21: number = 0, pn22: number = 1, pn23: number = 0, pn24: number = 0,
		pn31: number = 0, pn32: number = 0, pn33: number = 1, pn34: number = 0,
		pn41: number = 0, pn42: number = 0, pn43: number = 0, pn44: number = 1) {
		this.n11 = pn11;
		this.n12 = pn12;
		this.n13 = pn13;
		this.n14 = pn14;
		this.n21 = pn21;
		this.n22 = pn22;
		this.n23 = pn23;
		this.n24 = pn24;
		this.n31 = pn31;
		this.n32 = pn32;
		this.n33 = pn33;
		this.n34 = pn34;
		this.n41 = pn41;
		this.n42 = pn42;
		this.n43 = pn43;
		this.n44 = pn44;
	}

	public static translationMatrix(x: number, y: number, z: number): Matrix4 {
		var m: Matrix4 = new Matrix4();
		m.n14 = x;
		m.n24 = y;
		m.n34 = z;
		return m;
	}

	public static scaleMatrix(x: number, y: number, z: number): Matrix4 {
		var m: Matrix4 = new Matrix4();
		m.n11 = x;
		m.n22 = y;
		m.n33 = z;
		return m;
	}

	public static rotationMatrix(x: number, y: number, z: number, rad: number, targetmatrix: Matrix4 = null): Matrix4 {

		var m: Matrix4;
		if (!targetmatrix) m = new Matrix4();
		else m = targetmatrix;

		var nCos: number = Math.cos(rad);
		var nSin: number = Math.sin(rad);
		var scos: number = 1 - nCos;

		var sxy: number = x * y * scos;
		var syz: number = y * z * scos;
		var sxz: number = x * z * scos;
		var sz: number = nSin * z;
		var sy: number = nSin * y;
		var sx: number = nSin * x;

		m.n11 = nCos + x * x * scos;
		m.n12 = -sz + sxy;
		m.n13 = sy + sxz;
		m.n14 = 0;

		m.n21 = sz + sxy;
		m.n22 = nCos + y * y * scos;
		m.n23 = -sx + syz;
		m.n24 = 0;

		m.n31 = -sy + sxz;
		m.n32 = sx + syz;
		m.n33 = nCos + z * z * scos;
		m.n34 = 0;

		return m;
	}

	public calculateMultiply(a: Matrix4, b: Matrix4): void {
		var a11: number = a.n11;
		var b11: number = b.n11;
		var a21: number = a.n21;
		var b21: number = b.n21;
		var a31: number = a.n31;
		var b31: number = b.n31;
		var a12: number = a.n12;
		var b12: number = b.n12;
		var a22: number = a.n22;
		var b22: number = b.n22;
		var a32: number = a.n32;
		var b32: number = b.n32;
		var a13: number = a.n13;
		var b13: number = b.n13;
		var a23: number = a.n23;
		var b23: number = b.n23;
		var a33: number = a.n33;
		var b33: number = b.n33;
		var a14: number = a.n14;
		var b14: number = b.n14;
		var a24: number = a.n24;
		var b24: number = b.n24;
		var a34: number = a.n34;
		var b34: number = b.n34;

		this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
		this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
		this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
		this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

		this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
		this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
		this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
		this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

		this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
		this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
		this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
		this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
	}

	public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
		var m: Matrix4 = new Matrix4();
		m.calculateMultiply(a, b);
		return m;
	}

	public static multiplyVector(m: Matrix4, v: Vector3): void {
		var vx: number = v.x;
		var vy: number = v.y;
		var vz: number = v.z;

		v.x = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
		v.y = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
		v.z = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
	}
}