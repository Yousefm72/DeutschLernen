// Deutsch Lernen with Yousef Masri - Interactive JavaScript

// Quiz data
const quizData = [
    {
        question: "What does 'Hallo' mean?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: 0
    },
    {
        question: "What does 'Danke' mean?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: 2
    },
    {
        question: "What does 'Bitte' mean?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: 3
    },
    {
        question: "What does 'Auf Wiedersehen' mean?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: 1
    },
    {
        question: "What does 'Guten Tag' mean?",
        options: ["Good morning", "Good day", "Good evening", "Good night"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizActive = false;

// DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.querySelector('.options');
const resultElement = document.getElementById('result');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupNavigation();
    setupLessonButtons();
    setupCTAButton();
});

// Quiz functionality
function initializeQuiz() {
    if (quizData.length > 0) {
        displayQuestion();
    }
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    resultElement.textContent = '';
    resultElement.className = 'result';
    quizActive = true;
}

function selectAnswer(selectedIndex) {
    if (!quizActive) return;
    
    quizActive = false;
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Highlight correct and incorrect answers
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Show result
    if (selectedIndex === question.correct) {
        score++;
        resultElement.textContent = 'Correct! Well done!';
        resultElement.className = 'result correct';
    } else {
        resultElement.textContent = `Incorrect. The correct answer is: ${question.options[question.correct]}`;
        resultElement.className = 'result incorrect';
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            showQuizResults();
        }
    }, 2000);
}

function showQuizResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    questionElement.textContent = `Quiz Complete!`;
    optionsContainer.innerHTML = '';
    
    let message = '';
    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${quizData.length} (${percentage}%). Keep up the great work!`;
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${quizData.length} (${percentage}%). Keep practicing!`;
    } else {
        message = `You scored ${score}/${quizData.length} (${percentage}%). Don't give up, keep learning!`;
    }
    
    resultElement.textContent = message;
    resultElement.className = 'result';
    
    // Add restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Take Quiz Again';
    restartButton.className = 'cta-button';
    restartButton.style.marginTop = '1rem';
    restartButton.addEventListener('click', restartQuiz);
    optionsContainer.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizActive = false;
    displayQuestion();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lesson buttons functionality
function setupLessonButtons() {
    const lessonButtons = document.querySelectorAll('.lesson-button');
    
    lessonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonCard = this.closest('.lesson-card');
            const lessonTitle = lessonCard.querySelector('h3').textContent;
            
            // Show lesson start message
            showNotification(`Starting ${lessonTitle}! This feature will be available soon.`, 'info');
        });
    });
}

// CTA button functionality
function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function() {
        const lessonsSection = document.getElementById('lessons');
        lessonsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        showNotification('Welcome to Deutsch Lernen! Let\'s start with the lessons.', 'success');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#212529';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '';
        header.style.backdropFilter = '';
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add interactive vocabulary cards
function setupVocabularyCards() {
    const vocabItems = document.querySelectorAll('.vocab-item');
    
    vocabItems.forEach(item => {
        item.addEventListener('click', function() {
            const german = this.querySelector('.german').textContent;
            const english = this.querySelector('.english').textContent;
            
            // Create a modal or tooltip with pronunciation
            showVocabularyModal(german, english);
        });
    });
}

function showVocabularyModal(german, english) {
    // Simple alert for now - can be enhanced with a proper modal
    showNotification(`${german} = ${english}`, 'info');
}

// Initialize vocabulary cards
document.addEventListener('DOMContentLoaded', function() {
    setupVocabularyCards();
});

// Add keyboard navigation for quiz
document.addEventListener('keydown', function(e) {
    if (quizActive && e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option');
        if (options[optionIndex]) {
            selectAnswer(optionIndex);
        }
    }
});

// Add progress indicator for quiz
function updateQuizProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    // Could add a progress bar here if needed
    console.log(`Quiz Progress: ${Math.round(progress)}%`);
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        typeWriter,
        restartQuiz
    };
}
