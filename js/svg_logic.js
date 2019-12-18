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

	var outerr = r*.75;
	var middler = r*.25;
	var innerr = r*.15625;
	var centralr = r*.0625;
	var starr = r*(.6875);
	var middler2 = middler/Math.sqrt(2);

	var outercircle = document.createElementNS(xmlns, "circle");
	outercircle.setAttributeNS(null, "r", outerr);
	outercircle.setAttributeNS(null, "x", 0);
	outercircle.setAttributeNS(null, "y", 0);
	outercircle.setAttributeNS(null, "class", "tokenoutercircle");

	var middlecircle = document.createElementNS(xmlns, "circle");
	middlecircle.setAttributeNS(null, "r", middler);
	middlecircle.setAttributeNS(null, "x", 0);
	middlecircle.setAttributeNS(null, "y", 0);
	middlecircle.setAttributeNS(null, "class", "tokenmiddlecircle");

	var innercircle = document.createElementNS(xmlns, "circle");
	innercircle.setAttributeNS(null, "r", innerr);
	innercircle.setAttributeNS(null, "x", 0);
	innercircle.setAttributeNS(null, "y", 0);
	innercircle.setAttributeNS(null, "class", "tokeninnercircle");

	var centralpoint = document.createElementNS(xmlns, "circle");
	centralpoint.setAttributeNS(null, "r", centralr);
	centralpoint.setAttributeNS(null, "x", 0);
	centralpoint.setAttributeNS(null, "y", 0);
	centralpoint.setAttributeNS(null, "class", "tokencentralpoint");

	function rightstar(_starr, _middler2) {
		return [
			[0         , -_starr   ].join(" "),
			[_middler2 , -_middler2].join(" "),
			[_starr    , 0         ].join(" "),
			[_middler2 , _middler2 ].join(" "),
			[0         , +_starr   ].join(" "),
			[-_middler2, _middler2 ].join(" "),
			[-_starr   , 0         ].join(" "),
			[-_middler2, -_middler2].join(" "),
		];
	}

	var path_rightstar = document.createElementNS(xmlns, "path");
	path_rightstar.setAttributeNS(null, "d", "M" + rightstar(starr, middler2).join(" L") + " Z");
	path_rightstar.setAttributeNS(null, "class", "tokenouterrightstar");

	var path_negrightstar = document.createElementNS(xmlns, "path");
	path_negrightstar.setAttributeNS(null, "d", "M" + rightstar(starr*.725, middler2*.725).join(" L") + " Z");
	path_negrightstar.setAttributeNS(null, "class", "tokennegrightstar");

	var path_outeroddstar = document.createElementNS(xmlns, "path");
	path_outeroddstar.setAttributeNS(null, "d", "M" + rightstar(starr, middler2).join(" L") + " Z");
	path_outeroddstar.setAttributeNS(null, "class", "tokenouteroddstar");
	path_outeroddstar.setAttributeNS(null, "transform", "rotate(45)");

	var path_whiteoddstar = document.createElementNS(xmlns, "path");
	path_whiteoddstar.setAttributeNS(null, "d", "M" + rightstar(starr*.75, middler2*.75).join(" L") + " Z");
	path_whiteoddstar.setAttributeNS(null, "class", "tokenwhiteoddstar");
	path_whiteoddstar.setAttributeNS(null, "transform", "rotate(45)");

	var path_inneroddstar = document.createElementNS(xmlns, "path");
	path_inneroddstar.setAttributeNS(null, "d", "M" + rightstar(starr*.625, middler2*.625).join(" L") + " Z");
	path_inneroddstar.setAttributeNS(null, "class", "tokeninneroddstar");
	path_inneroddstar.setAttributeNS(null, "transform", "rotate(45)");

	var g = document.createElementNS(xmlns, "g");
	g.setAttributeNS(null, "id", id);
	g.appendChild(outercircle);
	g.appendChild(path_outeroddstar);
	g.appendChild(path_whiteoddstar);
	g.appendChild(path_inneroddstar);
	g.appendChild(path_rightstar);
	g.appendChild(path_negrightstar);
	g.appendChild(middlecircle);
	g.appendChild(innercircle);
	g.appendChild(centralpoint);
	return g;
}


// arguments :
// x1, x3, x5, x7, x9, y0, y2, y4, y6, y8, alpha0, alpha2, alpha6, alpha8, bezier
function createMerchantToken(id, a) {

	var outercircle = document.createElementNS(xmlns, "circle");
	outercircle.setAttributeNS(null, "r", a.rdisk);
	outercircle.setAttributeNS(null, "x", 0);
	outercircle.setAttributeNS(null, "y", 0);
	outercircle.setAttributeNS(null, "class", "tokenoutercircle");

	var path = "M " + (-a.x1) + " " + a.y0 + " ";
	path += "A 1 " + a.alpha0 + " 0 1 0 " + a.x1 + " " + a.y0 + " ";
	path += "Q " + a.x1 + " " + ((a.y2+a.y0)*.5+a.bezier) + " "  + ((a.x1+a.x3)*.5) + " " + ((a.y2+a.y0)*.5) + " ";
	path += "T " + a.x3 + " " + a.y2 + " ";
	path += "L " + a.x5 + " " + a.y4 + " ";
	path += "L " + a.x5 + " " + a.y6 + " ";
	path += "L " + (-a.x5) + " " + a.y6 + " ";
	path += "L " + (-a.x5) + " " + a.y4 + " ";
	path += "L " + (-a.x3) + " " + a.y2 + " ";
	path += "Q " + (-a.x3) + " " + ((a.y2+a.y0)*.5-a.bezier) + " "  + (-(a.x1+a.x3)*.5) + " " + ((a.y2+a.y0)*.5) + " ";
	path += "T " + (-a.x1) + " " + a.y0 + " ";
	path += "Z";

	var path_body = document.createElementNS(xmlns, "path");
	path_body.setAttributeNS(null, "d", path);
	path_body.setAttributeNS(null, "class", "tokenbodymerchant");

	path = "M " + a.x7 + " " + a.y6 + " ";
	path += "L " + a.x9 + " " + a.y8 + " ";
	path += "A 1 " + a.alpha8 + " 0 1 0 " + (-a.x9) + " " + a.y8 + " ";
	path += "L " + (-a.x7) + " " + a.y6 + " ";
	path += "A 1 " + a.alpha6 + " 0 1 0 " + a.x7 + " " + a.y6 + " ";
	path += "Z";

	var path_hat = document.createElementNS(xmlns, "path");
	path_hat.setAttributeNS(null, "d", path);
	path_hat.setAttributeNS(null, "class", "tokenhatmerchant");

	path = "M " + a.x3b + " " + a.y2 + " ";
	path += "A 1 " + a.alpha2 + " 0 1 1 " + (-a.x3b) + " " + a.y2 + " ";

	var path_frontier = document.createElementNS(xmlns, "path");
	path_frontier.setAttributeNS(null, "d", path);
	path_frontier.setAttributeNS(null, "class", "tokenfrontiermerchant");

	var g = document.createElementNS(xmlns, "g");
	g.setAttributeNS(null, "id", id);
	g.appendChild(outercircle);
	g.appendChild(path_body);
	g.appendChild(path_hat);
	g.appendChild(path_frontier);
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
