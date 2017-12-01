//select and save pieces of the HTML we need to manipulate
var squares = document.getElementsByClassName("square"); //all the Squares on page
var display = document.querySelector("#display"); // the displayed Target Color
var result = document.getElementById("result"); // the displayed Result of guess
var heading = document.getElementsByTagName("h1")[0]; //the Heading of the page
var reset = document.querySelector("button#reset"); //the reset button
var easy = document.querySelector("button#easy"); //the easy button
var normal = document.querySelector("button#normal"); //the normal button
var hard = document.querySelector("button#hard"); //the hard button

//default difficulty is Normal (or 6 choices)
var difficulty = 6;
normal.classList.add("current");

//set up colors with the needed number of random colors
var colors = generateColors(difficulty);

//randomly pick the "correct" color user should guess
targetColor = colors[randomInteger(difficulty)];

//let the user know what the target color is
display.textContent = targetColor.substr(3);


//manipulate each Square
for (var i = 0; i < squares.length; i++){ //for each Square on page
	if (i < difficulty){ //set color if it's valid
		squares[i].style.backgroundColor = colors[i]; //assign color to current Square	
	}
	else{ //if not turn this Square "invisible"
		squares[i].style.backgroundColor = document.body.style.backgroundColor;
	}
	squares[i].addEventListener("click", function(){ //add a click event listener to the Square
		if (this.style.backgroundColor !== document.body.style.backgroundColor){ // if the Square is not "invisible"
			if (this.style.backgroundColor === targetColor){//if correct guess
				result.textContent = "Correct!"; //show Result of guess to user
				reset.textContent = "Play again?" // changes reset button's text
				changeColors(targetColor); // changes all Squares & heading background to be the Target Color
			}
			else{//if incorrect guess
				//set square color to be body's background color, i.e. "invisible"
				this.style.backgroundColor = document.body.style.backgroundColor;
				result.textContent = "Try again!" //show Result of guess to user
			}
		}
	});
}

//add event listeners to the buttons
reset.addEventListener("click", resetGame);
easy.addEventListener("click", function(){
	setDifficulty(easy, 3);
});
normal.addEventListener("click", function(){
	setDifficulty(normal, 6);
});
hard.addEventListener("click", function(){
	setDifficulty(hard, 9);
});


// resets the entire game with new random values
function resetGame(){
	//set up colors with the needed number of random colors
	var colors = generateColors(difficulty);
	//reset heading background color
	heading.style.backgroundColor = document.body.style.backgroundColor;
	//reset each valid Square color
	for (var i = 0; i < difficulty; i++){ //for each Square on page
		squares[i].style.backgroundColor = colors[i]; //assign color to current Square
	}
	// turn all invalid Squares "invisible"
	for (var i = difficulty; i < squares.length; i++){
		squares[i].style.backgroundColor = document.body.style.backgroundColor;
	}
	//randomly pick the "correct" color user should guess
	targetColor = colors[randomInteger(difficulty)];
	//let the user know what the target color is
	display.textContent = targetColor.substr(3);
	//reset the Result
	result.textContent = "Guess the color!";
	//reset the Reset Button text
	reset.textContent = "New Game"
}

// change colors of ALL squares to color string passed as argument
// also changes the background color of the heading to the argument color
function changeColors(color){
	for (var i = 0; i < difficulty; i++){
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

// generates an array of random colors with the number of colors
// passed in as an argument
function generateColors(num){
	var temp =[];
	for (var i = 0; i < num; i++){
		temp.push(randomColor());
	}
	return temp;
}

function setDifficulty(btn, num){
	var prev = document.querySelector("button.current");
	if (prev !== btn){
		prev.classList.remove("current");
		btn.classList.add("current");
		difficulty = num;
		resetGame();
	}
}