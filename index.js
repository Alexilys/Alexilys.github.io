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

let var_DEFvalue1 = 0;
let var_Shldvalue1  = 0;
let var_DmgIncvalue1 = 0;
let var_DmgDecvalue1 = 0;
let var_Atkvalue1 = 0;
let var_HPvalue1 = 0;
let var_CrtRtvalue1 = 0;
let var_CrtDmgvalue1 = 0;
let var_Elmvalue1 = 0;
let var_ElmRESvalue1 = 0;
let var_INVvalue1 = 0;

let var_DEFvalue2 = 0;
let var_Shldvalue2 = 0;
let var_DmgIncvalue2 = 0;
let var_DmgDecvalue2 = 0;
let var_Atkvalue2 = 0;
let var_HPvalue2 = 0;
let var_CrtRtvalue2 = 0;
let var_CrtDmgvalue2 = 0;
let var_Elmvalue2 = 0;
let var_ElmRESvalue2 = 0;
let var_INVvalue2 = 0;


//When you click the button, do this:	
document.getElementById("CalcBtn").onclick = function(){
	
//Call values from chip 1
	var_DEFvalue1 = document.getElementById("DEFvalue1").value;
	var_Shldvalue1 = document.getElementById("Shldvalue1").value;
	var_DmgIncvalue1 = document.getElementById("DmgIncvalue1").value;
	var_DmgDecvalue1 = document.getElementById("DmgDecvalue1").value;
	var_Atkvalue1 = document.getElementById("Atkvalue1").value;
	var_HPvalue1 = document.getElementById("HPvalue1").value;
	var_CrtRtvalue1 = document.getElementById("CrtRtvalue1").value;
	var_CrtDmgvalue1 = document.getElementById("CrtDmgvalue1").value;
	var_Elmvalue1 = document.getElementById("Elmvalue1").value;
	var_ElmRESvalue1 = document.getElementById("ElmRESvalue1").value;
	var_INVvalue1 = document.getElementById("INVvalue1").value;

	var resultChip1 = 
	var_DEFvalue1*multipliers.DEF +
	var_Shldvalue1*multipliers.shld+
	var_DmgIncvalue1*multipliers.dmginc+
	var_DmgDecvalue1*multipliers.dmgdec+
	var_Atkvalue1*multipliers.attk_HP_crit_critdmg+
	var_HPvalue1*multipliers.attk_HP_crit_critdmg+
	var_CrtRtvalue1*multipliers.attk_HP_crit_critdmg+
	var_CrtDmgvalue1*multipliers.attk_HP_crit_critdmg+
	var_Elmvalue1*multipliers.elm_INV+
	var_ElmRESvalue1*multipliers.elm_INV+
	var_INVvalue1*multipliers.elm_INV

//Call values from chip 2
	var_DEFvalue2 = document.getElementById("DEFvalue2").value;
	var_Shldvalue2 = document.getElementById("Shldvalue2").value;
	var_DmgIncvalue2 = document.getElementById("DmgIncvalue2").value;
	var_DmgDecvalue2 = document.getElementById("DmgDecvalue2").value;
	var_Atkvalue2 = document.getElementById("Atkvalue2").value;
	var_HPvalue2 = document.getElementById("HPvalue2").value;
	var_CrtRtvalue2 = document.getElementById("CrtRtvalue2").value;
	var_CrtDmgvalue2 = document.getElementById("CrtDmgvalue2").value;
	var_Elmvalue2 = document.getElementById("Elmvalue2").value;
	var_ElmRESvalue2 = document.getElementById("ElmRESvalue2").value;
	var_INVvalue2 = document.getElementById("INVvalue2").value;

	var resultChip2 = 
	var_DEFvalue1*multipliers.DEF +
	var_Shldvalue2*multipliers.shld+
	var_DmgIncvalue2*multipliers.dmginc+
	var_DmgDecvalue2*multipliers.dmgdec+
	var_Atkvalue2*multipliers.attk_HP_crit_critdmg+
	var_HPvalue2*multipliers.attk_HP_crit_critdmg+
	var_CrtRtvalue2*multipliers.attk_HP_crit_critdmg+
	var_CrtDmgvalue2*multipliers.attk_HP_crit_critdmg+
	var_Elmvalue2*multipliers.elm_INV+
	var_ElmRESvalue2*multipliers.elm_INV+
	var_INVvalue2*multipliers.elm_INV
	
//Change the value at the top to match the result
	document.getElementById("resultChip1")
		.textContent = `Chip value: ${resultChip1}`
	document.getElementById("resultChip2")
		.textContent = `Chip value: ${resultChip2}`

	console.log(resultChip1);
	console.log(resultChip2);
};



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