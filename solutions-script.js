// solutions-script.js - Solutions Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Solutions page loaded');
    
    // Tab functionality
    initTabs();
    
    // Form submission
    initForm();
    
    // Animation effects
    initAnimations();
    
    // Interactive process steps
    initInteractiveProcess();
});

// Initialize tab switching
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.dataset.tab;
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
                
                // Add animation
                tabPane.style.opacity = '0';
                tabPane.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    tabPane.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    tabPane.style.opacity = '1';
                    tabPane.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
}

// Initialize form submission
function initForm() {
    const form = document.getElementById('solutionInquiry');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <div class="loading-spinner" style="width: 16px; height: 16px; margin-right: 8px;"></div>
            <span>Submitting...</span>
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success
            submitBtn.innerHTML = `
                <i class="fas fa-check"></i>
                <span>Inquiry Submitted!</span>
            `;
            submitBtn.style.backgroundColor = '#10B981';
            
            // Reset form and button
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                
                // Show thank you message
                showNotification('Thank you! Our solutions team will contact you within 24 hours.');
            }, 2000);
        }, 1500);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Animate process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
    
    // Animate case studies
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// Initialize interactive process steps
function initInteractiveProcess() {
    const processSteps = document.querySelectorAll('.process-step');
    const expandAllBtn = document.getElementById('expandAllSteps');
    let allExpanded = false;
    
    if (!processSteps.length) return;
    
    // Set initial state: expand first step by default
    processSteps[0].classList.add('expanded');
    
    // Add click event to each step header
    processSteps.forEach(step => {
        const header = step.querySelector('.process-step-header');
        const details = step.querySelector('.step-content-details');
        
        header.addEventListener('click', () => {
            const isExpanded = step.classList.contains('expanded');
            
            // Toggle this step
            step.classList.toggle('expanded');
            
            // Update ARIA attributes
            header.setAttribute('aria-expanded', !isExpanded);
            
            // Close other steps if this one is opening (accordion behavior)
            // Remove this block if you want multiple steps open
            if (!isExpanded) {
                processSteps.forEach(otherStep => {
                    if (otherStep !== step && otherStep.classList.contains('expanded')) {
                        otherStep.classList.remove('expanded');
                        otherStep.querySelector('.process-step-header').setAttribute('aria-expanded', 'false');
                    }
                });
            }
            
            // Update expand all button text
            updateExpandAllButton();
        });
        
        // Add animation on expand
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isExpanded = step.classList.contains('expanded');
                    if (isExpanded) {
                        // Animate in
                        details.style.opacity = '0';
                        details.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            details.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            details.style.opacity = '1';
                            details.style.transform = 'translateY(0)';
                        }, 50);
                    }
                }
            });
        });
        
        observer.observe(step, { attributes: true });
    });
    
    // Expand/Collapse All button
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            allExpanded = !allExpanded;
            
            processSteps.forEach(step => {
                const header = step.querySelector('.process-step-header');
                if (allExpanded) {
                    step.classList.add('expanded');
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    step.classList.remove('expanded');
                    header.setAttribute('aria-expanded', 'false');
                }
            });
            
            updateExpandAllButton();
        });
    }
    
    function updateExpandAllButton() {
        if (!expandAllBtn) return;
        
        const expandedSteps = document.querySelectorAll('.process-step.expanded').length;
        const totalSteps = processSteps.length;
        
        if (expandedSteps === totalSteps) {
            expandAllBtn.innerHTML = `
                <i class="fas fa-compress-alt"></i>
                <span>Collapse All Steps</span>
            `;
            allExpanded = true;
        } else {
            expandAllBtn.innerHTML = `
                <i class="fas fa-expand-alt"></i>
                <span>Expand All Steps</span>
            `;
            allExpanded = false;
        }
    }
    
    // Initialize ARIA attributes
    processSteps.forEach(step => {
        const header = step.querySelector('.process-step-header');
        const isExpanded = step.classList.contains('expanded');
        header.setAttribute('aria-expanded', isExpanded);
        header.setAttribute('aria-controls', `step-${step.dataset.step}-details`);
        
        const details = step.querySelector('.step-content-details');
        details.id = `step-${step.dataset.step}-details`;
    });
    
    // Add animation for step headers
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// Helper function to create loading spinner
function createLoadingSpinner(size = 16) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    `;
    return spinner;
}

// Add CSS animations to the document
const style = document.createElement('style');
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
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
    }
    
    /* Smooth transitions for process steps */
    .process-step {
        transition: all 0.3s ease;
    }
    
    .step-content-details {
        transition: all 0.4s ease;
    }
    
    /* Tab animations */
    .tab-pane {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Optional: Add keyboard navigation for process steps
document.addEventListener('keydown', function(e) {
    const activeStep = document.querySelector('.process-step.expanded');
    if (!activeStep || !e.target.closest('.process-step-header')) return;
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextStep = activeStep.nextElementSibling;
        if (nextStep && nextStep.classList.contains('process-step')) {
            nextStep.querySelector('.process-step-header').click();
            nextStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevStep = activeStep.previousElementSibling;
        if (prevStep && prevStep.classList.contains('process-step')) {
            prevStep.querySelector('.process-step-header').click();
            prevStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        const firstStep = document.querySelector('.process-step');
        if (firstStep) {
            firstStep.querySelector('.process-step-header').click();
            firstStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (e.key === 'End') {
        e.preventDefault();
        const steps = document.querySelectorAll('.process-step');
        const lastStep = steps[steps.length - 1];
        if (lastStep) {
            lastStep.querySelector('.process-step-header').click();
            lastStep.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
});

console.log('Solutions script initialized');