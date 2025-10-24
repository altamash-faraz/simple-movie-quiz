// Movie Quiz Questions Database
const movieQuestions = [
    {
        question: "Which movie features the famous line 'May the Force be with you'?",
        options: ["Star Trek", "Star Wars", "Stargate", "Star Lord"],
        correct: 1
    },
    {
        question: "Who directed the movie 'Inception'?",
        options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
        correct: 1
    },
    {
        question: "In which Bollywood movie did Shah Rukh Khan play a character named Raj?",
        options: ["Dilwale Dulhania Le Jayenge", "Kuch Kuch Hota Hai", "Don", "Both A and B"],
        correct: 3
    },
    {
        question: "Which movie won the Academy Award for Best Picture in 2020?",
        options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
        correct: 2
    },
    {
        question: "Who played the character of Jack in 'Titanic'?",
        options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"],
        correct: 1
    },
    {
        question: "Which Bollywood actor is known as the 'King of Bollywood'?",
        options: ["Aamir Khan", "Salman Khan", "Shah Rukh Khan", "Akshay Kumar"],
        correct: 2
    },
    {
        question: "In 'The Dark Knight', who played the Joker?",
        options: ["Jack Nicholson", "Joaquin Phoenix", "Heath Ledger", "Mark Hamill"],
        correct: 2
    },
    {
        question: "Which movie features the song 'Jai Ho'?",
        options: ["3 Idiots", "Slumdog Millionaire", "Dangal", "Lagaan"],
        correct: 1
    },
    {
        question: "Who directed 'Pulp Fiction'?",
        options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Steven Spielberg"],
        correct: 1
    },
    {
        question: "Which movie is about a fish trying to find his son?",
        options: ["Finding Nemo", "Shark Tale", "The Little Mermaid", "Moana"],
        correct: 0
    },
    {
        question: "In which movie did Aamir Khan play the role of a wrestling coach?",
        options: ["3 Idiots", "Dangal", "Lagaan", "Taare Zameen Par"],
        correct: 1
    },
    {
        question: "Which movie features the famous quote 'Here's looking at you, kid'?",
        options: ["Casablanca", "Gone with the Wind", "Roman Holiday", "Singin' in the Rain"],
        correct: 0
    },
    {
        question: "Who played Iron Man in the Marvel Cinematic Universe?",
        options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
        correct: 2
    },
    {
        question: "Which Bollywood movie is about aliens visiting Earth?",
        options: ["Koi... Mil Gaya", "PK", "Ra.One", "Robot"],
        correct: 0
    },
    {
        question: "In 'Forrest Gump', what does Forrest compare life to?",
        options: ["A river", "A box of chocolates", "A journey", "A book"],
        correct: 1
    },
    {
        question: "Which movie features the character Simba?",
        options: ["The Jungle Book", "The Lion King", "Madagascar", "Zootopia"],
        correct: 1
    },
    {
        question: "Who directed the movie 'Sholay'?",
        options: ["Yash Chopra", "Raj Kapoor", "Ramesh Sippy", "Guru Dutt"],
        correct: 2
    },
    {
        question: "Which movie won the first ever Academy Award for Best Picture?",
        options: ["Wings", "The Jazz Singer", "Sunrise", "The Circus"],
        correct: 0
    },
    {
        question: "In which movie did Priyanka Chopra play a boxer?",
        options: ["Fashion", "Barfi", "Mary Kom", "The Sky Is Pink"],
        correct: 2
    },
    {
        question: "Which movie features the famous dance scene in the rain?",
        options: ["Singin' in the Rain", "La La Land", "The Umbrella of Cherbourg", "Mamma Mia!"],
        correct: 0
    }
];

// Game State
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let userAnswers = [];

// Screen Management
function showStart() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
}

function showInstructions() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
}

function showQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';
}

function showResult() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

// Quiz Logic
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // Randomly select 10 questions
    selectedQuestions = getRandomQuestions(10);
    
    showQuiz();
    displayQuestion();
    updateScore();
    updateProgress();
}

function getRandomQuestions(count) {
    const shuffled = [...movieQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    
    document.getElementById('question-text').textContent = 
        `Question ${currentQuestionIndex + 1}/10: ${question.question}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Highlight correct and selected answers
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.style.background = '#4ecdc4'; // Correct answer
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.style.background = '#ff6b6b'; // Wrong answer
        }
    });
    
    // Update score if correct
    if (selectedIndex === question.correct) {
        score += 10;
        updateScore();
    }
    
    userAnswers.push(selectedIndex);
    
    // Show next button or finish quiz
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        setTimeout(finishQuiz, 1500);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    updateProgress();
    
    if (currentQuestionIndex < selectedQuestions.length) {
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function updateScore() {
    document.getElementById('current-score').textContent = score;
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

function finishQuiz() {
    showResult();
    
    const finalScore = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    
    finalScore.textContent = `${score}/100`;
    
    let message = '';
    if (score >= 90) {
        message = '🏆 Movie Master! You know your films!';
    } else if (score >= 70) {
        message = '🎬 Great job! You\'re a real movie buff!';
    } else if (score >= 50) {
        message = '🍿 Not bad! Keep watching more movies!';
    } else {
        message = '📺 Time to binge some classics!';
    }
    
    resultMessage.textContent = message;
}

// Initialize
document.addEventListener('DOMContentLoaded', showStart);