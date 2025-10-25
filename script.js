// Enhanced Movie Quiz with Difficulty Levels and Statistics
// ========================================================

// Question Database with Difficulty Levels
const movieQuestions = {
    easy: [
        {
            question: "Which movie features the famous line 'May the Force be with you'?",
            options: ["Star Trek", "Star Wars", "Stargate", "Star Lord"],
            correct: 1,
            category: "Hollywood"
        },
        {
            question: "Who played the character of Jack in 'Titanic'?",
            options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"],
            correct: 1,
            category: "Hollywood"
        },
        {
            question: "Which movie is about a fish trying to find his son?",
            options: ["Finding Nemo", "Shark Tale", "The Little Mermaid", "Moana"],
            correct: 0,
            category: "Animation"
        },
        {
            question: "Which movie features the character Simba?",
            options: ["The Jungle Book", "The Lion King", "Madagascar", "Zootopia"],
            correct: 1,
            category: "Animation"
        },
        {
            question: "Who played Iron Man in the Marvel movies?",
            options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
            correct: 2,
            category: "Hollywood"
        },
        {
            question: "Which Bollywood actor is known as the 'King of Bollywood'?",
            options: ["Aamir Khan", "Salman Khan", "Shah Rukh Khan", "Akshay Kumar"],
            correct: 2,
            category: "Bollywood"
        },
        {
            question: "In which Bollywood movie did Shah Rukh Khan play a character named Raj?",
            options: ["Dilwale Dulhania Le Jayenge", "Kuch Kuch Hota Hai", "Don", "Both A and B"],
            correct: 3,
            category: "Bollywood"
        },
        {
            question: "Which movie features the song 'Jai Ho'?",
            options: ["3 Idiots", "Slumdog Millionaire", "Dangal", "Lagaan"],
            correct: 1,
            category: "Bollywood"
        }
    ],
    medium: [
        {
            question: "Who directed the movie 'Inception'?",
            options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
            correct: 1,
            category: "Hollywood"
        },
        {
            question: "Which movie won the Academy Award for Best Picture in 2020?",
            options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
            correct: 2,
            category: "Hollywood"
        },
        {
            question: "In 'The Dark Knight', who played the Joker?",
            options: ["Jack Nicholson", "Joaquin Phoenix", "Heath Ledger", "Mark Hamill"],
            correct: 2,
            category: "Hollywood"
        },
        {
            question: "Who directed 'Pulp Fiction'?",
            options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Steven Spielberg"],
            correct: 1,
            category: "Hollywood"
        },
        {
            question: "In which movie did Aamir Khan play the role of a wrestling coach?",
            options: ["3 Idiots", "Dangal", "Lagaan", "Taare Zameen Par"],
            correct: 1,
            category: "Bollywood"
        },
        {
            question: "Who directed the movie 'Sholay'?",
            options: ["Yash Chopra", "Raj Kapoor", "Ramesh Sippy", "Guru Dutt"],
            correct: 2,
            category: "Bollywood"
        },
        {
            question: "In which movie did Priyanka Chopra play a boxer?",
            options: ["Fashion", "Barfi", "Mary Kom", "The Sky Is Pink"],
            correct: 2,
            category: "Bollywood"
        },
        {
            question: "In 'Forrest Gump', what does Forrest compare life to?",
            options: ["A river", "A box of chocolates", "A journey", "A book"],
            correct: 1,
            category: "Hollywood"
        }
    ],
    hard: [
        {
            question: "Which movie features the famous quote 'Here's looking at you, kid'?",
            options: ["Casablanca", "Gone with the Wind", "Roman Holiday", "Singin' in the Rain"],
            correct: 0,
            category: "Classics"
        },
        {
            question: "Which movie won the first ever Academy Award for Best Picture?",
            options: ["Wings", "The Jazz Singer", "Sunrise", "The Circus"],
            correct: 0,
            category: "Classics"
        },
        {
            question: "Which movie features the famous dance scene in the rain?",
            options: ["Singin' in the Rain", "La La Land", "The Umbrella of Cherbourg", "Mamma Mia!"],
            correct: 0,
            category: "Classics"
        },
        {
            question: "Who composed the music for 'The Lion King' (1994)?",
            options: ["Alan Menken", "Hans Zimmer", "John Williams", "Danny Elfman"],
            correct: 1,
            category: "Animation"
        },
        {
            question: "Which was the first Indian film to be nominated for the Academy Award for Best Foreign Language Film?",
            options: ["Mother India", "Lagaan", "Mughal-E-Azam", "Sholay"],
            correct: 0,
            category: "Bollywood"
        },
        {
            question: "Who was the first Indian to win an Academy Award?",
            options: ["Satyajit Ray", "Bhanu Athaiya", "A.R. Rahman", "Resul Pookutty"],
            correct: 1,
            category: "Bollywood"
        },
        {
            question: "In which year was the movie 'Citizen Kane' released?",
            options: ["1940", "1941", "1942", "1943"],
            correct: 1,
            category: "Classics"
        },
        {
            question: "Which cinematographer won the Oscar for 'Blade Runner 2049'?",
            options: ["Roger Deakins", "Emmanuel Lubezki", "Vittorio Storaro", "Janusz Kamiński"],
            correct: 0,
            category: "Hollywood"
        }
    ]
};

// Game State Management
class QuizGame {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.difficulty = 'medium';
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 30;
        this.timeBonus = 0;
        this.stats = this.loadStats();
        
        this.difficultySettings = {
            easy: { points: 10, timeLimit: 45, multiplier: 1 },
            medium: { points: 15, timeLimit: 30, multiplier: 1.5 },
            hard: { points: 25, timeLimit: 20, multiplier: 2.5 }
        };
        
        this.init();
    }
    
    init() {
        this.updateStatsDisplay();
        this.setDifficulty('medium');
    }
    
    // Statistics Management
    loadStats() {
        const defaultStats = {
            totalGames: 0,
            bestScore: 0,
            totalScore: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            difficultyBest: { easy: 0, medium: 0, hard: 0 },
            difficultyGames: { easy: 0, medium: 0, hard: 0 }
        };
        
        try {
            const saved = localStorage.getItem('movieQuizStats');
            return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
        } catch (e) {
            return defaultStats;
        }
    }
    
    saveStats() {
        try {
            localStorage.setItem('movieQuizStats', JSON.stringify(this.stats));
        } catch (e) {
            console.warn('Could not save statistics');
        }
    }
    
    updateStatsAfterGame() {
        this.stats.totalGames++;
        this.stats.totalScore += this.score;
        this.stats.totalQuestions += this.selectedQuestions.length;
        this.stats.correctAnswers += this.userAnswers.filter((answer, index) => 
            answer === this.selectedQuestions[index].correct).length;
        
        if (this.score > this.stats.bestScore) {
            this.stats.bestScore = this.score;
        }
        
        if (this.score > this.stats.difficultyBest[this.difficulty]) {
            this.stats.difficultyBest[this.difficulty] = this.score;
        }
        
        this.stats.difficultyGames[this.difficulty]++;
        this.saveStats();
        this.updateStatsDisplay();
    }
    
    updateStatsDisplay() {
        const avgScore = this.stats.totalGames > 0 ? 
            Math.round(this.stats.totalScore / this.stats.totalGames) : 0;
        const accuracy = this.stats.totalQuestions > 0 ? 
            Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100) : 0;
        
        document.getElementById('total-games').textContent = this.stats.totalGames;
        document.getElementById('best-score').textContent = this.stats.bestScore;
        document.getElementById('avg-score').textContent = avgScore;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('easy-best').textContent = this.stats.difficultyBest.easy;
        document.getElementById('medium-best').textContent = this.stats.difficultyBest.medium;
        document.getElementById('hard-best').textContent = this.stats.difficultyBest.hard;
    }
    
    clearStats() {
        if (confirm('Are you sure you want to clear all statistics? This cannot be undone.')) {
            localStorage.removeItem('movieQuizStats');
            this.stats = this.loadStats();
            this.updateStatsDisplay();
        }
    }
    
    // Difficulty Management
    setDifficulty(level) {
        this.difficulty = level;
        
        // Update UI
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`.difficulty-btn.${level}`).classList.add('selected');
        
        // Update max possible score display
        const maxScore = this.difficultySettings[level].points * 10;
        document.getElementById('total-possible').textContent = maxScore;
    }
    
    // Timer Management
    startTimer() {
        this.timeLeft = this.difficultySettings[this.difficulty].timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 5) {
                document.getElementById('timer').classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.getElementById('timer').classList.remove('warning');
    }
    
    updateTimerDisplay() {
        document.getElementById('timer').textContent = `⏱️ ${this.timeLeft}s`;
    }
    
    timeUp() {
        this.stopTimer();
        this.selectAnswer(-1); // No answer selected
    }
    
    // Game Flow Management
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeBonus = 0;
        
        // Get questions for selected difficulty
        const availableQuestions = movieQuestions[this.difficulty];
        this.selectedQuestions = this.getRandomQuestions(availableQuestions, 10);
        
        this.showScreen('quiz-area');
        this.updateDifficultyBadge();
        this.displayQuestion();
        this.updateScore();
        this.updateProgress();
    }
    
    getRandomQuestions(questionPool, count) {
        const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
    
    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        document.getElementById('question-text').textContent = 
            `Question ${this.currentQuestionIndex + 1}/10: ${question.question}`;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(button);
        });
        
        document.getElementById('next-btn').style.display = 'none';
        this.startTimer();
    }
    
    selectAnswer(selectedIndex) {
        this.stopTimer();
        
        const question = this.selectedQuestions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        const settings = this.difficultySettings[this.difficulty];
        
        // Disable all options
        options.forEach(option => option.disabled = true);
        
        // Highlight correct and selected answers
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.style.background = '#4ecdc4';
                option.style.color = 'white';
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.style.background = '#ff6b6b';
                option.style.color = 'white';
            }
        });
        
        // Calculate score with time bonus
        if (selectedIndex === question.correct) {
            let points = settings.points;
            
            // Time bonus: extra points for quick answers
            if (this.timeLeft > settings.timeLimit * 0.8) {
                points += Math.round(settings.points * 0.5); // 50% bonus
                this.timeBonus += Math.round(settings.points * 0.5);
            } else if (this.timeLeft > settings.timeLimit * 0.5) {
                points += Math.round(settings.points * 0.2); // 20% bonus
                this.timeBonus += Math.round(settings.points * 0.2);
            }
            
            this.score += points;
            this.updateScore();
        }
        
        this.userAnswers.push(selectedIndex);
        
        // Show next button or finish quiz
        if (this.currentQuestionIndex < this.selectedQuestions.length - 1) {
            document.getElementById('next-btn').style.display = 'inline-block';
        } else {
            setTimeout(() => this.finishQuiz(), 1500);
        }
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.updateProgress();
        
        if (this.currentQuestionIndex < this.selectedQuestions.length) {
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }
    
    updateScore() {
        document.getElementById('current-score').textContent = this.score;
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex) / this.selectedQuestions.length) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
    }
    
    updateDifficultyBadge() {
        const badge = document.getElementById('current-difficulty');
        const emoji = {
            easy: '🌟 Easy',
            medium: '🔥 Medium', 
            hard: '💎 Hard'
        };
        badge.textContent = emoji[this.difficulty];
    }
    
    finishQuiz() {
        this.stopTimer();
        this.updateStatsAfterGame();
        this.showScreen('result-screen');
        
        const finalScore = document.getElementById('final-score');
        const resultMessage = document.getElementById('result-message');
        const maxScore = this.difficultySettings[this.difficulty].points * 10;
        const percentage = Math.round((this.score / maxScore) * 100);
        
        finalScore.textContent = `${this.score}/${maxScore} (${percentage}%)`;
        
        let message = '';
        if (this.timeBonus > 0) {
            message += `⚡ Time Bonus: +${this.timeBonus} points!<br>`;
        }
        
        if (percentage >= 90) {
            message += '🏆 Perfect! You are a true Movie Master!';
        } else if (percentage >= 80) {
            message += '🎬 Excellent! Outstanding movie knowledge!';
        } else if (percentage >= 70) {
            message += '🍿 Great job! You know your movies well!';
        } else if (percentage >= 60) {
            message += '📺 Good effort! Keep watching more films!';
        } else {
            message += '🎭 Time for a movie marathon!';
        }
        
        resultMessage.innerHTML = message;
    }
    
    // Screen Management
    showScreen(screenId) {
        const screens = ['start-screen', 'instructions', 'stats-screen', 'quiz-area', 'result-screen'];
        screens.forEach(id => {
            document.getElementById(id).style.display = id === screenId ? 'block' : 'none';
        });
    }
}

// Global game instance
let game;

// Global functions for HTML onclick handlers
function startQuiz() {
    game.startQuiz();
}

function showStart() {
    game.showScreen('start-screen');
}

function showInstructions() {
    game.showScreen('instructions');
}

function showStats() {
    game.showScreen('stats-screen');
}

function setDifficulty(level) {
    game.setDifficulty(level);
}

function nextQuestion() {
    game.nextQuestion();
}

function clearStats() {
    game.clearStats();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new QuizGame();
});