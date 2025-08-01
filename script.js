/**
 * ==============================================
 * INTERACTIVE WEB EXPERIENCE
 * ==============================================
 * 
 * This script combines CSS animations with JavaScript interactivity
 * demonstrating:
 * - CSS transitions and keyframe animations
 * - JavaScript functions with parameters and return values
 * - Combining CSS and JS for dynamic animations
 */

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Debounce function to limit rapid firing of events
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==============================================
// PART 1: CSS ANIMATIONS (Handled in CSS)
// ==============================================

// All animations for Part 1 are defined in the CSS file
// using :hover, transitions, and @keyframes

// ==============================================
// PART 2: JAVASCRIPT FUNCTIONS
// ==============================================

/**
 * Scope Demonstration
 * Shows the difference between global and local scope
 */
function demonstrateScope() {
    // Global variable
    const globalMessage = "I'm global!";
    
    // Function with local variable
    function innerFunction() {
        const localMessage = "I'm local!";
        return { global: globalMessage, local: localMessage };
    }
    
    const result = innerFunction();
    const output = `
        Global: ${result.global}<br>
        Local: ${result.local}<br>
        Trying to access local outside: ${typeof localMessage === 'undefined' ? 'undefined' : localMessage}
    `;
    
    document.getElementById('scopeOutput').innerHTML = output;
}

// Event listener for scope demo
document.getElementById('scopeDemoBtn').addEventListener('click', demonstrateScope);

/**
 * Calculate power of a number with parameters and return value
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} The result of base^exponent
 */
function calculatePower(base, exponent) {
    return Math.pow(base, exponent);
}

// Event listener for calculation demo
document.getElementById('calculateBtn').addEventListener('click', function() {
    const base = parseFloat(document.getElementById('functionInputA').value) || 0;
    const exponent = parseFloat(document.getElementById('functionInputB').value) || 0;
    const result = calculatePower(base, exponent);
    
    document.getElementById('functionOutput').textContent = 
        `${base}^${exponent} = ${result}`;
});

/**
 * Reusable animation function
 * @param {HTMLElement} element - DOM element to animate
 * @param {string} animationClass - CSS class containing animation
 * @param {number} duration - Duration in ms before removing class
 */
function triggerAnimation(element, animationClass, duration = 1000) {
    // Add the animation class
    element.classList.add(animationClass);
    
    // Remove after animation completes
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Event listener for animation demo
document.getElementById('animateBoxBtn').addEventListener('click', function() {
    const box = document.getElementById('animatableBox');
    triggerAnimation(box, 'animate-bounce');
});

// ==============================================
// PART 3: COMBINING CSS & JAVASCRIPT
// ==============================================

/**
 * Toggle pulse animation on an element
 * @param {string} elementId - ID of element to animate
 */
function togglePulseAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle('animate-pulse');
    
    // Update button text
    const btn = document.getElementById('toggleAnimationBtn');
    btn.textContent = element.classList.contains('animate-pulse') 
        ? 'Stop Pulse' 
        : 'Start Pulse';
}

// Event listener for toggle animation
document.getElementById('toggleAnimationBtn').addEventListener('click', function() {
    togglePulseAnimation('togglePulseBox');
});

/**
 * Run animation sequence with delays
 */
function runAnimationSequence() {
    const sequenceBoxes = document.querySelectorAll('.sequence-box');
    
    sequenceBoxes.forEach((box, index) => {
        // Calculate delay based on position
        const delay = index * 300;
        
        setTimeout(() => {
            // Add animation class
            box.classList.add('animate-bounce');
            box.style.backgroundColor = '#f72585';
            
            // Remove animation class after completion
            setTimeout(() => {
                box.classList.remove('animate-bounce');
                box.style.backgroundColor = '#4361ee';
            }, 1000);
        }, delay);
    });
}

// Event listener for sequence animation
document.getElementById('sequenceBtn').addEventListener('click', runAnimationSequence);

/**
 * Modal Controller
 */
function setupModal() {
    const modal = document.getElementById('animatedModal');
    const modalBtn = document.getElementById('modalTriggerBtn');
    const closeBtn = document.querySelector('.close-modal');
    const confirmBtn = document.getElementById('confirmModalBtn');
    
    // Open modal
    modalBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Confirm button
    confirmBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        alert('Action confirmed!');
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize modal
setupModal();

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize any animations or effects
    runAnimationSequence();
});