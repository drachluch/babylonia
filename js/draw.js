
var r = 30;
var r3 = r * Math.sqrt(3);
var hauteur = 700;
var largeur = 850;
var svgElmt = createSVG("main", largeur, hauteur, "Fond du plateau de Babylonia.");
var defs = createDefs();
defs.appendChild(createHexagon("hex", r));
defs.appendChild(createPriestToken("priest", r));
defs.appendChild(createMerchantToken("merchant", r));
svgElmt.appendChild(defs);



var x0 = 2*r;
var y0 = r3;

function addUse(x, y, id, className) { svgElmt.appendChild(createUse(x0 + 1.5*x*r, y0 + y*r3 + x*.5*r3, id, className)); }
function addHex(x, y, className) { addUse(x, y, "#hex", className); }

lands = [
	{x: 0, ymin: 1, ymax: 9},
	{x: 1, y: [{min: 0, max: 6}, {min: 8, max: 10}]},
	{x: 2, y: [{min: 3, max: 6}, {min: 8, max: 10}]},
	{x: 3, y: [{min: 0, max: 1}, {min: 3, max: 6}, {min: 8, max: 9}]},
	{x: 4, y: [{min: -1, max: 1}, {min: 3, max: 6}, {min: 8, max: 9}]},
	{x: 5, y: [{min: -1, max: 1}, {min: 7, max: 8}]},
	{x: 6, ymin: -2, ymax: 8},
	{x: 7, ymin: -3, ymax: 7},
	{x: 8, ymin: -1, ymax: 7},
	{x: 9, y: [{min: -4, max: -3}, {min: -1, max: 2}, 6]},
	{x: 10, y: [{min: -5, max: -3}, {min: 3, max: 4}]},
	{x: 11, ymin: -5, ymax: 5},
	{x: 12, ymin: -5, ymax: 5},
	{x: 13, ymin: -5, ymax: 4},
	{x: 14, ymin: -5, ymax: 4},
	{x: 15, ymin: -4, ymax: 3},
	{x: 16, ymin: -2, ymax: 2},
];
rivers = [
	{x: 0, ymin: 8, ymax: 10},
	{x: 1, y: 7},
	{x: 2, y: [{min: 0, max: 2}, 7]},
	{x: 3, y: [2, 7]},
	{x: 4, y: [2, 7]},
	{x: 5, ymin: 2, ymax: 6},
	{x: 8, ymin: -4, ymax: -2},
	{x: 9, y: [-2, {min: 3, max: 5}]},
	{x: 10, y: [{min: -2, max: 2}, {min: 5, max: 6}]}
];
zigurats = [
	{x: 1, y: 1},
	{x: 2, y: 8},
	{x: 8, y: 2},
	{x: 11, y: -3},
	{x: 14, y: 2}
];
cities = [
	{x: 0, y: [3, 6]},
	{x: 1, y: [4, 10]},
	{x: 2, y: 6},
	{x: 3, y: 0},
	{x: 4, y: [3, 5, 9]},
	{x: 5, y: [1, 7]},
	{x: 6, y: [-1, 3]},
	{x: 7, y: 6},
	{x: 8, y: [-1, 4, 7]},
	{x: 9, y: [-4, 0]},
	{x: 10, y: 4},
	{x: 11, y: 1},
	{x: 12, y: [-5, -2, 2, 5]},
	{x: 13, y: -1},
	{x: 14, y: [-5, 0, 4]},
	{x: 15, y: -4},
	{x: 16, y: [-2, 1]}
];

function drawColumn(x, ys, className) {
	if (typeof ys === "number")
		addHex(x, ys, className);
	else if (typeof ys === "object")
		for (var i = 0, l = ys.length; i < l; i++)
			if (typeof ys[i] === "number")
				addHex(x, ys[i], className);
			else if (typeof ys[i] === "object")
				for (var y = ys[i].min; y <= ys[i].max; y++)
					addHex(x, y, className);
}

function drawBoard(tiles, className) {
	for (var i = 0, l = tiles.length; i < l; i++)
		if (tiles[i].y === undefined)
			for (var y = tiles[i].ymin; y <= tiles[i].ymax; y++)
				addHex(tiles[i].x, y, className);
		else
			drawColumn(tiles[i].x, tiles[i].y, className);
}

drawBoard(lands, "land");
drawBoard(rivers, "river");
drawBoard(zigurats, "zigurat");
drawBoard(cities, "city");
addUse(0, 1, "#priest", "whiteplayer");
addUse(0, 2, "#merchant", "whiteplayer");


svgElmt.style.display = "block";
document.getElementById("jesus").appendChild(svgElmt);
