import Square from "./Square.js"
import Stack from "./Stack.js"
export default class Grid {
	constructor(x, y, dimensions) {
		this.x = x;
		this.y = y;
		this.dimensions = dimensions;
		this.squares = [];
		this.changes = new Stack();
		this.undos = new Stack();
		for(var i = 0; i<this.dimensions.gridCt; i++) {
			this.squares[i] = [];
			for(var j = 0; j<this.dimensions.gridCt; j++) {
				this.squares[i][j] = new Square(i, j, 255, 255, 255, 1);
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
				this.squares[i][j].draw(ctx, this.dimensions.width/this.dimensions.gridCt);
			}
		}
	}
	setSquareColor(i, j, color, ctx) {
		this.changes.push(this.squares[i][j].copy());
		console.log(this.changes);
		this.squares[i][j].color = color;
		this.squares[i][j].draw(ctx, this.dimensions.width/this.dimensions.gridCt);
		this.undos = new Stack();
	}

	undo(ctx) {
		if(!this.changes.empty()) {
			var change = this.changes.pop();
			console.log(change.color);
			this.undos.push(this.squares[change.x][change.y].copy());
			this.squares[change.x][change.y].color = change.color;
			// clear rect only on this square
			ctx.clearRect(this.x + change.x*this.dimensions.width/this.dimensions.gridCt, this.y + change.y*this.dimensions.height/this.dimensions.gridCt, this.dimensions.width/this.dimensions.gridCt, this.dimensions.height/this.dimensions.gridCt);
			this.squares[change.x][change.y].draw(ctx, this.dimensions.width/this.dimensions.gridCt);
		}
		return this.changes.empty();
	}

	redo(ctx) {
		if(!this.undos.empty()) {
			var undo = this.undos.pop();
			this.changes.push(this.squares[undo.x][undo.y].copy());
			this.squares[undo.x][undo.y].color = undo.color;
			this.squares[undo.x][undo.y].draw(ctx, this.dimensions.width/this.dimensions.gridCt);
		}
		return this.undos.empty();
	}

	getTile(x, y) {
		if (x < 0 || x >= this.dimensions.gridCt || y < 0 || y >= this.dimensions.gridCt) {
			return null;
		}
		return this.squares[Math.floor(x)][Math.floor(y)];
	}

	setColors(arr) {
		for(var i = 0; i<this.squares.length; i++) {
			for (var j = 0; j<this.squares[i].length; j++) {
				this.squares[i][j].color = arr[i*arr[i].length+j];
			}
		}
	}

	copy() {
		var newGrid = new Grid(this.x, this.y, this.dimensions);
		for(var i = 0; i<this.squares.length; i++) {
			for (var j = 0; j<this.squares[i].length; j++) {
				newGrid.squares[i][j] = this.squares[i][j].copy();
			}
		}
		return newGrid;
	}
}