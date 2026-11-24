/* Plush Aesthetics — motion layer (GSAP + ScrollTrigger + SplitText + Lenis) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body, loader = $('#loader');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const done = () => { body.classList.remove('is-loading'); if (loader) loader.remove(); };
  if (reduce || !window.gsap || !window.ScrollTrigger) { done(); return; }

  try {
    document.documentElement.classList.add('js');
    gsap.registerPlugin(ScrollTrigger, ...(window.SplitText ? [SplitText] : []));
    const E = 'power4.out', E2 = 'expo.out';

    /* smooth scroll */
    let lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const id = a.getAttribute('href'); if (id.length < 2) return;
        const t = $(id); if (!t) return; e.preventDefault(); lenis.scrollTo(t, { offset: id === '#top' ? 0 : -70, duration: 1.4 });
      }));
    }

    /* nav hide on scroll down */
    const nav = $('#nav'); let lastY = 0;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { const y = s.scroll(); nav.classList.toggle('hide', y > 300 && y > lastY && !$('#links').classList.contains('open')); lastY = y; } });

    const lines = el => new SplitText(el, { type: 'lines', mask: 'lines' }).lines;

    /* hero intro (plays as loader leaves) */
    $$('#heroTitle .ln').forEach(l => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.innerHTML = l.innerHTML; l.innerHTML = ''; l.appendChild(s); });
    const intro = gsap.timeline({ paused: true })
      .from('#heroFrame', { clipPath: 'inset(30% 20% 30% 20% round 240px)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .from('#heroFrame img', { scale: 1.35, duration: 2.2, ease: E2 }, 0)
      .from('.hero-mini', { yPercent: 40, opacity: 0, rotate: -6, duration: 1.4, ease: E2 }, .6)
      .from($$('#heroTitle .ln > span'), { yPercent: 110, duration: 1.4, stagger: .12, ease: E2 }, .45)
      .from('.hero-kicker span', { y: 20, opacity: 0, duration: 1, stagger: .08, ease: E2 }, .7)
      .from('.hero-lede, .hero-cta > *', { y: 24, opacity: 0, duration: 1.1, stagger: .08, ease: E2 }, .9)
      .from('.hero-proof li', { y: 24, opacity: 0, duration: 1, stagger: .08, ease: E2 }, 1.1)
      .from('.chips li', { scale: .6, opacity: 0, y: 20, duration: .9, stagger: .1, ease: 'back.out(1.7)' }, 1.1)
      .from('.nav > *', { y: -20, opacity: 0, duration: 1, stagger: .05, ease: E2 }, 1)
      .add(() => { lenis && lenis.start(); ScrollTrigger.refresh(); }, 1.2);

    const cnt = { v: 0 }, countEl = $('#loadCount');
    const pre = gsap.timeline({ onComplete: () => { done(); if (intro.progress() === 0) intro.play(); } })
      .from('.l-word span', { yPercent: 110, duration: 1.1, stagger: .07, ease: E2 })
      .from('.l-sub', { opacity: 0, y: 12, duration: .9, ease: E }, '-=.5')
      .to(cnt, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = Math.round(cnt.v); } }, 0)
      .to('.loader-mark', { y: -30, opacity: 0, duration: .6, ease: 'power3.in' }, '+=.15')
      .to('.loader-count', { opacity: 0, duration: .4 }, '<')
      .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.15')
      .add(() => intro.play(), '<.35');
    setTimeout(() => { if (document.body.contains(loader)) pre.progress(1); }, 6000);

    /* chips float forever, hero parallax */
    $$('.chips li').forEach((c, i) => gsap.to(c, { y: i % 2 ? 10 : -10, duration: 2.4 + i * .3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 }));
    gsap.to('#heroFrame img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-mini', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* headings / labels / fade-ups */
    $$('h2.split').forEach(h => gsap.from(lines(h), { yPercent: 105, duration: 1.3, stagger: .1, ease: E2, scrollTrigger: { trigger: h, start: 'top 85%' } }));
    $$('.label').forEach(l => gsap.from(l, { opacity: 0, x: -16, duration: 1, ease: E, scrollTrigger: { trigger: l, start: 'top 90%' } }));
    $$('.fade-up').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: el, start: 'top 90%' } }));

    /* statement words fill */
    const bq = $('#bigQuote');
    if (bq) gsap.to(new SplitText(bq, { type: 'words', wordsClass: 'w' }).words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: bq, start: 'top 78%', end: 'bottom 45%', scrub: true } });
    gsap.from('.ways li', { y: 50, opacity: 0, duration: 1.2, stagger: .12, ease: E, scrollTrigger: { trigger: '.ways', start: 'top 85%' } });

    /* treatments horizontal */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const track = $('#treatTrack'), dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#treatPin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      $$('.t-panel').forEach(p => {
        gsap.fromTo(p.querySelector('.t-img img'), { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        gsap.from(p.querySelectorAll('.t-body > *, .t-body li'), { y: 30, opacity: 0, duration: 1, stagger: .05, ease: E, scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 75%' } });
      });
    });
    mm.add('(max-width: 1024px)', () => { $$('.t-panel').forEach(p => gsap.from(p, { y: 60, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: p, start: 'top 88%' } })); });

    /* Q&A rows */
    $$('.qa-item').forEach(q => gsap.timeline({ scrollTrigger: { trigger: q, start: 'top 80%' } })
      .from(q, { y: 40, opacity: 0, duration: 1, ease: E })
      .from(q.querySelector('.a'), { x: -20, opacity: 0, duration: .8, ease: E }, '-=.5'));

    /* band */
    const band = $('#band');
    if (band) {
      const loop = gsap.to(band, { xPercent: -33.333, duration: 30, ease: 'none', repeat: -1 });
      ScrollTrigger.create({ trigger: '.band', start: 'top bottom', end: 'bottom top', onUpdate: s => {
        const v = Math.min(Math.abs(s.getVelocity()) / 300, 5);
        gsap.to(loop, { timeScale: (s.direction < 0 ? -1 : 1) * (1 + v), duration: .3, overwrite: true });
        gsap.to(loop, { timeScale: s.direction < 0 ? -1 : 1, duration: 1.2, delay: .3 });
      } });
    }

    /* lip cards: image reveal */
    $$('.lip-img').forEach(m => gsap.from(m, { clipPath: 'inset(100% 0 0 0 round 18px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: m, start: 'top 85%' } }));

    /* image masks (combo) */
    $$('.reveal-mask').forEach((m, i) => {
      const img = m.querySelector('img');
      gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 82%' } })
        .from(m, { clipPath: 'inset(100% 0% 0% 0% round 28px)', duration: 1.5, ease: 'expo.inOut', delay: i % 2 ? .25 : 0 })
        .from(img, { scale: 1.3, duration: 2, ease: E2 }, 0);
      gsap.to(img, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.to('.reveal-mask.small', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.combo', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* doctors cards */
    gsap.from('.doc', { y: 70, opacity: 0, duration: 1.2, stagger: .12, ease: E, scrollTrigger: { trigger: '.doc-grid', start: 'top 85%' } });

    /* collage */
    $$('.cl').forEach(c => {
      const sp = +c.dataset.speed || 0, img = c.querySelector('img');
      gsap.from(c.querySelector('.cl-img'), { clipPath: 'inset(0% 0% 100% 0% round 28px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: c, start: 'top 88%' } });
      gsap.to(img, { scale: 1, duration: 2, ease: E2, scrollTrigger: { trigger: c, start: 'top 88%' } });
      mm.add('(min-width: 681px)', () => gsap.to(c, { yPercent: sp * -100, ease: 'none', scrollTrigger: { trigger: '.collage', start: 'top bottom', end: 'bottom top', scrub: true } }));
    });

    /* review: lines rise */
    const rq = $('#reviewQuote');
    if (rq) gsap.from(lines(rq), { yPercent: 105, duration: 1.2, stagger: .08, ease: E2, scrollTrigger: { trigger: rq, start: 'top 82%' } });

    /* finder */
    gsap.from('.concern', { y: 16, opacity: 0, duration: .7, stagger: .03, ease: E, scrollTrigger: { trigger: '.concerns', start: 'top 88%' } });
    gsap.from('.finder-out', { y: 50, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: '.finder-out', start: 'top 88%' } });

    /* CTA word drift + footer word */
    gsap.fromTo('.cta-word', { xPercent: -56 }, { xPercent: -44, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
    const fw = $('.foot-word');
    if (fw) gsap.from(new SplitText(fw, { type: 'chars', mask: 'chars' }).chars, { yPercent: 100, duration: 1.3, stagger: .05, ease: E2, scrollTrigger: { trigger: fw, start: 'top 95%' } });

    /* magnetic buttons */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.magnetic').forEach(b => {
        const xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1,.4)' }), yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
        b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .4); });
        b.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
      });
    }

    new MutationObserver(() => { if (lenis) (!$('#book').hidden) ? lenis.stop() : (!$('#links').classList.contains('open') && lenis.start()); })
      .observe($('#book'), { attributes: true, attributeFilter: ['hidden'] });
    addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  } catch (err) { console.error(err); document.documentElement.classList.remove('js'); done(); }
})();
