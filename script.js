document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const heroImg = document.querySelector('.hero-bg img');
    const body = document.body;
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        if(themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        if(heroImg) heroImg.src = 'assets/hero_bg.png';
    } else {
        if(themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        if(heroImg) heroImg.src = 'assets/light_hero_bg.png';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
                if(heroImg) heroImg.src = 'assets/hero_bg.png';
                localStorage.setItem('theme', 'dark');
            } else {
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
                if(heroImg) heroImg.src = 'assets/light_hero_bg.png';
                localStorage.setItem('theme', 'light');
            }
        });
    }


    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links.active a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--nav-bg-scrolled)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in Elements
    document.querySelectorAll('.fade-in, .fade-up').forEach(item => {
        sectionObserver.observe(item);
    });

    // Glitch Text Effect Initialization (Optional simple hover effect logic)
    const glitch = document.querySelector('.glitch');
    if (glitch) {
        glitch.addEventListener('mouseover', () => {
            glitch.style.textShadow = '2px 2px 5px var(--accent), -2px -2px 5px var(--accent-secondary)';
        });
        glitch.addEventListener('mouseout', () => {
            glitch.style.textShadow = 'none';
        });
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';

            cursorOutline.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('a, button, .project-card, .contact-card, .stat-box, .cert-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
        });
    }

    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Data Science Enthusiast", "Python Developer", "Problem Solver", "Quick Learner"];
    const typingDelay = 80;
    const erasingDelay = 40;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (typedTextSpan && textArray.length) setTimeout(type, newTextDelay + 250);

    // Vanilla Tilt Initialization
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .stat-box, .contact-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.15
        });
    }

});
