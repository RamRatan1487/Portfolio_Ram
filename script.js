document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Navigation Styling on Scroll
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update Active Nav Link
        updateActiveNavLink();
    });

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ==========================================================================
       Active Link Highlighting
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    // Add reveal class to specific elements
    const elementsToReveal = [
        '.section-header', 
        '.about-content', 
        '.skills-card', 
        '.project-card', 
        '.timeline-item',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Skill Box Reveal Animations (Handled by general observer above)
       ========================================================================== */

    /* ==========================================================================
       Falling Icons Background
       ========================================================================== */
    const iconsContainer = document.getElementById('falling-icons-container');
    const iconClasses = [
        'fab fa-python',
        'fab fa-html5',
        'fab fa-css3-alt',
        'fab fa-js',
        'fas fa-robot',
        'fas fa-database',
        'fas fa-code',
        'fas fa-brain',
        'fas fa-server'
    ];

    function createFallingIcon() {
        if (!iconsContainer) return;
        
        const iconElement = document.createElement('i');
        const randomIcon = iconClasses[Math.floor(Math.random() * iconClasses.length)];
        iconElement.className = `${randomIcon} falling-icon`;
        
        // Randomize properties
        const leftPos = Math.random() * 100;
        const size = Math.random() * 2 + 1; // 1rem to 3rem
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const opacity = Math.random() * 0.15 + 0.05; // 0.05 to 0.20

        iconElement.style.left = `${leftPos}%`;
        iconElement.style.fontSize = `${size}rem`;
        iconElement.style.animationDuration = `${duration}s`;
        iconElement.style.setProperty('--icon-opacity', opacity.toString());

        iconsContainer.appendChild(iconElement);

        // Remove icon after animation completes
        setTimeout(() => {
            if (iconElement.parentNode === iconsContainer) {
                iconElement.remove();
            }
        }, duration * 1000);
    }

    // Create icons periodically (every 1.5 seconds)
    setInterval(createFallingIcon, 1500);
    
    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(createFallingIcon, Math.random() * 2000);
    }

    /* ==========================================================================
       Form Submission Highlight (Prevent default for demo)
       ========================================================================== */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#10b981'; // Success green
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
