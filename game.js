var colors = [];

//select and save pieces of the HTML we need to manipulate
var squares = document.getElementsByClassName("square");
var display = document.querySelector("#display");
var result = document.getElementById("result");

//set up colors with the needed number of random colors
for (var i = 0; i < squares.length; i++){ //for each Square on page
	colors.push(randomColor()); //generate a random color
}

//randomly pick the "correct" color user should guess
targetColor = colors[randomInteger(squares.length)];

//let the user know what the target color is
display.textContent = targetColor.substr(3);

//manipulate each div.square
for (var i = 0; i < squares.length; i++){ //for each Square on page
	squares[i].style.backgroundColor = colors[i]; //assign color to current Square
	squares[i].addEventListener("click", function(){ //add a click event listener to the Square
		if (this.style.backgroundColor === targetColor){//if correct guess
			result.textContent = "Correct!";
			changeColors(targetColor);
		}
		else{//if incorrect guess
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

//returns a random integer between 0 and limit (excluding limit itself)
function randomInteger(limit){
	return Math.floor(Math.random() * limit);
}

//generates a random color in rbg format and returns it as string
//e.g. "rgb(x, y, z)" where x, y, and z are random integers
function randomColor(){
	var color = "rgb("; // start the rgb format
	color += randomInteger(256) + ", " // add the random Red value
	color += randomInteger(256) + ", " // add the random Green value
	color += randomInteger(256) + ")" // add the random Blue value
	return color;
}