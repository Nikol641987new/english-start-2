// Články na čítanie. Nový článok pridáš ako ďalší objekt do poľa.
// Každá veta má anglický text (en) a slovenský preklad (sk).
window.ARTICLES = [
  {
    id: 'my-day',
    title: 'My Day',
    titleSk: 'Môj deň',
    level: 'A1',
    paragraphs: [
      [
        { en: 'My name is Anna.', sk: 'Volám sa Anna.' },
        { en: "I get up at seven o'clock.", sk: 'Vstávam o siedmej.' },
        { en: 'I eat bread and drink milk for breakfast.', sk: 'Na raňajky jem chlieb a pijem mlieko.' },
        { en: 'Then I go to school by bus.', sk: 'Potom idem do školy autobusom.' },
        { en: 'At school, I read books and write words in my notebook.', sk: 'V škole čítam knihy a píšem slová do zošita.' }
      ],
      [
        { en: 'Yesterday, I saw my friend Tom.', sk: 'Včera som videla kamaráta Toma.' },
        { en: 'He came to my house and we had lunch together.', sk: 'Prišiel k nám domov a spolu sme obedovali.' },
        { en: 'We ate pizza and drank water.', sk: 'Jedli sme pizzu a pili vodu.' }
      ],
      [
        { en: 'Tomorrow, I will go to the park.', sk: 'Zajtra pôjdem do parku.' },
        { en: 'I will meet my teacher there.', sk: 'Tam stretnem svoju učiteľku.' }
      ]
    ],
    quiz: [
      { q: 'What does Anna drink for breakfast?', options: ['Tea', 'Milk', 'Coffee'], a: 1 },
      { q: 'How does Anna go to school?', options: ['By bus', 'By car', 'On foot'], a: 0 },
      { q: 'Who did Anna see yesterday?', options: ['Her teacher', 'Her mother', 'Tom'], a: 2 },
      { q: 'Where will Anna go tomorrow?', options: ['To the park', 'To the shop', 'To London'], a: 0 }
    ]
  },
  {
    id: 'london',
    title: 'A Trip to London',
    titleSk: 'Výlet do Londýna',
    level: 'A1',
    paragraphs: [
      [
        { en: 'Last summer, my family went to London.', sk: 'Minulé leto išla moja rodina do Londýna.' },
        { en: 'We flew from Bratislava on Monday morning.', sk: 'Leteli sme z Bratislavy v pondelok ráno.' },
        { en: 'The flight was short, and we were happy.', sk: 'Let bol krátky a boli sme šťastní.' }
      ],
      [
        { en: 'We took the bus to the hotel and left our bags there.', sk: 'Autobusom sme išli do hotela a nechali sme tam tašky.' },
        { en: 'In the city, we saw a big clock called Big Ben.', sk: 'V meste sme videli veľké hodiny nazývané Big Ben.' },
        { en: 'My brother bought a red hat, and I bought a postcard.', sk: 'Môj brat kúpil červený klobúk a ja som kúpila pohľadnicu.' }
      ],
      [
        { en: 'In the evening, we ate fish and chips and slept well.', sk: 'Večer sme jedli rybu s hranolkami a dobre sme spali.' },
        { en: 'I have never been so tired, but I have never been so happy!', sk: 'Nikdy predtým som nebola taká unavená, ale ani taká šťastná!' }
      ]
    ],
    quiz: [
      { q: 'How did the family get to London?', options: ['By train', 'By plane', 'By car'], a: 1 },
      { q: 'What did the brother buy?', options: ['A red hat', 'A postcard', 'A clock'], a: 0 },
      { q: 'What did they eat in the evening?', options: ['Pizza', 'Bread', 'Fish and chips'], a: 2 }
    ]
  },
  {
    id: 'cafe',
    title: 'At the Café',
    titleSk: 'V kaviarni',
    level: 'A1',
    paragraphs: [
      [
        { en: 'Tom is at a café with his sister, Eva.', sk: 'Tom je v kaviarni so svojou sestrou Evou.' },
        { en: 'Tom wants a coffee, and Eva wants tea.', sk: 'Tom chce kávu a Eva chce čaj.' },
        { en: 'The waiter brings the menu.', sk: 'Čašník prinesie jedálny lístok.' }
      ],
      [
        { en: 'Eva thinks about the cake, but she does not know which one to take.', sk: 'Eva rozmýšľa o koláči, ale nevie, ktorý si vziať.' },
        { en: 'Tom tells her that the chocolate cake is very good.', sk: 'Tom jej povie, že čokoládový koláč je veľmi dobrý.' },
        { en: 'She gives the waiter her order, and he writes it down.', sk: 'Dá čašníkovi objednávku a on si ju zapíše.' }
      ],
      [
        { en: 'They pay and leave the café at six o\'clock.', sk: 'Zaplatia a odídu z kaviarne o šiestej.' },
        { en: 'Tomorrow, they will meet their friends again.', sk: 'Zajtra sa znova stretnú s kamarátmi.' }
      ]
    ],
    quiz: [
      { q: 'Who is Tom with?', options: ['His mother', 'His sister', 'His teacher'], a: 1 },
      { q: 'What does Eva want?', options: ['Tea', 'Coffee', 'Water'], a: 0 },
      { q: 'Which cake is very good?', options: ['Apple cake', 'Chocolate cake', 'Cheese cake'], a: 1 },
      { q: 'When do they leave the café?', options: ['At five', 'At six', 'At seven'], a: 1 }
    ]
  }
];
