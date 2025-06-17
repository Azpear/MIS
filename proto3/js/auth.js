document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    // Switch between login and signup
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    // Form submissions
  // In auth.js, modify the loginForm event listener
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Create a temporary user object with whatever credentials were entered
    const tempUser = {
        id: Date.now(),
        name: email.split('@')[0] || 'Guest', // Use part of email as name
        email: email || 'guest@example.com',
        password: password || 'none',
        level: 'high-school', // Default level
        joined: new Date().toISOString()
    };
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify(tempUser));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const level = document.getElementById('signup-level').value;

        // Simple validation
        if (!name || !email || !password || !level) {
            alert('Please fill in all fields');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alert('User already exists with this email');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In a real app, you would hash this
            level,
            joined: new Date().toISOString()
        };

        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
});
