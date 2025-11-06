// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const expandableMenu = document.getElementById('expandableMenu');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!menuToggle || !expandableMenu || !menuClose || !menuOverlay) {
        return;
    }

    let previouslyFocused;
    const firstFocusable = () => document.querySelector('[data-menu-focus-first]') || expandableMenu.querySelector('a,button');
    const lastFocusable = () => document.querySelector('[data-menu-focus-last]') || expandableMenu.querySelector('a,button:last-child');

    function openMenu() {
        previouslyFocused = document.activeElement;
        expandableMenu.classList.add('active');
        expandableMenu.setAttribute('aria-hidden', 'false');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        const el = firstFocusable();
        if (el) el.focus();
    }

    function closeMenu() {
        expandableMenu.classList.remove('active');
        expandableMenu.setAttribute('aria-hidden', 'true');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = item.getAttribute('data-section');
            if (section) {
                const targetSection = document.getElementById(section);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    closeMenu();
                }
            }
        });
    });

    // Keyboard handling: Esc + focus trap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expandableMenu.classList.contains('active')) {
            closeMenu();
        }
        if (e.key === 'Tab' && expandableMenu.classList.contains('active')) {
            const focusable = expandableMenu.querySelectorAll('a,button,[tabindex="0"]');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Swipe to close on mobile
    let touchStartX = null;
    expandableMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    expandableMenu.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx > 60) closeMenu();
        touchStartX = null;
    });

    // Highlight active nav link and menu item based on scroll
    const sectionIds = ['home', 'about', 'works', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const menuNavItems = document.querySelectorAll('.menu-item');
    
    const updateActiveLinks = (activeId) => {
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('is-active');
            }
        });
        
        // Update menu items
        menuNavItems.forEach(item => {
            item.classList.remove('is-active');
            if (item.getAttribute('data-section') === activeId) {
                item.classList.add('is-active');
            }
        });
    };

    // Check initial position (home section)
    const homeSection = document.getElementById('home');
    if (homeSection && window.scrollY < 100) {
        updateActiveLinks('home');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (sectionIds.includes(id)) {
                    updateActiveLinks(id);
                }
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Structure Code modal
    const structureButtons = document.querySelectorAll('.project-link.structure');
    const structureOverlay = document.getElementById('structureOverlay');
    const structureClose = document.getElementById('structureClose');
    const structureBody = document.getElementById('structureBody');

    function openStructure(templateId) {
        const tpl = document.getElementById(`structure-${templateId}`);
        if (!tpl || !structureOverlay || !structureBody) return;
        structureBody.innerHTML = tpl.innerHTML;
        structureOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeStructure() {
        structureOverlay.classList.remove('active');
        document.body.style.overflow = '';
        structureBody.innerHTML = '';
    }

    structureButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-structure');
            if (key) openStructure(key);
        });
    });

    if (structureClose) structureClose.addEventListener('click', closeStructure);
    if (structureOverlay) structureOverlay.addEventListener('click', (e) => {
        if (e.target === structureOverlay) closeStructure();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && structureOverlay && structureOverlay.classList.contains('active')) closeStructure();
    });

    // Carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoPlayInterval;

    if (carouselSlides.length > 0) {
        function showSlide(index) {
            // Remove active class from all slides and indicators
            carouselSlides.forEach(slide => slide.classList.remove('active'));
            carouselIndicators.forEach(indicator => indicator.classList.remove('active'));

            // Add active class to current slide and indicator
            if (carouselSlides[index]) {
                carouselSlides[index].classList.add('active');
            }
            if (carouselIndicators[index]) {
                carouselIndicators[index].classList.add('active');
            }

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % carouselSlides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
            showSlide(prev);
        }

        // Indicator clicks
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                // Reset auto-play timer when manually changing slide
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // Auto-play carousel - changes every 5 seconds
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        startAutoPlay();
        
        // Pause on hover
        const carouselContainer = document.querySelector('.hero-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }
});

// Get current year
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;