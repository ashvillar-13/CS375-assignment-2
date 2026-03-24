const easyQuestions = [  // Easy Level Questions Array
     { question: "2 + 2", answer: "4", hint: "Start at 2 and count up 2 more." },
    { question: "5 * 3", answer: "15", hint: "Think of 5 + 5 + 5." },
    { question: "10 - 6", answer: "4", hint: "Start at 10 and count back 6 steps." },
    { question: "9 / 3", answer: "3", hint: "How many groups of 3 fit into 9?" },
    { question: "7 + 1", answer: "8", hint: "What comes right after 7?" },
    { question: "6 * 2", answer: "12", hint: "Think of 6 + 6." },
    { question: "15 - 5", answer: "10", hint: "Start at 15 and count back 5 steps." },
    { question: "8 + 7", answer: "15", hint: "Break 7 into 2 and 5. Add 8 + 2 first to make 10, then add the remaining 5." },
    { question: "12 / 4", answer: "3", hint: "How many groups of 4 make 12?" },
    { question: "3 * 4", answer: "12", hint: "Think of 3 + 3 + 3 + 3." }
];

const mediumQuestions = [ // Medium Level Questions Array
    { question: "12 + 15", answer: "27", hint: "Add 10 + 15 first, then add 2." },
    { question: "9 * 4", answer: "36", hint: "Think of 9 + 9 + 9 + 9." },
    { question: "20 - 7", answer: "13", hint: "Subtract 10 first, then add back 3." },
    { question: "16 / 4", answer: "4", hint: "How many groups of 4 fit into 16?" },
    { question: "25 + 6", answer: "31", hint: "Add 5 to get 30, then add 1 more." },
    { question: "18 - 9", answer: "9", hint: "Start at 18 and count back 9 steps." },
    { question: "7 * 5", answer: "35", hint: "Think of 7 + 7 + 7 + 7 + 7." },
    { question: "14 / 2", answer: "7", hint: "How many times does 2 go into 14?" },
    { question: "11 + 19", answer: "30", hint: "Break 19 into 10 + 9. Add 11 + 10 first, then add 9." },
    { question: "24 - 8", answer: "16", hint: "Start at 24 and count back 8 steps." }
];

const hardQuestions = [ // Hard Level Questions Array
    { question: "14 * 3", answer: "42", hint: "Break 14 into 10 + 4. Multiply 10 * 3 and 4 * 3, then add both." },
    { question: "50 - 18", answer: "32", hint: "Subtract 20 from 50, then add back 2." },
    { question: "36 / 6", answer: "6", hint: "How many groups of 6 make 36?" },
    { question: "19 + 27", answer: "46", hint: "Add 20 + 27 first, then subtract 1." },
    { question: "8 * 7", answer: "56", hint: "Think of 8 groups of 7." },
    { question: "45 / 5", answer: "9", hint: "How many groups of 5 in 45?" },
    { question: "27 - 9", answer: "18", hint: "Subtract 10 from 27, then add back 1." },
    { question: "12 * 4", answer: "48", hint: "Think of 12 + 12 + 12 + 12." },
    { question: "63 / 7", answer: "9", hint: "How many groups of 7 fit into 63?" },
    { question: "33 + 19", answer: "52", hint: "Add 33 + 10 = 43, then add 9." }
];

// Game Variables:
let currentLevel = "easy";
let questions = easyQuestions;
let currentQuestionIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // High Score
// Timer for Hard Mode:
let timer;  // stores setInterval reference
let timeLeft = 15; // seconds per question

// Timer Function:
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timerText").textContent = "Time: " + timeLeft + "s";
    const feedback = document.getElementById("feedback");

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerText").textContent = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = "Time's up! Moving to next question.";
            moveToNextQuestion();
        }
    }, 1000);
}

function moveToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("answerInput").value = "";
    } else {
        clearInterval(timer);
        const feedback = document.getElementById("feedback");
        const hintText = document.getElementById("hintText");
        hintText.textContent = ""; // hide hint when game ends
        feedback.textContent = "You finished all the questions! Final Score: " + score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            feedback.textContent += " 🎉 New High Score!";
        }
    }
}

// Load Question:
function loadQuestion() {
    const questionText = document.getElementById("questionText");
    //debug using: console.log("Loading question:", questions[currentQuestionIndex].question); 
    const hintText = document.getElementById("hintText");
    const timerText = document.getElementById("timerText");

    questionText.textContent = questions[currentQuestionIndex].question;
    hintText.textContent = ""; // clear hint when new question loads

    // Start timer ONLY for Hard mode
    if (currentLevel === "hard") {
        startTimer();
    } else {
        clearInterval(timer);
        timerText.textContent = "";
    }
}

// Set Level:
function setLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;

    if (level === "easy") {
        questions = easyQuestions;
    } else if (level === "medium") {
        questions = mediumQuestions;
    } else if (level === "hard") {
        questions = hardQuestions;
    }

    score = 0; // Reset score
    updateScoreText();

    document.getElementById("feedback").textContent = "";
    document.getElementById("answerInput").value = "";

    loadQuestion();
}

// Start Game (from Menu):
function startGame(level) {
    setLevel(level);

    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

// Back to Menu:
function goToMenu() {
    document.getElementById("menuScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";

    clearInterval(timer);
    document.getElementById("feedback").textContent = "";
    document.getElementById("hintText").textContent = "";
    document.getElementById("answerInput").value = "";
    document.getElementById("timerText").textContent = "";
}

// Check answer:
function checkAnswer() {
    clearInterval(timer); // Stop the timer if it's running (important for hard mode)

    const userInput = document.getElementById("answerInput");
    const userAnswer = userInput.value.trim(); // trim/remove following spaces in users' input
    //debug using: console.log("User answer:", userAnswer);

    const feedback = document.getElementById("feedback");
    const hintText = document.getElementById("hintText");

    const correctAnswer = questions[currentQuestionIndex].answer; // Get the correct answer for the current question
    //debug using: console.log("Correct answer:", correctAnswer); 

    // input validation:
    if (userAnswer === "") { // if user does NOT enter anything in input,
        feedback.textContent = "Please enter an answer.";
        return;
    }

    if (userAnswer === correctAnswer) { // if user enters the CORRECT answer,
        score++;
        updateScoreText();
        feedback.textContent = "Correct!";
        currentQuestionIndex++; // move onto next question index in array
        //debug using: console.log("New index:", currentQuestionIndex);

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            userInput.value = "";
        } else {
            const hintText = document.getElementById("hintText"); 
            hintText.textContent = ""; // hide hint when game ends
            feedback.textContent = "You finished all the questions! Final Score: " + score;
        
            // Check for a new high score
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                feedback.textContent += " 🎉 New High Score!";
            }
        }

    } else { // else, if user enters the WRONG answer,
        feedback.textContent = "Wrong answer. Try again or use a hint.";
    }
}

// Hint function:
function showHint() {
    const hintText = document.getElementById("hintText");
    hintText.textContent = questions[currentQuestionIndex].hint;
}

// Update Score Text:
function updateScoreText() {
    let scoreText = document.getElementById("scoreText");
    if (!scoreText) { // If scoreText doesn't exist yet, create it above the question
        const gameScreen = document.getElementById("gameScreen");
        const p = document.createElement("p");
        p.id = "scoreText";
        p.textContent = "Score: " + score;
        gameScreen.insertBefore(p, document.getElementById("questionText"));
    } else {
        scoreText.textContent = "Score: " + score;
    }
}

// Submit on 'Enter' Key:
const answerInput = document.getElementById("answerInput");
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});