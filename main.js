// Main JavaScript file for Michael Mai's Portfolio Website
// Handles all interactive components and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initTypedText();
    initMetricCounters();
    initResumeTabs();
    initSkillsRadar();
    initProjectFilters();
    initTimeline();
    initContactForm();
    initSplittingText();
    initParticleBackground();
    initProjectCarousel();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.card-hover, .skill-category, .timeline-item, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typed Text Animation
function initTypedText() {
    const typedName = document.getElementById('typed-name');
    const typedTitle = document.getElementById('typed-title');
    
    if (typedName) {
        new Typed('#typed-name', {
            strings: ['Michael Mai'],
            typeSpeed: 100,
            startDelay: 500,
            showCursor: false,
            onComplete: function() {
                if (typedTitle) {
                    new Typed('#typed-title', {
                        strings: ['Senior Manager & Technical Program Leader'],
                        typeSpeed: 50,
                        startDelay: 300,
                        showCursor: false
                    });
                }
            }
        });
    }
}

// Metric Counters Animation
function initMetricCounters() {
    const counters = document.querySelectorAll('.metric-counter, .impact-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Resume Tabs
function initResumeTabs() {
    const tabs = document.querySelectorAll('.resume-tab');
    const contents = document.querySelectorAll('.resume-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Skills Radar Chart
function initSkillsRadar() {
    const radarContainer = document.getElementById('skills-radar');
    if (!radarContainer) return;
    
    const chart = echarts.init(radarContainer);
    
    const skillsData = {
        'Cloud & DevOps': 95,
        'CRM & Enterprise': 90,
        'Project Management': 92,
        'Analytics & BI': 85,
        'Security & Compliance': 88,
        'Team Leadership': 94
    };
    
    const option = {
        radar: {
            indicator: Object.keys(skillsData).map(skill => ({
                name: skill,
                max: 100
            })),
            radius: '70%',
            axisName: {
                color: '#374151',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#d1d5db'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: Object.values(skillsData),
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(184, 115, 51, 0.2)'
                },
                lineStyle: {
                    color: '#b87333',
                    width: 2
                },
                itemStyle: {
                    color: '#b87333'
                }
            }]
        }],
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `${params.name}: ${params.value}%`;
            }
        }
    };
    
    chart.setOption(option);
    
    // Handle skill category clicks
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            skillCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Animate the radar chart
            chart.setOption(option, true);
        });
    });
    
    // Resize chart on window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Interactive Timeline
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                if (successMessage) {
                    successMessage.classList.add('show');
                }
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.remove('show');
                    }
                }, 5000);
            }, 1000);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateContactForm() {
    const fields = [
        { id: 'firstName', type: 'text' },
        { id: 'lastName', type: 'text' },
        { id: 'email', type: 'email' },
        { id: 'subject', type: 'select' },
        { id: 'message', type: 'text' }
    ];
    
    let isValid = true;
    
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input && !validateField(input)) {
            isValid = false;
        }
    });
    
    // Check privacy checkbox
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        isValid = false;
        showFieldError(privacyCheckbox, 'Please agree to the privacy policy');
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type) {
        case 'text':
        case 'textarea':
            if (!value) {
                isValid = false;
                errorMessage = `Please enter ${field.name || 'this field'}`;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your email address';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'select-one':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select an option';
            }
            break;
    }
    
    if (isValid) {
        showFieldSuccess(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.remove('success');
    field.classList.add('error');
    
    const errorText = field.parentNode.querySelector('.error-text');
    if (errorText) {
        errorText.textContent = message;
        errorText.classList.remove('hidden');
    }
}

function showFieldSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    const errorText = field.parentNode.querySelector('.error-text');
    if (errorText) {
        errorText.classList.add('hidden');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorText = field.parentNode.querySelector('.error-text');
    if (errorText) {
        errorText.classList.add('hidden');
    }
}

// Text Splitting Animation
function initSplittingText() {
    if (typeof Splitting !== 'undefined') {
        Splitting({
            target: '[data-splitting]',
            by: 'chars'
        });
        
        // Animate split text on scroll
        const splitTexts = document.querySelectorAll('[data-splitting]');
        const splitObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = entry.target.querySelectorAll('.char');
                    anime({
                        targets: chars,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(50),
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                    splitObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        splitTexts.forEach(text => {
            splitObserver.observe(text);
        });
    }
}

// Particle Background for Hero Section
function initParticleBackground() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(184, 115, 51, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(184, 115, 51, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Project Carousel
function initProjectCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel || typeof Splide === 'undefined') return;
    
    new Splide('#projects-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            768: {
                perPage: 1,
            }
        }
    }).mount();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements that are already in view
    const animatedElements = document.querySelectorAll('.card-hover, .skill-category');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
// Console welcome message
console.log('%c👋 Hello! Welcome to Michael Mai\'s Portfolio', 'color: #b87333; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #8fbc8f; font-size: 14px;');
console.log('%cLinkedIn: https://www.linkedin.com/in/michael-kiet-mai-826a181a/', 'color: #1a2332; font-size: 12px;');
