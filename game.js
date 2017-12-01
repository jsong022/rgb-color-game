//select and save pieces of the HTML we need to manipulate
var squares = document.getElementsByClassName("square"); //all the Squares on page
var display = document.querySelector("#display"); // the displayed Target Color
var result = document.getElementById("result"); // the displayed Result of guess
var heading = document.getElementsByTagName("h1")[0]; //the Heading of the page
var reset = document.querySelector("button#reset"); //the reset button

//set up colors with the needed number of random colors
var colors = generateColors(squares.length);

//randomly pick the "correct" color user should guess
targetColor = colors[randomInteger(squares.length)];

//let the user know what the target color is
display.textContent = targetColor.substr(3);

//manipulate each div.square
for (var i = 0; i < squares.length; i++){ //for each Square on page
	squares[i].style.backgroundColor = colors[i]; //assign color to current Square
	squares[i].addEventListener("click", function(){ //add a click event listener to the Square
		if (this.style.backgroundColor === targetColor){//if correct guess
			result.textContent = "Correct!"; //show Result of guess to user
			changeColors(targetColor);
			reset.textContent = "Play again?"
		}
		else{//if incorrect guess
			//set square color to be body's background color, i.e. "invisible"
			this.style.backgroundColor = document.body.style.backgroundColor;
			result.textContent = "Try again!" //show Result of guess to user
		}
	});
}

//add event listeners to the buttons
reset.addEventListener("click", resetGame);

// resets the entire game with new random values
function resetGame(){
	//set up colors with the needed number of random colors
	var colors = generateColors(squares.length);
	//reset heading background color
	heading.style.backgroundColor = document.body.style.backgroundColor;
	//reset each Square color
	for (var i = 0; i < squares.length; i++){ //for each Square on page
		squares[i].style.backgroundColor = colors[i]; //assign color to current Square
	}
	//randomly pick the "correct" color user should guess
	targetColor = colors[randomInteger(squares.length)];
	//let the user know what the target color is
	display.textContent = targetColor.substr(3);
	//reset the Result
	result.textContent = "Guess the color!";
}

// change colors of ALL squares to color string passed as argument
// also changes the background color of the heading to the argument color
function changeColors(color){
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
	heading.style.backgroundColor = color;
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

function generateColors(num){
	var temp =[];
	for (var i = 0; i < num; i++){
		temp.push(randomColor());
	}
	return temp;
}