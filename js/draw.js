function normalizeMerchantArgs(a, rx, ry) {
	var ve = (a.y0 + a.alpha0 * a.x1 + a.y8 - a.alpha8 * a.x9) / 2; // vertical_error
	var vm = 2 * ry / (a.y0 + a.alpha0 * a.x1 - a.y8 + a.alpha8 * a.x9); // vertical_multiplier
	var hm = rx / a.x3; // horizontal_multiplier
	return {
		x1: a.x1 * hm,
		x3: a.x3 * hm,
		x3b: a.x3b * hm,
		x5: a.x5 * hm,
		x7: a.x7 * hm,
		x9: a.x9 * hm,
		y0: (a.y0 - ve) * vm,
		y2: (a.y2 - ve) * vm,
		y4: (a.y4 - ve) * vm,
		y6: (a.y6 - ve) * vm,
		y8: (a.y8 - ve) * vm,
		alpha0: a.alpha0,
		alpha2: a.alpha2,
		alpha6: a.alpha6,
		alpha8: a.alpha8,
		bezier: a.bezier * vm
	};
}

var r = 30;
var r3 = r * Math.sqrt(3);
var numberOfColumns = 17;
var numberOfRows = 12;
var largeur = (numberOfColumns + 1) * 1.5 * r;
var hauteur = (numberOfRows + 1) * r3;

var merchantArgs = normalizeMerchantArgs({
	x1: .23,
	x3: .475,
	x3b: .46,
	x5: .23,
	x7: .325,
	x9: .25,
	y0: .5,
	y2: -.115,
	y4: -.19,
	y6: -.325,
	y8: -.375,
	alpha0: .325,
	alpha2: .325,
	alpha6: .20,
	alpha8: .15,
	bezier: .25
}, r*.45, r*.6);

var svgElmt = createSVG("main", largeur, hauteur, "Fond du plateau de Babylonia.");
var defs = createDefs();
defs.appendChild(createHexagon("hex", r));
defs.appendChild(createEmptyToken("empty", r));
defs.appendChild(createPriest("priest", r));
defs.appendChild(createPriestToken("priestToken"));
defs.appendChild(createMerchant("merchant", merchantArgs));
defs.appendChild(createMerchantToken("merchantToken"));
svgElmt.appendChild(defs);

var grid = document.createElementNS(xmlns, "g");
grid.setAttributeNS(null, "id", "grid");
svgElmt.appendChild(grid);

var tokens = document.createElementNS(xmlns, "g");
tokens.setAttributeNS(null, "id", "tokens");
svgElmt.appendChild(tokens);


var x0 = 1.5 * r;
var y0 = r3;

function addUse(e, x, y, id, className) { e.appendChild(createUse(x0 + 1.5*x*r, y0 + y*r3 + x*.5*r3, id, className)); }
function addHex(x, y, className) { addUse(grid, x, y, "#hex", className); }
function addPriestToken(x, y, className) { addUse(tokens, x, y, "#priestToken", className); }

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
addPriestToken(0, 1, "whiteplayer");
addPriestToken(1, 0, "cyanplayer");
addPriestToken(1, 2, "yellowplayer");
addUse(tokens, 0, 2, "#merchantToken", "whiteplayer");
addUse(tokens, 0, 4, "#merchantToken", "yellowplayer");
addUse(tokens, 3, 1, "#merchantToken", "cyanplayer");
addUse(tokens, 2, 0, "#empty", "cyanplayer");
addUse(tokens, 2, 1, "#empty", "yellowplayer");
addUse(tokens, 2, 2, "#empty", "whiteplayer");



svgElmt.style.display = "block";
document.getElementById("jesus").appendChild(svgElmt);
