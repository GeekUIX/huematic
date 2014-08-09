/* global PalletteFactory */
/* jshint node: true */

function getRandom() {
	return parseInt(Math.random() * 256);
}

function normalize(rgb) {
	for (var i in rgb) {
		var color = rgb[i];
		color = parseInt(color);
		color = (color > 255) ? 255 : color;
		color = (color < 0) ? 0 : color;

		rgb[i] = color;
	}
	return rgb;
}

function PalletteFactory() {}

PalletteFactory.prototype.randomized = function (rgbVal, noOfColors) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/

	function generate() {
		var red = getRandom();
		var green = getRandom();
		var blue = getRandom();

		// mix colors
		if (rgbVal !== null) {
			red = parseInt((red + rgbVal.r) / 2);
			green = parseInt((green + rgbVal.g) / 2);
			blue = parseInt((blue + rgbVal.b) / 2);
		}
		return {
			r: red,
			g: green,
			b: blue
		};
	}
	var results = [];

	noOfColors = noOfColors || 5;

	for (var i = 0; i < noOfColors; i++) {
		var n = generate();
		results.push(n);
	}

	results.unshift({
		r: rgbVal.r,
		b: rgbVal.b,
		g: rgbVal.g
	});
	return results;
};

PalletteFactory.prototype.average = function (rgbVal) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/
	var red, green, blue,
		cmix = {
			r: 216,
			g: 116,
			b: 95
		};

	red = cmix.r;
	green = cmix.g;
	blue = cmix.b;

	// mix colors
	if (rgbVal !== null) {
		red = parseInt((red + rgbVal.r) / 2);
		green = parseInt((green + rgbVal.g) / 2);
		blue = parseInt((blue + rgbVal.b) / 2);
	}

	return [{
		r: rgbVal.r,
		g: rgbVal.g,
		b: rgbVal.b
	}, {
		r: red,
		g: green,
		b: blue
	}];
};

PalletteFactory.prototype.complementary = function (rgb) {
	var red = rgb.r;
	var green = rgb.g;
	var blue = rgb.b;

	return [{
			r: rgb.r,
			g: rgb.g,
			b: rgb.b
		},
		{
			r: 255 - red,
			g: 255 - green,
			b: 255 - blue
        }];
};

PalletteFactory.prototype.triad = function (rgbVal) {
};

PalletteFactory.prototype.tetrad = function (rgbVal) {

};

PalletteFactory.prototype.analogous = function (rgbVal) {

};

PalletteFactory.prototype.monochromatic = function (rgb, num_col) {
	var red = rgb.r;
	var green = rgb.g;
	var blue = rgb.b;

	num_col = num_col || 5;

	var step = 255 / (num_col + 1);

	var color_arr = [{
		r: rgb.r,
		g: rgb.g,
		b: rgb.b
	}];
	var i;

	for (i = 1; i <= num_col / 2; i++) {
		if (red > 255 || green > 255 || blue > 255)
			break;

		red = red + step;
		green = green + step;
		blue = blue + step;



		color_arr.push(normalize({
			r: red,
			g: green,
			b: blue
		}));
	}

	red = rgb.r;
	green = rgb.g;
	blue = rgb.b;

	var itr = (num_col % 2) === 0 ? parseInt(num_col - num_col / 2) : parseInt(num_col - num_col / 2) + 1;

	for (i = 1; i <= itr; i++) {
		if (red < 0 || green < 0 || blue < 0)
			break;

		red = red - step;
		green = green - step;
		blue = blue - step;

		color_arr.push(normalize({
			r: red,
			g: green,
			b: blue
		}));
	}

	return color_arr;
};

var p = new PalletteFactory();
