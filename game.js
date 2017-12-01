var colors = [
	"rgb(255, 0, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 0, 255)",
	"rgb(255, 255, 0)",
	"rgb(255, 0, 255)",
	"rgb(0, 255, 255)"
];

//select and save pieces of the HTML we need to manipulate
var squares = document.getElementsByClassName("square");
var display = document.querySelector("#display");

targetColor = colors[3];

//let the user know what the target color is
display.textContent = targetColor.substr(3);

//manipulate each div.square
for (var i = 0; i < squares.length; i++){
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		var result = (this.style.backgroundColor === targetColor)? "correct!" : "wrong!";
		alert(result);
	});
}