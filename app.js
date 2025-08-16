// Professional Hack2TechSustain 2.0 JavaScript
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
    console.log('🚀 Hack2TechSustain 2.0 website initialized successfully!');
  }

  setupEventListeners() {
    window.addEventListener('load', () => {
      this.startLoadAnimations();
    });

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  // Professional Countdown Timer with Flip Animations
  initCountdown() {
    const targetDate = new Date('August 16, 2025 23:59:00').getTime();
    
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
      // Professional flip animation
      element.style.transform = 'rotateX(90deg)';
      element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        element.textContent = formattedValue;
        element.style.transform = 'rotateX(0deg)';
        
        // Add pulse effect for seconds
        if (elementId === 'seconds') {
          element.parentElement.style.transform = 'scale(1.05)';
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

  // Advanced Timeline Animations with Intersection Observer
  initTimelineAnimations() {
    const timelineSection = document.querySelector('.timeline-section');
    const timelineLine = document.getElementById('timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineSection || !timelineLine || !timelineItems.length) return;

    // Timeline line animation observer
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.classList.add('animate');
          
          // Animate timeline items with staggered delay
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, 300 + (index * 400)); // 400ms delay between items
          });
          
          lineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    });

    lineObserver.observe(timelineSection);

    // Individual timeline item observers for more precise control
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px'
    });

    timelineItems.forEach(item => {
      itemObserver.observe(item);
    });
  }

  // Scroll-triggered animations with Intersection Observer
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-aos-delay') || 0;
          
          setTimeout(() => {
            entry.target.classList.add('animate');
            
            // Add specific animations based on data attributes
            const animationType = entry.target.getAttribute('data-aos');
            if (animationType) {
              entry.target.style.animation = `${animationType} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
            }
          }, parseInt(delay));
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  // Animated Prize Counters
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
          
          setTimeout(() => {
            this.animateCounter(counter, 0, target, 1500);
          }, index * 200);
        });
      }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on page load
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (range * easeOutQuart));
      
      element.textContent = `₹${current.toLocaleString('en-IN')}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `₹${end.toLocaleString('en-IN')}`;
        
        // Add celebration effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 200);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // Professional Gallery Slider
  initGallerySlider() {
    const slider = document.getElementById('gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (!slider || !slides.length || !dots.length) return;

    let currentSlide = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    };

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 4000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();
  }

  // Mobile Menu Toggle
  initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (navToggle.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset hamburger
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  }

  // Smooth Scrolling Navigation
  initSmoothScrolling() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link[href^="#"]') || e.target.matches('a[href^="#"]:not([data-slide])')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navbar = document.querySelector('.navbar');
          const offset = navbar ? navbar.offsetHeight + 20 : 80;
          const targetPosition = targetSection.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active nav link
          this.updateActiveNavLink(targetId);
        }
      }
    });
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  // Back to Top Button
  initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Navbar Background on Scroll
  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const updateNavbar = () => {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', updateNavbar);
  }

  // Handle scroll events
  handleScroll() {
    const scrolled = window.pageYOffset;
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide back to top button
    if (backToTopBtn) {
      if (scrolled > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Update active navigation based on scroll position
    this.updateActiveNavOnScroll();
    
    // Parallax effect for hero particles
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
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        activeSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Handle window resize
  handleResize() {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
      if (navMenu) navMenu.classList.remove('active');
      if (navToggle) {
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    }
  }

  // Start loading animations
  startLoadAnimations() {
    // Hero content entrance animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const countdownContainer = document.querySelector('.countdown-container');
    const heroButtons = document.querySelector('.hero-buttons');

    const animateElement = (element, delay = 0) => {
      if (!element) return;
      
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
    };

    animateElement(heroTitle, 200);
    animateElement(heroSubtitle, 400);
    animateElement(countdownContainer, 600);
    animateElement(heroButtons, 800);
  }
}

// Problem Card Interactions
class ProblemCardInteractions {
  constructor() {
    this.initProblemCards();
  }

  initProblemCards() {
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
      card.addEventListener('click', () => {
        this.showProblemDetails(card);
      });
      
      // Enhanced hover effects
      card.addEventListener('mouseenter', () => {
        this.animateCard(card, true);
      });
      
      card.addEventListener('mouseleave', () => {
        this.animateCard(card, false);
      });
    });
  }

  animateCard(card, isHover) {
    const hoverElement = card.querySelector('.problem-hover');
    
    if (isHover) {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      if (hoverElement) {
        hoverElement.style.opacity = '1';
        hoverElement.style.transform = 'scale(1)';
      }
    } else {
      card.style.transform = 'translateY(0) scale(1)';
      if (hoverElement) {
        hoverElement.style.opacity = '0';
        hoverElement.style.transform = 'scale(0)';
      }
    }
  }

  showProblemDetails(card) {
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    
    // Create and show modal (simplified for this implementation)
    const modal = this.createModal(title, description);
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Remove modal after 3 seconds (or add close button)
    setTimeout(() => {
      this.removeModal(modal);
    }, 3000);
  }

  createModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'problem-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h3>${title}</h3>
          <p>${description}</p>
          <button class="modal-close">×</button>
        </div>
      </div>
    `;
    
    // Add styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
      background: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      position: relative;
      transform: scale(0.8);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
    `;
    
    // Close modal functionality
    const closeModal = () => this.removeModal(modal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    
    return modal;
  }

  removeModal(modal) {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
}

// Action Buttons Functionality
class ActionButtons {
  constructor() {
    this.initButtons();
  }

  initButtons() {
    // Submit Your Idea button (already has correct link)
    const submitBtn = document.querySelector('a[href*="forms.gle"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        console.log('Opening registration form...');
        // Let default behavior handle the link
      });
    }

    // View Brochure button
    const brochureBtn = document.querySelector('.btn-secondary');
   /* if (brochureBtn && brochureBtn.textContent.includes('View Brochure')) {
      brochureBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showBrochureAlert();
      });
    }*/
  }

  showBrochureAlert() {
    // Create professional alert
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.innerHTML = `
      <div class="alert-content">
        <i class="fas fa-info-circle"></i>
        <h4>Brochure Download</h4>
        <p>The official brochure will be available soon. Please check back later or contact us for more information.</p>
        <button class="alert-close">Got it!</button>
      </div>
    `;
    
    // Style the alert
    alert.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
      padding: 2rem;
    `;
    
    const content = alert.querySelector('.alert-content');
    content.style.cssText = `
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      max-width: 400px;
      width: 100%;
    `;
    
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
      background: var(--color-saffron);
      color: black;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1rem;
    `;
    
    document.body.appendChild(alert);
    
    // Close functionality
    const closeAlert = () => {
      document.body.removeChild(alert);
    };
    
    closeBtn.addEventListener('click', closeAlert);
    alert.addEventListener('click', (e) => {
      if (e.target === alert) closeAlert();
    });
    
    // Auto close after 4 seconds
    setTimeout(closeAlert, 4000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 Initializing Hack2TechSustain 2.0 - Sustainovate...');
  
  // Initialize main website functionality
  new HackathonWebsite();
  
  // Initialize problem card interactions
  new ProblemCardInteractions();
  
  // Initialize action buttons
  new ActionButtons();
  
  console.log('✅ All systems initialized. Ready for sustainability innovation!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause non-essential animations when page is not visible
    console.log('Page hidden - pausing animations');
  } else {
    // Resume animations when page becomes visible
    console.log('Page visible - resuming animations');
  }
});

// Prevent right-click for a more app-like experience (optional)
// Uncomment if needed:
// document.addEventListener('contextmenu', e => e.preventDefault());

