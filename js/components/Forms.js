// WhatsApp destination — Yelsen's number in international format (no + or spaces)
const WHATSAPP_NUMBER = '51910706967';

export function initForms() {
    // ===== Contact Form → WhatsApp =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const messageEl = document.getElementById('message');

            const name = (nameEl?.value || '').trim();
            const email = (emailEl?.value || '').trim();
            const message = (messageEl?.value || '').trim();

            // Clear previous error states
            [nameEl, emailEl, messageEl].forEach(el => el && el.classList.remove('is-invalid'));

            // Validation
            const errors = [];
            if (!name) {
                errors.push('• Tu nombre');
                nameEl?.classList.add('is-invalid');
            }
            if (!email) {
                errors.push('• Tu email');
                emailEl?.classList.add('is-invalid');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push('• Email válido (ej: tu@correo.com)');
                emailEl?.classList.add('is-invalid');
            }
            if (!message) {
                errors.push('• Un mensaje');
                messageEl?.classList.add('is-invalid');
            } else if (message.length < 10) {
                errors.push('• Mensaje de al menos 10 caracteres');
                messageEl?.classList.add('is-invalid');
            }

            if (errors.length > 0) {
                alert('Por favor completa los siguientes campos:\n\n' + errors.join('\n'));
                return;
            }

            // Build WhatsApp message with the user's contact info as context
            const wppText =
                `*¡Hola Yelsen!* 👋\n` +
                `Te escribo desde tu portafolio web.\n\n` +
                `*Nombre:* ${name}\n` +
                `*Email:* ${email}\n\n` +
                `*Mensaje:*\n${message}`;

            // wa.me opens WhatsApp Web on desktop or the app on mobile, with the
            // message pre-filled. The user still has to press "send" — this is the
            // official Meta-approved flow (no API key needed).
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wppText)}`;
            window.open(url, '_blank', 'noopener,noreferrer');

            this.reset();
        });

        // Live: remove invalid state as the user starts typing again
        ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => el.classList.remove('is-invalid'));
            }
        });
    }

    // ===== Comment Form (unchanged — local mock) =====
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('comment-name').value;
            const text = document.getElementById('comment-text').value;

            if (name && text) {
                const container = document.getElementById('comments-container');

                if (window.addComment && window.formatCommentHTML) {
                    const newComment = window.addComment(name, text);
                    const commentHTML = window.formatCommentHTML(newComment, true);
                    container.insertAdjacentHTML('afterbegin', commentHTML);
                } else {
                    container.insertAdjacentHTML('afterbegin', `<div class="comment-item" style="border-left: 3px solid var(--primary)"><div class="comment-header"><span class="comment-author">${name}</span><span class="comment-date">Ahora mismo</span></div><div class="comment-body">${text}</div></div>`);
                }

                this.reset();
            }
        });

        loadCommentsMock();
    }
}

function loadCommentsMock() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    const comments = window.getComments ? window.getComments() : [];

    const html = window.formatCommentHTML
        ? comments.map(comment => window.formatCommentHTML(comment)).join('')
        : comments.map(c => `<div class="comment-item"><div class="comment-header"><span class="comment-author">${c.name}</span><span class="comment-date">${c.date}</span></div><div class="comment-body">${c.text}</div></div>`).join('');

    commentsContainer.innerHTML = html;
}
