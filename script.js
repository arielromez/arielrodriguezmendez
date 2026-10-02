// Update current year if element exists
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const textOptionsByCategory = {
    brand: [
        'Brand Identity',
        'Visual Identity',
        'Logo Design',
        'Brand Strategy',
        'Creative Direction'
    ],
    editorial: [
        'Editorial Design',
        'Art Direction',
        'Publication Design',
        'Layout Design',
        'Cultural Heritage'
    ],
    experiential: [
        'Experiential Design',
        'Environmental Graphics',
        'Spatial Design',
        'Interactive Experiences',
        'Cultural Spaces'
    ]
};

const fallbackTextOptions = [
    'Graphic Designer',
    'Visual Storyteller',
    'Creative Designer',
    'Digital Artist',
    'Product Designer'
];

function getTextOptions(category, initialText) {
    if (category && textOptionsByCategory[category]) {
        return textOptionsByCategory[category];
    }

    switch (initialText) {
        case 'Visual artist':
            return [
                'Visual Artist',
                'Illustrator',
                'Custom type creator',
                'Web developer'
            ];
        case 'Product Design':
            return [
                'Product Design',
                'Brand Identity',
                'Naming Strategy',
                'Packaging Design',
                'Visual System'
            ];
        case 'Editorial Design':
            return [
                'Editorial Design',
                'Art Direction',
                'Cover Artwork',
                'Publication Design',
                'Cultural Heritage'
            ];
        case 'Graphic Design':
            return [
                'Editorial Design',
                'Art Direction',
                'Brand Identity',
                'Publication Design',
                'Cultural Heritage'
            ];
        default:
            return fallbackTextOptions;
    }
}

function initTextCarousel() {
    const descriptionSpans = document.querySelectorAll('span.description');

    if (descriptionSpans.length === 0) {
        return;
    }

    descriptionSpans.forEach((span) => {
        const featureItem = span.closest('.feature-item');
        const bodyCategory = document.body.dataset.category;
        const initialText = span.textContent.trim();
        const category = featureItem?.dataset.category || bodyCategory;
        const textOptions = getTextOptions(category, initialText);
        let currentIndex = 0;

        const changeText = () => {
            span.classList.add('fade-out');

            window.setTimeout(() => {
                currentIndex = (currentIndex + 1) % textOptions.length;
                span.textContent = textOptions[currentIndex];
                span.classList.remove('fade-out');
            }, 150);
        };

        window.setInterval(changeText, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTextCarousel();
    initHeaderMenu();
});

function initHeaderMenu() {
    const nav = document.querySelector('.header-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (!nav || !toggle) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initScrollAnimations() {
    const featureItems = document.querySelectorAll('.feature-item');
    const featureTextItems = document.querySelectorAll('.feature-text li');
    const animatedElements = [...featureItems, ...featureTextItems];

    if (animatedElements.length === 0) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = animatedElements.indexOf(entry.target);
                window.setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach((item) => {
        observer.observe(item);
    });
}

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

    closeLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.history.back();
        });
    });
}

document.addEventListener('DOMContentLoaded', initCloseLinks);

let lastScrollTop = 0;
const header = document.querySelector('header');
const isHomeHeader = header?.classList.contains('header--home') ?? false;

function updateHeaderHeight() {
    if (!header) {
        return;
    }

    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

function updateHeaderExpandedState(scrollTop) {
    if (!header || !isHomeHeader) {
        return;
    }

    if (scrollTop <= 0) {
        header.classList.add('header-expanded');
    } else {
        header.classList.remove('header-expanded');
    }
}

updateHeaderHeight();
updateHeaderExpandedState(window.pageYOffset || document.documentElement.scrollTop);

window.addEventListener('resize', updateHeaderHeight);

window.addEventListener('scroll', () => {
    if (!header) {
        return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    updateHeaderExpandedState(scrollTop);
    updateHeaderHeight();

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
