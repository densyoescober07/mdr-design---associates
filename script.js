// script.js - MDR DESIGNS & ASSOCIATES

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Services & FAQ Accordions
    // Home Page Services Accordion
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        if (header) {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('is-open');
            });
        }
    });

    // Services Page FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('active');
            });
        }
    });

    // 4. Scope Explorer Tabs (Services Page)
    const scopeTabs = document.querySelectorAll('.scope-tab-btn');
    const scopePanels = document.querySelectorAll('.scope-panel');

    scopeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active from all tabs & panels
            scopeTabs.forEach(t => t.classList.remove('active'));
            scopePanels.forEach(p => p.classList.remove('active'));

            // Activate clicked tab
            tab.classList.add('active');
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                if (window.lucide) lucide.createIcons();
            }
        });
    });

    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
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

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show-mobile');
            if (navLinks.classList.contains('show-mobile')) {
                mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            if (window.lucide) lucide.createIcons();
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show-mobile');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) lucide.createIcons();
            });
        });
    }

    // 7. Interactive 3D Tilt Effect for Service & Discipline Cards
    const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 769px)').matches;
    if (isFinePointer) {
        const tiltCards = document.querySelectorAll('.tilt-card, [data-tilt]');
        
        tiltCards.forEach(card => {
            const glow = card.querySelector('.tilt-card-glow');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (-8 to +8 deg)
                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
                
                if (glow) {
                    const glowX = (x / rect.width) * 100;
                    const glowY = (y / rect.height) * 100;
                    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(229, 123, 67, 0.15) 0%, transparent 60%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                if (glow) {
                    glow.style.background = 'radial-gradient(circle at 50% 0%, rgba(229, 123, 67, 0.08) 0%, transparent 60%)';
                }
            });
        });
    }

    // 8. Multi-Layer Parallax Engine (Hero, Floating Badges & Parallax Banners)
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-hero');
    const heroBg = heroSection ? heroSection.querySelector('.hero-bg') : null;
    const heroContent = heroSection ? (heroSection.querySelector('.hero-content') || heroSection.querySelector('.page-hero-content')) : null;
    const statsContainer = document.querySelector('.stats-container');
    const floatBadges = document.querySelectorAll('.parallax-float');
    const parallaxBanners = document.querySelectorAll('.parallax-banner-bg');

    let mouseX = 0, mouseY = 0;
    let currentMouseX = 0, currentMouseY = 0;

    if (heroSection && isFinePointer) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX = x * 20;
            mouseY = y * 20;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });
    }

    function updateParallax() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // Smooth mouse lerp
        currentMouseX += (mouseX - currentMouseX) * 0.08;
        currentMouseY += (mouseY - currentMouseY) * 0.08;

        // 1. Hero Parallax
        if (heroSection && heroBg && heroContent) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollY <= heroHeight + 100) {
                const bgScrollY = scrollY * 0.32;
                const bgMouseX = isFinePointer ? -currentMouseX * 0.5 : 0;
                const bgMouseY = isFinePointer ? -currentMouseY * 0.5 : 0;
                heroBg.style.transform = `translate3d(${bgMouseX}px, ${bgScrollY + bgMouseY}px, 0)`;

                const contentScrollY = scrollY * 0.16;
                const contentMouseX = isFinePointer ? currentMouseX * 0.4 : 0;
                const contentMouseY = isFinePointer ? currentMouseY * 0.4 : 0;
                const contentOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.85));
                heroContent.style.transform = `translate3d(${contentMouseX}px, ${contentScrollY + contentMouseY}px, 0)`;
                heroContent.style.opacity = contentOpacity;

                if (statsContainer) {
                    const statsScrollY = scrollY * 0.1;
                    const statsOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.9));
                    if (isFinePointer) {
                        statsContainer.style.transform = `translate3d(calc(-50% + ${currentMouseX * 0.2}px), ${statsScrollY}px, 0)`;
                    } else {
                        statsContainer.style.transform = `translate3d(0, 0, 0)`;
                    }
                    statsContainer.style.opacity = statsOpacity;
                }

                // Floating badges parallax in hero
                floatBadges.forEach(badge => {
                    const speed = parseFloat(badge.getAttribute('data-float-speed')) || 0.2;
                    const badgeX = isFinePointer ? currentMouseX * speed * 2 : 0;
                    const badgeY = (scrollY * speed) + (isFinePointer ? currentMouseY * speed * 2 : 0);
                    badge.style.transform = `translate3d(${badgeX}px, ${badgeY}px, 0)`;
                });
            }
        }

        // 2. Parallax Blueprint Banners & Mid-page background layers
        parallaxBanners.forEach(banner => {
            const rect = banner.parentElement.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = parseFloat(banner.getAttribute('data-parallax-speed')) || 0.25;
                const offset = (windowHeight / 2 - (rect.top + rect.height / 2)) * speed;
                banner.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
            }
        });

        requestAnimationFrame(updateParallax);
    }

    requestAnimationFrame(updateParallax);

    // 9. Scroll Reveal Intersection Observer
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
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }
});
