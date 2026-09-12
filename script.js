// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Services Accordion
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        
        header.addEventListener('click', () => {
            // Close all other items
            serviceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Adjust for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show-mobile');
        });
    }

    // 5. Hero & Page Hero Parallax Effect
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-hero');
    const heroBg = heroSection ? heroSection.querySelector('.hero-bg') : null;
    const heroContent = heroSection ? (heroSection.querySelector('.hero-content') || heroSection.querySelector('.page-hero-content')) : null;
    const statsContainer = document.querySelector('.stats-container');

    if (heroSection && heroBg && heroContent) {
        let mouseX = 0, mouseY = 0;
        let currentMouseX = 0, currentMouseY = 0;
        let isHeroHovered = false;

        // Mouse Parallax on Desktop
        if (window.matchMedia('(pointer: fine)').matches) {
            heroSection.addEventListener('mousemove', (e) => {
                isHeroHovered = true;
                const rect = heroSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                mouseX = x * 20;
                mouseY = y * 20;
            });

            heroSection.addEventListener('mouseleave', () => {
                isHeroHovered = false;
                mouseX = 0;
                mouseY = 0;
            });
        }

        // Animation Loop for Buttery Smooth Interpolation
        function updateParallax() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = heroSection.offsetHeight;

            // Only calculate if hero is visible in viewport
            if (scrollY <= heroHeight + 50) {
                // Smooth mouse interpolation (lerp)
                currentMouseX += (mouseX - currentMouseX) * 0.08;
                currentMouseY += (mouseY - currentMouseY) * 0.08;

                // 1. Background Parallax (slow scroll translation + subtle counter-mouse)
                const bgScrollY = scrollY * 0.35;
                const bgMouseX = -currentMouseX * 0.6;
                const bgMouseY = -currentMouseY * 0.6;
                heroBg.style.transform = `translate3d(${bgMouseX}px, ${bgScrollY + bgMouseY}px, 0)`;

                // 2. Hero Content Parallax & Fade
                const contentScrollY = scrollY * 0.22;
                const contentMouseX = currentMouseX * 0.5;
                const contentMouseY = currentMouseY * 0.5;
                const contentOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.7));
                heroContent.style.transform = `translate3d(${contentMouseX}px, ${contentScrollY + contentMouseY}px, 0)`;
                heroContent.style.opacity = contentOpacity;

                // 3. Stats Bar Parallax & Fade
                if (statsContainer) {
                    const statsScrollY = scrollY * 0.1;
                    const statsOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.85));
                    statsContainer.style.transform = `translate3d(calc(-50% + ${currentMouseX * 0.2}px), ${statsScrollY}px, 0)`;
                    statsContainer.style.opacity = statsOpacity;
                }
            }

            requestAnimationFrame(updateParallax);
        }

        requestAnimationFrame(updateParallax);
    }

    // 5. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }
});
