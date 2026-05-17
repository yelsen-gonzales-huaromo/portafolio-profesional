export function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const togglerIcon = navbarToggler?.querySelector('i');
    let mobileOverlay = null;

    // Create mobile menu overlay
    function createOverlay() {
        if (mobileOverlay) return;

        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-menu-overlay';
        mobileOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9997;
            opacity: 0;
            transition: opacity 0.4s ease;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        `;

        document.body.appendChild(mobileOverlay);

        // Trigger animation
        setTimeout(() => {
            mobileOverlay.style.opacity = '1';
        }, 10);

        // Close menu when clicking overlay
        mobileOverlay.addEventListener('click', () => {
            navbarToggler.click();
        });
    }

    // Remove overlay
    function removeOverlay() {
        if (!mobileOverlay) return;

        mobileOverlay.style.opacity = '0';
        setTimeout(() => {
            if (mobileOverlay && mobileOverlay.parentNode) {
                mobileOverlay.parentNode.removeChild(mobileOverlay);
                mobileOverlay = null;
            }
        }, 400);
    }

    // Toggle icon change
    function updateTogglerIcon(isOpen) {
        if (togglerIcon) {
            if (isOpen) {
                togglerIcon.classList.remove('fa-bars');
                togglerIcon.classList.add('fa-times');
            } else {
                togglerIcon.classList.remove('fa-times');
                togglerIcon.classList.add('fa-bars');
            }
        }
    }

    // Listen to Bootstrap collapse events
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            updateTogglerIcon(true);
            createOverlay();
            document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        });

        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            updateTogglerIcon(false);
            removeOverlay();
            document.body.style.overflow = ''; // Restore body scroll
        });
    }

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const progressBar = scrollTopBtn?.querySelector('.stb-bar');
    const PROGRESS_LENGTH = 163.36; // 2 * π * 26

    const updateScrollUI = () => {
        const y = window.scrollY;

        // Navbar shadow
        if (navbar) {
            navbar.classList.toggle('scrolled', y > 50);
        }

        // Auto-close mobile menu on scroll
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }

        // Show/hide scroll-to-top + update progress
        if (scrollTopBtn) {
            const shouldShow = y > 400;
            scrollTopBtn.classList.toggle('is-visible', shouldShow);

            if (progressBar) {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? Math.min(y / docHeight, 1) : 0;
                progressBar.style.strokeDashoffset = String(PROGRESS_LENGTH * (1 - progress));
            }
        }
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close menu when clicking outside (excluding overlay as it has its own handler)
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) &&
            !e.target.classList.contains('mobile-menu-overlay') &&
            navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}
