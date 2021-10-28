export default class Square {
	constructor(x, y, r, g, b, a) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	draw(ctx, size) {
		ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		ctx.beginPath();
		ctx.rect(this.x*size, this.y*size, size, size);
		ctx.fill();
		ctx.stroke();
	}

	/**
	 * @param {any[]} args
	 */
	set color(args) {
		this.r = args[0];
		this.g = args[1];
		this.b = args[2];
		this.a = args[3]??1;
	}

	get color() {
		return [this.r, this.g, this.b, this.a];
	}

	copy() {
		return new Square(this.x, this.y, this.r, this.g, this.b, this.a);
	}
}