// Steam Website JavaScript

// DOM elements
const loginBtn = document.getElementById('loginBtn');
const gameCards = document.querySelectorAll('.game-card');
const purchaseBtn = document.querySelector('.purchase-btn');
const navLinks = document.querySelectorAll('.nav-link');

// Login state
let isLoggedIn = false;
let username = '';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    addEventListeners();
    animateOnLoad();
});

// Initialize components
function initializeComponents() {
    // Check if user was previously logged in (simulate with random chance)
    if (Math.random() < 0.3) {
        login('SteamUser' + Math.floor(Math.random() * 1000));
    }
    
    // Add hover effects to game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });
}

// Add event listeners
function addEventListeners() {
    loginBtn.addEventListener('click', handleLogin);
    purchaseBtn.addEventListener('click', handlePurchase);
    
    // Add click events to game cards
    gameCards.forEach((card, index) => {
        card.addEventListener('click', () => handleGameCardClick(index));
    });
    
    // Add navigation link effects
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Handle login/logout
function handleLogin() {
    if (isLoggedIn) {
        logout();
    } else {
        const newUsername = prompt('Enter your Steam username:');
        if (newUsername && newUsername.trim()) {
            login(newUsername.trim());
        }
    }
}

function login(user) {
    isLoggedIn = true;
    username = user;
    loginBtn.textContent = `Welcome, ${username}`;
    loginBtn.style.background = 'linear-gradient(90deg, #c75450 0%, #8b0000 100%)';
    
    showNotification(`Welcome back, ${username}!`, 'success');
}

function logout() {
    isLoggedIn = false;
    username = '';
    loginBtn.textContent = 'Login';
    loginBtn.style.background = 'linear-gradient(90deg, #4c6b22 0%, #67c23a 100%)';
    
    showNotification('Logged out successfully', 'info');
}

// Handle purchase
function handlePurchase() {
    if (!isLoggedIn) {
        showNotification('Please log in to make a purchase', 'warning');
        return;
    }
    
    const gameTitle = document.querySelector('.game-info h3').textContent;
    const price = document.querySelector('.new-price').textContent;
    
    // Simulate purchase process
    purchaseBtn.textContent = 'Processing...';
    purchaseBtn.disabled = true;
    
    setTimeout(() => {
        purchaseBtn.textContent = 'Added to Library';
        purchaseBtn.style.background = 'linear-gradient(90deg, #4c6b22 0%, #67c23a 100%)';
        showNotification(`${gameTitle} added to your library for ${price}!`, 'success');
        
        setTimeout(() => {
            purchaseBtn.textContent = 'In Library';
            purchaseBtn.disabled = true;
        }, 1000);
    }, 2000);
}

// Handle game card interactions
function handleCardHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-8px) scale(1.02)';
}

function handleCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
}

function handleGameCardClick(index) {
    const games = [
        { name: 'Action Shooter', price: '$39.99' },
        { name: 'RPG Fantasy', price: '$49.99' },
        { name: 'Racing Simulator', price: '$34.99' },
        { name: 'Strategy War', price: '$29.99' }
    ];
    
    const game = games[index];
    showNotification(`Clicked on ${game.name} - Price: ${game.price}`, 'info');
}

// Handle navigation clicks
function handleNavClick(e) {
    e.preventDefault();
    const linkText = e.target.textContent;
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    e.target.classList.add('active');
    
    showNotification(`Navigating to ${linkText}`, 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(90deg, #4c6b22 0%, #67c23a 100%)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(90deg, #c75450 0%, #ff6b6b 100%)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(90deg, #66c0f4 0%, #417a9b 100%)';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animate elements on page load
function animateOnLoad() {
    const elementsToAnimate = document.querySelectorAll('.game-card, .featured-game, .hero-title');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Add some interactive features
document.addEventListener('keydown', function(e) {
    // Konami code easter egg (up, up, down, down, left, right, left, right, b, a)
    // Simplified version: just press 'S' + 'T' + 'E' + 'A' + 'M'
    if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        e.preventDefault();
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('Steam color mode activated!', 'success');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

// Smooth scrolling for better UX
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

// Console welcome message
console.log('%c🎮 Welcome to Steam Store! 🎮', 'color: #66c0f4; font-size: 20px; font-weight: bold;');
console.log('%cTip: Press Ctrl+S for a surprise!', 'color: #67c23a; font-size: 14px;');