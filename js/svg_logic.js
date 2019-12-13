var xmlns = "http://www.w3.org/2000/svg";
var d = 1;

function createSVG(id, largeur, hauteur, title) {
	var svgElmt = document.createElementNS(xmlns, "svg");
	svgElmt.setAttributeNS(null, "width",  largeur+2*d);
	svgElmt.setAttributeNS(null, "height", hauteur+2*d);
	svgElmt.setAttributeNS(null, "id",     id);

	var t = document.createElementNS(xmlns, "title");
	t.appendChild(document.createTextNode(title));
	svgElmt.appendChild(t);

	return svgElmt;
}

function createDefs() {
	return document.createElementNS(xmlns, "defs");
}

function createHexagon(id, r) {
	var r3 = r * Math.sqrt(3);

	var pts_interne = [
		[-.5*r, .5*r3 ].join(" "),
		[.5*r,  .5*r3 ].join(" "),
		[r,     0     ].join(" "),
		[.5*r,  -.5*r3].join(" "),
		[-.5*r, -.5*r3].join(" "),
		[-r,    0     ].join(" ")
	];

	var path_interne = document.createElementNS(xmlns, "path");
	path_interne.setAttributeNS(null, "d", "M" + pts_interne.join(" L") + " Z");

	var g = document.createElementNS(xmlns, "g");
	g.setAttributeNS(null, "id", id);

	g.appendChild(path_interne);
	return g;
}

function createPriestToken(id, r) {

	var outercircle = document.createElementNS(xmlns, "circle");
	outercircle.setAttributeNS(null, "r", r*.75);
	outercircle.setAttributeNS(null, "x", 0);
	outercircle.setAttributeNS(null, "y", 0);
	outercircle.setAttributeNS(null, "class", "tokenoutercircle");

	var middlecircle = document.createElementNS(xmlns, "circle");
	middlecircle.setAttributeNS(null, "r", r*.25);
	middlecircle.setAttributeNS(null, "x", 0);
	middlecircle.setAttributeNS(null, "y", 0);
	middlecircle.setAttributeNS(null, "class", "tokenmiddlecircle");

	var innercircle = document.createElementNS(xmlns, "circle");
	innercircle.setAttributeNS(null, "r", r*.125);
	innercircle.setAttributeNS(null, "x", 0);
	innercircle.setAttributeNS(null, "y", 0);
	innercircle.setAttributeNS(null, "class", "tokeninnercircle");

	var centralpoint = document.createElementNS(xmlns, "circle");
	centralpoint.setAttributeNS(null, "r", r*.0625);
	centralpoint.setAttributeNS(null, "x", 0);
	centralpoint.setAttributeNS(null, "y", 0);
	centralpoint.setAttributeNS(null, "class", "tokencentralpoint");


	var g = document.createElementNS(xmlns, "g");
	g.setAttributeNS(null, "id", id);
	g.appendChild(outercircle);
	g.appendChild(middlecircle);
	g.appendChild(innercircle);
	g.appendChild(centralpoint);
	return g;
}

function createUse(x, y, href, className) {
	var u = document.createElementNS(xmlns, "use");
	u.setAttributeNS(null, "x", x);
	u.setAttributeNS(null, "y", y);
	u.setAttributeNS(null, "href", href);
	u.setAttributeNS(null, "class", className);
	return u;
}
