// about-script.js - About Page Specific Animations & Interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('About page script loaded');
    
    // ===== ANIMATED COUNTERS =====
    function animateCounters() {
        const counters = document.querySelectorAll('.about-stat-number');
        
        if (counters.length === 0) {
            console.warn('No counters found. Check HTML structure.');
            return;
        }
        
        console.log(`Animating ${counters.length} counters...`);
        
        counters.forEach((counter, index) => {
            // Get target value from data-count attribute
            const target = parseInt(counter.getAttribute('data-count'));
            
            if (isNaN(target)) {
                console.error(`Invalid data-count value for counter ${index}:`, counter.getAttribute('data-count'));
                return;
            }
            
            // Set initial value to 0
            const initialValue = counter.textContent;
            counter.textContent = '0';
            
            // Animation settings
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            function updateCounter() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuad = (t) => t * (2 - t);
                const easedProgress = easeOutQuad(progress);
                
                // Calculate current value
                const currentValue = Math.floor(target * easedProgress);
                counter.textContent = currentValue;
                
                // Continue animation if not finished
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    console.log(`Counter ${index} completed: ${target}`);
                }
            }
            
            // Start animation with IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log(`Counter ${index} entered viewport, starting animation...`);
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5, // Start when 50% of element is visible
                rootMargin: '100px' // Start 100px before element enters viewport
            });
            
            observer.observe(counter);
        });
    }
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    function initScrollReveal() {
        const elements = document.querySelectorAll(
            '.about-value-card, .about-leader-card, .about-achievement-card, .about-timeline-content'
        );
        
        console.log(`Setting up scroll reveal for ${elements.length} elements`);
        
        // Add CSS for animations
        const revealStyle = document.createElement('style');
        revealStyle.textContent = `
            .about-value-card,
            .about-leader-card,
            .about-achievement-card,
            .about-timeline-content {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .about-value-card.revealed,
            .about-leader-card.revealed,
            .about-achievement-card.revealed,
            .about-timeline-content.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Staggered animation delays */
            .about-value-card.revealed:nth-child(1) { transition-delay: 0.1s; }
            .about-value-card.revealed:nth-child(2) { transition-delay: 0.2s; }
            .about-value-card.revealed:nth-child(3) { transition-delay: 0.3s; }
            .about-value-card.revealed:nth-child(4) { transition-delay: 0.4s; }
            
            .about-leader-card.revealed:nth-child(1) { transition-delay: 0.1s; }
            .about-leader-card.revealed:nth-child(2) { transition-delay: 0.2s; }
            .about-leader-card.revealed:nth-child(3) { transition-delay: 0.3s; }
            
            .about-achievement-card.revealed:nth-child(1) { transition-delay: 0.1s; }
            .about-achievement-card.revealed:nth-child(2) { transition-delay: 0.2s; }
            .about-achievement-card.revealed:nth-child(3) { transition-delay: 0.3s; }
            .about-achievement-card.revealed:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(revealStyle);
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe all elements
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ===== FLOATING ELEMENTS INTERACTION =====
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.about-floating-element');
        const container = document.querySelector('.about-visual-container');
        
        if (floatingElements.length === 0 || !container) {
            return; // Exit if no floating elements
        }
        
        console.log(`Initializing ${floatingElements.length} floating elements`);
        
        // Add floating animation CSS
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .about-floating-element {
                animation: float 6s ease-in-out infinite;
            }
            
            .about-floating-element.el1 { animation-delay: 0s; }
            .about-floating-element.el2 { animation-delay: 2s; }
            .about-floating-element.el3 { animation-delay: 4s; }
            
            /* Hover effect */
            .about-floating-element:hover {
                animation-play-state: paused;
                transform: scale(1.1) !important;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(floatStyle);
        
        // Mouse interaction for desktop
        if (window.innerWidth > 768) {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                floatingElements.forEach(element => {
                    const elRect = element.getBoundingClientRect();
                    const elementX = elRect.left - rect.left + elRect.width / 2;
                    const elementY = elRect.top - rect.top + elRect.height / 2;
                    
                    const distanceX = mouseX - elementX;
                    const distanceY = mouseY - elementY;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    
                    // Repel effect when mouse is close
                    if (distance < 150) {
                        const strength = Math.min(20 / distance, 10);
                        const moveX = -distanceX / distance * strength;
                        const moveY = -distanceY / distance * strength;
                        
                        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                        element.style.transition = 'transform 0.1s ease';
                    }
                });
            });
            
            // Reset positions when mouse leaves
            container.addEventListener('mouseleave', () => {
                floatingElements.forEach(element => {
                    element.style.transform = '';
                    element.style.transition = 'transform 0.3s ease';
                });
            });
            
            // Click effect
            floatingElements.forEach(element => {
                element.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
                
                // Make elements clickable
                element.style.cursor = 'pointer';
            });
        }
    }
    
    // ===== TIMELINE INTERACTIONS =====
    function initTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.about-timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Add hover effect
            item.addEventListener('mouseenter', () => {
                const marker = item.querySelector('.about-marker-dot');
                if (marker) {
                    marker.style.transform = 'scale(1.2)';
                    marker.style.boxShadow = '0 0 0 6px rgba(59, 130, 246, 0.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const marker = item.querySelector('.about-marker-dot');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                    marker.style.boxShadow = '0 0 0 4px var(--primary-light)';
                }
            });
            
            // Add click to expand details (optional)
            item.addEventListener('click', function() {
                const content = this.querySelector('.about-timeline-content');
                if (content) {
                    content.classList.toggle('expanded');
                }
            });
        });
    }
    
    // ===== LEADERSHIP CARDS INTERACTION =====
    function initLeadershipInteractions() {
        const leaderCards = document.querySelectorAll('.about-leader-card');
        
        leaderCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                const image = this.querySelector('.about-leader-image');
                const badge = this.querySelector('.about-leader-badge');
                
                if (image) {
                    image.style.transform = 'translateY(-10px)';
                    image.style.transition = 'transform 0.3s ease';
                }
                
                if (badge) {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.backgroundColor = 'var(--primary-dark)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('.about-leader-image');
                const badge = this.querySelector('.about-leader-badge');
                
                if (image) {
                    image.style.transform = '';
                }
                
                if (badge) {
                    badge.style.transform = '';
                    badge.style.backgroundColor = 'var(--primary)';
                }
            });
            
            // Social links hover effect
            const socialLinks = card.querySelectorAll('.about-leader-contact a');
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) rotate(5deg)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        });
    }
    
    // ===== CTA BUTTON ANIMATIONS =====
    function initCTAAnimations() {
        const ctaButtons = document.querySelectorAll('.about-cta-button');
        
        ctaButtons.forEach(button => {
            // Add hover effect
            button.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(5px)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
            
            // Add ripple effect
            button.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: 100px;
                    height: 100px;
                    top: ${y - 50}px;
                    left: ${x - 50}px;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .about-cta-button {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // ===== PAGE LOAD ANIMATION =====
    function initPageLoadAnimation() {
        // Add fade-in animation for page content
        const pageLoadStyle = document.createElement('style');
        pageLoadStyle.textContent = `
            .about-page {
                animation: pageFadeIn 0.8s ease-out;
            }
            
            @keyframes pageFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            /* Hero section entrance animation */
            .about-hero-content {
                animation: heroEntrance 1s ease-out 0.2s both;
            }
            
            @keyframes heroEntrance {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Visual cards entrance */
            .about-visual-card {
                animation: cardEntrance 0.6s ease-out var(--delay) both;
            }
            
            .about-visual-card:nth-child(1) { --delay: 0.3s; }
            .about-visual-card:nth-child(2) { --delay: 0.5s; }
            .about-visual-card:nth-child(3) { --delay: 0.7s; }
            
            @keyframes cardEntrance {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(pageLoadStyle);
    }
    
    // ===== INITIALIZE ALL ANIMATIONS =====
    function initializeAboutPage() {
        console.log('Initializing About page animations...');
        
        // Step 1: Page load animations
        initPageLoadAnimation();
        
        // Step 2: Wait a bit for page to settle, then start other animations
        setTimeout(() => {
            // Step 3: Start counters
            animateCounters();
            
            // Step 4: Initialize scroll reveal
            initScrollReveal();
            
            // Step 5: Initialize floating elements
            initFloatingElements();
            
            // Step 6: Initialize timeline interactions
            initTimelineInteractions();
            
            // Step 7: Initialize leadership card interactions
            initLeadershipInteractions();
            
            // Step 8: Initialize CTA animations
            initCTAAnimations();
            
            console.log('About page animations initialized successfully!');
        }, 300); // Small delay to ensure page is ready
    }
    
    // ===== RESIZE HANDLER =====
    function handleResize() {
        // Re-initialize floating elements if needed
        if (window.innerWidth > 768) {
            initFloatingElements();
        }
    }
    
    // ===== ERROR HANDLING =====
    function handleErrors(error) {
        console.error('About page script error:', error);
        
        // Fallback: Ensure counters at least show final numbers
        const counters = document.querySelectorAll('.about-stat-number');
        counters.forEach(counter => {
            const target = counter.getAttribute('data-count');
            if (target) {
                counter.textContent = target;
            }
        });
    }
    
    // ===== MAIN INITIALIZATION =====
    try {
        // Initialize everything
        initializeAboutPage();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('resize', handleResize);
        });
        
    } catch (error) {
        handleErrors(error);
    }
});