// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-button');
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

// Cart Elements
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const tableNumberInput = document.getElementById('tableNumber');
const submitOrderBtn = document.getElementById('submitOrder');

// Cart State
let cart = [];
let orderNumber = 1;

// Mobile Navigation Toggle
function initMobileNav() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger bars
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Menu Tab Functionality
function initMenuTabs() {
    if (tabButtons.length > 0 && menuCategories.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and categories
                tabButtons.forEach(btn => btn.classList.remove('active'));
                menuCategories.forEach(category => category.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding menu category
                const targetCategory = document.getElementById(targetTab);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                    
                    // Animate menu items
                    const categoryItems = targetCategory.querySelectorAll('.menu-item');
                    categoryItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
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
                entry.target.classList.add('animate-on-scroll');
                
                // Special animation for menu items
                if (entry.target.classList.contains('menu-item')) {
                    const menuItems = entry.target.parentElement.querySelectorAll('.menu-item');
                    const itemIndex = Array.from(menuItems).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, itemIndex * 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.menu-item, .section-title, .about-text, .contact-info');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Header Background on Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }
}

// Menu Item Hover Effects
function initMenuItemEffects() {
    menuItems.forEach(item => {
        const image = item.querySelector('.item-image');
        const content = item.querySelector('.item-content');
        
        if (image && content) {
            item.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                content.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                content.style.transform = 'translateY(0)';
            });
        }
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// CTA Button Animation
function initCTAAnimation() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Loading Animation
function initLoadingAnimation() {
    // Add fade-in animation to page elements
    const pageElements = document.querySelectorAll('.hero-content, .navbar, .section-title');
    
    pageElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab navigation for menu tabs
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-button.active');
            if (activeTab && document.activeElement === activeTab) {
                e.preventDefault();
                const tabs = Array.from(tabButtons);
                const currentIndex = tabs.indexOf(activeTab);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                } else {
                    nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                }
                
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Resize Handler
function handleResize() {
    // Close mobile menu on window resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
}

// Cart Functions
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    updateCartUI();
    
    // Show success feedback
    showAddToCartFeedback();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        submitOrderBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            </div>
        `).join('');
        submitOrderBtn.disabled = false;
    }
}

function showAddToCartFeedback() {
    // Create a temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = 'Added to cart!';
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        document.body.removeChild(feedback);
    }, 2500);
}

function submitOrder() {
    const tableNumber = tableNumberInput.value;
    
    if (!tableNumber) {
        alert('Please enter a table number');
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Create order summary
    const orderSummary = {
        orderNumber: orderNumber++,
        tableNumber: parseInt(tableNumber),
        items: cart.map(item => ({...item})),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString()
    };
    
    // Log order (in a real app, this would be sent to a server)
    console.log('Order submitted:', orderSummary);
    
    // Show success message
    alert(`Order #${orderSummary.orderNumber} submitted successfully!\nTable: ${tableNumber}\nTotal: $${orderSummary.total.toFixed(2)}\n\nThank you for your order!`);
    
    // Clear cart and close sidebar
    cart = [];
    updateCartUI();
    closeCart();
    tableNumberInput.value = '';
}

function initCart() {
    // Cart button click
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    // Close cart events
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Submit order
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', submitOrder);
    }
    
    // Add event listeners to existing Add to Cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');
            addToCart(name, price);
        }
    });
    
    // Initialize cart UI
    updateCartUI();
}

// Initialize all functionality
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initApp, 100);
        });
    } else {
        setTimeout(initApp, 100);
    }
}

function initApp() {
    initMobileNav();
    initMenuTabs();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initMenuItemEffects();
    initParallaxEffect();
    initCTAAnimation();
    initLoadingAnimation();
    initKeyboardNavigation();
    initCart();
    
    // Event listeners
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('resize', handleResize);
    
    // Initial calls
    updateActiveNavLink();
}

// Start the application
init();

// Export functions for potential external use
window.CocoFunctions = {
    updateActiveNavLink,
    initMenuTabs,
    initScrollAnimations
};