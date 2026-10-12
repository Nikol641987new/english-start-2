# 🇬🇧 English Start

Jednoduchá webová aplikácia na učenie angličtiny pre začiatočníkov (slovenské vysvetlenia). Beží celá v prehliadači – bez servera a bez inštalácie.

## Čo vie

- **📚 Slovesá** – 45 nepravidelných slovies so slovenským prekladom základného, minulého aj tretieho tvaru; po rozkliknutí aj preklady viet vo všetkých piatich časoch, výslovnosť 🔊 a príklad.
- **📖 Slovník** – 2 000 jedinečných bežných slov a fráz rozdelených podľa tém; vyhľadávanie, filtre, výslovnosť a cvičenia na slovíčka priamo z každej kategórie.
- **📖 Čítanie** – krátke články; klikni na slovo a zobrazí sa preklad (aj tvary nepravidelných slovies, napr. *went* → minulý čas od *go*). Slovíčka si môžeš uložiť. Pod článkom sú otázky a tlačidlo na rozhovor o článku s AI.
- **✏️ Cvičenia** – precvič si slovesá aj slovíčka: doplň tvar, prekladaj vety s nepravidelnými slovesami, vyber preklad, píš, počúvaj alebo hovor nahlas; výslovnosť slovíčka si môžeš prehrať v otázke aj po odpovedi.
- **💬 Rozhovor s AI** – AI učiteľ sa pýta po anglicky, ty odpovedáš písaním alebo hlasom, opravuje chyby po slovensky.
- **📈 Pokrok** – štatistiky, slovesá, ktoré ti nejdú, a uložené slovíčka (ukladá sa v prehliadači).

## Spustenie na GitHub Pages

1. Vytvor nový repozitár na GitHube a nahraj do neho všetky súbory z tohto priečinka.
2. V repozitári choď na **Settings → Pages**.
3. V časti *Build and deployment* vyber **Deploy from a branch**, vetvu `main` a priečinok `/ (root)`.
4. Po minúte-dvoch bude stránka na `https://TVOJE-MENO.github.io/NAZOV-REPOZITARA/`.

Lokálne stačí otvoriť `index.html` v prehliadači.

## AI rozhovor – API kľúč

1. Vytvor kľúč na <https://console.anthropic.com/> a nastav si mesačný limit výdavkov.
2. V aplikácii klikni na ⚙️ a kľúč vlož. Uloží sa len v tvojom prehliadači (localStorage).
3. **Kľúč nikdy nedávaj do súborov v repozitári.** Ak by stránku mali používať aj iní ľudia, treba pridať vlastný server (proxy), ktorý kľúč ukryje.

Mikrofón a rozpoznávanie reči fungujú najlepšie v Chrome alebo Edge.

## Ako pridať nový obsah

- **Sloveso:** pridaj riadok do `verbs.js`.
- **Slovíčko:** pridaj položku `[anglicky, slovensky, kategória]` do `WORD_DATA` v `dictionary.js` alebo do príslušnej témy v `dictionary-extra.js`.
- **Článok:** pridaj objekt do `articles.js` (každá veta má `en` a `sk`) a nové slová doplň do `dictionary.js`.
- **Nový typ cvičenia:** pridaj funkciu do objektu `gen` v `app.js` a záznam do poľa `MODES`.

## Nápady na ďalšie kroky

- viac slovies a slovná zásoba (jedlo, rodina, cestovanie)
- slovíčka na opakovanie (kartičky)
- záporné vety a otázky (did you…? I didn't…)
- inštalovateľná aplikácia (PWA) pre mobil

## Hlas na čítanie

Aplikácia používa hlasy z tvojho zariadenia a automaticky uprednostní ženský hlas. V ⚙️ si môžeš hlas vybrať a vyskúšať.
Kvalitnejší hlas si dá stiahnuť:

- **iPhone/iPad:** Nastavenia → Prístupnosť → Hovorený obsah → Hlasy → Angličtina → vyber napr. *Samantha* alebo *Serena* a stiahni variant „Enhanced" alebo „Premium".
- **Android:** Nastavenia → Správa → Jazyky → Prevod textu na reč → nainštaluj hlasové dáta pre angličtinu.
- **Počítač:** najlepšie hlasy má Microsoft Edge (napr. *Aria*, *Jenny*, *Sonia* – „Natural").
