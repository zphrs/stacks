import Grid from "./Grid.js"

console.log("Hello World!");
window.onload = function() {
	let canvas = document.querySelector("#grid");
	let ctx = canvas.getContext("2d");
	let minSide = Math.min(window.innerWidth, window.innerHeight);
	let dimensions = {
		width: canvas.width = minSide,
		height: canvas.height = minSide,
		gridCt: 16,
		minSide: minSide
	};
	let grid = new Grid(0, 0, dimensions);
	grid.draw(ctx);

	let paletteCanvas = document.querySelector("#colors");
	let paletteDimensions = {
		width: paletteCanvas.width,
		height: paletteCanvas.height,
		gridCt: 6,
		minSide: Math.min(paletteCanvas.width, paletteCanvas.height)
	}
	let palette = new Grid(0, 0, paletteDimensions);

	// generate colors for palette
	let colors = [];
	for (let i = 0; i < paletteDimensions.gridCt**2; i++) {
		let color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
		colors.push(color);
	}
	// set colors for palette
	palette.setColors(colors);
	palette.draw(paletteCanvas.getContext("2d"));

	let currentColor = [0, 0, 255];
	let onUp = (event)=>{
		mouse.down = true;
		setMousePos(event);
		setPaletteMousePos(event);
		// check if mouse is over a grid
		let tile = grid.getTile(mouse.x/dimensions.minSide*dimensions.gridCt, mouse.y/dimensions.minSide*dimensions.gridCt);
		if(tile) {
			console.log(tile);
			grid.setSquareColor(tile.x, tile.y, currentColor, ctx);
		}
		console.log(paletteMouse.x, paletteMouse.y);
		let paletteTile = palette.getTile(paletteMouse.x/paletteDimensions.width*paletteDimensions.gridCt, paletteMouse.y/paletteDimensions.height*3);
		if (paletteTile) {
			currentColor = paletteTile.color;
			console.log(currentColor);
		}
	}
	let mouse = {
		x: dimensions.width/2,
		y: dimensions.height/2,
		down: false
	}
	let paletteMouse = {
		x: paletteDimensions.width/2,
		y: paletteDimensions.height/2,
		down: false
	}
	document.addEventListener("pointermove", (event)=>{
		setMousePos(event);
		setPaletteMousePos(event);
	})
	document.addEventListener("pointerdown", e=>{
		mouse.down = true;
		setMousePos(e);
		setPaletteMousePos(e);
	})
	function setMousePos(e) {
		let rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	}

	function setPaletteMousePos(e) {
		let rect = paletteCanvas.getBoundingClientRect();
		paletteMouse.x = e.clientX - rect.left;
		paletteMouse.y = e.clientY - rect.top;
	}
	document.addEventListener("pointerup", onUp)
	window.addEventListener("resize", ()=>{
		dimensions.minSide = Math.min(window.innerWidth, window.innerHeight);
		dimensions.width = canvas.width = dimensions.minSide;
		dimensions.height = canvas.height = dimensions.minSide;
		grid.draw(ctx);
	})

	document.getElementById("undo")
	.addEventListener("click", ()=>{
		grid.undo(ctx);
	})

	document.getElementById("redo")
	.addEventListener("click", ()=>{
		grid.redo(ctx);
	})
}

