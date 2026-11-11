// Lets CSS fade-in styles apply only when JavaScript runs
document.documentElement.classList.add('js');

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========== PRELOAD GALLERY IMAGES ==========
const gallerySources = [
    'img/gallery-showcase.jpg',
    'img/gallery-lifestyle.jpg',
    'img/gallery-real.jpg',
    'img/gallery-duck.jpg'
];
gallerySources.forEach(src => {
    const preloader = new Image();
    preloader.src = src;
});

// ========== PRODUCT IMAGE SWITCHER ==========
function changeImage(src, thumbEl) {
    const mainImg = document.getElementById('mainProductImg');
    if (!mainImg) return;
    
    mainImg.style.opacity = '0.35';
    
    const nextImg = new Image();
    nextImg.onload = () => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    };
    nextImg.src = src;
    
    // Update active thumb
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) {
        thumbEl.classList.add('active');
    }
}

// ========== COPY TO CLIPBOARD ==========
function copyNumber(number, btnEl) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(() => {
            handleCopiedState(btnEl);
        }).catch(() => {
            fallbackCopy(number, btnEl);
        });
    } else {
        fallbackCopy(number, btnEl);
    }
}

function fallbackCopy(text, btnEl) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        handleCopiedState(btnEl);
    } catch (err) {
        console.error('Copy failed', err);
    }
    document.body.removeChild(textarea);
}

function handleCopiedState(btnEl) {
    if (!btnEl) return;
    const originalHTML = btnEl.innerHTML;
    btnEl.classList.add('copied');
    btnEl.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
    setTimeout(() => {
        btnEl.classList.remove('copied');
        btnEl.innerHTML = originalHTML;
    }, 2000);
}

// Add transition to main product image
document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('mainProductImg');
    if (mainImg) {
        mainImg.style.transition = 'opacity 0.22s ease';
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.about-grid, .product-showcase, .feature-card, .gallery-item, .contact-card, .upcoming-inner, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ========== SMOOTH ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // href="#" (logo) would make querySelector throw; let it jump to the top instead
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
