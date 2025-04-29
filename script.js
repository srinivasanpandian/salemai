document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');

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

    // Set active navigation based on current page
    function setActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            // Remove all active classes first
            link.classList.remove('active');
            
            // Get the href attribute
            const href = link.getAttribute('href');
            
            // Check if this is the current page
            if (href === currentPath || 
                (currentPath.endsWith('/') && href === currentPath + 'index.html') ||
                (!currentPath.includes('/') && href === './index.html') ||
                (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
            
            // Special case for sections in index.html
            if (currentPath.includes('index.html') && href === '#intro-section') {
                link.setAttribute('href', '#intro-section');
            } else if (href === '#intro-section') {
                link.setAttribute('href', 'index.html#intro-section');
            }
        });
    }

    // Call setActiveNavigation on page load
    setActiveNavigation();

    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        // For mobile devices
        if (window.innerWidth <= 968) {
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
        
        // For desktop hover functionality is handled by CSS
    });

    // Toggle menu and overlay
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    menuOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            !menuOverlay.contains(e.target)) {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle smooth scroll for same-page links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu after clicking a link
                    navMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                }
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

// Menu data loading and display
async function loadMenuData() {
    try {
        const response = await fetch('menu-data.json');
        const menuData = await response.json();
        displayMenu(menuData);
    } catch (error) {
        console.error('Error loading menu data:', error);
    }
}

function displayMenu(menuData) {
    const menuContainer = document.querySelector('.menu-categories');
    if (!menuContainer) return;

    // Clear existing content
    menuContainer.innerHTML = '';

    // Loop through each category in the menu data
    Object.entries(menuData).forEach(([category, data]) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'menu-category';

        // Create category header
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = category;
        categoryElement.appendChild(categoryHeader);

        // Add menu tag if exists
        if (data['menu-tag']) {
            const menuTag = document.createElement('span');
            menuTag.className = 'menu-category-tag';
            menuTag.textContent = data['menu-tag'];
            categoryElement.appendChild(menuTag);
        }

        // Create items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'menu-items';

        // Add each item in the category
        data.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';

            const itemDetails = document.createElement('div');
            itemDetails.className = 'item-details';

            // Add item title
            const itemTitle = document.createElement('h3');
            itemTitle.textContent = item['food-title'];
            itemDetails.appendChild(itemTitle);

            // Add price
            const price = document.createElement('span');
            price.className = 'price';
            price.textContent = `$${item['food-price']}`;
            itemDetails.appendChild(price);

            // Add description if exists
            if (item.description) {
                const description = document.createElement('p');
                description.className = 'item-description';
                if (Array.isArray(item.description)) {
                    description.textContent = item.description.join(', ');
                } else {
                    description.textContent = item.description;
                }
                itemDetails.appendChild(description);
            }

            itemElement.appendChild(itemDetails);
            itemsContainer.appendChild(itemElement);
        });

        categoryElement.appendChild(itemsContainer);
        menuContainer.appendChild(categoryElement);
    });
}

// Load menu data when the page loads
document.addEventListener('DOMContentLoaded', loadMenuData);

// Menu Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Menu Navigation
    const menuNavLinks = document.querySelectorAll('.menu-nav-list a');
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-item');
    const searchInput = document.getElementById('menuSearch');

    // Function to filter menu items
    function filterMenuItems() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeCategory = document.querySelector('.menu-nav-list a.active').getAttribute('data-category');

        menuItems.forEach(item => {
            const itemName = item.querySelector('.item-name').textContent.toLowerCase();
            const itemDescription = item.querySelector('.item-description')?.textContent.toLowerCase() || '';
            const itemCategory = item.closest('.menu-category').getAttribute('data-category');
            
            const matchesSearch = itemName.includes(searchTerm) || itemDescription.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || activeCategory === itemCategory;

            item.classList.toggle('hidden', !(matchesSearch && matchesCategory));
        });

        // Show/hide categories based on visible items
        menuCategories.forEach(category => {
            const hasVisibleItems = Array.from(category.querySelectorAll('.menu-item')).some(item => !item.classList.contains('hidden'));
            category.classList.toggle('hidden', !hasVisibleItems);
        });
    }

    // Category navigation
    menuNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            menuNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            filterMenuItems();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterMenuItems);
    }

    // Initialize with 'All' category selected
    const allCategoryLink = document.querySelector('.menu-nav-list a[data-category="all"]');
    if (allCategoryLink) {
        allCategoryLink.classList.add('active');
    }
});

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = trigger.closest('.nav-dropdown');
            
            // Close other dropdowns
            dropdownTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.closest('.nav-dropdown').classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdownTriggers.forEach(trigger => {
                trigger.closest('.nav-dropdown').classList.remove('active');
            });
        }
    });

    // Update functionality on window resize
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dropdownTriggers.forEach(trigger => {
                trigger.closest('.nav-dropdown').classList.remove('active');
            });
        }, 250);
    });
}); 