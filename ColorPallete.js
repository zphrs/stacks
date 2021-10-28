import Square from "./Square.js"
export default class ColorPallete {
	constructor(x, y, dimensions) {
		this.x = x;
		this.y = y;
		this.dimensions = dimensions;
		this.squares = [];
		this.maxSide = Math.max(dimensions.width, dimensions.height);
		const side = maxSide/dimensions.gridCt;
		const widthSquareCt = dimensions.width/side;
		const heightSquareCt = dimensions.height/side;
		for (var i = 0; i<widthSquareCt; i++) {
			for (var j = 0; j<heightSquareCt; j++) {
				this.squares.push(new Square(i, j, 255, 255, 255, 255));
			}
		}
	}
	resizeGrid() {
		let maxSide = Math.max(dimensions.width, dimensions.height);
		const side = maxSide/dimensions.gridCt;
		const widthSquareCt = dimensions.width/side;
		const heightSquareCt = dimensions.height/side;
		for (var i = 0; i<widthSquareCt; i++) {
			for (var j = 0; j<heightSquareCt; j++) {
				this.squares[i][j].draw(ctx, Math.max(dimensions.width, dimensions.height));
			}
		}
	}
	draw(ctx) {
		console.log('drawing')
		ctx.fillStyle = "gray";
		ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
		// set stroke width
		ctx.lineWidth = 1;
		for (var i = 0; i<this.squares.length; i++) {
			for (var j = 0; j<this.squares[i].length; j++) {
				this.squares[i][j].draw(ctx, Math.max(dimensions.width, dimensions.height));
			}
		}
	}
	setSquareColor(i, j, color, ctx) {
		this.squares[i][j].color = color;
		this.squares[i][j].draw(ctx, Math.max(dimensions.width, dimensions.height));
	}

	getTile(x, y) {
		return this.squares[Math.floor(x)][Math.floor(y)];
	}
}