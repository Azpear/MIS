document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    document.getElementById('username-display').textContent = currentUser.name;

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Load class data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const classId = urlParams.get('id');
    
    // In a real app, you would fetch the class data from an API
    const classData = {
        id: classId || '1',
        title: 'Introduction to Programming',
        description: 'Learn the basics of coding with Python in this comprehensive introductory course.',
        progress: 30,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notes: [
            {
                id: 1,
                content: 'Variables are used to store data in Python. Use meaningful names for variables.',
                date: '2023-06-10'
            },
            {
                id: 2,
                content: 'Indentation is important in Python as it defines code blocks.',
                date: '2023-06-12'
            }
        ]
    };

    // Display class data
    document.getElementById('class-title').textContent = classData.title;
    document.getElementById('class-description').textContent = classData.description;
    document.getElementById('class-progress').style.width = `${classData.progress}%`;
    document.getElementById('progress-percent').textContent = `${classData.progress}%`;
    document.getElementById('lecture-video').src = classData.videoUrl;

    // Load notes
    const notesContainer = document.getElementById('notes-container');
    classData.notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-card';
        noteElement.innerHTML = `
            <div class="note-date">${new Date(note.date).toLocaleDateString()}</div>
            <p>${note.content}</p>
        `;
        notesContainer.appendChild(noteElement);
    });

    // Save new note
    document.getElementById('save-note').addEventListener('click', function() {
        const noteContent = document.getElementById('new-note').value.trim();
        if (!noteContent) return;

        const newNote = {
            id: Date.now(),
            content: noteContent,
            date: new Date().toISOString()
        };

        const noteElement = document.createElement('div');
        noteElement.className = 'note-card';
        noteElement.innerHTML = `
            <div class="note-date">${new Date(newNote.date).toLocaleDateString()}</div>
            <p>${newNote.content}</p>
        `;
        notesContainer.insertAdjacentElement('afterbegin', noteElement);

        // Clear the textarea
        document.getElementById('new-note').value = '';

        // In a real app, you would save the note to a database
        alert('Note saved successfully!');
    });

    // Rating functionality
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            selectedRating = value;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Submit rating
    document.getElementById('submit-rating').addEventListener('click', function() {
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        const comment = document.getElementById('rating-comment').value.trim();
        
        // In a real app, you would send this to your backend
        alert(`Thank you for your ${selectedRating}-star rating!${comment ? '\nComment: ' + comment : ''}`);
        
        // Reset form
        stars.forEach(star => star.classList.remove('active'));
        document.getElementById('rating-comment').value = '';
        selectedRating = 0;
    });
});