export function loadCertificates() {
    const certificatesContainer = document.getElementById('certificates-container');
    const allCertificatesContainer = document.getElementById('all-certificates-container');
    const data = window.certificatesData || (typeof certificatesData !== 'undefined' ? certificatesData : []);

    if (!certificatesContainer) return;

    if (!data || data.length === 0) {
        certificatesContainer.innerHTML = '<div class="text-center text-muted py-5">No hay certificaciones disponibles.</div>';
        return;
    }

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    const getIssuerStyle = (issuer = '') => {
        const i = issuer.toLowerCase();
        if (i.includes('aws') || i.includes('amazon'))     return { abbr: 'AWS',  color: '#ff9900', icon: 'fab fa-aws' };
        if (i.includes('google'))                          return { abbr: 'GCP',  color: '#4285f4', icon: 'fab fa-google' };
        if (i.includes('microsoft') || i.includes('azure'))return { abbr: 'AZ',   color: '#0078d4', icon: 'fab fa-microsoft' };
        if (i.includes('meta') || i.includes('facebook'))  return { abbr: 'META', color: '#1877f2', icon: 'fab fa-meta' };
        if (i.includes('ibm'))                             return { abbr: 'IBM',  color: '#1f70c1', icon: 'fas fa-microchip' };
        if (i.includes('comptia'))                         return { abbr: 'CT+',  color: '#c8202f', icon: 'fas fa-shield-halved' };
        if (i.includes('udemy'))                           return { abbr: 'UD',   color: '#a435f0', icon: 'fas fa-play' };
        if (i.includes('unasam'))                          return { abbr: 'UNS',  color: '#22d3ee', icon: 'fas fa-university' };
        if (i.includes('uni') || i.includes('ingenier'))   return { abbr: 'UNI',  color: '#dc2626', icon: 'fas fa-university' };
        if (i.includes('coursera'))                        return { abbr: 'CO',   color: '#0056d2', icon: 'fas fa-graduation-cap' };
        return                                                    { abbr: 'CERT',color: '#2dd4bf', icon: 'fas fa-certificate' };
    };

    // Build a card (used both in lists AND in the single-card preview).
    // The only difference for preview mode is the kit-card--preview modifier,
    // which removes truncation and shows the image in full via CSS.
    const buildCertCard = (cert, { preview = false } = {}) => {
        const safeTitle = escapeHtml(cert.title);
        const safeIssuer = escapeHtml(cert.issuer);
        const safeDate = escapeHtml(cert.date);
        const safeImg = escapeHtml(cert.image || '');
        const issuerStyle = getIssuerStyle(cert.issuer);

        const overlayTags = [];
        if (cert.grade) overlayTags.push(`<span class="kit-tag-overlay kit-tag-overlay--gold" title="Nota"><i class="fas fa-medal"></i>${escapeHtml(cert.grade)}</span>`);
        if (cert.hours) overlayTags.push(`<span class="kit-tag-overlay" title="Duración"><i class="far fa-clock"></i>${escapeHtml(cert.hours)}</span>`);
        if (cert.level) overlayTags.push(`<span class="kit-tag-overlay" title="Nivel"><i class="fas fa-signal"></i>${escapeHtml(cert.level)}</span>`);
        const overlayTagsHTML = overlayTags.length ? `<div class="kit-card-tags-overlay">${overlayTags.join('')}</div>` : '';

        const clickAttr = preview ? '' : `role="button" tabindex="0" onclick="openCertPreview('${cert.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCertPreview('${cert.id}')}"`;
        const classes = preview ? 'kit-card kit-card--preview' : 'kit-card kit-card--clickable';

        return `
        <article class="${classes}" style="--accent-color: ${issuerStyle.color};" ${clickAttr}>
            <div class="kit-card-media">
                ${safeImg ? `<img src="${safeImg}" alt="${safeTitle}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">` : ''}
                <div class="kit-card-media-fallback"><i class="${issuerStyle.icon}"></i></div>
                <div class="kit-card-media-overlay"></div>
                <div class="kit-card-top-row">
                    <span class="kit-chip"><i class="${issuerStyle.icon}"></i>${issuerStyle.abbr}</span>
                    <span class="kit-chip kit-chip--neutral"><i class="far fa-calendar"></i>${safeDate}</span>
                </div>
                ${overlayTagsHTML}
            </div>
            <div class="kit-card-body">
                <div class="kit-card-meta-row">
                    <span class="kit-card-meta-issuer">${safeIssuer}</span>
                </div>
                <h3 class="kit-card-title">${safeTitle}</h3>
            </div>
        </article>
        `;
    };

    // === Shared preview opener — synchronous drill-in ===
    // Bootstrap 5.3 does not officially support stacked modals: when two modals
    // are open at once, the second backdrop ends up rendered ABOVE the second
    // modal (z-index inheritance gets weird) and the preview looks "covered by
    // a shadow". To dodge the entire stacking problem we never let two modals
    // coexist. The list modal is FORCE-TORN-DOWN synchronously (DOM-level, no
    // wait for the 150ms fade), then the preview is shown with a single clean
    // backdrop. On close we reopen the original list modal so the user lands
    // back where they were.
    if (!window.openPreviewModal) {
        const forceTearDownOpenModals = (exceptId) => {
            // Hide every visible modal except the one whose id is `exceptId`.
            document.querySelectorAll('.modal.show').forEach((m) => {
                if (m.id === exceptId) return;
                m.classList.remove('show');
                m.style.display = 'none';
                m.setAttribute('aria-hidden', 'true');
                m.removeAttribute('aria-modal');
                m.removeAttribute('role');
                // Sync Bootstrap's internal `_isShown` flag so a later .show()
                // actually re-opens (otherwise BS sees it as already shown).
                const inst = bootstrap.Modal.getInstance(m);
                if (inst) inst._isShown = false;
            });
            // Drop every leftover backdrop so Bootstrap creates a fresh one.
            document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
        };

        window.openPreviewModal = function (html, title) {
            const modalEl = document.getElementById('previewModal');
            const bodyEl = document.getElementById('previewModalBody');
            const titleEl = document.getElementById('previewModalTitle');
            if (!modalEl || !bodyEl || typeof bootstrap === 'undefined') return;

            if (titleEl) titleEl.textContent = title || 'Vista Previa';
            bodyEl.innerHTML = html;

            // Re-clicking another card while preview is already open → refresh only.
            if (modalEl.classList.contains('show')) return;

            // Remember which list modal (if any) the user came from, so we can
            // reopen it when they close the preview.
            const cameFrom = document.querySelector('.modal.show:not(#previewModal)');

            // Tear down anything currently open, then show preview cleanly.
            forceTearDownOpenModals('previewModal');
            bootstrap.Modal.getOrCreateInstance(modalEl).show();

            if (cameFrom) {
                modalEl.addEventListener('hidden.bs.modal', () => {
                    bootstrap.Modal.getOrCreateInstance(cameFrom).show();
                }, { once: true });
            }
        };
    }

    // === Cert preview: builds expanded card and hands it to the shared opener ===
    window.openCertPreview = function (certId) {
        const cert = data.find(c => String(c.id) === String(certId));
        if (!cert) return;
        window.openPreviewModal(
            `<div class="kit-preview-wrap">${buildCertCard(cert, { preview: true })}</div>`,
            cert.title || 'Vista Previa'
        );
    };

    // Auto-scrolling marquee — duplicate the cards for seamless infinite loop
    const cardsHTML = data.map(c => buildCertCard(c)).join('');
    const duration = Math.max(40, data.length * 8);

    certificatesContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Certificaciones">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${cardsHTML}
                ${cardsHTML}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allCertificatesModal">
                Ver toda la lista (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    if (allCertificatesContainer) {
        allCertificatesContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map(c => buildCertCard(c)).join('')}
            </div>
        `;
    }
}
