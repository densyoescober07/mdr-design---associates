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

    // Handle initial hash navigation on page load
    if (window.location.hash) {
        setTimeout(() => {
            const hashElement = document.querySelector(window.location.hash);
            if (hashElement) {
                const headerOffset = 80;
                const elementPosition = hashElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150);
    }

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

    // 10. Luxury Architectural Image Carousel & Fullscreen Lightbox Controller
    const carouselContainer = document.getElementById('galleryCarousel');
    const carouselCards = document.querySelectorAll('.carousel-card');
    const carouselPrevBtn = document.getElementById('carouselPrevBtn');
    const carouselNextBtn = document.getElementById('carouselNextBtn');
    const paginationContainer = document.getElementById('carouselPagination');

    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCurrent = document.getElementById('lightboxCurrent');
    const lightboxTotal = document.getElementById('lightboxTotal');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

    if (carouselCards.length > 0) {
        let currentIndex = 0;
        const totalCards = carouselCards.length;
        let autoplayTimer = null;
        const autoplayDelay = 4500; // 4.5s autoplay

        // Collect gallery dataset from cards
        const galleryItems = Array.from(carouselCards).map((card, idx) => ({
            index: idx,
            src: card.getAttribute('data-src') || '',
            title: card.getAttribute('data-title') || '',
            category: card.getAttribute('data-category') || '',
            desc: card.getAttribute('data-desc') || ''
        }));

        // Generate Pagination Dots
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('button');
                dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                paginationContainer.appendChild(dot);
            }
        }

        const dots = paginationContainer ? paginationContainer.querySelectorAll('.carousel-dot') : [];

        function updateCarousel() {
            carouselCards.forEach((card, idx) => {
                // Calculate circular offset relative to currentIndex
                const offset = (idx - currentIndex + totalCards) % totalCards;

                // Remove positioning classes
                card.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2', 'hidden');

                if (offset === 0) {
                    card.classList.add('active');
                } else if (offset === 1) {
                    card.classList.add('next-1');
                } else if (offset === 2) {
                    card.classList.add('next-2');
                } else if (offset === totalCards - 1) {
                    card.classList.add('prev-1');
                } else if (offset === totalCards - 2) {
                    card.classList.add('prev-2');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Update Pagination Dots
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(index) {
            currentIndex = (index + totalCards) % totalCards;
            updateCarousel();
            restartAutoplay();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // Card Click Handler
        carouselCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if (card.classList.contains('active')) {
                    // Click active center card -> Open Fullscreen Lightbox Modal
                    openLightbox(idx);
                } else {
                    // Click side card -> Rotate into center view
                    goToSlide(idx);
                }
            });
        });

        // Navigation Buttons
        if (carouselPrevBtn) carouselPrevBtn.addEventListener('click', prevSlide);
        if (carouselNextBtn) carouselNextBtn.addEventListener('click', nextSlide);

        // Autoplay Controller
        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Pause Autoplay on Hover
        if (carouselContainer) {
            const wrapper = carouselContainer.closest('.luxury-carousel-wrapper') || carouselContainer;
            wrapper.addEventListener('mouseenter', stopAutoplay);
            wrapper.addEventListener('mouseleave', () => {
                if (!lightbox || !lightbox.classList.contains('active')) {
                    startAutoplay();
                }
            });

            // Touch Swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            }, { passive: true });

            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 45) {
                    nextSlide();
                } else if (touchEndX - touchStartX > 45) {
                    prevSlide();
                } else {
                    startAutoplay();
                }
            }, { passive: true });
        }

        // Initialize Carousel
        updateCarousel();
        startAutoplay();

        // Lightbox Functions
        let activeLightboxIndex = 0;

        function openLightbox(index) {
            if (!lightbox) return;
            stopAutoplay();
            activeLightboxIndex = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (window.lucide) lucide.createIcons();
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            startAutoplay();
        }

        function updateLightboxContent() {
            const item = galleryItems[activeLightboxIndex];
            if (!item) return;

            if (lightboxImg) {
                lightboxImg.classList.add('fade-out');
                setTimeout(() => {
                    lightboxImg.src = item.src;
                    lightboxImg.alt = item.title;
                    lightboxImg.onload = () => {
                        lightboxImg.classList.remove('fade-out');
                    };
                    if (lightboxImg.complete) {
                        lightboxImg.classList.remove('fade-out');
                    }
                }, 150);
            }

            if (lightboxCategory) lightboxCategory.textContent = item.category;
            if (lightboxTitle) lightboxTitle.textContent = item.title;
            if (lightboxDesc) lightboxDesc.textContent = item.desc;
            if (lightboxCurrent) lightboxCurrent.textContent = String(activeLightboxIndex + 1).padStart(2, '0');
            if (lightboxTotal) lightboxTotal.textContent = String(galleryItems.length).padStart(2, '0');

            // Sync carousel in background
            currentIndex = activeLightboxIndex;
            updateCarousel();
        }

        function showNextLightboxImage() {
            activeLightboxIndex = (activeLightboxIndex + 1) % galleryItems.length;
            updateLightboxContent();
        }

        function showPrevLightboxImage() {
            activeLightboxIndex = (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxContent();
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextLightboxImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightboxImage);

        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextLightboxImage();
                if (e.key === 'ArrowLeft') showPrevLightboxImage();
            } else {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
        });
    }
});
