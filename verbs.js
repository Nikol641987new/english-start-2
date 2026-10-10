// Nepravidelné slovesá. Nové pridáš jednoducho ako ďalší riadok.
// Poradie: [základný tvar, minulý čas, 3. tvar (past participle), slovensky, -ing tvar, 3. osoba (he/she/it), príklad, preklad príkladu]
window.VERB_DATA = [
  ['be', 'was/were', 'been', 'byť', 'being', 'is', 'I was tired yesterday.', 'Včera som bol unavený.'],
  ['have', 'had', 'had', 'mať', 'having', 'has', 'We had lunch at noon.', 'Mali sme obed na poludnie.'],
  ['do', 'did', 'done', 'robiť, vykonať', 'doing', 'does', 'She did her homework.', 'Urobila si domácu úlohu.'],
  ['go', 'went', 'gone', 'ísť', 'going', 'goes', 'He went to school.', 'Išiel do školy.'],
  ['come', 'came', 'come', 'prísť', 'coming', 'comes', 'They came late.', 'Prišli neskoro.'],
  ['see', 'saw', 'seen', 'vidieť', 'seeing', 'sees', 'I saw a big dog.', 'Videl som veľkého psa.'],
  ['take', 'took', 'taken', 'vziať', 'taking', 'takes', 'She took a taxi.', 'Vzala si taxík.'],
  ['make', 'made', 'made', 'vyrobiť, urobiť (niečo)', 'making', 'makes', 'He made a cake.', 'Upiekol koláč.'],
  ['get', 'got', 'got', 'dostať', 'getting', 'gets', 'I got a letter.', 'Dostal som list.'],
  ['give', 'gave', 'given', 'dať', 'giving', 'gives', 'She gave me a book.', 'Dala mi knihu.'],
  ['know', 'knew', 'known', 'vedieť, poznať', 'knowing', 'knows', 'I knew his name.', 'Poznal som jeho meno.'],
  ['think', 'thought', 'thought', 'myslieť', 'thinking', 'thinks', 'We thought about it.', 'Mysleli sme na to.'],
  ['say', 'said', 'said', 'povedať (slová)', 'saying', 'says', 'He said hello.', 'Pozdravil.'],
  ['tell', 'told', 'told', 'povedať (niekomu)', 'telling', 'tells', 'She told me a story.', 'Povedala mi príbeh.'],
  ['eat', 'ate', 'eaten', 'jesť', 'eating', 'eats', 'I ate an apple.', 'Zjedol som jablko.'],
  ['drink', 'drank', 'drunk', 'piť', 'drinking', 'drinks', 'He drank water.', 'Pil vodu.'],
  ['write', 'wrote', 'written', 'písať', 'writing', 'writes', 'She wrote an email.', 'Napísala email.'],
  ['read', 'read', 'read', 'čítať', 'reading', 'reads', 'I read a book.', 'Čítal som knihu. (vyslovuje sa „red“)'],
  ['speak', 'spoke', 'spoken', 'hovoriť', 'speaking', 'speaks', 'He spoke English.', 'Hovoril po anglicky.'],
  ['buy', 'bought', 'bought', 'kúpiť', 'buying', 'buys', 'We bought bread.', 'Kúpili sme chlieb.'],
  ['bring', 'brought', 'brought', 'priniesť', 'bringing', 'brings', 'She brought flowers.', 'Priniesla kvety.'],
  ['find', 'found', 'found', 'nájsť', 'finding', 'finds', 'I found my keys.', 'Našiel som kľúče.'],
  ['leave', 'left', 'left', 'odísť, nechať', 'leaving', 'leaves', 'They left at five.', 'Odišli o piatej.'],
  ['run', 'ran', 'run', 'bežať', 'running', 'runs', 'He ran to the bus.', 'Bežal na autobus.'],
  ['sit', 'sat', 'sat', 'sedieť', 'sitting', 'sits', 'She sat on the chair.', 'Sedela na stoličke.'],
  ['stand', 'stood', 'stood', 'stáť', 'standing', 'stands', 'We stood in line.', 'Stáli sme v rade.'],
  ['sleep', 'slept', 'slept', 'spať', 'sleeping', 'sleeps', 'I slept well.', 'Spal som dobre.'],
  ['drive', 'drove', 'driven', 'viesť auto', 'driving', 'drives', 'He drove to work.', 'Išiel do práce autom.'],
  ['meet', 'met', 'met', 'stretnúť', 'meeting', 'meets', 'I met my friend.', 'Stretol som kamaráta.'],
  ['begin', 'began', 'begun', 'začať', 'beginning', 'begins', 'The film began at eight.', 'Film sa začal o ôsmej.'],
  ['forget', 'forgot', 'forgotten', 'zabudnúť', 'forgetting', 'forgets', 'I forgot my bag.', 'Zabudol som tašku.'],
  ['understand', 'understood', 'understood', 'rozumieť', 'understanding', 'understands', 'She understood the question.', 'Pochopila otázku.'],
  ['pay', 'paid', 'paid', 'platiť', 'paying', 'pays', 'He paid for the coffee.', 'Zaplatil za kávu.'],
  ['put', 'put', 'put', 'položiť', 'putting', 'puts', 'I put it on the table.', 'Položil som to na stôl.'],
  ['send', 'sent', 'sent', 'poslať', 'sending', 'sends', 'She sent a message.', 'Poslala správu.'],
  ['sing', 'sang', 'sung', 'spievať', 'singing', 'sings', 'They sang a song.', 'Zaspievali pieseň.'],
  ['swim', 'swam', 'swum', 'plávať', 'swimming', 'swims', 'We swam in the lake.', 'Plávali sme v jazere.'],
  ['wear', 'wore', 'worn', 'nosiť (oblečenie)', 'wearing', 'wears', 'She wore a red dress.', 'Mala na sebe červené šaty.'],
  ['win', 'won', 'won', 'vyhrať', 'winning', 'wins', 'Our team won.', 'Náš tím vyhral.'],
  ['lose', 'lost', 'lost', 'stratiť, prehrať', 'losing', 'loses', 'I lost my phone.', 'Stratil som telefón.'],
  ['feel', 'felt', 'felt', 'cítiť (sa)', 'feeling', 'feels', 'I felt happy.', 'Cítil som sa šťastný.'],
  ['hear', 'heard', 'heard', 'počuť', 'hearing', 'hears', 'I heard a noise.', 'Počul som zvuk.'],
  ['sell', 'sold', 'sold', 'predať', 'selling', 'sells', 'He sold his car.', 'Predal auto.'],
  ['fly', 'flew', 'flown', 'lietať', 'flying', 'flies', 'We flew to Rome.', 'Leteli sme do Ríma.'],
  ['teach', 'taught', 'taught', 'učiť (iných)', 'teaching', 'teaches', 'She taught English.', 'Učila angličtinu.']
];

window.VERB_FORM_TRANSLATIONS = {
  be: ['byť', 'bol/bola', 'bol/bola/bolo'],
  have: ['mať', 'mal/mala', 'mal/mala'],
  do: ['robiť', 'robil/robila', 'urobený/urobená'],
  go: ['ísť', 'išiel/išla', 'odišiel/odišla'],
  come: ['prísť', 'prišiel/prišla', 'prišiel/prišla'],
  see: ['vidieť', 'videl/videla', 'videný/videná'],
  take: ['vziať', 'vzal/vzala', 'vzatý/vzatá'],
  make: ['urobiť/vyrobiť', 'urobil/urobila', 'urobený/urobená'],
  get: ['dostať', 'dostal/dostala', 'dostal/dostala'],
  give: ['dať', 'dal/dala', 'daný/daná'],
  know: ['vedieť/poznať', 'vedel/vedela', 'známy/známa'],
  think: ['myslieť', 'myslel/myslela', 'myslel/myslela'],
  say: ['povedať', 'povedal/povedala', 'povedaný/povedaná'],
  tell: ['povedať', 'povedal/povedala', 'povedaný/povedaná'],
  eat: ['jesť', 'jedol/jedla', 'zjedený/zjedená'],
  drink: ['piť', 'pil/pila', 'vypitý/vypitá'],
  write: ['písať', 'písal/písala', 'napísaný/napísaná'],
  read: ['čítať', 'čítal/čítala', 'prečítaný/prečítaná'],
  speak: ['hovoriť', 'hovoril/hovorila', 'hovorený/hovorená'],
  buy: ['kúpiť', 'kúpil/kúpila', 'kúpený/kúpená'],
  bring: ['priniesť', 'priniesol/priniesla', 'prinesený/prinesená'],
  find: ['nájsť', 'našiel/našla', 'nájdený/nájdená'],
  leave: ['odísť/nechať', 'odišiel/odišla', 'odišiel/odišla'],
  run: ['bežať', 'bežal/bežala', 'bežal/bežala'],
  sit: ['sedieť', 'sedel/sedela', 'sedel/sedela'],
  stand: ['stáť', 'stál/stála', 'stál/stála'],
  sleep: ['spať', 'spal/spala', 'spal/spala'],
  drive: ['šoférovať', 'šoféroval/šoférovala', 'šoférovaný/šoférovaná'],
  meet: ['stretnúť', 'stretol/stretla', 'stretnutý/stretnutá'],
  begin: ['začať', 'začal/začala', 'začatý/začatá'],
  forget: ['zabudnúť', 'zabudol/zabudla', 'zabudnutý/zabudnutá'],
  understand: ['rozumieť', 'rozumel/rozumela', 'pochopený/pochopená'],
  pay: ['platiť', 'platil/platila', 'zaplatený/zaplatená'],
  put: ['položiť', 'položil/položila', 'položený/položená'],
  send: ['poslať', 'poslal/poslala', 'poslaný/poslaná'],
  sing: ['spievať', 'spieval/spievala', 'spievaný/spievaná'],
  swim: ['plávať', 'plával/plávala', 'plávaný/plávaná'],
  wear: ['nosiť', 'nosil/nosila', 'nosený/nosená'],
  win: ['vyhrať', 'vyhral/vyhrala', 'vyhratý/vyhratá'],
  lose: ['stratiť/prehrať', 'stratil/stratila', 'stratený/prehratý'],
  feel: ['cítiť (sa)', 'cítil/cítila', 'cítil/cítila'],
  hear: ['počuť', 'počul/počula', 'počutý/počutá'],
  sell: ['predať', 'predal/predala', 'predaný/predaná'],
  fly: ['lietať', 'letel/letela', 'odletený/odletená'],
  teach: ['učiť (iných)', 'učil/učila', 'učený/učená']
};

window.VERB_TRANSLATIONS = {
  be: {
    present: ['Ja som', 'Ty si', 'On/Ona/To je', 'My sme', 'Vy ste', 'Oni/Ony sú'],
    perfect: ['Ja som bol(a)', 'Ty si bol(a)', 'On/Ona/To bol(a/o)', 'My sme boli', 'Vy ste boli', 'Oni/Ony boli']
  },
  have: {
    present: ['Ja mám', 'Ty máš', 'On/Ona/To má', 'My máme', 'Vy máte', 'Oni/Ony majú'],
    perfect: ['Ja som mal(a)', 'Ty si mal(a)', 'On/Ona/To mal(a/o)', 'My sme mali', 'Vy ste mali', 'Oni/Ony mali']
  },
  do: {
    present: ['Ja robím', 'Ty robíš', 'On/Ona/To robí', 'My robíme', 'Vy robíte', 'Oni/Ony robia'],
    perfect: ['Ja som urobil(a)', 'Ty si urobil(a)', 'On/Ona/To urobil(a/o)', 'My sme urobili', 'Vy ste urobili', 'Oni/Ony urobili']
  },
  go: {
    present: ['Ja idem', 'Ty ideš', 'On/Ona/To ide', 'My ideme', 'Vy idete', 'Oni/Ony idú'],
    perfect: ['Ja som išiel/išla', 'Ty si išiel/išla', 'On/Ona/To išiel/išla/išlo', 'My sme išli', 'Vy ste išli', 'Oni/Ony išli']
  },
  come: {
    present: ['Ja prichádzam', 'Ty prichádzaš', 'On/Ona/To prichádza', 'My prichádzame', 'Vy prichádzate', 'Oni/Ony prichádzajú'],
    perfect: ['Ja som prišiel/prišla', 'Ty si prišiel/prišla', 'On/Ona/To prišiel/prišla/prišlo', 'My sme prišli', 'Vy ste prišli', 'Oni/Ony prišli']
  },
  see: {
    present: ['Ja vidím', 'Ty vidíš', 'On/Ona/To vidí', 'My vidíme', 'Vy vidíte', 'Oni/Ony vidia'],
    perfect: ['Ja som videl(a)', 'Ty si videl(a)', 'On/Ona/To videl(a/o)', 'My sme videli', 'Vy ste videli', 'Oni/Ony videli']
  },
  take: {
    present: ['Ja beriem', 'Ty berieš', 'On/Ona/To berie', 'My berieme', 'Vy beriete', 'Oni/Ony berú'],
    perfect: ['Ja som vzal(a)', 'Ty si vzal(a)', 'On/Ona/To vzal(a/o)', 'My sme vzali', 'Vy ste vzali', 'Oni/Ony vzali']
  },
  make: {
    present: ['Ja robím', 'Ty robíš', 'On/Ona/To robí', 'My robíme', 'Vy robíte', 'Oni/Ony robia'],
    perfect: ['Ja som urobil(a)', 'Ty si urobil(a)', 'On/Ona/To urobil(a/o)', 'My sme urobili', 'Vy ste urobili', 'Oni/Ony urobili']
  },
  get: {
    present: ['Ja dostávam', 'Ty dostávaš', 'On/Ona/To dostáva', 'My dostávame', 'Vy dostávate', 'Oni/Ony dostávajú'],
    perfect: ['Ja som dostal(a)', 'Ty si dostal(a)', 'On/Ona/To dostal(a/o)', 'My sme dostali', 'Vy ste dostali', 'Oni/Ony dostali']
  },
  give: {
    present: ['Ja dávam', 'Ty dávaš', 'On/Ona/To dáva', 'My dávame', 'Vy dávate', 'Oni/Ony dávajú'],
    perfect: ['Ja som dal(a)', 'Ty si dal(a)', 'On/Ona/To dal(a/o)', 'My sme dali', 'Vy ste dali', 'Oni/Ony dali']
  },
  know: {
    present: ['Ja viem', 'Ty vieš', 'On/Ona/To vie', 'My vieme', 'Vy viete', 'Oni/Ony vedia'],
    perfect: ['Ja som vedel(a)', 'Ty si vedel(a)', 'On/Ona/To vedel(a/o)', 'My sme vedeli', 'Vy ste vedeli', 'Oni/Ony vedeli']
  },
  think: {
    present: ['Ja myslím', 'Ty myslíš', 'On/Ona/To myslí', 'My myslíme', 'Vy myslíte', 'Oni/Ony myslia'],
    perfect: ['Ja som myslel(a)', 'Ty si myslel(a)', 'On/Ona/To myslel(a/o)', 'My sme mysleli', 'Vy ste mysleli', 'Oni/Ony mysleli']
  },
  say: {
    present: ['Ja hovorím', 'Ty hovoríš', 'On/Ona/To hovorí', 'My hovoríme', 'Vy hovoríte', 'Oni/Ony hovoria'],
    perfect: ['Ja som povedal(a)', 'Ty si povedal(a)', 'On/Ona/To povedal(a/o)', 'My sme povedali', 'Vy ste povedali', 'Oni/Ony povedali']
  },
  tell: {
    present: ['Ja hovorím', 'Ty hovoríš', 'On/Ona/To hovorí', 'My hovoríme', 'Vy hovoríte', 'Oni/Ony hovoria'],
    perfect: ['Ja som povedal(a)', 'Ty si povedal(a)', 'On/Ona/To povedal(a/o)', 'My sme povedali', 'Vy ste povedali', 'Oni/Ony povedali']
  },
  eat: {
    present: ['Ja jem', 'Ty ješ', 'On/Ona/To je', 'My jeme', 'Vy jete', 'Oni/Ony jedia'],
    perfect: ['Ja som jedol/jedla', 'Ty si jedol/jedla', 'On/Ona/To jedol/jedla/jedlo', 'My sme jedli', 'Vy ste jedli', 'Oni/Ony jedli']
  },
  drink: {
    present: ['Ja pijem', 'Ty piješ', 'On/Ona/To pije', 'My pijeme', 'Vy pijete', 'Oni/Ony pijú'],
    perfect: ['Ja som pil(a)', 'Ty si pil(a)', 'On/Ona/To pil(a/o)', 'My sme pili', 'Vy ste pili', 'Oni/Ony pili']
  },
  write: {
    present: ['Ja píšem', 'Ty píšeš', 'On/Ona/To píše', 'My píšeme', 'Vy píšete', 'Oni/Ony píšu'],
    perfect: ['Ja som napísal(a)', 'Ty si napísal(a)', 'On/Ona/To napísal(a/o)', 'My sme napísali', 'Vy ste napísali', 'Oni/Ony napísali']
  },
  read: {
    present: ['Ja čítam', 'Ty čítaš', 'On/Ona/To číta', 'My čítame', 'Vy čítate', 'Oni/Ony čítajú'],
    perfect: ['Ja som čítal(a)', 'Ty si čítal(a)', 'On/Ona/To čítal(a/o)', 'My sme čítali', 'Vy ste čítali', 'Oni/Ony čítali']
  },
  speak: {
    present: ['Ja hovorím', 'Ty hovoríš', 'On/Ona/To hovorí', 'My hovoríme', 'Vy hovoríte', 'Oni/Ony hovoria'],
    perfect: ['Ja som hovoril(a)', 'Ty si hovoril(a)', 'On/Ona/To hovoril(a/o)', 'My sme hovorili', 'Vy ste hovorili', 'Oni/Ony hovorili']
  },
  buy: {
    present: ['Ja kupujem', 'Ty kupuješ', 'On/Ona/To kupuje', 'My kupujeme', 'Vy kupujete', 'Oni/Ony kupujú'],
    perfect: ['Ja som kúpil(a)', 'Ty si kúpil(a)', 'On/Ona/To kúpil(a/o)', 'My sme kúpili', 'Vy ste kúpili', 'Oni/Ony kúpili']
  },
  bring: {
    present: ['Ja prinášam', 'Ty prinášaš', 'On/Ona/To prináša', 'My prinášame', 'Vy prinášate', 'Oni/Ony prinášajú'],
    perfect: ['Ja som priniesol/priniesla', 'Ty si priniesol/priniesla', 'On/Ona/To priniesol/priniesla/prinieslo', 'My sme priniesli', 'Vy ste priniesli', 'Oni/Ony priniesli']
  },
  find: {
    present: ['Ja nachádzam', 'Ty nachádzaš', 'On/Ona/To nachádza', 'My nachádzame', 'Vy nachádzate', 'Oni/Ony nachádzajú'],
    perfect: ['Ja som našiel/našla', 'Ty si našiel/našla', 'On/Ona/To našiel/našla/našlo', 'My sme našli', 'Vy ste našli', 'Oni/Ony našli']
  },
  leave: {
    present: ['Ja odchádzam', 'Ty odchádzaš', 'On/Ona/To odchádza', 'My odchádzame', 'Vy odchádzate', 'Oni/Ony odchádzajú'],
    perfect: ['Ja som odišiel/odišla', 'Ty si odišiel/odišla', 'On/Ona/To odišiel/odišla/odišlo', 'My sme odišli', 'Vy ste odišli', 'Oni/Ony odišli']
  },
  run: {
    present: ['Ja bežím', 'Ty bežíš', 'On/Ona/To beží', 'My bežíme', 'Vy bežíte', 'Oni/Ony bežia'],
    perfect: ['Ja som bežal(a)', 'Ty si bežal(a)', 'On/Ona/To bežal(a/o)', 'My sme bežali', 'Vy ste bežali', 'Oni/Ony bežali']
  },
  sit: {
    present: ['Ja sedím', 'Ty sedíš', 'On/Ona/To sedí', 'My sedíme', 'Vy sedíte', 'Oni/Ony sedia'],
    perfect: ['Ja som sedel(a)', 'Ty si sedel(a)', 'On/Ona/To sedel(a/o)', 'My sme sedeli', 'Vy ste sedeli', 'Oni/Ony sedeli']
  },
  stand: {
    present: ['Ja stojím', 'Ty stojíš', 'On/Ona/To stojí', 'My stojíme', 'Vy stojíte', 'Oni/Ony stoja'],
    perfect: ['Ja som stál(a)', 'Ty si stál(a)', 'On/Ona/To stál(a/o)', 'My sme stáli', 'Vy ste stáli', 'Oni/Ony stáli']
  },
  sleep: {
    present: ['Ja spím', 'Ty spíš', 'On/Ona/To spí', 'My spíme', 'Vy spíte', 'Oni/Ony spia'],
    perfect: ['Ja som spal(a)', 'Ty si spal(a)', 'On/Ona/To spal(a/o)', 'My sme spali', 'Vy ste spali', 'Oni/Ony spali']
  },
  drive: {
    present: ['Ja šoférujem', 'Ty šoféruješ', 'On/Ona/To šoféruje', 'My šoférujeme', 'Vy šoférujete', 'Oni/Ony šoférujú'],
    perfect: ['Ja som šoféroval(a)', 'Ty si šoféroval(a)', 'On/Ona/To šoféroval(a/o)', 'My sme šoférovali', 'Vy ste šoférovali', 'Oni/Ony šoférovali']
  },
  meet: {
    present: ['Ja stretávam', 'Ty stretávaš', 'On/Ona/To stretáva', 'My stretávame', 'Vy stretávate', 'Oni/Ony stretávajú'],
    perfect: ['Ja som stretol/stretla', 'Ty si stretol/stretla', 'On/Ona/To stretol/stretla/stretlo', 'My sme stretli', 'Vy ste stretli', 'Oni/Ony stretli']
  },
  begin: {
    present: ['Ja začínam', 'Ty začínaš', 'On/Ona/To začína', 'My začíname', 'Vy začínate', 'Oni/Ony začínajú'],
    perfect: ['Ja som začal(a)', 'Ty si začal(a)', 'On/Ona/To začal(a/o)', 'My sme začali', 'Vy ste začali', 'Oni/Ony začali']
  },
  forget: {
    present: ['Ja zabúdam', 'Ty zabúdaš', 'On/Ona/To zabúda', 'My zabúdame', 'Vy zabúdate', 'Oni/Ony zabúdajú'],
    perfect: ['Ja som zabudol/zabudla', 'Ty si zabudol/zabudla', 'On/Ona/To zabudol/zabudla/zabudlo', 'My sme zabudli', 'Vy ste zabudli', 'Oni/Ony zabudli']
  },
  understand: {
    present: ['Ja rozumiem', 'Ty rozumieš', 'On/Ona/To rozumie', 'My rozumieme', 'Vy rozumiete', 'Oni/Ony rozumejú'],
    perfect: ['Ja som rozumel(a)', 'Ty si rozumel(a)', 'On/Ona/To rozumel(a/o)', 'My sme rozumeli', 'Vy ste rozumeli', 'Oni/Ony rozumeli']
  },
  pay: {
    present: ['Ja platím', 'Ty platíš', 'On/Ona/To platí', 'My platíme', 'Vy platíte', 'Oni/Ony platia'],
    perfect: ['Ja som zaplatil(a)', 'Ty si zaplatil(a)', 'On/Ona/To zaplatil(a/o)', 'My sme zaplatili', 'Vy ste zaplatili', 'Oni/Ony zaplatili']
  },
  put: {
    present: ['Ja kladiem', 'Ty kladieš', 'On/Ona/To kladie', 'My kladieme', 'Vy kladiete', 'Oni/Ony kladú'],
    perfect: ['Ja som položil(a)', 'Ty si položil(a)', 'On/Ona/To položil(a/o)', 'My sme položili', 'Vy ste položili', 'Oni/Ony položili']
  },
  send: {
    present: ['Ja posielam', 'Ty posielaš', 'On/Ona/To posiela', 'My posielame', 'Vy posielate', 'Oni/Ony posielajú'],
    perfect: ['Ja som poslal(a)', 'Ty si poslal(a)', 'On/Ona/To poslal(a/o)', 'My sme poslali', 'Vy ste poslali', 'Oni/Ony poslali']
  },
  sing: {
    present: ['Ja spievam', 'Ty spievaš', 'On/Ona/To spieva', 'My spievame', 'Vy spievate', 'Oni/Ony spievajú'],
    perfect: ['Ja som spieval(a)', 'Ty si spieval(a)', 'On/Ona/To spieval(a/o)', 'My sme spievali', 'Vy ste spievali', 'Oni/Ony spievali']
  },
  swim: {
    present: ['Ja plávam', 'Ty plávaš', 'On/Ona/To pláva', 'My plávame', 'Vy plávate', 'Oni/Ony plávajú'],
    perfect: ['Ja som plával(a)', 'Ty si plával(a)', 'On/Ona/To plával(a/o)', 'My sme plávali', 'Vy ste plávali', 'Oni/Ony plávali']
  },
  wear: {
    present: ['Ja nosím', 'Ty nosíš', 'On/Ona/To nosí', 'My nosíme', 'Vy nosíte', 'Oni/Ony nosia'],
    perfect: ['Ja som nosil(a)', 'Ty si nosil(a)', 'On/Ona/To nosil(a/o)', 'My sme nosili', 'Vy ste nosili', 'Oni/Ony nosili']
  },
  win: {
    present: ['Ja vyhrávam', 'Ty vyhrávaš', 'On/Ona/To vyhráva', 'My vyhrávame', 'Vy vyhrávate', 'Oni/Ony vyhrávajú'],
    perfect: ['Ja som vyhral(a)', 'Ty si vyhral(a)', 'On/Ona/To vyhral(a/o)', 'My sme vyhrali', 'Vy ste vyhrali', 'Oni/Ony vyhrali']
  },
  lose: {
    present: ['Ja strácam', 'Ty strácaš', 'On/Ona/To stráca', 'My strácame', 'Vy strácate', 'Oni/Ony strácajú'],
    perfect: ['Ja som stratil(a)', 'Ty si stratil(a)', 'On/Ona/To stratil(a/o)', 'My sme stratili', 'Vy ste stratili', 'Oni/Ony stratili']
  },
  feel: {
    present: ['Ja sa cítim', 'Ty sa cítiš', 'On/Ona/To sa cíti', 'My sa cítime', 'Vy sa cítite', 'Oni/Ony sa cítia'],
    perfect: ['Ja som sa cítil(a)', 'Ty si sa cítil(a)', 'On/Ona/To sa cítil(a/o)', 'My sme sa cítili', 'Vy ste sa cítili', 'Oni/Ony sa cítili']
  },
  hear: {
    present: ['Ja počujem', 'Ty počuješ', 'On/Ona/To počuje', 'My počujeme', 'Vy počujete', 'Oni/Ony počujú'],
    perfect: ['Ja som počul(a)', 'Ty si počul(a)', 'On/Ona/To počul(a/o)', 'My sme počuli', 'Vy ste počuli', 'Oni/Ony počuli']
  },
  sell: {
    present: ['Ja predávam', 'Ty predávaš', 'On/Ona/To predáva', 'My predávame', 'Vy predávate', 'Oni/Ony predávajú'],
    perfect: ['Ja som predal(a)', 'Ty si predal(a)', 'On/Ona/To predal(a/o)', 'My sme predali', 'Vy ste predali', 'Oni/Ony predali']
  },
  fly: {
    present: ['Ja lietam', 'Ty lietaš', 'On/Ona/To lieta', 'My lietame', 'Vy lietate', 'Oni/Ony lietajú'],
    perfect: ['Ja som letel/letela', 'Ty si letel/letela', 'On/Ona/To letel/letela/letelo', 'My sme leteli', 'Vy ste leteli', 'Oni/Ony leteli']
  },
  teach: {
    present: ['Ja učím', 'Ty učíš', 'On/Ona/To učí', 'My učíme', 'Vy učíte', 'Oni/Ony učia'],
    perfect: ['Ja som učil(a)', 'Ty si učil(a)', 'On/Ona/To učil(a/o)', 'My sme učili', 'Vy ste učili', 'Oni/Ony učili']
  }
};
