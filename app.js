// 🌟 Hack2TechSustain 2.0 - Fully Responsive JavaScript

class HackathonWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initCountdown();
        this.initScrollAnimations();
        this.initTimelineAnimations();
        this.initPrizeCounters();
        this.initGallerySlider();
        this.initMobileMenu();
        this.initBackToTop();
        this.initSmoothScrolling();
        this.initNavbarScroll();
        // this.initParticleCursor();
        // this.initTechEffects();
        console.log('🚀 Hack2TechSustain 2.0 website initialized successfully!');
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
            this.startLoadAnimations();
        });
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 1000);
            }, 2000); // Show for 2 seconds
        }
    }

    // ===== Countdown Timer =====
    initCountdown() {
        const targetDate = new Date('October 31, 2025 00:00:00').getTime();
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                this.setCountdownValues(0, 0, 0, 0);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.updateCountdownWithFlip('days', days);
            this.updateCountdownWithFlip('hours', hours);
            this.updateCountdownWithFlip('minutes', minutes);
            this.updateCountdownWithFlip('seconds', seconds);
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    updateCountdownWithFlip(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const formattedValue = newValue.toString().padStart(2, '0');
        const currentValue = element.textContent;

        if (currentValue !== formattedValue) {
            element.style.transform = 'rotateX(90deg)';
            element.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
            setTimeout(() => {
                element.textContent = formattedValue;
                element.style.transform = 'rotateX(0deg)';

                if (elementId === 'seconds') {
                    const scale = window.innerWidth < 480 ? 1.02 : 1.05;
                    element.parentElement.style.transform = `scale(${scale})`;
                    setTimeout(() => {
                        element.parentElement.style.transform = 'scale(1)';
                    }, 150);
                }
            }, 150);
        }
    }

    setCountdownValues(days, hours, minutes, seconds) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // ===== Timeline Animations =====
    initTimelineAnimations() {
        const timelineSection = document.querySelector('.timeline-section');
        const timelineLine = document.getElementById('timeline-line');
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineSection || !timelineLine || !timelineItems.length) return;

        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineLine.classList.add('animate');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => item.classList.add('animate'), 300 + index * 400);
                    });
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '-50px 0px' });
        lineObserver.observe(timelineSection);

        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate');
            });
        }, { threshold: 0.5 });
        timelineItems.forEach(item => itemObserver.observe(item));
    }

    // ===== Scroll Animations =====
    initScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        const animationType = entry.target.getAttribute('data-aos');
                        if (animationType) {
                            entry.target.style.animation = `${animationType} 0.8s cubic-bezier(0.4,0,0.2,1) forwards`;
                        }
                    }, parseInt(delay));
                }
            });
        }, observerOptions);

        // Enhanced scroll animations for fade-in elements
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger animation
                }
            });
        }, { threshold: 0.1 });

        // Observe elements with fade classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            fadeObserver.observe(el);
        });

        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }

    // ===== Prize Counters =====
    initPrizeCounters() {
        const counters = document.querySelectorAll('.prize-amount[data-target]');
        let countersAnimated = false;

        const animateCounters = () => {
            if (countersAnimated) return;
            const prizesSection = document.getElementById('prizes');
            if (!prizesSection) return;

            const rect = prizesSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                countersAnimated = true;
                counters.forEach((counter, index) => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    setTimeout(() => this.animateCounter(counter, 0, target, 1500), index * 200);
                });
            }
        };

        window.addEventListener('scroll', animateCounters);
        animateCounters();
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + range * easeOutQuart);
            element.textContent = `₹${current.toLocaleString('en-IN')}`;

            if (progress < 1) requestAnimationFrame(updateCounter);
            else {
                element.textContent = `₹${end.toLocaleString('en-IN')}`;
                element.style.transform = 'scale(1.1)';
                setTimeout(() => element.style.transform = 'scale(1)', 200);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // ===== Gallery Slider =====
    initGallerySlider() {
        const slider = document.getElementById('gallery-slider');
        const slides = document.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.gallery-dot');
        if (!slider || !slides.length || !dots.length) return;

        let currentSlide = 0;
        let autoSlideInterval;

        slides.forEach(slide => slide.style.width = '100%');
        slider.style.overflow = 'hidden';

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
        const startAutoSlide = () => autoSlideInterval = setInterval(nextSlide, 4000);
        const stopAutoSlide = () => clearInterval(autoSlideInterval);

        dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); stopAutoSlide(); startAutoSlide(); }));
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }

    // ===== Mobile Menu =====
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        if (!navToggle || !navMenu) return;

        const resetHamburger = () => {
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => { span.style.transform = 'none'; span.style.opacity = '1'; });
        };

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px,6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px,-6px)';
                } else resetHamburger();
            });
        });

        navLinks.forEach(link => link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            resetHamburger();
        }));

        document.addEventListener('click', e => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                resetHamburger();
            }
        });
    }

    // ===== Smooth Scroll =====
    initSmoothScrolling() {
        document.addEventListener('click', e => {
            if (e.target.matches('.nav-link[href^="#"]') || e.target.matches('a[href^="#"]:not([data-slide])')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 0.05 * window.innerHeight : 80;
                    const targetPosition = targetSection.offsetTop - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    this.updateActiveNavLink(targetId);
                }
            }
        });
    }

    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === targetId) link.classList.add('active'); });
    }

    // ===== Back To Top =====
    initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ===== Navbar Scroll =====
    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const updateNavbar = () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0,0,0,0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(0,0,0,0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }
        };

        window.addEventListener('scroll', updateNavbar);
    }

    // ===== Scroll Events =====
    handleScroll() {
        const scrolled = window.pageYOffset;
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) backToTopBtn.classList.toggle('show', scrolled > 300);

        this.updateActiveNavOnScroll();

        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles && scrolled < window.innerHeight) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight + 50 : 100;
        let activeSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
                activeSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`));
    }

    handleResize() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (window.innerWidth > 768 && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.querySelectorAll('span').forEach(span => { span.style.transform = 'none'; span.style.opacity = '1'; });
        }
    }

    // ===== Load Animations =====
    startLoadAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const countdownContainer = document.querySelector('.countdown-container');
        const heroButtons = document.querySelector('.hero-buttons');

        const animateElement = (el, delay = 0) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            setTimeout(() => {
                el.style.transition = 'all 1s cubic-bezier(0.4,0,0.2,1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
        };

        animateElement(heroTitle, 200);
        animateElement(heroSubtitle, 400);
        animateElement(countdownContainer, 600);
        animateElement(heroButtons, 800);
    }
}

// ===== Problem Cards =====
class ProblemCardInteractions {
    constructor() { this.initProblemCards(); }

    initProblemCards() {
        const cards = document.querySelectorAll('.problem-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.showProblemDetails(card));
            card.addEventListener('mouseenter', () => this.animateCard(card, true));
            card.addEventListener('mouseleave', () => this.animateCard(card, false));
        });
    }

    animateCard(card, hover) {
        const hoverEl = card.querySelector('.problem-hover');
        if (hover) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            if (hoverEl) { hoverEl.style.opacity = '1'; hoverEl.style.transform = 'scale(1)'; }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            if (hoverEl) { hoverEl.style.opacity = '0'; hoverEl.style.transform = 'scale(0)'; }
        }
    }

    showProblemDetails(card) {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        const modal = this.createModal(title, desc);
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        setTimeout(() => this.removeModal(modal), 3000);
    }

    createModal(title, desc) {
        const modal = document.createElement('div');
        modal.className = 'problem-modal';
        modal.innerHTML = `
        <div class="modal-overlay">
          <div class="modal-content">
            <h3>${title}</h3>
            <p>${desc}</p>
            <button class="modal-close">×</button>
          </div>
        </div>`;
        modal.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; z-index:2000; opacity:0; visibility:hidden; transition: all 0.3s ease;`;

        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = 'width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; padding:2rem;';

        const content = modal.querySelector('.modal-content');
        content.style.cssText = 'background:white; border-radius:20px; padding:2rem; max-width:90%; width:100%; position:relative; transform:scale(0.8); transition:transform 0.3s ease;';

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.removeModal(modal));
        overlay.addEventListener('click', e => { if (e.target === overlay) this.removeModal(modal); });

        return modal;
    }

    removeModal(modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        setTimeout(() => modal.remove(), 300);
    }

    // ===== Particle Cursor Effect =====
    initParticleCursor() {
        const particles = [];
        let animationId;

        const createParticle = (x, y) => {
            return {
                x: x,
                y: y,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 1)' : 'rgba(255, 107, 107, 1)'
            };
        };

        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', (e) => {
            for (let i = 0; i < 3; i++) {
                particles.push(createParticle(e.clientX, e.clientY));
            }
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= particle.decay;
                
                if (particle.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color.replace('1)', `${particle.life})`);
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ===== Tech Effects =====
    initTechEffects() {
        // Add glitch effect to titles on hover
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.style.animation = 'glitch 0.5s ease-in-out';
            });
            
            title.addEventListener('animationend', () => {
                title.style.animation = '';
            });
        });

        // Add pulse effect to important buttons
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.animation = 'button-pulse 0.3s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
    }
}

// ===== Action Buttons =====
class ActionButtons {
    constructor() { this.initButtons(); }
    initButtons() {
        console.log('Action buttons initialized');
    }
}

// ===== Initialize all =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Initializing Hack2TechSustain 2.0 - Sustainovate...');
    new HackathonWebsite();
    new ProblemCardInteractions();
    new ActionButtons();
});
