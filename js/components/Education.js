export function loadEducation() {
    const data = window.educationData || (typeof educationData !== 'undefined' ? educationData : []);
    if (!data || data.length === 0) return;

    const educationContainer = document.querySelector('#education-container');
    if (!educationContainer) return;

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    // Pick type, icon and accent color based on degree name
    const pickType = (degree = '') => {
        const d = degree.toLowerCase();
        if (d.includes('doctor') || d.includes('phd'))
            return { icon: 'fa-user-tie',       label: 'Doctorado',     color: '#a855f7' };
        if (d.includes('master') || d.includes('máster') || d.includes('maestr'))
            return { icon: 'fa-user-graduate',  label: 'Maestría',      color: '#8b5cf6' };
        if (d.includes('bachiller') || d.includes('bachelor') || d.includes('ingenier') || d.includes('licenc'))
            return { icon: 'fa-graduation-cap', label: 'Grado',         color: '#22d3ee' };
        if (d.includes('bootcamp'))
            return { icon: 'fa-laptop-code',    label: 'Bootcamp',      color: '#f97316' };
        if (d.includes('idioma') || d.includes('inglés') || d.includes('curso'))
            return { icon: 'fa-book-open',      label: 'Curso',         color: '#10b981' };
        if (d.includes('certif'))
            return { icon: 'fa-certificate',    label: 'Certificación', color: '#f59e0b' };
        return     { icon: 'fa-graduation-cap', label: 'Educación',     color: '#22d3ee' };
    };

    const extractYears = (period = '') => {
        const yearRe = /(19|20)\d{2}/g;
        const matches = period.match(yearRe) || [];
        if (matches.length >= 2) return `${matches[0]} – ${matches[matches.length - 1]}`;
        if (matches.length === 1) return matches[0];
        return period;
    };

    const buildEducationCard = (edu, { preview = false } = {}) => {
        const type = pickType(edu.degree);
        const period = extractYears(edu.period);
        const safeDegree = escapeHtml(edu.degree);
        const safeInstitution = escapeHtml(edu.institution);
        const safeDescription = escapeHtml(edu.description || '');

        const clickAttr = preview ? '' : `role="button" tabindex="0" onclick="openEduPreview('${edu.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEduPreview('${edu.id}')}"`;
        const classes = preview ? 'kit-card kit-card--preview' : 'kit-card kit-card--clickable';

        return `
        <article class="${classes}" style="--accent-color: ${type.color};" ${clickAttr}>
            <div class="kit-card-media kit-card-media--decorative">
                <div class="kit-edu-decor">
                    <i class="fas ${type.icon}"></i>
                </div>
                <div class="kit-card-media-overlay"></div>
                <div class="kit-card-top-row">
                    <span class="kit-chip"><i class="fas ${type.icon}"></i>${type.label.toUpperCase()}</span>
                    <span class="kit-chip kit-chip--neutral"><i class="far fa-calendar"></i>${escapeHtml(period)}</span>
                </div>
            </div>
            <div class="kit-card-body">
                <div class="kit-card-meta-row">
                    <span class="kit-card-meta-issuer">${safeInstitution}</span>
                </div>
                <h3 class="kit-card-title">${safeDegree}</h3>
                ${safeDescription ? `<p class="kit-card-desc">${safeDescription}</p>` : ''}
            </div>
        </article>
        `;
    };

    // === Education preview: uses the shared drill-in opener from Certificates.js ===
    window.openEduPreview = function (eduId) {
        const edu = data.find(e => String(e.id) === String(eduId));
        if (!edu || typeof window.openPreviewModal !== 'function') return;
        window.openPreviewModal(
            `<div class="kit-preview-wrap">${buildEducationCard(edu, { preview: true })}</div>`,
            edu.degree || 'Vista Previa'
        );
    };

    educationContainer.classList.remove('row', 'g-4');
    educationContainer.className = '';

    // Auto-scrolling marquee, always on. With few entries, expand the "single set"
    // so each half of the track has enough cards to fill the viewport densely.
    const cardsHTML = data.map(e => buildEducationCard(e)).join('');
    const copiesPerSet = Math.max(1, Math.ceil(6 / data.length));
    const singleSet = Array(copiesPerSet).fill(cardsHTML).join('');
    const trackHTML = singleSet + singleSet;
    const totalCards = data.length * copiesPerSet * 2;
    const duration = Math.max(40, totalCards * 4);

    educationContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Educación">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${trackHTML}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allEducationModal">
                Ver toda la lista (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    const allEducationContainer = document.querySelector('#all-education-container');
    if (allEducationContainer) {
        allEducationContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map(e => buildEducationCard(e)).join('')}
            </div>
        `;
    }
}
