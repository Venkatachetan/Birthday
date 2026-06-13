// Navigation functionality
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.dataset.section;
        
        // Remove active class from all buttons
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Scroll to section
        smoothScroll(section);
    });
});

// Smooth scroll function
function smoothScroll(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollGallery(direction) {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;
    const card = carousel.querySelector('.gallery-card');
    const scrollAmount = card ? card.offsetWidth + 24 : 340;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Load wishes from API
async function loadWishes() {
    try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        const wishesContainer = document.getElementById('wishes-container');
        
        wishesContainer.innerHTML = data.messages.map((message, index) => `
            <div class="wish-card" style="animation-delay: ${index * 0.1}s;">
                <div class="wish-emoji">💌</div>
                <p class="wish-text">${message}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading wishes:', error);
        document.getElementById('wishes-container').innerHTML = `
            <div class="wish-card">
                <div class="wish-emoji">💕</div>
                <p class="wish-text">Happy Birthday! You are the most wonderful person in my life.</p>
            </div>
        `;
    }
}

// Display current date
function displayDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', options);
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

function initPhotoBook() {
    const bookSection = document.getElementById('photo-book');
    if (!bookSection) return;

    const pageImages = (bookSection.dataset.pages || '').split('|').filter(Boolean);
    if (!pageImages.length) return;

    const imageEl = document.getElementById('book-page-img');
    const pageNumberEl = document.getElementById('book-page-number');
    const pageWrapper = document.getElementById('book-page');
    const prevButton = document.getElementById('book-prev');
    const nextButton = document.getElementById('book-next');

    let currentIndex = 0;

    let isTurning = false;

    function updateBookPage() {
        if (!imageEl || !pageNumberEl) return;
        imageEl.src = pageImages[currentIndex];
        pageNumberEl.textContent = `${currentIndex + 1} / ${pageImages.length}`;
        if (prevButton) prevButton.disabled = currentIndex === 0;
        if (nextButton) nextButton.disabled = currentIndex === pageImages.length - 1;
    }

    function turnPage(direction) {
        if (isTurning) return;
        if (direction < 0 && currentIndex === 0) return;
        if (direction > 0 && currentIndex === pageImages.length - 1) return;

        isTurning = true;
        if (pageWrapper) {
            pageWrapper.classList.add('turning');
        }

        const nextIndex = Math.max(0, Math.min(pageImages.length - 1, currentIndex + direction));

        setTimeout(() => {
            currentIndex = nextIndex;
            updateBookPage();
        }, 400);
    }

    if (prevButton) prevButton.addEventListener('click', () => turnPage(-1));
    if (nextButton) nextButton.addEventListener('click', () => turnPage(1));
    if (pageWrapper) {
        pageWrapper.addEventListener('animationend', () => {
            pageWrapper.classList.remove('turning');
            isTurning = false;
        });
    }

    updateBookPage();
}

function getAgeDetails(birthDate, nowDate) {
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let years = nowDate.getFullYear() - birthYear;
    let months = nowDate.getMonth() - birthMonth;
    let days = nowDate.getDate() - birthDay;

    if (days < 0) {
        const previousMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        days += previousMonth.getDate();
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return { years, months, days };
}

function updateBirthTimer() {
    const birthDate = new Date(2008, 5, 15, 7, 45, 0);
    const now = new Date();
    const diffMs = now - birthDate;
    if (diffMs < 0) return;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const age = getAgeDetails(birthDate, now);

    const yearsEl = document.getElementById('age-years');
    const monthsEl = document.getElementById('age-months');
    const daysEl = document.getElementById('age-days');
    const hoursEl = document.getElementById('age-hours');
    const minutesEl = document.getElementById('age-minutes');
    const secondsEl = document.getElementById('age-seconds');

    if (yearsEl) yearsEl.textContent = age.years;
    if (monthsEl) monthsEl.textContent = age.months;
    if (daysEl) daysEl.textContent = age.days;
    if (hoursEl) hoursEl.textContent = totalHours.toLocaleString();
    if (minutesEl) minutesEl.textContent = totalMinutes.toLocaleString();
    if (secondsEl) secondsEl.textContent = totalSeconds.toLocaleString();

    const summaryEl = document.querySelector('.timer-summary p');
    if (summaryEl) {
        summaryEl.textContent = `Since 15 June 2008 at 07:45 AM, Swathi has lived ${totalDays.toLocaleString()} days, ${totalHours.toLocaleString()} hours, ${totalMinutes.toLocaleString()} minutes, and ${totalSeconds.toLocaleString()} seconds under her beautiful Libra star.`;
    }
}

function initProposalNoButton() {
    const noButton = document.getElementById('noButton');
    if (!noButton) return;

    function moveNoButton() {
        const randomX = Math.random() * (window.innerWidth - 100);
        const randomY = Math.random() * (window.innerHeight - 100);
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
        noButton.style.zIndex = '9999';
    }

    noButton.addEventListener('mouseenter', moveNoButton);
    noButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadWishes();
    displayDate();
    addAnimationObservers();
    initializeScratchCards();
    initPhotoBook();
    initProposalNoButton();
    updateBirthTimer();
    setInterval(updateBirthTimer, 1000);
});


// Scratch card interaction
function initializeScratchCards() {
    const cards = document.querySelectorAll('.scratch-card');
    cards.forEach(card => {
        const canvas = card.querySelector('.scratch-canvas');
        const photo = card.querySelector('.scratch-photo');
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let revealed = false;

        function resizeCanvas() {
            canvas.width = card.offsetWidth;
            canvas.height = card.offsetHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#c3c2c2');
            gradient.addColorStop(0.25, '#d8d8d8');
            gradient.addColorStop(0.5, '#b8b8b8');
            gradient.addColorStop(0.75, '#dfdfdf');
            gradient.addColorStop(1, '#c1c1c1');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'destination-out';
            for (let i = 0; i < 1400; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 2 + 1;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'destination-out';
        }

        function scratch(x, y) {
            if (revealed) return;
            const rect = canvas.getBoundingClientRect();
            const px = x - rect.left;
            const py = y - rect.top;
            ctx.beginPath();
            ctx.arc(px, py, 32, 0, Math.PI * 2);
            ctx.fill();
            checkReveal();
        }

        function checkReveal() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let cleared = 0;
            for (let i = 3; i < imageData.length; i += 4) {
                if (imageData[i] === 0) cleared++;
            }
            if (cleared / (canvas.width * canvas.height) > 0.30) {
                revealed = true;
                card.classList.add('revealed');
            }
        }

        function pointerDown(event) {
            drawing = true;
            scratch(event.clientX, event.clientY);
        }

        function pointerMove(event) {
            if (!drawing) return;
            scratch(event.clientX, event.clientY);
        }

        function pointerUp() {
            drawing = false;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        card.addEventListener('pointerdown', pointerDown);
        card.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
        card.addEventListener('pointerleave', pointerUp);
    });
}

// Intersection Observer for scroll animations
function addAnimationObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Gallery items animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                entry.target.style.opacity = '0';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.gallery-card').forEach(item => {
        galleryObserver.observe(item);
    });
}

// Add smooth page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (event.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Particle effect on click (hearts and flowers)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('scroll-btn') || e.target.classList.contains('nav-btn')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    const particles = ['❤', '💕', '🌹', '✨'];
    const particle = particles[Math.floor(Math.random() * particles.length)];
    
    const el = document.createElement('div');
    el.textContent = particle;
    el.style.position = 'fixed';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = '24px';
    el.style.pointerEvents = 'none';
    el.style.animation = `float-up 2s ease-out forwards`;
    el.style.zIndex = '9999';
    
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 2000);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Music background (optional - uncomment if you want to add music)
// function playBackgroundMusic() {
//     const audio = new Audio('your-song-url.mp3');
//     audio.loop = true;
//     audio.volume = 0.3;
//     audio.play().catch(e => console.log('Audio autoplay prevented:', e));
// }

// Responsive menu handling
function handleResize() {
    const width = window.innerWidth;
    if (width < 768) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.style.padding = '10px 20px';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Confetti effect function (for special moments)
function triggerConfetti() {
    const confettiPieces = 50;
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = Math.random() > 0.5 ? '❤' : '🌹';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.fontSize = '20px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confetti-fall ${3 + Math.random() * 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to style
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Optional: Trigger confetti on page load
window.addEventListener('load', function() {
    // Uncomment the line below if you want confetti on page load
    // triggerConfetti();
});

console.log('🎂 Birthday Website Loaded Successfully! 💕');
