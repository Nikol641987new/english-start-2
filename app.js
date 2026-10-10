(function () {
  'use strict';

  /* ---------- Pomocné funkcie ---------- */
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignoruj */ } }
  };
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
  const el = (tag, props = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    kids.flat().forEach(c => { if (c === null || c === undefined || c === false) return; e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  };

  /* ---------- Reč: výslovnosť a rozpoznávanie ---------- */
  let voicesCache = [];
  function loadVoices() {
    voicesCache = ('speechSynthesis' in window) ? speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang)) : [];
  }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }

  const FEMALE = /(samantha|serena|karen|moira|tessa|fiona|victoria|allison|ava\b|susan|zira|hazel|jenny|aria|sonia|libby|emma|kate|joanna|\bfemale\b|google us english)/i;
  const MALE = /(daniel|alex\b|fred|oliver|arthur|george|guy\b|ryan|david|mark\b|rishi|\bmale\b)/i;
  function voiceScore(v) {
    let sc = 0;
    if (/premium|enhanced|natural|neural|online/i.test(v.name + ' ' + (v.voiceURI || ''))) sc += 30;
    if (MALE.test(v.name)) sc -= 40;
    else if (FEMALE.test(v.name)) sc += 20;
    if (/en[-_]GB/i.test(v.lang)) sc += 3;
    if (/en[-_]US/i.test(v.lang)) sc += 2;
    return sc;
  }
  function pickVoice(forceURI) {
    const wanted = forceURI !== undefined ? forceURI : store.get('voice', '');
    if (wanted) { const v = voicesCache.find(x => x.voiceURI === wanted); if (v) return v; }
    return [...voicesCache].sort((a, b) => voiceScore(b) - voiceScore(a))[0] || null;
  }
  function speak(text, forceURI) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(String(text).replace(/\//g, ', '));
    const v = pickVoice(forceURI);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
    u.rate = 0.85;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  function listen(onText, onFail) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Tvoj prehliadač nepodporuje rozpoznávanie reči. Skús Chrome alebo Edge.'); if (onFail) onFail(); return; }
    const r = new SR();
    r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = e => onText(e.results[0][0].transcript);
    r.onerror = () => { if (onFail) onFail(); };
    r.start();
  }

  /* ---------- Dáta ---------- */
  const VERBS = window.VERB_DATA.map(([inf, past, pp, sk, ing, third, ex, exSk]) => ({ inf, past, pp, sk, ing, third, ex, exSk }));
  const VERB_TRANSLATIONS = window.VERB_TRANSLATIONS;
  const VERB_FORM_TRANSLATIONS = window.VERB_FORM_TRANSLATIONS;
  const DICT = window.DICT;
  const WORDS = window.WORD_DATA;
  const ARTICLES = window.ARTICLES;
  const PRON = ['I', 'you', 'he/she/it', 'we', 'you', 'they'];
  const BE_PRES = ['am', 'are', 'is', 'are', 'are', 'are'];
  const FUTURE_OVERRIDES = {
    be: ['Ja budem', 'Ty budeš', 'On/Ona/To bude', 'My budeme', 'Vy budete', 'Oni/Ony budú'],
    go: ['Ja pôjdem', 'Ty pôjdeš', 'On/Ona/To pôjde', 'My pôjdeme', 'Vy pôjdete', 'Oni/Ony pôjdu'],
    come: ['Ja prídem', 'Ty prídeš', 'On/Ona/To príde', 'My prídeme', 'Vy prídete', 'Oni/Ony prídu'],
    see: ['Ja uvidím', 'Ty uvidíš', 'On/Ona/To uvidí', 'My uvidíme', 'Vy uvidíte', 'Oni/Ony uvidia'],
    take: ['Ja vezmem', 'Ty vezmeš', 'On/Ona/To vezme', 'My vezmeme', 'Vy vezmete', 'Oni/Ony vezmú'],
    make: ['Ja urobím', 'Ty urobíš', 'On/Ona/To urobí', 'My urobíme', 'Vy urobíte', 'Oni/Ony urobia'],
    get: ['Ja dostanem', 'Ty dostaneš', 'On/Ona/To dostane', 'My dostaneme', 'Vy dostanete', 'Oni/Ony dostanú'],
    give: ['Ja dám', 'Ty dáš', 'On/Ona/To dá', 'My dáme', 'Vy dáte', 'Oni/Ony dajú'],
    say: ['Ja poviem', 'Ty povieš', 'On/Ona/To povie', 'My povieme', 'Vy poviete', 'Oni/Ony povedia'],
    tell: ['Ja poviem', 'Ty povieš', 'On/Ona/To povie', 'My povieme', 'Vy poviete', 'Oni/Ony povedia'],
    buy: ['Ja kúpim', 'Ty kúpiš', 'On/Ona/To kúpi', 'My kúpime', 'Vy kúpite', 'Oni/Ony kúpia'],
    bring: ['Ja prinesiem', 'Ty prinesieš', 'On/Ona/To prinesie', 'My prinesieme', 'Vy prinesiete', 'Oni/Ony prinesú'],
    find: ['Ja nájdem', 'Ty nájdeš', 'On/Ona/To nájde', 'My nájdeme', 'Vy nájdete', 'Oni/Ony nájdu'],
    leave: ['Ja odídem', 'Ty odídeš', 'On/Ona/To odíde', 'My odídeme', 'Vy odídete', 'Oni/Ony odídu'],
    meet: ['Ja stretnem', 'Ty stretneš', 'On/Ona/To stretne', 'My stretneme', 'Vy stretnete', 'Oni/Ony stretnú'],
    begin: ['Ja začnem', 'Ty začneš', 'On/Ona/To začne', 'My začneme', 'Vy začnete', 'Oni/Ony začnú'],
    forget: ['Ja zabudnem', 'Ty zabudneš', 'On/Ona/To zabudne', 'My zabudneme', 'Vy zabudnete', 'Oni/Ony zabudnú'],
    pay: ['Ja zaplatím', 'Ty zaplatíš', 'On/Ona/To zaplatí', 'My zaplatíme', 'Vy zaplatíte', 'Oni/Ony zaplatia'],
    put: ['Ja položím', 'Ty položíš', 'On/Ona/To položí', 'My položíme', 'Vy položíte', 'Oni/Ony položia'],
    send: ['Ja pošlem', 'Ty pošleš', 'On/Ona/To pošle', 'My pošleme', 'Vy pošlete', 'Oni/Ony pošlú'],
    win: ['Ja vyhrám', 'Ty vyhráš', 'On/Ona/To vyhrá', 'My vyhráme', 'Vy vyhráte', 'Oni/Ony vyhrajú'],
    lose: ['Ja stratím/prehrám', 'Ty stratíš/prehráš', 'On/Ona/To stratí/prehrá', 'My stratíme/prehráme', 'Vy stratíte/prehráte', 'Oni/Ony stratia/prehrajú'],
    feel: ['Ja sa budem cítiť', 'Ty sa budeš cítiť', 'On/Ona/To sa bude cítiť', 'My sa budeme cítiť', 'Vy sa budete cítiť', 'Oni/Ony sa budú cítiť'],
    sell: ['Ja predám', 'Ty predáš', 'On/Ona/To predá', 'My predáme', 'Vy predáte', 'Oni/Ony predajú']
  };

  const FORM_INDEX = {};
  VERBS.forEach(v => {
    const add = (form, label) => {
      form.split('/').forEach(f => { if (f !== v.inf && !FORM_INDEX[f]) FORM_INDEX[f] = { v, label }; });
    };
    add(v.past, 'minulý čas');
    add(v.pp, '3. tvar (past participle)');
    add(v.third, 'prítomný čas (he/she/it)');
    add(v.ing, 'tvar -ing');
  });

  function lookup(word) {
    const k = word.toLowerCase();
    const form = FORM_INDEX[k];
    const verb = VERBS.find(v => v.inf === k);
    let sk = DICT[k] || (verb ? verb.sk + ' (sloveso)' : null) || (form ? form.v.sk : null);
    if (!sk) return null;
    return { sk, note: form ? `„${k}“ = ${form.label} slovesa ${form.v.inf} (${form.v.sk})` : '' };
  }

  function conj(v) {
    const be = v.inf === 'be';
    const translations = VERB_TRANSLATIONS[v.inf];
    const futureInf = VERB_FORM_TRANSLATIONS[v.inf][0].split('/')[0].replace(/\s*\([^)]*\)/g, '');
    const futureTranslations = FUTURE_OVERRIDES[v.inf] ||
      ['Ja', 'Ty', 'On/Ona/To', 'My', 'Vy', 'Oni/Ony'].map((subject, i) =>
        `${subject} ${['budem', 'budeš', 'bude', 'budeme', 'budete', 'budú'][i]} ${futureInf}`);
    return [
      ['Prítomný čas (present simple)', PRON.map((p, i) => `${p} ${be ? BE_PRES[i] : (i === 2 ? v.third : v.inf)}`), translations.present],
      ['Minulý čas (past simple)', PRON.map((p, i) => `${p} ${be ? (i === 0 || i === 2 ? 'was' : 'were') : v.past}`), translations.perfect],
      ['Budúci čas (future)', PRON.map(p => `${p} will ${v.inf}`), futureTranslations],
      ['Prítomný dokonavý (present perfect)', PRON.map((p, i) => `${p} ${i === 2 ? 'has' : 'have'} ${v.pp}`), translations.perfect],
      ['Priebehový (present continuous)', PRON.map((p, i) => `${p} ${BE_PRES[i]} ${v.ing}`), translations.present]
    ];
  }

  /* ---------- Záložky ---------- */
  function showTab(name) {
    $$('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    $$('.tab').forEach(t => t.classList.toggle('active', t.id === 'tab-' + name));
    if (name === 'progress') renderProgress();
    window.scrollTo(0, 0);
  }
  $$('#tabs button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));

  /* ---------- Štatistiky ---------- */
  function recordStat(inf, ok) {
    const s = store.get('stats', {});
    s[inf] = s[inf] || { ok: 0, bad: 0 };
    s[inf][ok ? 'ok' : 'bad']++;
    store.set('stats', s);
  }

  /* ================= SLOVESÁ ================= */
  function buildDetail(v, box) {
    const grid = el('div', { class: 'tenses' });
    conj(v).forEach(([title, lines, translations]) => {
      grid.append(el('div', { class: 'tcard' }, el('h4', {}, title), lines.map((line, i) =>
        el('div', {}, line, translations ? el('div', { class: 'translation' }, translations[i]) : null))));
    });
    box.append(grid);
    box.append(el('p', { class: 'note' }, 'Slovenské preklady sú uvedené pod každou vetou. Present Perfect sa v slovenčine zvyčajne prekladá minulým časom; pri minulých tvaroch sú uvedené mužské/ženské možnosti.'));
    box.append(el('div', { class: 'example' },
      el('b', {}, v.ex), ' ',
      el('button', { class: 'icon', onclick: () => speak(v.ex) }, '🔊'),
      el('div', { class: 'note' }, v.exSk)
    ));
  }

  function renderVerbs(filter = '') {
    const f = filter.trim().toLowerCase();
    const list = $('#verbList');
    list.innerHTML = '';
    VERBS.filter(v => !f || [
      v.inf, v.past, v.pp, v.sk, ...VERB_FORM_TRANSLATIONS[v.inf]
    ].some(x => x.toLowerCase().includes(f))).forEach(v => {
      const [infSk, pastSk, ppSk] = VERB_FORM_TRANSLATIONS[v.inf];
      const row = el('div', { class: 'vrow' },
        el('span', { class: 'vform' }, el('b', {}, v.inf), el('small', {}, infSk)),
        el('span', { class: 'vform' }, v.past, el('small', {}, pastSk)),
        el('span', { class: 'vform' }, v.pp, el('small', {}, ppSk)),
        el('span', { class: 'sk' }, v.sk),
        el('button', { class: 'icon', title: 'Výslovnosť', onclick: e => { e.stopPropagation(); speak(`${v.inf}, ${v.past}, ${v.pp}`); } }, '🔊'));
      const det = el('div', { class: 'vdet hidden' });
      row.addEventListener('click', () => {
        if (!det.dataset.ok) { buildDetail(v, det); det.dataset.ok = '1'; }
        det.classList.toggle('hidden');
      });
      list.append(el('div', { class: 'vitem' }, row, det));
    });
    if (!list.children.length) list.append(el('p', { class: 'hint' }, 'Nič som nenašiel.'));
  }
  $('#verbSearch').addEventListener('input', e => renderVerbs(e.target.value));

  /* ================= SLOVNÍK ================= */
  function renderWordList() {
    const list = $('#wordList');
    const query = $('#wordSearch').value.trim().toLowerCase();
    const category = $('#wordCategory').value;
    list.innerHTML = '';
    const matches = WORDS.filter(w =>
      (!category || w.category === category) &&
      (!query || w.en.toLowerCase().includes(query) || w.sk.toLowerCase().includes(query))
    );
    if (!matches.length) {
      list.append(el('p', { class: 'hint' }, 'Nenašli sa žiadne slovíčka.'));
      return;
    }
    const rows = el('div', { class: 'word-list' });
    matches.forEach(w => {
      rows.append(el('div', { class: 'word-row' },
        el('span', {}, el('b', {}, w.en), el('small', {}, w.category)),
        el('span', { class: 'word-translation' }, w.sk),
        el('button', { class: 'icon', title: `Vypočuť: ${w.en}`, onclick: () => speak(w.en) }, '🔊')
      ));
    });
    list.append(el('p', { class: 'note' }, `${matches.length} slovíčok`), rows);
  }

  function initDictionary() {
    const categories = [...new Set(WORDS.map(w => w.category))];
    categories.forEach(category => $('#wordCategory').append(el('option', { value: category }, category)));
    $('#wordSearch').addEventListener('input', renderWordList);
    $('#wordCategory').addEventListener('change', renderWordList);
    renderWordList();
  }

  /* ================= ČÍTANIE ================= */
  function showArticleList() {
    const area = $('#readArea');
    area.innerHTML = '';
    area.append(el('h2', {}, 'Čítanie'));
    area.append(el('p', { class: 'hint' }, 'Vyber si článok. Keď niečomu nerozumieš, klikni na slovíčko a zobrazí sa preklad.'));
    const cards = el('div', { class: 'cards' });
    ARTICLES.forEach(a => {
      cards.append(el('button', { class: 'card', onclick: () => showArticle(a) }, el('b', {}, a.title), el('span', {}, `${a.titleSk} · úroveň ${a.level}`)));
    });
    area.append(cards);
  }

  function tokenize(text) { return text.match(/[\p{L}]+(?:'[\p{L}]+)?|[^\p{L}]+/gu) || []; }

  function showArticle(a) {
    const area = $('#readArea');
    area.innerHTML = '';
    area.append(el('button', { class: 'link', onclick: showArticleList }, '← Späť na články'));
    const art = el('div', { class: 'article' });
    art.append(el('h2', {}, `${a.title} (${a.titleSk})`));

    const tip = el('div', { class: 'tip' }, el('span', { class: 'note' }, '👆 Klikni na slovo a uvidíš preklad.'));

    const showWord = (word, sentence, node) => {
      $$('.w.active', art).forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const r = lookup(word);
      tip.innerHTML = '';
      tip.append(el('span', { class: 'big' }, word), ' → ', el('span', { class: 'big' }, r ? r.sk : '(nie je v slovníčku)'));
      if (r && r.note) tip.append(el('div', { class: 'note' }, r.note));
      const btns = el('div', {});
      btns.append(el('button', { onclick: () => speak(word) }, '🔊 Vypočuť'));
      btns.append(el('button', { onclick: () => speak(sentence) }, '🔊 Celá veta'));
      const saved = () => store.get('words', []).some(w => w.en === word.toLowerCase());
      const saveBtn = el('button', {}, saved() ? '✓ Uložené' : '＋ Do mojich slovíčok');
      saveBtn.addEventListener('click', () => {
        if (saved()) return;
        const words = store.get('words', []);
        words.push({ en: word.toLowerCase(), sk: r ? r.sk : '' });
        store.set('words', words);
        saveBtn.textContent = '✓ Uložené';
      });
      btns.append(saveBtn);
      if (!r && store.get('apiKey', '')) {
        const aiBtn = el('button', {}, '🤖 Opýtať sa AI');
        aiBtn.addEventListener('click', async () => {
          aiBtn.textContent = '…';
          try {
            const t = await callClaude('You translate English words to Slovak. Reply with only the Slovak translation (max 6 words).',
              [{ role: 'user', content: `Translate the word "${word}" as used in this sentence: "${sentence}"` }], 60);
            tip.querySelector('.big:nth-of-type(2)').textContent = t;
            aiBtn.remove();
          } catch (e) { aiBtn.textContent = 'Chyba: ' + e.message; }
        });
        btns.append(aiBtn);
      }
      tip.append(btns);
    };

    a.paragraphs.forEach(par => {
      const p = el('p', { class: 'para' });
      par.forEach(s => {
        tokenize(s.en).forEach(tok => {
          if (/^[\p{L}]/u.test(tok)) {
            const n = el('span', { class: 'w' }, tok);
            n.addEventListener('click', () => showWord(tok, s.en, n));
            p.append(n);
          } else p.append(document.createTextNode(tok));
        });
        p.append(document.createTextNode(' '));
      });
      art.append(p, el('p', { class: 'trp' }, par.map(s => s.sk).join(' ')));
    });

    const fullText = a.paragraphs.flat().map(s => s.en).join(' ');
    art.append(el('div', { class: 'tools' },
      el('button', { class: 'sec', onclick: () => art.classList.toggle('show-tr') }, '🇸🇰 Zobraziť / skryť slovenský preklad'),
      el('button', { class: 'sec', onclick: () => speak(fullText) }, '🔊 Prečítať článok'),
      el('button', { class: 'sec', onclick: () => speechSynthesis && speechSynthesis.cancel() }, '⏹ Stop')
    ));
    art.append(tip);

    // Kvíz
    const quiz = el('div', {});
    quiz.append(el('h3', {}, 'Otázky k článku'));
    let done = 0, good = 0;
    const result = el('p', { class: 'note' });
    a.quiz.forEach(item => {
      const box = el('div', { class: 'q' }, el('b', {}, item.q));
      const opts = el('div', { class: 'opts' });
      item.options.forEach((o, i) => {
        const b = el('button', { class: 'opt' }, o);
        b.addEventListener('click', () => {
          if (box.dataset.done) return;
          box.dataset.done = '1';
          done++;
          if (i === item.a) { b.classList.add('right'); good++; } else { b.classList.add('wrong'); opts.children[item.a].classList.add('right'); }
          if (done === a.quiz.length) result.textContent = `Hotovo: ${good} / ${a.quiz.length} správne.`;
        });
        opts.append(b);
      });
      box.append(opts);
      quiz.append(box);
    });
    quiz.append(result);
    quiz.append(el('button', {
      class: 'primary', onclick: () => {
        $('#chatMode').value = 'article';
        $('#chatArticle').value = a.id;
        syncChatControls();
        showTab('chat');
      }
    }, '💬 Porozprávať sa o článku s AI'));
    art.append(quiz);
    area.append(art);
  }

  /* ================= CVIČENIA ================= */
  const SUBJ = [{ t: 'I', i: 0 }, { t: 'You', i: 1 }, { t: 'He', i: 2 }, { t: 'She', i: 2 }, { t: 'We', i: 3 }, { t: 'They', i: 5 }];
  const beForm = i => (i === 0 || i === 2 ? 'was' : 'were');
  const gen = {};

  gen.fill = () => {
    const v = pick(VERBS);
    const t = pick(['past', 'pp', 'third', 'future']);
    const tail = v.inf === 'be' ? ' happy' : '';
    const s = pick(SUBJ);
    let prompt, answers, label;
    if (t === 'past') {
      prompt = `Yesterday, ${s.t} ___ (${v.inf})${tail}.`;
      answers = [v.inf === 'be' ? beForm(s.i) : v.past]; label = 'minulý čas';
    } else if (t === 'pp') {
      prompt = `${s.t} ${s.i === 2 ? 'has' : 'have'} ___ (${v.inf})${tail ? ' happy' : ''} before.`;
      answers = [v.pp]; label = '3. tvar (present perfect)';
    } else if (t === 'third') {
      prompt = `Every day, she ___ (${v.inf})${tail}.`;
      answers = [v.inf === 'be' ? 'is' : v.third]; label = 'prítomný čas, 3. osoba';
    } else {
      prompt = `Tomorrow, ${s.t.toLowerCase() === 'i' ? 'I' : s.t} ___ (${v.inf})${tail}.`;
      answers = [`will ${v.inf}`, `'ll ${v.inf}`, `${s.t}'ll ${v.inf}`]; label = 'budúci čas';
    }
    return { verb: v, type: 'text', prompt: 'Doplň správny tvar slovesa:', big: prompt, sub: `${v.sk} · ${label}`, answers, reveal: answers[0] };
  };

  gen.choose = () => {
    const v = pick(VERBS);
    const col = pick(['past', 'pp']);
    const correct = v[col];
    const pool = [...new Set(VERBS.filter(x => x !== v && x[col] !== correct).map(x => x[col]))];
    const options = shuffle([correct, ...shuffle(pool).slice(0, 3)]);
    return {
      verb: v, type: 'choice',
      prompt: col === 'past' ? `Minulý čas slovesa „${v.inf}“ (${v.sk})?` : `3. tvar (past participle) slovesa „${v.inf}“ (${v.sk})?`,
      options, answers: [correct], reveal: correct
    };
  };

  gen.translate = () => {
    const v = pick(VERBS);
    const pool = shuffle(VERBS.filter(x => x !== v)).slice(0, 3).map(x => x.inf);
    return { verb: v, type: 'choice', prompt: `Ako sa povie po anglicky: „${v.sk}“?`, options: shuffle([v.inf, ...pool]), answers: [v.inf], reveal: v.inf };
  };

  gen.listen = () => {
    const v = pick(VERBS);
    return { verb: v, type: 'text', prompt: 'Počúvaj a napíš vetu, ktorú počuješ:', speakText: v.ex, answers: [v.ex], reveal: v.ex, after: v.exSk };
  };

  gen.speak = () => {
    const v = pick(VERBS);
    const pasts = v.past.split('/');
    return {
      verb: v, type: 'speak',
      prompt: `Povedz nahlas tri tvary slovesa „${v.inf}“ (${v.sk})`,
      sub: 'Nápoveda: základný tvar – minulý čas – 3. tvar', pasts, ppForm: v.pp,
      reveal: `${v.inf} – ${v.past} – ${v.pp}`
    };
  };

  gen.wordChoose = () => {
    const word = pick(WORDS);
    const englishPrompt = Math.random() < 0.5;
    const correct = englishPrompt ? word.sk : word.en;
    const pool = [...new Set(WORDS.filter(w => w !== word).map(w => englishPrompt ? w.sk : w.en))];
    return {
      word, type: 'choice',
      prompt: englishPrompt ? `Čo znamená „${word.en}“?` : `Ako sa povie po anglicky „${word.sk}“?`,
      wordSpeakText: englishPrompt ? word.en : null,
      options: shuffle([correct, ...shuffle(pool).slice(0, 3)]),
      answers: [correct], reveal: correct
    };
  };

  gen.wordWrite = () => {
    const word = pick(WORDS);
    const englishPrompt = Math.random() < 0.5;
    return {
      word, type: 'text',
      prompt: englishPrompt ? `Napíš slovenský preklad: „${word.en}“` : `Napíš po anglicky: „${word.sk}“`,
      wordSpeakText: englishPrompt ? word.en : null,
      answers: [englishPrompt ? word.sk : word.en],
      reveal: englishPrompt ? word.sk : word.en
    };
  };

  const MODES = [
    ['fill', '✍️ Doplň tvar', 'Dopíš správny tvar slovesa do vety'],
    ['choose', '🔘 Vyber správny tvar', 'Minulý čas a 3. tvar – 4 možnosti'],
    ['translate', '🇸🇰→🇬🇧 Preklad', 'Z akého slovesa je to slovenské slovo?'],
    ['listen', '🎧 Počúvaj a napíš', 'Dopíš vetu, ktorú počuješ'],
    ['speak', '🎤 Povedz nahlas', 'Precvič si výslovnosť s mikrofónom'],
    ['wordChoose', '📖 Slovíčka: vyber preklad', 'Vyber správny preklad základného slovíčka'],
    ['wordWrite', '⌨️ Slovíčka: napíš preklad', 'Napíš anglický alebo slovenský preklad']
  ];
  let ex = null;

  function renderExMenu() {
    const m = $('#exMenu');
    m.innerHTML = '';
    MODES.forEach(([id, name, desc]) => {
      m.append(el('button', { class: 'card', onclick: () => startEx(id) }, el('b', {}, name), el('span', {}, desc)));
    });
  }

  function startEx(mode) {
    ex = { mode, n: 0, score: 0, total: 10 };
    $('#exMenu').classList.add('hidden');
    $('#exArea').classList.add('on');
    nextQ();
    window.scrollTo(0, 0);
  }

  function closeEx() {
    $('#exArea').classList.remove('on');
    $('#exArea').innerHTML = '';
    $('#exMenu').classList.remove('hidden');
    window.scrollTo(0, 0);
  }

  function nextQ() {
    if (ex.n >= ex.total) return finishEx();
    ex.n++;
    ex.q = gen[ex.mode]();
    ex.answered = false;
    renderQ();
  }

  function finishEx() {
    const a = $('#exArea');
    a.innerHTML = '';
    const pct = Math.round((ex.score / ex.total) * 100);
    a.append(el('h3', {}, 'Hotovo! 🎉'));
    a.append(el('div', { class: 'big-score' }, `${ex.score} / ${ex.total}`));
    a.append(el('p', { class: 'hint' }, pct >= 80 ? 'Výborne!' : pct >= 50 ? 'Dobrá práca, skús to ešte raz.' : 'Nevadí, opakovanie je základ. Skús znova.'));
    a.append(el('div', { class: 'exrow' },
      el('button', { class: 'primary', onclick: () => startEx(ex.mode) }, 'Znova'),
      el('button', { class: 'sec', onclick: closeEx }, 'Späť na cvičenia')));
  }

  function renderQ() {
    const a = $('#exArea');
    const q = ex.q;
    a.innerHTML = '';
    a.append(el('button', { class: 'link', onclick: closeEx }, '← Späť na cvičenia'));
    const scoreSpan = el('span', {}, `Skóre: ${ex.score}`);
    a.append(el('div', { class: 'exhead' }, `Otázka ${ex.n} / ${ex.total}`, scoreSpan));
    a.append(el('h3', { class: 'prompt' }, q.prompt));
    if (q.wordSpeakText) {
      a.append(el('button', { class: 'sec', type: 'button', title: `Vypočuť: ${q.wordSpeakText}`, onclick: () => speak(q.wordSpeakText) }, '🔊 Vypočuť slovíčko'));
    }
    if (q.big) a.append(el('p', { class: 'prompt' }, q.big));
    if (q.sub) a.append(el('p', { class: 'hint' }, q.sub));

    const fb = el('div', { class: 'fb hidden' });
    const nextBtn = el('button', { class: 'primary hidden', onclick: nextQ }, ex.n >= ex.total ? 'Dokončiť' : 'Ďalej →');

    const resolve = (ok, shown) => {
      if (ex.answered) return;
      ex.answered = true;
      if (ok) ex.score++;
      if (q.verb) recordStat(q.verb.inf, ok);
      if (q.word) {
        const stats = store.get('wordStats', {});
        stats[q.word.en] = stats[q.word.en] || { ok: 0, bad: 0 };
        stats[q.word.en][ok ? 'ok' : 'bad']++;
        store.set('wordStats', stats);
      }
      scoreSpan.textContent = `Skóre: ${ex.score}`;
      fb.classList.remove('hidden');
      fb.className = 'fb ' + (ok ? 'ok' : 'bad');
      fb.textContent = ok ? '✅ Správne!' : `❌ Správna odpoveď: ${q.reveal}`;
      if (shown) fb.append(el('div', { class: 'note' }, shown));
      if (q.after) fb.append(el('div', { class: 'note' }, q.after));
      if (q.word) {
        fb.append(el('button', { class: 'sec', type: 'button', title: `Vypočuť: ${q.word.en}`, onclick: () => speak(q.word.en) }, '🔊 Vypočuť slovíčko'));
      }
      nextBtn.classList.remove('hidden');
      nextBtn.focus();
    };

    if (q.type === 'choice') {
      const opts = el('div', { class: 'opts' });
      q.options.forEach(o => {
        const b = el('button', { class: 'opt' }, o);
        b.addEventListener('click', () => {
          if (ex.answered) return;
          const ok = q.answers.includes(o);
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) $$('.opt', opts).find(x => q.answers.includes(x.textContent)).classList.add('right');
          resolve(ok);
        });
        opts.append(b);
      });
      a.append(opts);
    } else if (q.type === 'text') {
      const input = el('input', { type: 'text', placeholder: 'Napíš odpoveď…', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      const form = el('form', { class: 'exrow' }, input, el('button', { class: 'primary' }, 'Skontrolovať'));
      if (q.speakText) form.prepend(el('button', { type: 'button', class: 'sec', onclick: () => speak(q.speakText) }, '🔊 Prehrať'));
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (ex.answered) return;
        const v = norm(input.value);
        resolve(q.answers.some(x => norm(x) === v));
      });
      a.append(form);
      input.focus();
      if (q.speakText) setTimeout(() => speak(q.speakText), 200);
    } else if (q.type === 'speak') {
      a.append(el('div', { class: 'exrow' },
        el('button', { class: 'sec', onclick: () => speak(q.reveal) }, '🔊 Vypočuť správne'),
        el('button', {
          class: 'primary', onclick: () => {
            if (ex.answered) return;
            listen(text => {
              const words = norm(text).split(' ');
              const ok = q.pasts.some(p => words.includes(p)) && words.includes(q.ppForm);
              resolve(ok, `Počul som: „${text}“`);
            }, () => { /* chyba mikrofónu – nič */ });
          }
        }, '🎤 Hovor'),
        el('button', { class: 'sec', onclick: () => resolve(true, 'Označené ako zvládnuté.') }, 'Povedal som to správne ✔')
      ));
    }
    a.append(fb, el('div', { class: 'exrow' }, nextBtn));
  }

  /* ================= AI ROZHOVOR ================= */
  async function callClaude(system, messages, maxTokens = 500) {
    const key = store.get('apiKey', '');
    if (!key) throw new Error('NO_KEY');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: store.get('model', 'claude-haiku-5-5'), max_tokens: maxTokens, system, messages })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data.error && data.error.message) || ('HTTP ' + res.status));
    return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  }

  const TENSE_TEXT = {
    mixed: 'present, past, future and present perfect tenses',
    past: 'the past simple tense',
    present: 'the present simple tense',
    future: 'the future with "will"',
    perfect: 'the present perfect (have/has + past participle)'
  };

  function systemPrompt() {
    const mode = $('#chatMode').value;
    const tense = $('#chatTense').value;
    let s = 'You are a friendly, patient English teacher for an adult Slovak beginner (level A1). ' +
      'Use very simple English: short sentences and common words. Ask exactly ONE short question at a time and wait for the answer. ' +
      'After each answer from the student: (1) if there is a mistake, write the corrected sentence and add a very short explanation in Slovak (1-2 sentences), especially for irregular verb forms; ' +
      '(2) praise her briefly; (3) ask the next question. Keep your English part under 50 words. ' +
      'If the student writes in Slovak, give the English version of her sentence and ask her to repeat it in English. ' +
      'Do not use emojis or markdown.';
    if (mode === 'article') {
      const a = ARTICLES.find(x => x.id === $('#chatArticle').value) || ARTICLES[0];
      const text = a.paragraphs.flat().map(x => x.en).join(' ');
      s += `\nThe student has just read this article:\n"""${text}"""\nAsk simple questions about the article, one at a time. She answers in full English sentences. Sometimes ask her to say the past or future form of a verb from the article.`;
    } else {
      s += `\nTopic: everyday life (family, food, school, hobbies, last weekend, plans for tomorrow). Make her practise irregular verbs in ${TENSE_TEXT[tense]}.`;
    }
    return s;
  }

  const chat = { messages: [], view: [], system: '', busy: false };

  function renderChat() {
    const log = $('#chatLog');
    log.innerHTML = '';
    if (!chat.view.length) log.append(el('p', { class: 'hint' }, 'Stlač „Začať rozhovor“ a AI sa ťa niečo opýta. Odpovedaj po anglicky – aj zle, od toho tu je. 🙂'));
    chat.view.forEach(m => {
      const b = el('div', { class: 'msg ' + m.role }, m.text);
      if (m.role === 'assistant' && m.text !== '…') {
        b.append(el('button', {
          class: 'icon', title: 'Vypočuť',
          onclick: () => speak(m.text.split('\n').filter(l => !/[áäčďéíľĺňóôŕšťúýž]/i.test(l)).join(' '))
        }, '🔊'));
      }
      log.append(b);
    });
    log.scrollTop = log.scrollHeight;
  }

  async function sendChat(text, hidden) {
    if (chat.busy || !text.trim()) return;
    chat.busy = true;
    chat.messages.push({ role: 'user', content: text });
    if (!hidden) chat.view.push({ role: 'user', text });
    chat.view.push({ role: 'assistant', text: '…' });
    renderChat();
    try {
      let hist = chat.messages.slice(-20);
      while (hist.length && hist[0].role !== 'user') hist.shift();
      const reply = await callClaude(chat.system, hist, 500);
      chat.messages.push({ role: 'assistant', content: reply });
      chat.view.pop();
      chat.view.push({ role: 'assistant', text: reply });
    } catch (e) {
      chat.messages.pop();
      chat.view.pop();
      chat.view.push({ role: 'error', text: e.message === 'NO_KEY' ? 'Najprv zadaj API kľúč cez ⚙️ (vpravo hore).' : 'Chyba: ' + e.message });
    }
    chat.busy = false;
    renderChat();
  }

  function syncChatControls() {
    $('#lblArticle').classList.toggle('hidden', $('#chatMode').value !== 'article');
  }

  function initChat() {
    const sel = $('#chatArticle');
    ARTICLES.forEach(a => sel.append(el('option', { value: a.id }, `${a.title} (${a.titleSk})`)));
    $('#chatMode').addEventListener('change', syncChatControls);
    $('#chatStart').addEventListener('click', () => {
      if (!store.get('apiKey', '')) { $('#dlg').showModal(); return; }
      chat.system = systemPrompt();
      chat.messages = [];
      chat.view = [];
      sendChat('Hello! Please start the lesson.', true);
    });
    $('#chatForm').addEventListener('submit', e => {
      e.preventDefault();
      const inp = $('#chatInput');
      const t = inp.value;
      inp.value = '';
      sendChat(t, false);
    });
    $('#chatMic').addEventListener('click', () => listen(t => { $('#chatInput').value = t; $('#chatInput').focus(); }));
    $$('.chips button').forEach(b => b.addEventListener('click', () => sendChat(b.dataset.say, false)));
    renderChat();
  }

  /* ================= NASTAVENIA ================= */
  function initSettings() {
    const dlg = $('#dlg');
    const fillVoices = () => {
      loadVoices();
      const sel = $('#voice');
      sel.innerHTML = '';
      sel.append(el('option', { value: '' }, 'Automaticky (ženský hlas)'));
      voicesCache.forEach(v => sel.append(el('option', { value: v.voiceURI }, `${v.name} (${v.lang})`)));
      sel.value = store.get('voice', '');
    };
    $('#testVoice').addEventListener('click', () => speak('Hello! Yesterday I went to the park and I saw my friend.', $('#voice').value));
    $('#btnSettings').addEventListener('click', () => {
      $('#apiKey').value = store.get('apiKey', '');
      $('#model').value = store.get('model', 'claude-haiku-5-5');
      fillVoices();
      dlg.showModal();
    });
    $('#dlgForm').addEventListener('submit', e => {
      if (e.submitter && e.submitter.value === 'save') {
        store.set('apiKey', $('#apiKey').value.trim());
        store.set('model', $('#model').value);
        store.set('voice', $('#voice').value);
      }
    });
  }

  /* ================= POKROK ================= */
  function renderProgress() {
    const area = $('#progressArea');
    area.innerHTML = '';
    const stats = store.get('stats', {});
    const entries = Object.entries(stats);
    const wordStats = store.get('wordStats', {});
    const wordEntries = Object.entries(wordStats);
    const ok = entries.reduce((s, [, v]) => s + v.ok, 0) + wordEntries.reduce((s, [, v]) => s + v.ok, 0);
    const bad = entries.reduce((s, [, v]) => s + v.bad, 0) + wordEntries.reduce((s, [, v]) => s + v.bad, 0);
    const mastered = entries.filter(([, v]) => v.ok >= 3 && v.ok >= v.bad * 2).length;
    const masteredWords = wordEntries.filter(([, v]) => v.ok >= 3 && v.ok >= v.bad * 2).length;

    area.append(el('h2', {}, 'Môj pokrok'));
    area.append(el('div', {},
      el('div', { class: 'stat' }, el('b', {}, ok + bad), 'odpovedí'),
      el('div', { class: 'stat' }, el('b', {}, ok + bad ? Math.round((ok / (ok + bad)) * 100) + ' %' : '–'), 'správne'),
      el('div', { class: 'stat' }, el('b', {}, `${mastered} / ${VERBS.length}`), 'zvládnuté slovesá'),
      el('div', { class: 'stat' }, el('b', {}, `${masteredWords} / ${WORDS.length}`), 'zvládnuté slovíčka')));

    const hard = entries.filter(([, v]) => v.bad > 0).sort((a, b) => b[1].bad - a[1].bad).slice(0, 8);
    area.append(el('h3', {}, 'Čo ti ešte nejde'));
    const hl = el('div', { class: 'list' });
    if (!hard.length) hl.append(el('p', { class: 'hint' }, 'Zatiaľ nič – urob nejaké cvičenia.'));
    hard.forEach(([inf, v]) => {
      const verb = VERBS.find(x => x.inf === inf);
      hl.append(el('div', { class: 'li' }, el('span', {}, `${verb.inf} – ${verb.past} – ${verb.pp} (${verb.sk})`), el('span', { class: 'note' }, `chýb: ${v.bad}`)));
    });
    area.append(hl);

    const words = store.get('words', []);
    area.append(el('h3', {}, 'Moje slovíčka z článkov'));
    const wl = el('div', { class: 'list' });
    if (!words.length) wl.append(el('p', { class: 'hint' }, 'V čítaní klikni na slovo a daj „Do mojich slovíčok“.'));
    words.forEach((w, i) => {
      wl.append(el('div', { class: 'li' },
        el('span', {}, el('b', {}, w.en), ' – ', w.sk || '?'),
        el('span', {},
          el('button', { class: 'icon', onclick: () => speak(w.en) }, '🔊'),
          el('button', { class: 'icon', onclick: () => { const ws = store.get('words', []); ws.splice(i, 1); store.set('words', ws); renderProgress(); } }, '🗑'))));
    });
    area.append(wl);

    const difficultWords = wordEntries.filter(([, v]) => v.bad > 0).sort((a, b) => b[1].bad - a[1].bad).slice(0, 8);
    area.append(el('h3', {}, 'Slovíčka na zopakovanie'));
    const dwl = el('div', { class: 'list' });
    if (!difficultWords.length) dwl.append(el('p', { class: 'hint' }, 'Zatiaľ tu nič nie je – precvič si slovíčka.'));
    difficultWords.forEach(([en, v]) => {
      const word = WORDS.find(x => x.en === en);
      if (word) dwl.append(el('div', { class: 'li' },
        el('span', {}, `${word.en} – ${word.sk}`),
        el('span', { class: 'note' }, `chýb: ${v.bad}`)));
    });
    area.append(dwl);

    area.append(el('button', {
      class: 'sec', onclick: () => {
        if (confirm('Naozaj vymazať celý pokrok a uložené slovíčka?')) { store.set('stats', {}); store.set('wordStats', {}); store.set('words', []); renderProgress(); }
      }
    }, 'Vymazať pokrok'));
  }

  /* ---------- Štart ---------- */
  renderVerbs();
  initDictionary();
  showArticleList();
  renderExMenu();
  initChat();
  initSettings();
})();
