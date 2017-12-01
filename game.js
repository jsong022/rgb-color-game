/*-- SELECT AND SAVE ALL DOM OBJECTS NEEDED --*/

var squares = document.getElementsByClassName("square"); //all the Squares on page
var display = document.querySelector("#display"); // the displayed Target Color
var result = document.getElementById("result"); // the displayed Result of guess
var heading = document.querySelector("#heading"); //the Heading of the page
var reset = document.querySelector("button#reset"); //the reset button
var easy = document.querySelector("button#easy"); //the easy button
var normal = document.querySelector("button#normal"); //the normal button
var hard = document.querySelector("button#hard"); //the hard button

/*-- SET UP ALL OTHER VARIABLES NEEDED --*/

//default difficulty is Normal (or 6 choices)
var difficulty = 6;
normal.classList.add("current");
//colors is an array of color strings in rgb format
var colors = [];
//targetColor saves the "correct" color the user is guessing
var targetColor = "";
//save the body's background color for easy access
var bodyColor = document.body.style.backgroundColor;

/*-- HERE ARE ALL THE FUNCTIONS THE GAME USES --*/

//sets up all the event listeners
//then starts a new game
function init(){
	//add event listeners to the buttons
	setUpButtonListeners();
	//add event listeners to the squares
	setUpSquareListeners();
	//setup the game after setting up every event listener
	resetGame();
}

//add event listeners to the buttons (Reset, Easy, Normal, Hard!)
function setUpButtonListeners(){
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
}

//add event listeners to the squares
function setUpSquareListeners(){
	for (var i = 0; i < squares.length; i++){
		//add a click event listener to each Square
		squares[i].addEventListener("click", function(){ 
			// if the Square is not "invisible"
			if (this.style.backgroundColor !== bodyColor){ 
				//if correct guess
				if (this.style.backgroundColor === targetColor){
					result.textContent = "Correct!"; //show Result of guess to user
					reset.textContent = "Play again?" // changes reset button's text
					changeColors(targetColor); // changes all Squares & heading background to be the Target Color
				}
				//if incorrect guess
				else{
					//set square color to be body's background color, i.e. "invisible"
					this.style.backgroundColor = bodyColor;
					result.textContent = "Try again!" //show Result of guess to user
				}
			}
		});
	}
}

// resets the entire game with new random values
function resetGame(){
	//set up colors with the needed number of random colors
	var colors = generateColors(difficulty);
	//reset heading background color
	heading.style.backgroundColor = "seagreen";
	//reset each valid Square color
	for (var i = 0; i < squares.length; i++){ //for each Square on page
		//square gets a color if valid, otherwise it is "invisible"
		squares[i].style.backgroundColor = (i < difficulty) ? colors[i] : bodyColor;
	}
	//randomly pick the "correct" color user should guess
	targetColor = colors[randomInteger(difficulty)];
	//let the user know what the target color is
	display.textContent = targetColor;
	//reset the Result
	result.textContent = "";
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

//sets the "difficulty" of the game to num
//and the correct button is switched to the "current" class
//resets the game iff the difficulty is changed
function setDifficulty(btn, num){
	var prev = document.querySelector("button.current");
	if (prev !== btn){
		prev.classList.remove("current");
		btn.classList.add("current");
		difficulty = num;
		resetGame();
	}
}

/*-- START THE GAME! --*/
init();