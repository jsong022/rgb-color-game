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
var result = document.getElementById("result");

targetColor = colors[3];

//let the user know what the target color is
display.textContent = targetColor.substr(3);

//manipulate each div.square
for (var i = 0; i < squares.length; i++){
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		if (this.style.backgroundColor === targetColor){
			result.textContent = "Correct!";
			changeColors(targetColor);
		}
		else{
			this.style.backgroundColor = document.body.style.backgroundColor;
			result.textContent = "Try again!"
		}
	});
}

//change colors of ALL squares to color string passed as argument
function changeColors(color){
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}