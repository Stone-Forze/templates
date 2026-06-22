document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    const body = document.body;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('ebook-theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('ebook-theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('ebook-theme', 'light');
        }
    });

    // 2. Reading Progress Bar
    const progressBar = document.getElementById('reading-progress');

    const updateProgress = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    // Initialize progress on load
    updateProgress();

    // 3. Highlight Active Chapter in Table of Contents
    const chapters = document.querySelectorAll('.chapter');
    const tocLinks = document.querySelectorAll('.toc-link');

    const highlightActiveChapter = () => {
        let currentChapterId = '';

        // Add a slight offset to detect chapter when scrolling down
        const scrollPosition = window.scrollY + 100;

        chapters.forEach(chapter => {
            if (chapter.offsetTop <= scrollPosition) {
                currentChapterId = chapter.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentChapterId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveChapter, { passive: true });
    // Initialize on load
    highlightActiveChapter();

    // 4. Smooth Scrolling for ToC Links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Offset by 80px to account for fixed header
                const targetPosition = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close sidebar on mobile after clicking a link
                if (window.innerWidth <= 992) {
                    toggleSidebar();
                }
            }
        });
    });

    // 5. Mobile Sidebar Toggle
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            sidebarToggleBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = ''; // Restore scrolling
        } else {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            sidebarToggleBtn.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
});