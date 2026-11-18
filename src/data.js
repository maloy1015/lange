import videos from './videos.json';
const L=(subject,level,titles)=>titles.map((t,i)=>({id:`${subject}-${level}-${i+1}`,subject,level,n:i+1,title:t,min:8+(i*3)%9,video:videos[`${subject}-${level}-${i+1}`]||''}));
const EN={
A1:['Alifbo va talaffuz','Salomlashish va tanishish','Raqamlar 1–100','Ranglar va shakllar','Oila a’zolari','To be fe’li (am/is/are)','Kundalik narsalar','Vaqt va kunlar','Ovqat va ichimliklar','Bor/yo‘q: there is/are','Oddiy savollar','A1 takrorlash'],
A2:['Present Simple','Present Continuous','Past Simple','Sifat darajalari','Shahar va yo‘l so‘rash','Do‘konda xarid','Future: going to','Can / Must / Should','Ish va kasblar','Sayohat lug‘ati','Telefon suhbati','A2 takrorlash'],
B1:['Present Perfect','Past Continuous','Zero & First Conditional','Passive Voice','Modal fe’llar','Reported Speech','Phrasal verbs 1','Maqola o‘qish strategiyasi','Email yozish','Fikr bildirish','Listening: kundalik nutq','B1 takrorlash'],
B2:['Second & Third Conditional','Past Perfect','Relative clauses','Mixed tenses','Phrasal verbs 2','Idioms','Essay tuzilishi','Debat va dalil','Listening: ma’ruza','Linking words','Speaking: 2 daqiqalik nutq','B2 takrorlash'],
C1:['Inversion','Cleft sentences','Advanced passive','Akademik lug‘at','Nuance va hedging','Collocations','Report yozish','Tezkor o‘qish','Ma’ruza konspekti','Debat: murakkab mavzular','Intonation','C1 takrorlash'],
C2:['Stilistika','Nozik ma’no farqlari','Adabiy matn tahlili','Ritorika','Formal va informal registr','Murakkab idiomalar','Tarjima mahorati','Akademik esse','Podcast tahlili','Mukammal talaffuz','Sinxron nutq','C2 takrorlash']};
const MA={
'Asos':['Sanash va raqamlar','Qo‘shish','Ayirish','Ko‘paytirish jadvali','Bo‘lish','Tub va murakkab sonlar','Oddiy kasrlar','O‘nli kasrlar','Uzunlik va massa','Perimetr va yuza','Matnli masalalar','Asos takrorlash'],
'Algebra':['O‘zgaruvchi va ifoda','Tenglamalar','Tengsizliklar','Proporsiya','Foizlar','Daraja','Ko‘phadlar','Ko‘paytuvchilarga ajratish','Chiziqli funksiya','Tenglamalar sistemasi','Kvadrat tenglama','Algebra takrorlash'],
'Geometriya':['Nuqta, to‘g‘ri chiziq','Burchaklar','Uchburchaklar','Pifagor teoremasi','To‘rtburchaklar','Aylana','Yuzalar','Hajmlar','O‘xshashlik','Vektorlar','Koordinatalar','Geometriya takrorlash'],
'Yuqori':['Funksiyalar','Ko‘rsatkichli funksiya','Logarifm','Trigonometriya 1','Trigonometriya 2','Ketma-ketliklar','Limit','Hosila','Hosila tatbiqi','Integral','Ehtimollik','Yuqori takrorlash']};
export const SUBJECTS={
 en:{name:'Ingliz tili',levels:Object.keys(EN),desc:{A1:'Noldan',A2:'Boshlang‘ich',B1:'O‘rta',B2:'O‘rta-yuqori',C1:'Ilg‘or',C2:'Mukammal'},lessons:l=>L('en',l,EN[l])},
 ma:{name:'Matematika',levels:Object.keys(MA),desc:{Asos:'Noldan',Algebra:'Algebra',Geometriya:'Geometriya',Yuqori:'Oliy daraja'},lessons:l=>L('ma',l,MA[l])}};
// Placement savollari: har daraja uchun 2 ta
const q=(level,section,text,opts,a,say)=>({level,section,text,opts,a,say});
export const PLACEMENT=[
q('A1','reading','She ___ a teacher.',['am','is','are','be'],1),
q('A1','listening','Eshiting va tanlang: nima eshitdingiz?',['My name is Ali','My game is Ali','My name is Ally','May name is Ali'],0,'My name is Ali'),
q('A2','reading','Yesterday we ___ to the park.',['go','goes','went','going'],2),
q('A2','listening','Eshiting: ob-havo qanday?',['It is raining','It is running','It is reading','It is ruining'],0,'It is raining today'),
q('B1','reading','I ___ here since 2020.',['live','lived','have lived','am living'],2),
q('B1','listening','Eshiting: u nima qildi?',['She has missed the bus','She has kissed the bus','She has mixed the bus','She was missing the bus'],0,'She has missed the bus'),
q('B2','reading','If I ___ more time, I would travel.',['have','had','would have','having'],1),
q('B2','listening','Eshiting: gap ma’nosi?',['Meeting was postponed','Meeting was finished','Meeting was cancelled for good','Meeting was early'],0,'The meeting has been put off until next week'),
q('C1','reading','Rarely ___ such dedication.',['I have seen','have I seen','I saw','did I seen'],1),
q('C1','listening','Eshiting: ma’no?',['It rarely matters','It hardly matters','It matters a lot','It never started'],1,'It scarcely matters'),
q('C2','reading','The policy was, ___, a fiasco.',['for lack of','to put it mildly','as of late','in as much'],1),
q('C2','listening','Eshiting: “glean” ma’nosi?',['collect bit by bit','destroy','shine','hide'],0,'We glean information from many sources')];
export const EXAMS={
 CEFR:{name:'CEFR',desc:'A1–C2 daraja aniqlash',parts:['reading','listening','writing','speaking']},
 IELTS:{name:'IELTS',desc:'Band 1–9 taxminiy baho',parts:['listening','reading','writing','speaking']},
 TOEFL:{name:'TOEFL iBT',desc:'0–120 taxminiy ball',parts:['reading','listening','speaking','writing']},
 MATH:{name:'Matematika',desc:'Sertifikat imtihoni · 12 savol',parts:['matematika']}};
export const MLV=['Asos','Algebra','Geometriya','Yuqori'];
const m=(level,text,opts,a)=>({level,section:'math',text,opts,a});
export const MQ=[
m('Asos','7 × 8 = ?',['54','56','63','48'],1),m('Asos','3/4 + 1/4 = ?',['1','1/2','4/8','3/8'],0),m('Asos','Tomonlari 5 va 3 bo‘lgan to‘g‘ri to‘rtburchak yuzi?',['8','15','16','30'],1),
m('Algebra','2x + 6 = 14 bo‘lsa, x = ?',['3','4','5','8'],1),m('Algebra','20% ning 150 dan qiymati?',['20','25','30','35'],2),m('Algebra','x² − 9 = 0 ildizlari?',['±3','3','9','±9'],0),
m('Geometriya','Katetlari 3 va 4 bo‘lgan uchburchak gipotenuzasi?',['5','6','7','12'],0),m('Geometriya','Radiusi 2 bo‘lgan aylana uzunligi?',['2π','4π','8π','π'],1),m('Geometriya','Uchburchak ichki burchaklari yig‘indisi?',['90°','180°','270°','360°'],1),
m('Yuqori','f(x)=x² bo‘lsa, f′(3) = ?',['3','6','9','2'],1),m('Yuqori','log₂ 32 = ?',['4','5','6','16'],1),m('Yuqori','sin 30° = ?',['1/2','√3/2','1','0'],0)];
export const LEVELS=['A1','A2','B1','B2','C1','C2'];
export const ielts=i=>[3,4,5.5,6.5,7.5,8.5][i];
export const toefl=i=>[18,35,55,80,100,115][i];
// Yozma/og‘zaki matn bahosi (taxminiy evristika): so‘z soni, noyob so‘zlar, o‘rtacha uzunlik, bog‘lovchilar
export function gradeText(t){
 const w=(t.toLowerCase().match(/[a-z']+/g)||[]);if(w.length<5)return 0;
 const u=new Set(w).size,avg=w.join('').length/w.length;
 const conn=w.filter(x=>['however','although','therefore','moreover','whereas','despite','because','which','while'].includes(x)).length;
 const s=Math.min(w.length/120,1)*2+Math.min(u/60,1)*1.5+Math.min((avg-3)/2.5,1)*1+Math.min(conn/4,1)*1.5;
 return Math.max(0,Math.min(5,Math.round(s*5/6)));}
