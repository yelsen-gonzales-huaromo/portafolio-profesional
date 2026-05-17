export function loadExperience() {
    const data = window.experienceData || (typeof experienceData !== 'undefined' ? experienceData : []);
    if (!data || data.length === 0) return;

    const container = document.querySelector('#experience-timeline');
    if (!container) return;

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    const getTechIconClass = (tag) => (
        window.getTechIconClass ? window.getTechIconClass(tag) : 'fas fa-code'
    );

    // Role chip (label + icon + accent color) derived from the position name
    const pickRole = (position = '') => {
        const p = position.toLowerCase();
        if (p.includes('cto') || p.includes('vp') || p.includes('director') || p.includes('head'))
            return { icon: 'fa-crown',          label: 'Lead',     color: '#f59e0b' };
        if (p.includes('senior') || p.includes('lead') || p.includes('principal') || p.includes('staff'))
            return { icon: 'fa-user-tie',       label: 'Senior',   color: '#a855f7' };
        if (p.includes('junior') || p.includes(' jr') || p.includes('trainee'))
            return { icon: 'fa-code',           label: 'Junior',   color: '#10b981' };
        if (p.includes('intern') || p.includes('practicante') || p.includes('apoyo'))
            return { icon: 'fa-graduation-cap', label: 'Intern',   color: '#0ea5e9' };
        if (p.includes('full stack') || p.includes('full-stack') || p.includes('fullstack'))
            return { icon: 'fa-layer-group',    label: 'Full Stack', color: '#22d3ee' };
        if (p.includes('frontend') || p.includes('front-end'))
            return { icon: 'fa-display',        label: 'Frontend', color: '#06b6d4' };
        if (p.includes('backend') || p.includes('back-end'))
            return { icon: 'fa-server',         label: 'Backend',  color: '#84cc16' };
        if (p.includes('engineer') || p.includes('developer'))
            return { icon: 'fa-laptop-code',    label: 'Engineer', color: '#22d3ee' };
        return                                        { icon: 'fa-briefcase',     label: 'Role',     color: '#22d3ee' };
    };

    // Sort newest → oldest (recent at top, like a real CV)
    const sorted = [...data].sort((a, b) => {
        const ay = parseInt((a.period.match(/(19|20)\d{2}/g) || ['0']).pop(), 10);
        const by = parseInt((b.period.match(/(19|20)\d{2}/g) || ['0']).pop(), 10);
        return by - ay;
    });

    const compactPeriod = (period = '') => {
        const yearRe = /(19|20)\d{2}/g;
        const matches = period.match(yearRe) || [];
        if (period.toLowerCase().includes('presente') || period.toLowerCase().includes('current')) {
            return matches.length ? `${matches[0]} – Presente` : period;
        }
        if (matches.length >= 2) return `${matches[0]} – ${matches[matches.length - 1]}`;
        if (matches.length === 1) return matches[0];
        return period;
    };

    const nodes = sorted.map((exp, idx) => {
        const role = pickRole(exp.position);
        const side = idx % 2 === 0 ? 'left' : 'right';
        const period = compactPeriod(exp.period);
        const techs = (exp.technologies || []).slice(0, 4);
        const achievements = (exp.achievements || []).slice(0, 3);

        const achievementsHTML = achievements.length > 0
            ? `<ul class="tree-achievements">${achievements.map(a => `
                <li><i class="fas fa-circle"></i><span>${escapeHtml(a)}</span></li>
              `).join('')}</ul>`
            : (exp.description ? `<p class="tree-desc">${escapeHtml(exp.description)}</p>` : '');

        const techsHTML = techs.length > 0
            ? `<div class="tree-tech-stack">${techs.map(t => `
                <span class="tree-tech-chip"><i class="${getTechIconClass(t)}"></i>${escapeHtml(t)}</span>
              `).join('')}</div>`
            : '';

        return `
            <article class="tree-row tree-row--${side}" style="--accent-color: ${role.color};" data-aos="fade-${side === 'left' ? 'right' : 'left'}" data-aos-delay="${idx * 100}">
                <!-- Branch connector from central trunk to card -->
                <div class="tree-branch"></div>

                <!-- Glowing node on the central trunk -->
                <div class="tree-node">
                    <div class="tree-node-ring"></div>
                    <div class="tree-node-core"></div>
                </div>

                <!-- Card content -->
                <div class="tree-card">
                    <span class="tree-period">${escapeHtml(period)}</span>
                    <div class="tree-card-head">
                        <div class="tree-icon-3d">
                            <i class="fas ${role.icon}"></i>
                        </div>
                        <div class="tree-card-titles">
                            <span class="tree-company">${escapeHtml(exp.company)}</span>
                            <h3 class="tree-position">${escapeHtml(exp.position)}</h3>
                        </div>
                    </div>
                    ${achievementsHTML}
                    ${techsHTML}
                </div>
            </article>
        `;
    }).join('');

    // Generate the SVG "spider web" — dense at center, sparse at the edges,
    // mimicking how real spiders weave (logarithmic ring spacing + capture
    // spiral threads connecting adjacent spokes). Lies flat on the floor via
    // rotateX(78°) applied by CSS.
    const buildSpiderWeb = () => {
        const spokes = 16; // main radial threads (every 22.5°)
        // Logarithmic-ish ring radii: close together near center, farther apart at the edges
        const rings = [16, 30, 48, 70, 96, 128, 168, 215, 270];
        const edgeR = 305;

        const radialLines = [];
        const spiralThreads = [];
        const ringCircles = [];
        const nodeDots = [];

        // Concentric ring circles — opacity fades outward (denser look near center)
        rings.forEach((r, idx) => {
            const opacity = Math.max(0.05, 0.55 - idx * 0.06);
            ringCircles.push(
                `<circle cx="0" cy="0" r="${r}" fill="none" stroke="rgba(34, 211, 238, ${opacity.toFixed(2)})" stroke-width="0.7"/>`
            );
        });

        // Spiral capture threads — diagonal lines connecting (spoke i, ring j) → (spoke i+1, ring j+1).
        // This is the "spiral thread" of a real spider web. Fades fast outward.
        for (let j = 0; j < rings.length - 1; j++) {
            const opacity = Math.max(0.04, 0.42 - j * 0.05);
            for (let i = 0; i < spokes; i++) {
                const a1 = (i * 360 / spokes) * Math.PI / 180;
                const a2 = ((i + 1) * 360 / spokes) * Math.PI / 180;
                const x1 = Math.cos(a1) * rings[j];
                const y1 = Math.sin(a1) * rings[j];
                const x2 = Math.cos(a2) * rings[j + 1];
                const y2 = Math.sin(a2) * rings[j + 1];
                spiralThreads.push(
                    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(34, 211, 238, ${opacity.toFixed(2)})" stroke-width="0.45"/>`
                );
            }
        }

        // Main radial spokes — from innermost ring out to edge, with gradient fade
        for (let i = 0; i < spokes; i++) {
            const angle = (i * 360 / spokes) * Math.PI / 180;
            const cos = Math.cos(angle), sin = Math.sin(angle);
            radialLines.push(
                `<line x1="${(cos * rings[0]).toFixed(1)}" y1="${(sin * rings[0]).toFixed(1)}" ` +
                `x2="${(cos * edgeR).toFixed(1)}" y2="${(sin * edgeR).toFixed(1)}" ` +
                `stroke="url(#webStroke)" stroke-width="0.6" stroke-linecap="round"/>`
            );
            // Glowing nodes — denser cluster at the inner-mid rings, sparse outer
            if (i % 2 === 0) {
                nodeDots.push(
                    `<circle cx="${(cos * rings[3]).toFixed(1)}" cy="${(sin * rings[3]).toFixed(1)}" r="2.2" fill="rgba(34, 211, 238, 0.9)" filter="url(#nodeGlow)"/>`
                );
            }
            if (i % 4 === 0) {
                nodeDots.push(
                    `<circle cx="${(cos * rings[5]).toFixed(1)}" cy="${(sin * rings[5]).toFixed(1)}" r="1.7" fill="rgba(168, 85, 247, 0.75)"/>`
                );
            }
            if (i % 4 === 2) {
                nodeDots.push(
                    `<circle cx="${(cos * rings[6]).toFixed(1)}" cy="${(sin * rings[6]).toFixed(1)}" r="1.3" fill="rgba(34, 211, 238, 0.55)"/>`
                );
            }
        }

        return `
            <svg class="tree-web" viewBox="-320 -320 640 640" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <linearGradient id="webStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="rgba(34, 211, 238, 0.75)"/>
                        <stop offset="100%" stop-color="rgba(34, 211, 238, 0.02)"/>
                    </linearGradient>
                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                ${ringCircles.join('')}
                ${spiralThreads.join('')}
                ${radialLines.join('')}
                ${nodeDots.join('')}
            </svg>
        `;
    };

    container.className = 'tree-timeline';
    container.innerHTML = `
        <!-- Central glowing trunk -->
        <div class="tree-trunk"></div>
        <div class="tree-rows">
            ${nodes}
        </div>
        <!-- Base of the tree — 3D disc + spider web + pulsing rings + light pool -->
        <div class="tree-base">
            ${buildSpiderWeb()}
            <div class="tree-base-ring tree-base-ring--1"></div>
            <div class="tree-base-ring tree-base-ring--2"></div>
            <div class="tree-base-ring tree-base-ring--3"></div>
            <div class="tree-base-glow"></div>
        </div>
    `;
}
