// contact-script.js - Contact Page Specific Interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page script loaded');
    
    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('mainContactForm');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showNotification('Thank you! Your message has been sent. We will get back to you soon.');
                }, 2000);
            }, 1500);
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Field validation
    function validateField(field) {
        if (!field.checkValidity() && field.value.trim() !== '') {
            showFieldError(field, getValidationMessage(field));
        } else {
            clearFieldError(field);
        }
    }
    
    function getValidationMessage(field) {
        if (field.validity.valueMissing) {
            return 'This field is required';
        }
        if (field.validity.typeMismatch) {
            if (field.type === 'email') return 'Please enter a valid email address';
            if (field.type === 'tel') return 'Please enter a valid phone number';
        }
        return 'Please check this field';
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        
        field.parentNode.appendChild(error);
        field.style.borderColor = '#ef4444';
    }
    
    function clearFieldError(field) {
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
        field.style.borderColor = '';
    }
    
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Add CSS animations
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===== MAP BUTTON HOVER EFFECTS =====
    const mapButtons = document.querySelectorAll('.location-map-btn');
    
    mapButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ===== EMERGENCY BUTTON PULSE EFFECT =====
    const emergencyBtn = document.querySelector('.emergency-btn');
    
    if (emergencyBtn) {
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
                }
            }
            
            .emergency-btn {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Stop pulse on hover
        emergencyBtn.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        emergencyBtn.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // ===== CONTACT OPTION CARD INTERACTIONS =====
    const optionCards = document.querySelectorAll('.contact-option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-option-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-option-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FORM INPUT ANIMATIONS =====
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });
        
        // Add character counter for textareas
        if (input.tagName === 'TEXTAREA') {
            const maxLength = 1000;
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = `0/${maxLength}`;
            counter.style.cssText = `
                font-size: 0.75rem;
                color: var(--gray-400);
                text-align: right;
                margin-top: 0.25rem;
                display: none;
            `;
            
            input.parentNode.appendChild(counter);
            
            input.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = `${length}/${maxLength}`;
                counter.style.display = length > 0 ? 'block' : 'none';
                
                if (length > maxLength * 0.9) {
                    counter.style.color = '#EF4444';
                } else if (length > maxLength * 0.75) {
                    counter.style.color = '#F59E0B';
                } else {
                    counter.style.color = 'var(--gray-400)';
                }
            });
        }
    });
    
    // ===== INITIALIZATION =====
    console.log('Contact page interactions initialized');
});