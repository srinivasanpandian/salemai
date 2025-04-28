document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        carouselItems[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % carouselItems.length;
        
        carouselItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Start the carousel
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Add click functionality to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Clear the existing timer
            clearInterval(slideTimer);
            
            // Remove active class from current slide
            carouselItems[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Update current slide
            currentSlide = index;
            
            // Add active class to new slide
            carouselItems[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Restart the timer
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Toggle menu and overlay
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });

    // Handle navigation items
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            !menuOverlay.contains(e.target)) {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                navMenu.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Popular Dishes Scroll
    const scrollContainer = document.querySelector('.dishes-scroll');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');
    const scrollAmount = 300; // Adjust this value to control scroll distance

    if (scrollContainer && leftArrow && rightArrow) {
        // Hide left arrow initially if at start
        checkScrollPosition();

        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft -= scrollAmount;
            checkScrollPosition();
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft += scrollAmount;
            checkScrollPosition();
        });

        // Update arrow visibility on scroll
        scrollContainer.addEventListener('scroll', checkScrollPosition);

        function checkScrollPosition() {
            // Hide left arrow if at start
            leftArrow.style.opacity = scrollContainer.scrollLeft <= 0 ? "0.3" : "0.8";
            
            // Hide right arrow if at end
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            rightArrow.style.opacity = Math.ceil(scrollContainer.scrollLeft) >= maxScroll ? "0.3" : "0.8";
        }

        // Touch scroll functionality
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
            checkScrollPosition();
        });
    }
}); 