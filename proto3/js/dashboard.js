document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    document.getElementById('dashboard-username').textContent = currentUser.name;
    document.getElementById('username-display').textContent = currentUser.name;
    document.getElementById('user-level').textContent = currentUser.level;

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Replace the existing class card click handler with this:
document.querySelectorAll('.btn-resume').forEach(button => {
    button.addEventListener('click', function() {
        const classCard = this.closest('.class-card');
        const classTitle = classCard.querySelector('h3').textContent;
        const progress = classCard.querySelector('.progress').style.width;
        
        // Redirect to class page with parameters
        window.location.href = `class.html?id=${encodeURIComponent(classTitle)}&progress=${encodeURIComponent(progress)}`;
    });
});

    // Community challenge handlers
    document.querySelectorAll('.btn-join').forEach(button => {
        button.addEventListener('click', function() {
            const challengeTitle = this.closest('.challenge-card').querySelector('h4').textContent;
            alert(`Joining ${challengeTitle}... (This would redirect to the challenge in a real app)`);
        });
    });

    // Forum reply handlers
    document.querySelectorAll('.btn-reply').forEach(button => {
        button.addEventListener('click', function() {
            const postTitle = this.closest('.forum-post').querySelector('h4').textContent;
            alert(`Replying to "${postTitle}"... (This would open a reply form in a real app)`);
        });
    });
});
// Calendar functionality
function generateCalendar(year, month) {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayNumber = document.createElement('span');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Mark today
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Mark days with events (sample data)
        const sampleEvents = [3, 8, 15, 18, 20, 25];
        if (sampleEvents.includes(day)) {
            dayElement.classList.add('has-event');
        }
        
        dayElement.addEventListener('click', () => {
            alert(`View events for ${month+1}/${day}/${year}`);
        });
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Update month display
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
}

// Initialize calendar with current month
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

generateCalendar(currentYear, currentMonth);

// Month navigation
document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
});

// Reminder functionality
document.querySelectorAll('.btn-remind').forEach(button => {
    button.addEventListener('click', function() {
        const eventTitle = this.closest('.reminder-card').querySelector('h4').textContent;
        const eventTime = this.closest('.reminder-card').querySelector('p').textContent;
        alert(`Reminder set for ${eventTitle} at ${eventTime}`);
        this.textContent = 'Reminder Set!';
        this.style.backgroundColor = 'var(--success-color)';
    });
});

// Add new reminder
document.getElementById('btn-add-reminder').addEventListener('click', function() {
    const title = document.getElementById('reminder-title').value;
    const date = document.getElementById('reminder-date').value;
    const time = document.getElementById('reminder-time').value;
    
    if (!title || !date || !time) {
        alert('Please fill in all fields');
        return;
    }
    
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month-1, day).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    
    const reminderHTML = `
        <div class="reminder-card">
            <div class="reminder-date">
                <span class="reminder-day">${day}</span>
                <span class="reminder-month">${new Date(year, month-1).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div class="reminder-details">
                <h4>${title}</h4>
                <p>${time}</p>
            </div>
            <button class="btn-remind">Set Reminder</button>
        </div>
    `;
    
    document.querySelector('.reminders-list').insertAdjacentHTML('afterbegin', reminderHTML);
    
    // Clear form
    document.getElementById('reminder-title').value = '';
    document.getElementById('reminder-date').value = '';
    document.getElementById('reminder-time').value = '';
    
    // Add event listener to new reminder button
    document.querySelector('.reminders-list .btn-remind').addEventListener('click', function() {
        alert(`Reminder set for ${title} at ${time}`);
        this.textContent = 'Reminder Set!';
        this.style.backgroundColor = 'var(--success-color)';
    });
    
    alert('Reminder added successfully!');
});
// Tab functionality for Live/Recorded Classes
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});

// Live class join functionality
document.querySelectorAll('.btn-join-live').forEach(button => {
    button.addEventListener('click', function() {
        const className = this.closest('.class-card').querySelector('h3').textContent;
        const instructor = this.closest('.class-card').querySelector('p').textContent;
        alert(`Joining live session: ${className}\n${instructor}`);
        // In a real app, this would redirect to the live streaming page
    });
});

// Watch recorded class functionality
document.querySelectorAll('.btn-watch').forEach(button => {
    button.addEventListener('click', function() {
        const className = this.closest('.recorded-card').querySelector('h4').textContent;
        alert(`Playing recorded class: ${className}\n(Would open video player in real app)`);
    });
});

// Notebank download functionality
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function() {
        const resourceName = this.closest('.resource-card').querySelector('h4').textContent;
        alert(`Downloading resource: ${resourceName}\n(Would download file in real app)`);
    });
});

// Search functionality (placeholder)
document.querySelectorAll('.search-bar input').forEach(input => {
    input.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert(`Searching for: ${this.value}\n(Would perform search in real app)`);
        }
    });
});
// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Notification Bell Toggle
const notificationBell = document.querySelector('.notification-bell');
const notificationsPanel = document.querySelector('.notifications-panel');

if (notificationBell && notificationsPanel) {
    notificationBell.addEventListener('click', () => {
        notificationsPanel.classList.toggle('active');
    });
}

// Close notifications panel
const btnClose = document.querySelector('.btn-close');
if (btnClose) {
    btnClose.addEventListener('click', () => {
        notificationsPanel.classList.remove('active');
    });
}

// Mark all notifications as read
const btnMarkAll = document.querySelector('.btn-mark-all');
if (btnMarkAll) {
    btnMarkAll.addEventListener('click', () => {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        
        document.querySelector('.notification-count').textContent = '0';
    });
}

// Circle progress animation
function animateCircleProgress() {
    const circleProgressElements = document.querySelectorAll('.circle-progress');
    
    circleProgressElements.forEach(element => {
        const value = element.getAttribute('data-value');
        const circleFill = element.querySelector('.circle-fill');
        
        if (circleFill) {
            circleFill.setAttribute('stroke-dasharray', `${value}, 100`);
        }
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateCircleProgress();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Responsive sidebar toggle for dashboard
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('active');
    });
}

// Simulate loading for dashboard elements
function simulateLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach(element => {
        element.classList.add('show');
        
        setTimeout(() => {
            element.classList.remove('loading');
            element.classList.remove('show');
        }, 1500);
    });
}

// Check if user is logged in (simulated)
function checkAuth() {
    const authPages = ['dashboard.html', 'classes.html', 'notebank.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (authPages.includes(currentPage)) {
        // In a real app, you would check authentication status here
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// Initialize auth check
checkAuth();