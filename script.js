document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500); // Small delay to ensure smooth transition
    });

    // --- 2. Scroll Progress Indicator ---
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // --- 3. Sticky Navigation & Active Links ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
    };

    // Use IntersectionObserver to start counters when visible
    const statsSection = document.querySelector('.trust-section');
    if(statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Also observe the second stats section
    const statsSection2 = document.querySelector('.stats-section');
    if(statsSection2) {
        const statsObserver2 = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Re-select counters in this specific section to avoid double animating first ones if they already ran,
                // but for simplicity we can just rely on the first observer or a class flag per counter.
                // A better approach is attaching observer to individual counters.
                entries[0].target.querySelectorAll('.counter').forEach(counter => {
                    if(!counter.classList.contains('animated')) {
                         const target = +counter.getAttribute('data-target');
                         const duration = 2000;
                         const increment = target / (duration / 16);
                         let current = 0;
                         const update = () => {
                             current += increment;
                             if(current < target) {
                                 counter.innerText = Math.ceil(current).toLocaleString();
                                 requestAnimationFrame(update);
                             } else {
                                 counter.innerText = target.toLocaleString();
                                 counter.classList.add('animated');
                             }
                         };
                         update();
                    }
                });
            }
        }, { threshold: 0.3 });
        statsObserver2.observe(statsSection2);
    }

    // --- 6. Product Quick View Modal ---
    const productsData = {
        1: { title: "Velvet Cloud Sofa", price: "$2,499", desc: "Experience unparalleled comfort with our Velvet Cloud Sofa. Upholstered in premium, stain-resistant velvet and built on a solid oak frame, this piece brings both elegance and durability to your living room.", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", features: ["Premium Velvet Upholstery", "Solid Oak Frame", "High-density Foam Cushioning", "Available in 4 Colors"] },
        2: { title: "Majestic King Bed", price: "$3,199", desc: "Transform your bedroom into a sanctuary with the Majestic King Bed. Featuring a hand-tufted headboard and exceptional ergonomic support for a perfect night's sleep.", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800", features: ["Hand-tufted Headboard", "Ergonomic Slats", "Premium Linen Fabric", "Easy Assembly"] },
        3: { title: "Marble Heritage Table", price: "$1,899", desc: "Dine in luxury with the Marble Heritage Table. Crafted from a single piece of authentic Italian marble, resting on a sleek brass-finished base.", img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800", features: ["Authentic Italian Marble", "Brass-finished Base", "Seats up to 8", "Stain-resistant Sealant"] },
        4: { title: "Executive Leather Chair", price: "$899", desc: "Command your workspace. Upholstered in genuine top-grain leather with ergonomic lumbar support and multi-tilt mechanisms.", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800", features: ["Top-grain Leather", "Adjustable Lumbar Support", "Aluminum Base", "Smooth-rolling Casters"] },
        5: { title: "Glass Horizon Table", price: "$499", desc: "A minimalist masterpiece. The Glass Horizon Table features a tempered glass top that creates an illusion of space, supported by a geometric metal frame.", img: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&q=80&w=800", features: ["Tempered Safety Glass", "Matte Black Frame", "Minimalist Design", "Easy to Clean"] },
        6: { title: "Grand Oak Wardrobe", price: "$2,100", desc: "Store your garments in style. The Grand Oak Wardrobe offers spacious interiors, soft-close doors, and built-in LED lighting.", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800", features: ["Solid Oak Construction", "Soft-close Hinges", "Built-in LED Lighting", "Adjustable Shelving"] },
        7: { title: "Modern Minimalist Console", price: "$799", desc: "Elevate your entertainment area. This TV unit features elegant walnut finishes and smart cable management solutions.", img: "https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?auto=format&fit=crop&q=80&w=800", features: ["Walnut Veneer", "Smart Cable Management", "Hidden Storage", "Accommodates up to 75\" TVs"] },
        8: { title: "Geometric Library Shelf", price: "$649", desc: "Display your books and decor on this striking asymmetrical bookshelf. Built with a sturdy metal frame and rich wooden shelves.", img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800", features: ["Sturdy Metal Frame", "Asymmetrical Layout", "Scratch-resistant Shelves", "Wall-mounting Hardware Included"] }
    };

    const modal = document.getElementById('quick-view-modal');
    const closeBtn = document.querySelector('.close-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-product');
            const data = productsData[id];

            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-price').innerText = data.price;
            document.getElementById('modal-desc').innerText = data.desc;

            const featuresList = document.getElementById('modal-features');
            featuresList.innerHTML = '';
            data.features.forEach(f => {
                const li = document.createElement('li');
                li.innerText = f;
                featuresList.appendChild(li);
            });

            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- 7. Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            // Get higher res image for lightbox
            const highResSrc = imgSrc.replace('&w=600', '&w=1200');
            lightboxImg.src = highResSrc;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightboxFunc = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', closeLightboxFunc);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFunc();
    });

    // --- 8. Testimonial Slider ---
    const track = document.querySelector('.review-track');
    const reviews = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    let currentIndex = 0;

    const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        if (currentIndex < reviews.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = reviews.length - 1; // Loop to end
        }
        updateSlider();
    });

    // Optional: Auto slide
    setInterval(() => {
        if(currentIndex < reviews.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);

    // --- 9. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 10. Forms Handling ---
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = inquiryForm.querySelector('button[type="submit"]');
            const successMsg = inquiryForm.querySelector('.form-success');

            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                successMsg.classList.remove('hidden');
                inquiryForm.reset();
                btn.innerText = 'Send Inquiry';
                btn.disabled = false;

                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const successMsg = newsletterForm.nextElementSibling;

            btn.innerText = '...';

            setTimeout(() => {
                successMsg.classList.remove('hidden');
                newsletterForm.reset();
                btn.innerText = 'Subscribe';

                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 3000);
            }, 1000);
        });
    }

    // --- 11. Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
