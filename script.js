// Update current year if element exists
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Text Carousel for span elements with 'description' class
function initTextCarousel() {
    const descriptionSpans = document.querySelectorAll('span.description');
    
    descriptionSpans.forEach(span => {
        // Find the parent feature-item to get the data-category, or check body element
        const featureItem = span.closest('.feature-item');
        const bodyCategory = document.body.dataset.category;
        const initialText = span.textContent.trim();
        
        let textOptions;
        
        // Check if this is within a feature-item with specific category or body has category
        const category = (featureItem && featureItem.dataset.category) || bodyCategory;
        
        if (category) {
            if (category === 'brand') {
                textOptions = [
                    'Brand Identity',
                    'Visual Identity',
                    'Logo Design',
                    'Brand Strategy',
                    'Creative Direction'
                ];
            } else if (category === 'editorial') {
                textOptions = [
                    'Editorial Design',
                    'Art Direction', 
                    'Publication Design',
                    'Layout Design',
                    'Cultural Heritage'
                ];
            } else if (category === 'experiential') {
                textOptions = [
                    'Experiential Design',
                    'Environmental Graphics',
                    'Spatial Design',
                    'Interactive Experiences',
                    'Cultural Spaces'
                ];
            }
        } 
        // Default behavior for header and other elements not in feature-items
        else if (initialText === 'Visual communication designer') {
            textOptions = [
                'Visual communication designer',
                'Illustrator',
                'Custom type creator', 
                'Web developer'
            ];
        } else if (initialText === 'Product Design') {
            textOptions = [
                'Product Design',
                'Brand Identity',
                'Naming Strategy',
                'Packaging Design',
                'Visual System'
            ];
        } else if (initialText === 'Editorial Design') {
            textOptions = [
                'Editorial Design',
                'Art Direction',
                'Cover Artwork',
                'Publication Design',
                'Cultural Heritage'
            ];
        } else if (initialText === 'Graphic Design') {
            textOptions = [
                'Editorial Design',
                'Art Direction',
                'Brand Identity',
                'Publication Design',
                'Cultural Heritage'
            ];    
        } else {
            textOptions = [
                'Graphic Designer',
                'Creative designer',
                'Visual storyteller', 
                'Digital artist',
                'Problem solver',
                'Innovative thinker'
            ];
        }
        
        let currentIndex = 0;
        
        // Function to change text with fade effect
        function changeText() {
            span.classList.add('fade-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % textOptions.length;
                span.textContent = textOptions[currentIndex];
                span.classList.remove('fade-out');
            }, 150); // Half of transition time
        }
        
        // Start the carousel
        setInterval(changeText, 1500); // Change every 1 second
    });
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initTextCarousel);

// Dropdown Filter Functionality
function initDropdownFilter() {
    const filterToggle = document.getElementById('filterToggle');
    const filterOptions = document.getElementById('filterOptions');
    const filterItems = document.querySelectorAll('.filter-option');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Only initialize if filter elements exist (on main page)
    if (!filterToggle || !filterOptions) {
        return;
    }
    
    // Toggle dropdown visibility
    filterToggle.addEventListener('click', () => {
        filterOptions.classList.toggle('show');
        const arrow = filterToggle.textContent.includes('▲') ? '▼' : '▲';
        filterToggle.textContent = filterToggle.textContent.replace(/[▼▲]/, arrow);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            filterOptions.classList.remove('show');
            filterToggle.textContent = filterToggle.textContent.replace('▼', '▲');
        }
    });
    
    // Handle filter option selection
    filterItems.forEach(option => {
        option.addEventListener('click', () => {
            const category = option.getAttribute('data-category');
            const label = option.textContent;
            
            // Update active option
            filterItems.forEach(item => item.classList.remove('active'));
            option.classList.add('active');
            
            // Update toggle button text
            filterToggle.textContent = `Filter by: ${label} ▲`;
            
            // Hide dropdown
            filterOptions.classList.remove('show');
            
            // Filter items
            featureItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// Initialize dropdown filter when page loads
document.addEventListener('DOMContentLoaded', initDropdownFilter);

// Scroll-triggered animations for feature items
function initScrollAnimations() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Only run if feature items exist (on main page)
    if (featureItems.length === 0) {
        return;
    }
    
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a slight delay for staggered effect
                const index = Array.from(featureItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // 100ms delay between each item
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    // Observe all feature items
    featureItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', initScrollAnimations);

function initCloseLinks() {
    const closeLinks = document.querySelectorAll('.close-link');

    if (closeLinks.length === 0) {
        return;
    }

    let hasSameOriginReferrer = false;

    if (document.referrer) {
        try {
            const referrerUrl = new URL(document.referrer);
            hasSameOriginReferrer = referrerUrl.origin === window.location.origin;
        } catch (error) {
            hasSameOriginReferrer = false;
        }
    }

    if (!hasSameOriginReferrer) {
        return;
    }

    closeLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            window.history.back();
        });
    });
}

document.addEventListener('DOMContentLoaded', initCloseLinks);

// Header scroll behavior

let lastScrollTop = 0;
const header = document.querySelector('header');

const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

function updateHeaderExpandedState(scrollTop) {
    if (!header || !isIndexPage) {
        return;
    }

    if (scrollTop <= 0) {
        header.classList.add('header-expanded');
    } else {
        header.classList.remove('header-expanded');
    }
}

updateHeaderExpandedState(window.pageYOffset || document.documentElement.scrollTop);

window.addEventListener('scroll', function() {
    if (!header) {
        return;
    }

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    updateHeaderExpandedState(scrollTop);
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header
        header.classList.add('hidden');
    } else {
        // Scrolling up - show header
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
