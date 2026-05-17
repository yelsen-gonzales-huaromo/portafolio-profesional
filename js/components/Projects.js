export function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const allProjectsContainer = document.getElementById('all-projects-container');
    const data = window.projectsData || (typeof projectsData !== 'undefined' ? projectsData : []);

    if (!projectsContainer) return;

    if (!data || data.length === 0) {
        projectsContainer.innerHTML = '<div class="text-center text-muted py-5">No hay proyectos disponibles.</div>';
        return;
    }

    const getTechIconClass = (tag) => {
        return window.getTechIconClass ? window.getTechIconClass(tag) : 'fas fa-code';
    };

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    // Pick an accent color based on the primary tech tag
    const getProjectAccent = (tags = []) => {
        const t = (tags[0] || '').toLowerCase();
        if (t.includes('react'))                        return '#22d3ee';
        if (t.includes('vue'))                          return '#42b883';
        if (t.includes('angular'))                      return '#dd0031';
        if (t.includes('next'))                         return '#94a3b8';
        if (t.includes('node'))                         return '#84cc16';
        if (t.includes('python') || t.includes('django')) return '#3b82f6';
        if (t.includes('iot') || t.includes('raspberry')) return '#f97316';
        if (t.includes('typescript') || t.includes('openai')) return '#0ea5e9';
        if (t.includes('react native') || t.includes('mobile')) return '#a855f7';
        return '#22d3ee';
    };

    // Inner Bootstrap carousel for multi-image gallery
    const buildImageGallery = (images, carouselId, fallback) => {
        const safeImages = (images && images.length > 0) ? images : [fallback];

        if (safeImages.length === 1) {
            return `<img src="${safeImages[0]}" alt="Proyecto" loading="lazy">`;
        }

        const items = safeImages.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="Imagen ${i + 1}" loading="lazy">
            </div>
        `).join('');

        const indicators = safeImages.map((_, i) => `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}"
                    class="pcm-gallery-dot ${i === 0 ? 'active' : ''}"
                    aria-label="Imagen ${i + 1}"></button>
        `).join('');

        return `
            <div id="${carouselId}" class="carousel slide pcm-gallery" data-bs-ride="carousel" data-bs-interval="3500" data-bs-pause="hover">
                <div class="carousel-inner">${items}</div>
                <div class="pcm-gallery-indicators">${indicators}</div>
                <span class="pcm-gallery-counter"><span class="pcm-current">1</span>/${safeImages.length}</span>
                <button class="pcm-gallery-arrow pcm-gallery-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev" aria-label="Anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="pcm-gallery-arrow pcm-gallery-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next" aria-label="Siguiente">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    };

    const buildProjectCard = (project, idx, ctx = 'main') => {
        const fallback = 'https://via.placeholder.com/800x500?text=Proyecto';
        const title = escapeHtml(project.title);
        const description = escapeHtml(project.description || '');
        const demo = project.demoLink || '#';
        const repo = project.repoLink || '#';
        const carouselId = `pcmCarousel_${ctx}_${idx}`;
        const accent = getProjectAccent(project.tags);
        const imageCount = (project.images || []).length;
        const primaryTag = project.tags && project.tags[0] ? escapeHtml(project.tags[0]) : 'Proyecto';
        const primaryIcon = project.tags && project.tags[0] ? getTechIconClass(project.tags[0]) : 'fas fa-code';

        const tagsHTML = (project.tags || []).slice(0, 3).map(tag => `
            <span class="kit-tag-overlay" title="${escapeHtml(tag)}"><i class="${getTechIconClass(tag)}"></i>${escapeHtml(tag)}</span>
        `).join('');

        const hasDemo = demo && demo !== '#';
        const hasRepo = repo && repo !== '#';

        return `
        <article class="kit-card" style="--accent-color: ${accent};">
            <div class="kit-card-media">
                ${buildImageGallery(project.images, carouselId, fallback)}
                <div class="kit-card-media-fallback"><i class="${primaryIcon}"></i></div>
                <div class="kit-card-media-overlay"></div>
                <div class="kit-card-top-row">
                    <span class="kit-chip"><i class="${primaryIcon}"></i>${primaryTag.toUpperCase()}</span>
                    ${imageCount > 1 ? `<span class="kit-chip kit-chip--neutral"><i class="fas fa-images"></i>${imageCount}</span>` : ''}
                </div>
                <div class="kit-card-tags-overlay">${tagsHTML}</div>
            </div>
            <div class="kit-card-body">
                <h3 class="kit-card-title">${title}</h3>
                <p class="kit-card-desc">${description}</p>
                <div class="kit-card-actions">
                    <a href="${hasDemo ? demo : '#'}"
                       ${hasDemo ? 'target="_blank" rel="noopener"' : 'onclick="event.preventDefault();" aria-disabled="true"'}
                       class="kit-btn kit-btn-primary ${!hasDemo ? 'is-disabled' : ''}">
                        <i class="fas fa-external-link-alt"></i><span>Ver Software</span>
                    </a>
                    <a href="${hasRepo ? repo : '#'}"
                       ${hasRepo ? 'target="_blank" rel="noopener"' : 'onclick="event.preventDefault();" aria-disabled="true"'}
                       class="kit-btn kit-btn-ghost ${!hasRepo ? 'is-disabled' : ''}">
                        <i class="fab fa-github"></i><span>Código</span>
                    </a>
                </div>
            </div>
        </article>
        `;
    };

    // Auto-scrolling marquee. Duplicate cards twice (once visible + once for seamless loop)
    const buildSet = (suffix) => data.map((p, i) => buildProjectCard(p, i, suffix)).join('');
    // Adjust speed proportionally so density stays consistent (~10s per card)
    const duration = Math.max(40, data.length * 8);

    projectsContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Proyectos">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${buildSet('a')}
                ${buildSet('b')}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allProjectsModal">
                Ver todos los proyectos (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    // Sync gallery counters
    const wireCounters = (root) => {
        root.querySelectorAll('.pcm-gallery').forEach(gal => {
            gal.addEventListener('slid.bs.carousel', (e) => {
                const counter = gal.querySelector('.pcm-current');
                if (counter) counter.textContent = e.to + 1;
            });
        });
    };
    wireCounters(projectsContainer);

    // Modal grid — all projects
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map((p, i) => buildProjectCard(p, i, 'modal')).join('')}
            </div>
        `;
        wireCounters(allProjectsContainer);
    }
}
