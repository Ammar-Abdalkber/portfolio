/* Code typed by me (AMMAR ABDELKABIR)*/
   document.addEventListener('DOMContentLoaded', function () {
    renderSections();
    initLoader();
    if (window.THREE) init3DBackground();
    initNavbarScroll();
    initMobileMenu();
    initTypingAnimation();
    initScrollReveal();
    initCounters();
    initProjectsArchive();
    initProjectModal();
    initCertificateModal();
    initContactForm();
    initActiveNavHighlight();
    initSmoothScroll();
    initEffects();
});

/* ---------------- LOADER ---------------- */
function initLoader() {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.loader-fill');
    const pct = document.querySelector('.loader-pct');
    const logo = document.querySelector('.loader-logo');
    if (!loader) return;

    let progress = 0;
    const safety = setTimeout(() => loader.classList.add('hide'), 4000);
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            clearTimeout(safety);
            setTimeout(() => loader.classList.add('hide'), 400);
        }
        if (fill) fill.style.width = `${progress}%`;
        if (pct) pct.textContent = `${progress}%`;
        if (logo) logo.style.backgroundPosition = `${100 - progress}% 0%`;
    }, 60);
}

/* ---------------- NAV ---------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40 || document.body.dataset.page === 'projects');
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;
    const toggle = open => {
        navMenu.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
    };
    hamburger.addEventListener('click', () => toggle(!navMenu.classList.contains('open')));
    navMenu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => toggle(false)));
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 140;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (!href.startsWith('#')) return;
            link.classList.toggle('active', href.substring(1) === current);
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

function initSmoothScroll() {
    document.addEventListener('click', e => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

/* ---------------- TYPING ---------------- */
function initTypingAnimation() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    const roles = ['< SQL />', '< Power BI />', '< Tableau />', '< Python />', '< Machine Learning />'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2200);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }
    typeEffect();
}

/* ---------------- REVEAL ---------------- */
function initScrollReveal() {
    const targets = document.querySelectorAll('.glass:not(.reveal), .timeline-node:not(.reveal), .section-title:not(.reveal)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('in');
            setTimeout(() => { el.style.transitionDelay = ''; }, 1000);
            observer.unobserve(el);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
        observer.observe(el);
    });
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    }, 1500);
}

/* ---------------- COUNTERS ---------------- */
function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suffix = el.dataset.suffix || '';
        const io = new IntersectionObserver(([en]) => {
            if (!en.isIntersecting) return;
            io.disconnect();
            const t0 = performance.now();
            const step = t => {
                const p = Math.min((t - t0) / 1400, 1);
                el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
        io.observe(el);
    });
}

/* ---------------- RENDER ---------------- */
function renderSections() {
    const $ = id => document.getElementById(id);

    const skills = $('skills-grid');
    if (skills) skills.innerHTML = SKILLS.map(([t, items]) =>
        `<div class="skill-group glass"><h3>${t}</h3><div class="chip-cloud">${items.split('|').map(i => `<span>${i}</span>`).join('')}</div></div>`).join('');

    const tl = $('timeline');
    if (tl) tl.innerHTML = TIMELINE.map(t =>
        `<div class="timeline-node"><div class="timeline-dot-glow"></div><div class="timeline-content"><span class="timeline-date">${t.date}</span><h3>${t.title}</h3><span class="timeline-org">${t.org}</span><p>${t.text}</p></div></div>`).join('');

    const certs = $('cert-grid');
    if (certs) certs.innerHTML = CERTS.map((c, i) =>
        `<div class="cert-card glass" data-cert="${i}"><div class="cert-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.org}</p><div class="cert-year">${c.year}</div></div>`).join('');

    const pc = $('projects-carousel');
    if (pc) PROJECTS.forEach(p => pc.appendChild(buildProjectCard(p, openProjectModal)));
}

/* ---------------- CAROUSEL ---------------- */
function buildCarousel(images, alt) {
    const el = document.createElement('div');
    el.className = 'carousel';
    const multi = images.length > 1;
    el.innerHTML = `<div class="carousel-track">${images.map(i =>
        `<div class="carousel-slide" data-label="${i.label}"><img src="${i.src}" alt="${alt} - ${i.label}" loading="lazy"></div>`).join('')}</div>` +
        (multi ? `<button type="button" class="carousel-btn prev" aria-label="Previous image">&#8249;</button><button type="button" class="carousel-btn next" aria-label="Next image">&#8250;</button><div class="carousel-dots">${images.map(() => '<span></span>').join('')}</div>` : '');

    el.querySelectorAll('img').forEach(img => img.addEventListener('error', () => img.remove(), { once: true }));
    const track = el.querySelector('.carousel-track');
    const dots = [...el.querySelectorAll('.carousel-dots span')];
    let i = 0, pausedUntil = 0, hover = false, seen = false, startX = null;

    const go = n => {
        i = (n + images.length) % images.length;
        track.style.transform = `translateX(-${i * 100}%)`;
        dots.forEach((d, k) => d.classList.toggle('active', k === i));
    };
    go(0);
    if (!multi) return el;

    const manual = n => { go(n); pausedUntil = Date.now() + RESUME_AFTER_CLICK_MS; };
    el.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); manual(i - 1); });
    el.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); manual(i + 1); });
    dots.forEach((d, k) => d.addEventListener('click', e => { e.stopPropagation(); manual(k); }));
    el.addEventListener('mouseenter', () => { hover = true; });
    el.addEventListener('mouseleave', () => { hover = false; });
    el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) manual(dx < 0 ? i + 1 : i - 1);
        startX = null;
    });

    const timer = setInterval(() => {
        if (el.isConnected) seen = true; else { if (seen) clearInterval(timer); return; }
        if (document.hidden || Date.now() < pausedUntil || (PAUSE_ON_HOVER && hover)) return;
        go(i + 1);
    }, AUTOPLAY_MS);
    return el;
}

/* ---------------- PROJECT CARDS ---------------- */
function buildProjectCard(p, onOpen) {
    const card = document.createElement('div');
    card.className = 'project-card glass';
    card.dataset.id = p.id;
    const wrap = document.createElement('div');
    wrap.className = 'project-interactive-wrapper';
    const media = document.createElement('div');
    media.className = 'project-media';
    media.appendChild(buildCarousel(p.images, p.title));
    const info = document.createElement('div');
    info.className = 'project-info';
    info.innerHTML = `
        <span class="project-cat">${p.catName} · ${p.date}</span>
        <h3>${p.title}</h3>
        <p>${p.short}</p>
        <div class="tech-badges">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-footer">
            <span class="project-more">VIEW DETAILS →</span>
            <a class="project-github" href="${p.github}" target="_blank" rel="noopener"
               aria-label="View ${p.title} on GitHub" title="View source on GitHub">
               <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                 <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
               </svg>
            </a>
        </div>`;
    wrap.append(media, info);
    card.appendChild(wrap);

    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        wrap.style.transform = `rotateX(${(r.height / 2 - (e.clientY - r.top)) * 0.04}deg) rotateY(${((e.clientX - r.left) - r.width / 2) * 0.04}deg) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => { wrap.style.transform = 'rotateX(0) rotateY(0) scale(1)'; });
    card.addEventListener('click', e => {
        if (e.target.closest('.carousel-btn, .carousel-dots, .project-github')) return;
        onOpen(p);
    });
    return card;
}

/* ---------------- PROJECT MODAL (shared) ---------------- */
function openProjectModal(p) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    const media = document.getElementById('modalMedia');
    media.innerHTML = '';
    media.appendChild(buildCarousel(p.images, p.title));
    document.getElementById('modalCategory').textContent = `${p.catName} · ${p.date}`;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.full;
    document.getElementById('modalDetails').innerHTML = `<h4>// HIGHLIGHTS</h4><ul>${p.features.map(f => `<li><strong>▸</strong> ${f}</li>`).join('')}</ul><h4>// TECHNOLOGIES</h4><div class="tech-badges" style="margin-top:12px;">${p.tech.map(t => `<span>${t}</span>`).join('')}</div><h4>// SOURCE</h4><p style="margin-top:8px;"><a href="${p.github}" target="_blank" rel="noopener" style="color:var(--primary);">View on GitHub →</a></p>`;
    modal.classList.add('show');
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    const close = () => {
        modal.classList.remove('show');
        const media = document.getElementById('modalMedia');
        if (media) media.innerHTML = '';
    };
    document.getElementById('modalClose')?.addEventListener('click', close);
    window.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------------- PROJECTS ARCHIVE ---------------- */
function initProjectsArchive() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    let filter = 'all', query = '';
    const render = () => {
        grid.innerHTML = '';
        const list = PROJECTS.filter(p => (filter === 'all' || p.cats.includes(filter)) &&
            `${p.title} ${p.short} ${p.tech.join(' ')}`.toLowerCase().includes(query));
        if (!list.length) { grid.innerHTML = '<div class="no-results">NO PROJECTS FOUND — ADJUST FILTERS</div>'; return; }
        list.forEach(p => grid.appendChild(buildProjectCard(p, openProjectModal)));
        initScrollReveal();
    };
    document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filter = btn.dataset.filter;
        render();
    }));
    const search = document.getElementById('searchInput');
    if (search) search.addEventListener('input', e => { query = e.target.value.toLowerCase(); render(); });
    render();
    const hit = PROJECTS.find(p => `#${p.id}` === window.location.hash);
    if (hit) openProjectModal(hit);
}

/* ---------------- CERT MODAL ---------------- */
function initCertificateModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const c = CERTS[+card.dataset.cert];
            if (!c) return;
            document.getElementById('modal-title').textContent = c.title;
            document.getElementById('modal-desc').innerHTML = `Issued by ${c.org} · ${c.year}<br><br><a href="https://drive.google.com/drive/folders/1-Mv2XPPsJ4Bz3qT3TV9qeg6_7S8paIdn?usp=sharing" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:0.7rem; padding: 6px 12px; min-height:auto;">View Proof</a>`;            modal.classList.add('show');
        });
    });
    const close = () => modal.classList.remove('show');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    window.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* ---------------- CONTACT FORM ---------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        btn.disabled = true;
        btn.textContent = 'SENDING...';
        status.className = 'form-status';
        status.textContent = '';
        try {
            const res = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Request failed');
            form.reset();
            status.textContent = 'Message sent. Thank you, I will reply soon!';
            status.classList.add('ok');
        } catch (err) {
            status.textContent = 'Could not send. Please email me directly at ammarabdalkber@gmail.com.';
            status.classList.add('err');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        }
    });
}

/* ---------------- EFFECTS ---------------- */
function initEffects() {
    // scroll progress bar
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.appendChild(bar);
    const update = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();

    // live clock
    const clock = document.getElementById('local-clock');
    if (clock) {
        const tick = () => {
            clock.textContent = new Date().toLocaleTimeString('en-GB', {
                timeZone: 'Africa/Cairo', hour12: false
            });
        };
        tick();
        setInterval(tick, 1000);
    }

    // text scramble on hero name
    const nameEl = document.querySelector('.hero-name');
    if (nameEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const originalHTML = nameEl.innerHTML;
        const textNodes = [];
        nameEl.childNodes.forEach(n => {
            if (n.nodeType === 3) textNodes.push(n);
            else if (n.nodeType === 1 && n.firstChild && n.firstChild.nodeType === 3) textNodes.push(n.firstChild);
        });
        const originalChars = textNodes.map(n => n.textContent).join('');
        if (originalChars.length > 0) {
            const glyphs = '!<>-_\\/[]{}=+*^?#01';
            let frame = 0;
            const total = originalChars.length;
            const scramble = () => {
                frame++;
                let out = '';
                for (let i = 0; i < total; i++) {
                    const ch = originalChars[i];
                    if (ch === ' ') { out += ' '; continue; }
                    out += frame > i * 2 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)];
                }
                let idx = 0;
                textNodes.forEach(n => {
                    const len = n.textContent.length;
                    n.textContent = out.substr(idx, len);
                    idx += len;
                });
                if (frame < total * 2 + 20) requestAnimationFrame(scramble);
                else nameEl.innerHTML = originalHTML;
            };
            setTimeout(scramble, 300);
        }
    }

    // cursor glow (desktop only)
    if (!window.matchMedia('(hover: hover)').matches) return;
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        const g = e.target.closest && e.target.closest('.glass');
        if (g) {
            const r = g.getBoundingClientRect();
            g.style.setProperty('--mx', `${e.clientX - r.left}px`);
            g.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
    });
    document.querySelectorAll('.btn').forEach(b => {
        b.addEventListener('mousemove', e => {
            const r = b.getBoundingClientRect();
            b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
        });
        b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
}