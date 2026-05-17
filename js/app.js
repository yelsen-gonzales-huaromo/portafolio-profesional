import { initTheme } from './components/Theme.js';
import { loadProfile } from './components/Profile.js';
import { loadSkills } from './components/Skills.js';
import { loadProjects } from './components/Projects.js';
import { loadCertificates } from './components/Certificates.js';
import { loadExperience } from './components/Experience.js';
import { loadEducation } from './components/Education.js';
import { loadBlogPosts } from './components/Blog.js';
import { initForms } from './components/Forms.js';
import { initNavbar } from './components/Navbar.js';
import { loadHero } from './components/Hero.js';
import { loadMarquee } from './components/Marquee.js';
import { initFooterYear } from './components/Footer.js';
import { initGridInteraction, initFloatingShapes } from './components/Background.js';
import { initAOS } from './utils/Animations.js';

// Helpers are loaded directly in HTML as separate script tags
// They expose functions to window object automatically

// Initialize Theme Immediately
initTheme();

// Load Data Content
loadHero();
loadMarquee();
loadProfile();
loadSkills();
loadProjects();
loadCertificates();
loadExperience();
loadEducation();
loadBlogPosts();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Interactive & Visual Elements
    initAOS();
    initForms();
    initFooterYear();
    initGridInteraction();
    initFloatingShapes();
    initNavbar();
    init3DModelProgress();
});

// Wire up <model-viewer> loading progress to our custom bar
function init3DModelProgress() {
    const modelEl = document.getElementById('about-3d-model');
    if (!modelEl) return;
    const bar = modelEl.querySelector('.m3d-progress-bar');
    const wrap = modelEl.querySelector('.m3d-progress');
    if (!bar || !wrap) return;

    modelEl.addEventListener('progress', (event) => {
        const ratio = event.detail.totalProgress;
        bar.style.width = `${ratio * 100}%`;
        if (ratio >= 1) {
            setTimeout(() => { wrap.style.opacity = '0'; }, 200);
        }
    });
}

