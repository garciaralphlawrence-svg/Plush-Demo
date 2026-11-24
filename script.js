(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MSGR = 'https://m.me/PlushAestheticsMakati';
  const BR = {
    Makati: { name: 'Makati', phone: '09063959258', disp: '0906 395 9258', addr: 'Unit G5, Valero Plaza Condominium, 124 Valero St., Makati City' },
    BGC: { name: 'BGC', phone: '09278323843', disp: '0927 832 3843', addr: 'Unit 2A, The Grand Hamptons Tower 2, 31st St. corner 1st Ave., BGC, Taguig City' }
  };

  /* ===== Treatments (named and described from Plush's own posts) ===== */
  const CATS = [
    { id: 'botox', tab: 'Botox & Jawtox', img: 'reset', cap: 'Should enhance, not change.', items: [
      ['Botox', 'A doctor’s procedure led by Doc Jia using FDA-approved brands, for fine lines from muscle movement. Quick, no downtime.'],
      ['Jawtox', 'Relaxes the masseter so a wide, square jaw slims down over a few weeks. Also eases clenching and grinding.'],
      ['Sweatox', 'May help reduce excessive underarm sweating, so everyday dressing feels less stressful.'],
      ['Brow lift, gummy smile & neck bands', 'Botox does more than smooth wrinkles; your doctor checks if it suits your concern.']] },
    { id: 'lips', tab: 'Lips', img: 'lips2', cap: 'Fuller, not overfilled.', items: [
      ['Lip filler', 'Adds volume and shape for fuller, more defined lips. Instant, with a few days of swelling.'],
      ['Lip booster', 'Lighter: hydrates, smooths fine lines and adds a natural glow without making lips bigger.']] },
    { id: 'skin', tab: 'Skin & glow', img: 'facial', cap: 'It’s never just a facial.', items: [
      ['HydraFacial', 'Deep cleansing and hydration for an instant glow.'],
      ['Rejuran H & Rejuran I', 'Skin boosters for thin, tired skin (H) and delicate under-eyes (I), for texture and bounce.'],
      ['Skin boosters', 'For tired or puffy eyes, dull and uneven tone, visible acne scars and enlarged pores.'],
      ['Vampire PRP facial', 'Helps with fine lines, skin texture and radiance.'],
      ['Carbon laser facial', 'Deeply cleanses, brightens and rejuvenates for a smoother, clearer glow.']] },
    { id: 'laser', tab: 'Laser & skin care', img: 'laser', cap: 'Precise, controlled, honest.', items: [
      ['Diode laser hair removal', 'For smoother skin with fewer razor days.'],
      ['Underarm Pico whitening', 'Helps brighten dark underarms and even out pigmentation.'],
      ['Sclerotherapy', 'For spider veins. We map your veins and check the root first; it takes 2–4 sessions.'],
      ['Wart & skin tag removal', 'Electrocautery by a professional practitioner, numbed first. Starts at ₱850.']] },
    { id: 'body', tab: 'Body contouring', img: 'bodyside', cap: 'Your shape, refined.', items: [
      ['Lemon Lipo + Exilift', 'Lemon Lipo breaks down stubborn fat; Exilift tightens and lifts the area after.'],
      ['Lemon Bottle', 'For stubborn areas that won’t budge: double chin, arms, tummy and more.'],
      ['Meso Lipo', '3-in-1 contouring: cavitation, RF and meso for tummy, arms, thighs or bra line.'],
      ['Barbie Arms', 'Our signature arm treatment for a sleeker, more toned look.'],
      ['HIFU & EM Slim', 'HIFU lifts and defines the lower face and jawline; EM Slim helps with muscle toning.']] },
    { id: 'well', tab: 'Hair & wellness', img: 'drip', cap: 'Assessment first, always.', items: [
      ['Hair exosomes', 'For thinning hair and shedding, recommended after we assess your case.'],
      ['IV therapy', 'Glow and hydration from within, done in a relaxing lounge.'],
      ['Weight management', 'Planned only after checking your health profile, medical history and goals.']] }
  ];
  const ALL = CATS.flatMap(c => c.items.map(([n, d]) => ({ n, d, cat: c.tab })));
  ALL.push({ n: 'Assessment', d: 'Not sure yet? Start with a proper assessment', cat: 'Start here' });
  $('#treatTrack').innerHTML = `<div class="t-intro"><p>Six ways we care for you, each one planned after an assessment.</p><span class="t-hint">Keep scrolling <i>→</i></span></div>` + CATS.map((c, i) => `<article class="t-panel"><div class="t-img"><img src="assets/img/${c.img}.webp" alt="${esc(c.tab)} at Plush Aesthetics" loading="lazy"></div><div class="t-body"><p class="t-num">${String(i + 1).padStart(2, '0')} / ${String(CATS.length).padStart(2, '0')}</p><h3>${esc(c.tab)}</h3><p class="t-cap">${esc(c.cap)}</p><ul>${c.items.map(([n, d]) => `<li><button data-book="${esc(n)}"><b>${esc(n)}</b><span>${esc(d)}</span><i aria-hidden="true">↗</i></button></li>`).join('')}</ul></div></article>`).join('');

  const mq = ['Because you deserve it', 'Assessment first', 'Subtle, never overdone', 'Makati & BGC'];
  $('#band').innerHTML = [...mq, ...mq, ...mq].map(t => `<span>${esc(t)}</span>`).join('');

  /* ===== Jawtox: the yes and the but (their posts) ===== */
  const QA = [
    ['Will it slim my face?', 'Only if the width is muscle, not bone. We check that first, before anything.'],
    ['Is it instant?', 'No. The jaw muscle relaxes and slims down over a few weeks.'],
    ['Is it permanent?', 'No, it wears off naturally.'],
    ['Can it look weird?', 'Only if too much is used. That’s why we keep it subtle.'],
    ['Do I really need it?', 'Not everyone does, and we’ll tell you honestly.']
  ];
  $('#qaList').innerHTML = QA.map(([q, a], i) => `<li class="qa-item"><span class="q-num">${String(i + 1).padStart(2, '0')}</span><div><p class="q">${esc(q)}</p><p class="a"><b>${i < 2 || i === 4 ? 'But' : 'Honestly'}</b> ${esc(a)}</p></div></li>`).join('');

  /* ===== Collage ===== */
  const IN = [['facial', 'A facial, slowed down', 'c1', .1], ['drip', 'IV lounge', 'c2', -.12], ['laser', 'Laser care', 'c3', .16], ['body', 'Body contouring', 'c4', -.06], ['lemon', 'Lemon Bottle', 'c5', .08], ['reset', 'Skin reset', 'c6', -.14]];
  $('#collage').innerHTML = IN.map(([f, c, k, s]) => `<figure class="cl ${k}" data-speed="${s}"><div class="cl-img"><img src="assets/img/${f}.webp" alt="${esc(c)} at Plush Aesthetics" loading="lazy"></div><figcaption>${esc(c)}</figcaption></figure>`).join('');

  /* ===== Finder ===== */
  const CON = [
    ['Square jaw / clenching', 'Slimmer lower face, less tension.', ['Jawtox']],
    ['Fine lines & wrinkles', 'Smoother, still you.', ['Botox', 'Rejuran H & Rejuran I', 'Vampire PRP facial']],
    ['Thin or dry lips', 'Size or hydration? We’ll help you choose.', ['Lip filler', 'Lip booster']],
    ['Dull, tired skin', 'Bring your glow back out.', ['HydraFacial', 'Skin boosters', 'Carbon laser facial']],
    ['Puffy under-eyes', 'A fresher, more rested look.', ['Rejuran H & Rejuran I', 'Skin boosters']],
    ['Stubborn fat', 'Area by area, with honest expectations.', ['Lemon Lipo + Exilift', 'Lemon Bottle', 'Meso Lipo']],
    ['Flabby arms', 'Sleeveless-ready.', ['Barbie Arms', 'Meso Lipo']],
    ['Sagging jawline', 'Lift, tighten and define.', ['HIFU & EM Slim']],
    ['Dark underarms', 'Brighter, more even skin.', ['Underarm Pico whitening']],
    ['Unwanted hair', 'Fewer razor days.', ['Diode laser hair removal']],
    ['Spider veins', 'Map the veins, treat the root.', ['Sclerotherapy']],
    ['Warts & skin tags', 'Creams won’t remove them; we can.', ['Wart & skin tag removal']],
    ['Excessive sweating', 'Dress without worrying.', ['Sweatox']],
    ['Thinning hair', 'Find the cause first.', ['Hair exosomes']],
    ['Not sure yet', 'Start with a proper assessment.', ['Assessment']]
  ];
  const out = $('#finderOut');
  const empty = () => { out.innerHTML = `<div class="empty"><div><span>Your matches</span>Choose a concern<br>to begin.</div></div>`; };
  $('#concerns').innerHTML = CON.map((c, i) => `<button class="concern" aria-pressed="false" data-c="${i}">${esc(c[0])}</button>`).join('');
  $('#concerns').addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const was = b.getAttribute('aria-pressed') === 'true';
    $$('.concern').forEach(x => x.setAttribute('aria-pressed', 'false'));
    if (was) return empty();
    b.setAttribute('aria-pressed', 'true');
    const [t, why, refs] = CON[+b.dataset.c];
    out.innerHTML = `<h3>${esc(t)}</h3><p class="why">${esc(why)}</p>` + refs.map(n => ALL.find(x => x.n === n)).filter(Boolean).map((it, i) =>
      `<div class="pick" style="animation-delay:${i * 70}ms"><div><b>${esc(it.n)}</b><small>${esc(it.d)}</small></div><button data-book="${esc(it.n)}">Book</button></div>`).join('') +
      `<p class="note-s">Suggestions only. Plush confirms the right treatment after your assessment.</p>`;
  });
  empty();

  /* ===== FAQ (from their posts) ===== */
  const FAQ = [
    ['Will you give me whatever treatment I ask for?', 'Not always. We assess first and tell you what you actually need. Trending doesn’t mean it’s the right treatment for you, and some treatments aren’t for everyone.'],
    ['Who does the Botox?', 'At Plush, Botox is a doctor’s procedure led by Doc Jia using FDA-approved brands. Quick session, minimal discomfort, no downtime.'],
    ['“Once you start Botox, you can never stop.” True?', 'That’s a myth. Botox wears off naturally, and you can stop anytime.'],
    ['How many Lemon Lipo sessions will I need?', 'It isn’t instant, permanent or one session. Results take multiple sessions plus diet, exercise and consistency between each one.'],
    ['How much are your treatments?', 'Rates and current promos are shared by message so you always get the latest. Message us on Facebook or Instagram, or call Makati 0906 395 9258 / BGC 0927 832 3843. Wart removal starts at ₱850.'],
    ['When are you open?', 'Message either branch to book. Holiday schedules are posted on our Facebook page.']
  ];
  $('#faqList').innerHTML = FAQ.map(([q, a], i) => `<details class="fade-up"${i === 0 ? ' open' : ''}><summary>${esc(q)}<i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('');

  /* ===== Nav ===== */
  const nav = $('#nav'), burger = $('#burger'), links = $('#links');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeNav = () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; window.__lenis?.start(); };
  burger.addEventListener('click', () => { const o = !links.classList.contains('open'); links.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); document.body.style.overflow = o ? 'hidden' : ''; o ? window.__lenis?.stop() : window.__lenis?.start(); });
  $$('a, button', links).forEach(a => a.addEventListener('click', closeNav));

  /* ===== Booking ===== */
  const modal = $('#book'), svc = $('#bkSvc');
  let branch = 'Makati';
  const setBranch = b => { branch = b; $$('#branchSeg button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.br === b))); };
  $('#branchSeg').addEventListener('click', e => { const b = e.target.closest('[data-br]'); if (b) setBranch(b.dataset.br); });
  svc.innerHTML = '<option value="">Choose a treatment…</option><option>Assessment (not sure yet)</option>' + CATS.map(c => `<optgroup label="${esc(c.tab)}">` + c.items.map(([n]) => `<option>${esc(n)}</option>`).join('') + '</optgroup>').join('');
  let cur = 0, date = null, time = null, viewM = new Date(); viewM.setDate(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxD = new Date(today); maxD.setDate(maxD.getDate() + 60);
  const SLOTS = ['Morning', 'Midday', 'Afternoon', 'Evening'];
  const fmtD = d => d.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const renderCal = () => {
    const y = viewM.getFullYear(), m = viewM.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    const prevOk = new Date(y, m, 1) > today, nextOk = new Date(y, m + 1, 1) <= maxD;
    let h = `<div class="cal-h"><button data-m="-1" ${prevOk ? '' : 'disabled'} aria-label="Previous month">‹</button>${viewM.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}<button data-m="1" ${nextOk ? '' : 'disabled'} aria-label="Next month">›</button></div><div class="cal-g">`;
    h += ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat(first);
    for (let d = 1; d <= days; d++) { const dt = new Date(y, m, d), off = dt < today || dt > maxD; h += `<button data-d="${d}" ${off ? 'disabled' : ''} class="${date && +dt === +date ? 'sel' : ''}" aria-label="${fmtD(dt)}">${d}</button>`; }
    $('#cal').innerHTML = h + '</div>';
  };
  $('#cal').addEventListener('click', e => {
    const m = e.target.closest('[data-m]'); if (m && !m.disabled) { viewM.setMonth(viewM.getMonth() + +m.dataset.m); renderCal(); return; }
    const d = e.target.closest('[data-d]'); if (d && !d.disabled) { date = new Date(viewM.getFullYear(), viewM.getMonth(), +d.dataset.d); renderCal(); clearErr(); }
  });
  $('#slots').innerHTML = SLOTS.map(s => `<button data-s="${s}">${s}</button>`).join('');
  $('#slots').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; time = b.dataset.s; $$('#slots button').forEach(x => x.classList.toggle('sel', x === b)); clearErr(); });
  const clearErr = () => $$('.err', modal).forEach(x => x.remove());
  const err = (el, t) => { clearErr(); const p = document.createElement('p'); p.className = 'err'; p.textContent = t; el.after(p); };
  const msgText = () => {
    const l = ['Hi Plush Aesthetics! I’d like to book an assessment.', '', 'Branch: ' + BR[branch].name, 'Treatment: ' + svc.value];
    if (date) l.push('Preferred date: ' + fmtD(date)); if (time) l.push('Preferred time: ' + time);
    l.push('Name: ' + $('#bkName').value.trim(), 'Mobile: ' + $('#bkPhone').value.trim());
    const n = $('#bkNote').value.trim(); if (n) l.push('My goals: ' + n);
    l.push('', 'May I also ask for your current rates and available slots? Thank you!'); return l.join('\n');
  };
  const setNext = t => { $('#bkNext').innerHTML = `<span>${t}</span>`; };
  const show = i => {
    cur = i; $$('.step', modal).forEach(s => s.hidden = +s.dataset.step !== i); $$('#dots li').forEach((l, k) => l.classList.toggle('on', k <= i));
    $('#bkBack').style.visibility = i ? 'visible' : 'hidden'; $('#bkNext').style.display = i === 3 ? 'none' : ''; setNext(i === 2 ? 'Review' : 'Next');
    if (i === 1) renderCal();
    if (i === 3) { const t = msgText(), b = BR[branch]; $('#bkMsg').textContent = t; $('#sendSms').href = 'sms:' + b.phone + '?&body=' + encodeURIComponent(t); $('#sendSms').textContent = 'Text ' + b.disp; $('#callBr').href = 'tel:' + b.phone; $('#callBr').textContent = 'Call ' + b.name; $('#copied').textContent = ''; }
  };
  $('#bkNext').addEventListener('click', () => {
    if (cur === 0 && !svc.value) return err(svc.parentElement, 'Please choose a treatment (or “Assessment”).');
    if (cur === 1 && (!date || !time)) return err($('#slots'), 'Please pick a date and a preferred time.');
    if (cur === 2) { if ($('#bkName').value.trim().length < 2) return err($('#bkName').parentElement, 'Please enter your name.'); if (!/^[0-9+()\s-]{7,20}$/.test($('#bkPhone').value.trim())) return err($('#bkPhone').parentElement, 'Please enter a valid mobile number.'); }
    clearErr(); show(cur + 1);
  });
  $('#bkBack').addEventListener('click', () => { clearErr(); show(Math.max(0, cur - 1)); });
  $('#sendMsgr').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(msgText()); $('#copied').textContent = 'Copied! Paste it in the Messenger chat that just opened.'; } catch { $('#copied').textContent = 'Opening Messenger. Copy the message above and paste it there.'; }
    window.open(MSGR, '_blank', 'noopener');
  });
  $('#sendIcs').addEventListener('click', () => {
    if (!date || !time) return;
    const hh = { Morning: 10, Midday: 12, Afternoon: 15, Evening: 18 }[time] || 12;
    const p = n => String(n).padStart(2, '0'), d = `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}`, b = BR[branch];
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Plush Aesthetics//Booking//EN', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@plushaesthetics', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
      `DTSTART;TZID=Asia/Manila:${d}T${p(hh)}0000`, `DTEND;TZID=Asia/Manila:${d}T${p(hh + 1)}0000`, 'SUMMARY:Plush Aesthetics ' + b.name + ' – ' + svc.value.replace(/[,;]/g, ' '),
      'LOCATION:' + b.addr.replace(/,/g, '\\,'), 'DESCRIPTION:Requested schedule – wait for Plush to confirm. ' + b.disp, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'plush-visit.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  let lastFocus = null;
  const openBook = (pre, br) => {
    lastFocus = document.activeElement; closeChat(); if (br) setBranch(br);
    if (pre) { const o = [...svc.options].find(o => o.value === pre) || [...svc.options].find(o => o.value && o.value.toLowerCase().includes(pre.toLowerCase().split(' ')[0])); if (o) svc.value = o.value; }
    modal.hidden = false; document.body.style.overflow = 'hidden'; show(0); svc.focus();
  };
  const closeBook = () => { modal.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBook(b.dataset.book, b.dataset.branch); } });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) closeBook(); });

  /* ===== Ask Plush (keyword assistant) ===== */
  const chat = $('#chat'), log = $('#chatLog');
  const say = (h, who = 'bot') => { const d = document.createElement('div'); d.className = 'bub ' + who; if (who === 'me') d.textContent = h; else d.innerHTML = h; log.appendChild(d); log.scrollTop = log.scrollHeight; };
  const BOOK = ` <a href="#" data-book>Book an assessment</a> or message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`;
  const KB = [
    [/price|how much|magkano|cost|rate|promo|package|discount/, () => `Rates and current promos are shared by message so you always get the latest. Message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>, or call Makati <a href="tel:+639063959258">0906 395 9258</a> / BGC <a href="tel:+639278323843">0927 832 3843</a>. Wart removal starts at ₱850.`],
    [/hour|open|close|sunday|bukas|sarado|oras/, () => `Message either branch to book your slot. Holiday schedules are posted on our Facebook page.` + BOOK],
    [/where|address|location|saan|map|direction|branch|makati|bgc|taguig|valero|hamptons/, () => `<b>Makati:</b> Unit G5, Valero Plaza Condominium, 124 Valero St.<br><b>BGC:</b> Unit 2A, The Grand Hamptons Tower 2, 31st St. cor. 1st Ave. <a href="#visit">See maps</a>.`],
    [/contact|phone|number|call|\btext\b|instagram|\big\b|messenger|tiktok/, () => `Makati: <a href="tel:+639063959258">0906 395 9258</a> · BGC: <a href="tel:+639278323843">0927 832 3843</a> · Instagram <b>@plushaestheticsph</b> · <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`],
    [/book|appoint|reserve|sched|pa-book|assess/, () => `Easy: choose your branch and treatment, pick a day, and we confirm by message. Every plan starts with an assessment.` + BOOK],
    [/doctor|doc |jia|kline|who/, () => `Botox at Plush is a doctor’s procedure led by <b>Doc Jia</b> using FDA-approved brands. <b>Dr. Kline</b> recently joined the team, focused on natural-looking results.`],
    [/jaw|clench|grind|square/, () => `<b>Jawtox</b> relaxes the jaw muscle so it slims down over a few weeks, and it eases clenching. Honest truth: it only slims if the width is muscle, not bone, and it wears off naturally. We check first.` + BOOK],
    [/botox|wrinkle|fine line|brow|gummy|neck|sweat/, () => `Botox at Plush is doctor-led with FDA-approved brands: for fine lines, plus brow lift, gummy smile, neck bands, <b>Jawtox</b> and <b>Sweatox</b>. And no, “once you start you can never stop” is a myth.`],
    [/lip|pout|filler|booster/, () => `<b>Lip filler</b> adds volume and shape (instant, a few days of swelling). <b>Lip booster</b> is lighter: it hydrates and smooths without making lips bigger. Want size? Filler. Want hydration and a subtle look? Booster.`],
    [/fat|lemon|lipo|meso|exilift|body|tummy|arm|barbie|slim|weight/, () => `For stubborn fat: <b>Lemon Lipo + Exilift</b> (break down, then tighten), <b>Lemon Bottle</b>, <b>Meso Lipo</b> and our signature <b>Barbie Arms</b>. Honest truth: it takes multiple sessions plus diet and consistency.`],
    [/hydra|facial|glow|dull|rejuran|booster|prp|vampire|carbon|eye/, () => `For glow: <b>HydraFacial</b>, <b>Rejuran H & I</b>, skin boosters, <b>Vampire PRP facial</b> and <b>Carbon laser facial</b>.`],
    [/laser|hair removal|underarm|whiten|pico|vein|sclero|wart|tag/, () => `We offer <b>diode laser hair removal</b>, <b>underarm Pico whitening</b>, <b>sclerotherapy</b> for spider veins, and <b>wart & skin tag removal</b> (from ₱850).`],
    [/hifu|lift|sag|tight|em slim/, () => `<b>HIFU</b> targets the lower face and jawline to firm skin and sculpt your profile with zero downtime. We also offer <b>EM Slim</b>.`],
    [/hi|hello|good|kumusta|hey/, () => `Hi! ✨ Ask me about treatments, our doctors, branches or booking.`]
  ];
  const QUICK = ['Prices', 'Branches', 'Jawtox', 'Lips', 'Lemon Lipo', 'Doctors', 'Book'];
  $('#chatQuick').innerHTML = QUICK.map(t => `<button data-q="${t}">${t}</button>`).join('');
  const answer = t => { say(t, 'me'); const hit = KB.find(([re]) => re.test(t.toLowerCase())); setTimeout(() => say(hit ? hit[1]() : `I'm not sure about that one. Our team can answer on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>, or call Makati <a href="tel:+639063959258">0906 395 9258</a> / BGC <a href="tel:+639278323843">0927 832 3843</a>.`), 350); };
  let greeted = false;
  const openChat = () => { chat.hidden = false; if (!greeted) { greeted = true; say('Hi, welcome to Plush! ✨ I can help with treatments, branches and booking.'); } $('#chatIn').focus(); };
  function closeChat() { chat.hidden = true; }
  document.addEventListener('click', e => { if (e.target.closest('[data-chat]')) { e.preventDefault(); openChat(); } });
  chat.addEventListener('click', e => { if (e.target.closest('.x')) closeChat(); const b = e.target.closest('[data-q]'); if (b) answer(b.dataset.q); });
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; answer(v); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!modal.hidden) closeBook(); else if (!chat.hidden) closeChat(); else closeNav(); } });
})();
