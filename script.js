// script.js - Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.flexDirection = 'column';
                navLinks.style.backgroundColor = 'var(--white)';
                navLinks.style.padding = 'var(--space-8)';
                navLinks.style.gap = 'var(--space-4)';
                navLinks.style.boxShadow = 'var(--shadow-xl)';
                navLinks.style.borderTop = '1px solid var(--gray-200)';
                
                // Animate hamburger
                const lines = menuToggle.querySelectorAll('.menu-line');
                lines[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                lines[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                // Reset hamburger
                const lines = menuToggle.querySelectorAll('.menu-line');
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    const lines = menuToggle.querySelectorAll('.menu-line');
                    lines[0].style.transform = 'none';
                    lines[1].style.transform = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.floating-element').forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            el.style.transform = `translateY(${rate * speed}px) ${el.style.transform.split(' ').slice(1).join(' ')}`;
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add animation classes
    const animateIn = `
        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeUp 0.6s ease-out forwards;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = animateIn;
    document.head.appendChild(style);
    
    // Observe elements
    document.querySelectorAll('.product-card, .solution-item').forEach(el => {
        observer.observe(el);
    });
    
    // Sticky navigation with scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
    });
    
    // Product card hover effect
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.product-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.product-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Ripple effect for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Floating elements interaction enhancement
    const container = document.querySelector('.floating-elements-container');
    const elements = document.querySelectorAll('.floating-element');
    
    if (container && elements.length > 0 && window.innerWidth > 768) {
        // Mouse move effect
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            elements.forEach(el => {
                const elRect = el.getBoundingClientRect();
                const elCenterX = elRect.left - rect.left + elRect.width / 2;
                const elCenterY = elRect.top - rect.top + elRect.height / 2;
                
                const distanceX = x - elCenterX;
                const distanceY = y - elCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                
                // Move away from cursor slightly
                const repelStrength = Math.min(30 / distance, 10);
                
                if (distance < 100) {
                    el.style.transform = `translate(${-distanceX / distance * repelStrength}px, 
                                                    ${-distanceY / distance * repelStrength}px)`;
                }
            });
        });
        
        // Reset position on mouse leave
        container.addEventListener('mouseleave', () => {
            elements.forEach(el => {
                el.style.transform = '';
            });
        });
        
        // Click effect
        elements.forEach(el => {
            el.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                this.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 200);
            });
        });
    }
    
    // Dynamic year in footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Form handling for contact (if added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="60" stroke-dashoffset="60" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="60;0;60" />
                    </circle>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <i class="fas fa-check"></i>
                    <span>Sent Successfully</span>
                `;
                submitBtn.style.backgroundColor = '#10B981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    });

        // Services diagram interactions
    function enhanceServicesDiagram() {
        const serviceNodes = document.querySelectorAll('.service-node');
        const centerSystem = document.querySelector('.center-system');
        
        // Service node hover effect
        serviceNodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                const marker = this.querySelector('.node-marker');
                const icon = this.querySelector('.node-icon');
                
                // Highlight the service
                marker.style.color = 'var(--primary)';
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                
                // Highlight connection line
                const nodeClass = this.classList[1]; // Get node-1, node-2, or node-3
                const line = document.querySelector(`.${nodeClass.replace('node', 'line')}`);
                if (line) {
                    line.style.background = 'linear-gradient(to right, var(--primary), var(--primary-light))';
                    line.style.opacity = '1';
                    line.style.height = '2px';
                }
            });
            
            node.addEventListener('mouseleave', function() {
                const marker = this.querySelector('.node-marker');
                const icon = this.querySelector('.node-icon');
                
                // Reset styles
                marker.style.color = '';
                icon.style.transform = '';
                
                // Reset connection line
                const nodeClass = this.classList[1];
                const line = document.querySelector(`.${nodeClass.replace('node', 'line')}`);
                if (line) {
                    line.style.background = '';
                    line.style.opacity = '';
                    line.style.height = '';
                }
            });
        });
        
        // Center system click effect
        if (centerSystem) {
            centerSystem.addEventListener('click', function() {
                this.style.transform = 'translate(-50%, -50%) scale(1.1)';
                
                setTimeout(() => {
                    this.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 300);
            });
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        enhanceServicesDiagram();
    });

    // Add this to your homepage JavaScript if you want form submission
    document.addEventListener('DOMContentLoaded', function() {
        const demoForm = document.querySelector('.demo-form');
        if (demoForm) {
            demoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = 'Processing...';
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Demo Requested!';
                    submitBtn.classList.remove('loading');
                    submitBtn.style.background = '#10b981';
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        demoForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        
                        // Show success message (optional)
                        alert('Thank you! Our team will contact you within 24 hours.');
                    }, 2000);
                }, 1500);
            });
        }
    });
});

function showToast() {
    const toast = document.getElementById("download-toast");
    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            showToast();

            setTimeout(() => {
                const link = document.createElement("a");
                link.href = "/assets/catalog.pdf";
                link.download = "Elevatech-Catalog.pdf";
                link.click();
            }, 600); // delay slightly for animation reveal
        });
    }
});


