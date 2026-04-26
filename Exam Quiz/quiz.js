// ===== DOM Elements =====
const questionElement = document.getElementById("questions");
const answerButtonsElement = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const progressBar = document.getElementById("progress-bar");
const questionSection = document.getElementById("question-section");
const resultsSection = document.getElementById("results-section");
const resultsIcon = document.getElementById("results-icon");
const resultsScore = document.getElementById("results-score");
const resultsMessage = document.getElementById("results-message");
const resultsBar = document.getElementById("results-bar");
const restartBtn = document.getElementById("btn-restart");

// ===== State =====
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// ===== Question Bank =====
const questionBank = [
    {
        question: "What is the capital of India?",
        answer: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        correct: 0,
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answer: [
            "William Shakespeare",
            "Charles Dickens",
            "Jane Austen",
            "Mark Twain",
        ],
        correct: 0,
    },
    {
        question: "What is the chemical symbol for water?",
        answer: ["H2O", "CO2", "NaCl", "O2"],
        correct: 0,
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        answer: ["China", "Japan", "South Korea", "Thailand"],
        correct: 1,
    },
];

const optionLetters = ["A", "B", "C", "D"];

// ===== Update Progress Bar =====
const updateProgress = () => {
    const pct = (currentQuestionIndex / questionBank.length) * 100;
    progressBar.style.width = `${pct}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questionBank.length}`;
    scoreText.textContent = `Score: ${score}`;
};

// ===== Show Results =====
const showResults = () => {
    questionSection.style.display = "none";
    resultsSection.className = "results-visible";

    const total = questionBank.length;
    const pct = Math.round((score / total) * 100);

    // Set progress bar to 100%
    progressBar.style.width = "100%";

    // Determine grade tier
    let tier, icon, message;
    if (pct === 100) {
        tier = "excellent";
        icon = "🏆";
        message = "Perfect score! You're a genius!";
    } else if (pct >= 80) {
        tier = "excellent";
        icon = "🌟";
        message = "Excellent work! Almost perfect!";
    } else if (pct >= 60) {
        tier = "good";
        icon = "👏";
        message = "Good job! Keep learning!";
    } else if (pct >= 40) {
        tier = "average";
        icon = "💪";
        message = "Not bad! Room for improvement.";
    } else {
        tier = "poor";
        icon = "📚";
        message = "Keep studying! You'll get better!";
    }

    resultsIcon.textContent = icon;
    resultsScore.textContent = `You scored ${score} out of ${total} (${pct}%)`;
    resultsMessage.textContent = message;

    // Animate results bar
    resultsBar.className = `results-bar-fill ${tier}`;
    requestAnimationFrame(() => {
        resultsBar.style.width = `${pct}%`;
    });
};

// ===== Render Quiz Question =====
const renderQuiz = () => {
    answered = false;
    answerButtonsElement.innerHTML = "";

    // Re-apply fade animation
    questionSection.style.display = "block";
    questionSection.style.animation = "none";
    // Trigger reflow
    void questionSection.offsetHeight;
    questionSection.style.animation = "fadeIn 0.3s ease-out";

    const currentQuestion = questionBank[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    updateProgress();

    currentQuestion.answer.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");

        // Option letter badge
        const letterSpan = document.createElement("span");
        letterSpan.classList.add("option-letter");
        letterSpan.textContent = optionLetters[index];
        button.appendChild(letterSpan);

        // Answer text
        const textSpan = document.createElement("span");
        textSpan.textContent = answer;
        button.appendChild(textSpan);

        button.addEventListener("click", () => handleAnswer(index, currentQuestion.correct, button));

        answerButtonsElement.appendChild(button);
    });
};

// ===== Handle Answer Selection =====
const handleAnswer = (selectedIndex, correctIndex, selectedBtn) => {
    if (answered) return; // Prevent double-click
    answered = true;

    const allButtons = answerButtonsElement.querySelectorAll(".answer-btn");

    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add("correct");
        score++;
        scoreText.textContent = `Score: ${score}`;
    } else {
        selectedBtn.classList.add("wrong");
        // Highlight the correct answer
        allButtons[correctIndex].classList.add("correct");
    }

    // Dim non-relevant buttons
    allButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (i !== selectedIndex && i !== correctIndex) {
            btn.classList.add("dimmed");
        }
    });

    // Auto-advance after delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionBank.length) {
            renderQuiz();
        } else {
            showResults();
        }
    }, 1200);
};

// ===== Restart Quiz =====
const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    resultsSection.className = "results-hidden";
    resultsBar.style.width = "0%";
    progressBar.style.width = "0%";
    renderQuiz();
};

// ===== Event Listeners =====
restartBtn.addEventListener("click", restartQuiz);

// ===== Start Quiz =====
renderQuiz();
