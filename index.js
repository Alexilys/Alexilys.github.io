var w = 500;
var h = 800;
var placeholder = 0.0;

var multipliers = {
	DEF:17,
	shld:17,
	dmginc:9,
	dmgdec:6,
	attk_HP_crit_critdmg:1,
	elm_INV:0
}

var DEFvalue1;
var Shldvalue1;
var DmgIncvalue1;
var DmgDecvalue1;
var Atkvalue1;
var HPvalue1;
var CrtRtvalue1;
var CrtDmgvalue1;
var Elmvalue1;
var ElmRESvalue1;
var INVvalue1;

var resultChip1 = 
	DEFvalue1*multipliers.DEF +
	Shldvalue1*multipliers.shld+
	DmgIncvalue1*multipliers.dmginc+
	DmgDecvalue1*multipliers.dmgdec+
	Atkvalue1*multipliers.attk_HP_crit_critdmg+
	HPvalue1*multipliers.attk_HP_crit_critdmg+
	CrtRtvalue1*multipliers.attk_HP_crit_critdmg+
	CrtDmgvalue1*multipliers.attk_HP_crit_critdmg+
	Elmvalue1*multipliers.elm_INV+
	ElmRESvalue1*multipliers.elm_INV+
	INVvalue1*multipliers.elm_INV

var DEFvalue2;
var Shldvalue2;
var DmgIncvalue2;
var DmgDecvalue2;
var Atkvalue2;
var HPvalue2;
var CrtRtvalue2;
var CrtDmgvalue2;
var Elmvalue2;
var ElmRESvalue2;
var INVvalue2;

var resultChip2 = 
	DEFvalue1*multipliers.DEF +
	Shldvalue2*multipliers.shld+
	DmgIncvalue2*multipliers.dmginc+
	DmgDecvalue2*multipliers.dmgdec+
	Atkvalue2*multipliers.attk_HP_crit_critdmg+
	HPvalue2*multipliers.attk_HP_crit_critdmg+
	CrtRtvalue2*multipliers.attk_HP_crit_critdmg+
	CrtDmgvalue2*multipliers.attk_HP_crit_critdmg+
	Elmvalue2*multipliers.elm_INV+
	ElmRESvalue2*multipliers.elm_INV+
	INVvalue2*multipliers.elm_INV

//When you click the button, do this:	
document.getElementById("CalcBtn").onclick = function(){
	
//Call values from chip 1
	DEFvalue1 = document.getElementById("DEFvalue1").value;
	Shldvalue1 = document.getElementById("Shldvalue1").value;
	DmgIncvalue1 = document.getElementById("DmgIncvalue1").value;
	DmgDecvalue1 = document.getElementById("DmgDecvalue1").value;
	Atkvalue1 = document.getElementById("Atkvalue1").value;
	HPvalue1 = document.getElementById("HPvalue1").value;
	CrtRtvalue1 = document.getElementById("CrtRtvalue1").value;
	CrtDmgvalue1 = document.getElementById("CrtDmgvalue1").value;
	Elmvalue1 = document.getElementById("Elmvalue1").value;
	ElmRESvalue1 = document.getElementById("ElmRESvalue1").value;
	INVvalue1 = document.getElementById("INVvalue1").value;

//Call values from chip 2
	DEFvalue2 = document.getElementById("DEFvalue2").value;
	Shldvalue2 = document.getElementById("Shldvalue2").value;
	DmgIncvalue2 = document.getElementById("DmgIncvalue2").value;
	DmgDecvalue2 = document.getElementById("DmgDecvalue2").value;
	Atkvalue2 = document.getElementById("Atkvalue2").value;
	HPvalue2 = document.getElementById("HPvalue2").value;
	CrtRtvalue2 = document.getElementById("CrtRtvalue2").value;
	CrtDmgvalue2 = document.getElementById("CrtDmgvalue2").value;
	Elmvalue2 = document.getElementById("Elmvalue2").value;
	ElmRESvalue2 = document.getElementById("ElmRESvalue2").value;
	INVvalue2 = document.getElementById("INVvalue2").value;
	
//Change the value at the top to match the result
	document.getElementById("resultChip1")
		.textContent = `Chip value: ${resultChip1}`
	document.getElementById("resultChip2")
		.textContent = `Chip value: ${resultChip2}`

	console.log(resultChip1);
	console.log(resultChip2);
}




//canvas is the name of the svg element we defined in the html code
//var canvas = d3.select("#canvas")
		//.append("svg")
		//.attr("width",w)
		//.attr("height",h)
		//.style("background-color","white");












































// var w = 500;
// var h = 500;
// var rad = 20;

// var svg = d3.select("svg")
// 			.attr("width",w)
// 			.attr("height",h);

// var circles = d3.selectAll("circle")
// 				.attr("r", rad)
// 				.attr("cx", w/2)
// 				.attr("cy", h/2);