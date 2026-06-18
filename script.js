// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

function closeMobileMenu() {
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function openMobileMenu() {
    if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
    if (navMenu) navMenu.classList.add('active');
    document.body.classList.add('menu-open');
}

if (mobileMenuBtn && navMenu) {
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(navOverlay);
    }

    navOverlay.addEventListener('click', closeMobileMenu);

    mobileMenuBtn.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) closeMobileMenu();
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
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

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});


// Contact Form Handling
const contactForm = document.getElementById('contactForm');

function getSelectLabel(id, fallback) {
    const el = document.getElementById(id);
    if (!el || !el.value) return fallback;
    const option = el.options[el.selectedIndex];
    return option && option.text ? option.text : el.value;
}

function showFormSuccess(form) {
    let successEl = form.querySelector('.form-success-message');
    if (!successEl) {
        successEl = document.createElement('div');
        successEl.className = 'form-success-message';
        successEl.setAttribute('role', 'status');
        const submitBtn = form.querySelector('button[type="submit"]');
        form.insertBefore(successEl, submitBtn);
    }
    successEl.textContent = 'Message Sent! Your message has been sent successfully.';
    successEl.classList.add('visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetSubmitButton(btn, originalText) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = originalText;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Request';

        const firstName = document.getElementById('firstName')?.value.trim() || '';
        const lastNameEl = document.getElementById('lastName');
        const lastName = lastNameEl ? lastNameEl.value.trim() : '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';

        if (!firstName || !email || !phone) {
            showNotification('Please fill in all required fields.', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        const messageEl = document.getElementById('message');
        const formData = {
            id: Date.now(),
            submittedAt: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            status: 'new',
            firstName,
            lastName,
            email,
            phone,
            service: getSelectLabel('service', 'General Consultation'),
            prefDate: document.getElementById('preferredDate')?.value || 'Flexible',
            prefTime: getSelectLabel('preferredTime', 'Flexible'),
            message: messageEl?.value.trim() || 'No additional notes'
        };

        const saved = saveAppointmentRequest(formData);
        if (!saved) {
            showNotification('Message could not be saved. Please try again.', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        contactForm.reset();
        showFormSuccess(contactForm);
        showNotification('Message Sent!', 'success');

        if (submitBtn) {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => resetSubmitButton(submitBtn, originalBtnText), 3000);
        }
    });
}

// Function to save appointment request to localStorage
function saveAppointmentRequest(data) {
    try {
        let messages = JSON.parse(localStorage.getItem('tds_messages') || '[]');
        messages.unshift(data);
        localStorage.setItem('tds_messages', JSON.stringify(messages));
        return true;
    } catch (error) {
        console.error('Error saving appointment request:', error);
        return false;
    }
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #28A745;
            color: #28A745;
        }

        .notification-error {
            border-left: 4px solid #dc3545;
            color: #dc3545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6C757D;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 640px) {
            .notification {
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Set minimum date for appointment booking (today) and maximum date (limit year to 4 digits)
document.addEventListener('DOMContentLoaded', function() {
    const prefDateInput = document.getElementById('preferredDate');
    if (prefDateInput) {
        const today = new Date().toISOString().split('T')[0];
        const maxDate = '2030-12-31'; // Limit to year 2030
        prefDateInput.setAttribute('min', today);
        prefDateInput.setAttribute('max', maxDate);
        
        // Add input validation to prevent manual entry of invalid years
        prefDateInput.addEventListener('input', function(e) {
            const value = e.target.value;
            if (value) {
                const year = new Date(value).getFullYear();
                if (year > 2030 || year < new Date().getFullYear()) {
                    e.target.setCustomValidity('Please select a date between today and 2030');
                } else {
                    e.target.setCustomValidity('');
                }
            }
        });
    }
});

// Console message for developers
console.log('%c🦷 Texas Dental Services', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cWebsite built with care for optimal performance and user experience.', 'color: #6C757D; font-size: 12px;');

// Reviews Carousel 3D
const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');
const carouselWrapper = document.querySelector('.reviews-carousel-wrapper');

let currentIndex = 0;
const totalReviews = reviewCards.length;
let autoSlideInterval;

function isMobileView() {
    return window.matchMedia('(max-width: 768px)').matches;
}

function updateCarousel() {
    if (isMobileView()) {
        reviewCards.forEach((card, i) => {
            const isActive = i === currentIndex;
            card.style.opacity = isActive ? '1' : '0';
            card.style.zIndex = isActive ? '5' : '1';
            card.style.pointerEvents = isActive ? 'auto' : 'none';
            card.style.transform = 'none';
            card.style.top = '0';
            card.style.left = '0';
        });
        return;
    }

    reviewCards.forEach((card, i) => {
        let diff = i - currentIndex;

        if (diff < -Math.floor(totalReviews / 2)) diff += totalReviews;
        if (diff > Math.floor(totalReviews / 2)) diff -= totalReviews;

        card.style.opacity = 0;
        card.style.zIndex = 1;
        card.style.pointerEvents = 'none';
        card.style.transform = `translate(-50%, -50%) scale(0.5) translateZ(-400px)`;

        if (diff === 0) {
            card.style.opacity = 1;
            card.style.zIndex = 5;
            card.style.pointerEvents = 'auto';
            card.style.transform = `translate(-50%, -50%) scale(1) translateZ(0)`;
        } else if (diff === 1 || diff === -1) {
            const direction = diff > 0 ? 1 : -1;
            card.style.opacity = 0.7;
            card.style.zIndex = 4;
            card.style.transform = `translate(calc(-50% + ${direction * 110}%), -50%) scale(0.85) translateZ(-100px)`;
        } else if (diff === 2 || diff === -2) {
            const direction = diff > 0 ? 1 : -1;
            card.style.opacity = 0.4;
            card.style.zIndex = 3;
            card.style.transform = `translate(calc(-50% + ${direction * 220}%), -50%) scale(0.7) translateZ(-200px)`;
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalReviews;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initial update
if (reviewCards.length > 0) {
    updateCarousel();
    startAutoSlide();

    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselWrapper.addEventListener('mouseleave', () => startAutoSlide());
    }

    window.addEventListener('resize', () => updateCarousel());

    let touchStartX = 0;
    let touchEndX = 0;

    if (reviewsTrack) {
        reviewsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reviewsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
                resetAutoSlide();
            }
            if (touchEndX - touchStartX > 50) {
                prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });
    }
}

// FAQ Toggle Function
function toggleFAQ(button) {
    console.log('toggleFAQ called');
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
        console.log('FAQ opened');
    }
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        console.log('FAQ item clicked'); // Debug log
        
        // Close other items
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Initialize FAQ functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing FAQ...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items found:', faqItems.length);
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            console.log(`Adding click listener to FAQ item ${index + 1}`);
            
            question.addEventListener('click', () => {
                console.log(`FAQ item ${index + 1} clicked`);
                
                // Close other items
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    console.log(`FAQ item ${index + 1} opened`);
                } else {
                    console.log(`FAQ item ${index + 1} closed`);
                }
            });
        }
    });
});

// Gallery Detail Navigation
function openGalleryDetail(itemId) {
    // Navigate to detail page with the item ID
    window.location.href = `detail.html?id=${itemId}`;
}

// Gallery lightbox effect (simple version)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const titleElement = item.querySelector('h4');
        const descElement = item.querySelector('p');
        const title = titleElement ? titleElement.textContent : '';
        const desc = descElement ? descElement.textContent : '';
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${img.src}" alt="${title}">
                <h3>${title}</h3>
                ${desc ? `<p>${desc}</p>` : ''}
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
    });
});
