document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // 2. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    // 3. Sticky Navbar & Active Links
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Navbar styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Back to Top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 6. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / 50); // Increment
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = current;
                }
            }, 30); // 30ms between updates for smoothness
        });
    };

    const counterSection = document.querySelector('.trust-section');
    window.addEventListener('scroll', () => {
        if (!hasAnimated && counterSection) {
            const sectionTop = counterSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                animateCounters();
                hasAnimated = true;
            }
        }
    });

    // 7. Customer Reviews Slider
    const reviews = [
        {
            name: "Sarah Johnson",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★★",
            text: "Incredible service! Bought my iPhone 15 here and the staff was extremely helpful. Highly recommend for premium gadgets."
        },
        {
            name: "Michael Chen",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★★",
            text: "Best mobile shop in the city. They offered a great exchange value for my old phone and set up everything perfectly."
        },
        {
            name: "Emma Williams",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★☆",
            text: "Great collection of accessories. Found the exact smartwatch strap I was looking for. Will visit again!"
        },
        {
            name: "David Smith",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★★",
            text: "Exceptional after-sales support. Had a minor issue with my device and they resolved it within minutes."
        },
        {
            name: "Jessica Taylor",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★★",
            text: "The delivery was surprisingly fast! Ordered online and received it the very next day securely packaged."
        },
        {
            name: "Robert Brown",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
            rating: "★★★★☆",
            text: "Very knowledgeable staff. They helped me choose the right phone based on my budget and needs."
        }
    ];

    const sliderContainer = document.getElementById('reviewSlider');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;

    if (sliderContainer && dotsContainer) {
        // Generate Reviews
        reviews.forEach((review, index) => {
            const slide = document.createElement('div');
            slide.classList.add('review-card');
            slide.innerHTML = `
                <img src="${review.img}" alt="${review.name}" class="reviewer-img">
                <div class="rating">${review.rating}</div>
                <p class="review-text">"${review.text}"</p>
                <h4 class="reviewer-name">${review.name}</h4>
            `;
            sliderContainer.appendChild(slide);

            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const updateSlider = () => {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };

        const goToSlide = (index) => {
            currentSlide = index;
            updateSlider();
        };

        document.querySelector('.prev-btn')?.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : reviews.length - 1;
            updateSlider();
        });

        document.querySelector('.next-btn')?.addEventListener('click', () => {
            currentSlide = (currentSlide < reviews.length - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide < reviews.length - 1) ? currentSlide + 1 : 0;
            updateSlider();
        }, 5000);
    }

    // 8. FAQ Accordion
    const accordions = document.querySelectorAll('.accordion-btn');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 9. Form Submissions
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccess = document.getElementById('formSuccess');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            inquiryForm.style.display = 'none';
            formSuccess.classList.remove('hidden');

            // Mock API call reset
            setTimeout(() => {
                inquiryForm.reset();
                inquiryForm.style.display = 'block';
                formSuccess.classList.add('hidden');
            }, 5000);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Subscribed!';
            btn.style.backgroundColor = '#28a745';
            btn.style.borderColor = '#28a745';

            setTimeout(() => {
                newsletterForm.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
            }, 3000);
        });
    }

    // 10. Product Search and Filter
    const searchInput = document.getElementById('productSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card[data-brand]');

    const filterProducts = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

        productCards.forEach(card => {
            const brand = card.getAttribute('data-brand');
            const name = card.querySelector('.product-name').innerText.toLowerCase();
            const brandText = card.querySelector('.product-brand').innerText.toLowerCase();

            const matchesSearch = name.includes(searchTerm) || brandText.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || brand === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProducts();
            });
        });
    }

    // 11. Quick View Modal
    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    // Mock product data
    const productData = {
        1: { name: "iPhone 15 Pro", price: "$999", img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400", desc: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system." },
        2: { name: "Samsung Galaxy S24 Ultra", price: "$1299", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400", desc: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility." },
        3: { name: "Google Pixel 8 Pro", price: "$899", img: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=400", desc: "Meet Pixel 8 Pro, the all-pro phone engineered by Google. It's sleek, fast, and secure with the new Google Tensor G3 chip." },
        4: { name: "OnePlus 12", price: "$799", img: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=400", desc: "Experience the pinnacle of performance with the Snapdragon 8 Gen 3 and the 4th Gen Hasselblad Camera for Mobile." },
        5: { name: "Xiaomi 14 Pro", price: "$899", img: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=400", desc: "Capture the moment with Leica Summilux optical lenses and the power of Snapdragon 8 Gen 3." },
        6: { name: "Vivo X100 Pro", price: "$949", img: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=400", desc: "Redefine photography with the Zeiss APO floating telephoto camera and Dimensity 9300 flagship chip." },
        7: { name: "Oppo Find X7 Ultra", price: "$999", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400", desc: "Dual periscope telephoto cameras co-engineered with Hasselblad for unmatched portrait photography." },
        8: { name: "Realme GT 5 Pro", price: "$699", img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400", desc: "Unleash extreme performance with the Snapdragon 8 Gen 3 and ultra-fast 100W charging." }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const data = productData[id];

            if (data) {
                modalBody.innerHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
                        <img src="${data.img}" alt="${data.name}" style="border-radius: 10px; width: 100%;">
                        <div>
                            <h2 style="margin-bottom: 0.5rem; color: var(--clr-dark-blue); font-family: var(--ff-secondary);">${data.name}</h2>
                            <h3 style="color: var(--clr-electric-blue); margin-bottom: 1rem; font-size: 1.5rem;">${data.price}</h3>
                            <p style="margin-bottom: 1.5rem; color: var(--clr-gray-dark);">${data.desc}</p>
                            <button class="btn btn-primary btn-block">Add to Cart</button>
                        </div>
                    </div>
                `;
                modal.classList.add('show');
            }
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});