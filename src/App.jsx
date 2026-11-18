import React,{useEffect,useState} from 'react';
import {SUBJECTS,PLACEMENT,EXAMS,LEVELS,MQ,MLV,ielts,toefl,gradeText} from './data.js';
import * as A from './firebase.js';
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const cname={CEFR:'CEFR ingliz tili imtihoni',IELTS:'IELTS (taxminiy) imtihoni',TOEFL:'TOEFL (taxminiy) imtihoni',MATH:'Matematika imtihoni'};
async function drawCert(r,name){
 await document.fonts?.ready;const W=1600,H=1130,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#16123F');g.addColorStop(1,'#2E2778');x.fillStyle=g;x.fillRect(0,0,W,H);
 const gold=x.createLinearGradient(0,0,W,0);gold.addColorStop(0,'#B8893A');gold.addColorStop(.5,'#F6DE97');gold.addColorStop(1,'#B8893A');
 x.strokeStyle=gold;x.lineWidth=6;x.strokeRect(50,50,W-100,H-100);x.lineWidth=2;x.strokeRect(74,74,W-148,H-148);
 x.textAlign='center';x.fillStyle=gold;x.font='700 40px Fraunces,Georgia,serif';x.fillText('LINGUA',W/2,170);
 x.fillStyle='#F5F1FF';x.font='700 110px Fraunces,Georgia,serif';x.fillText('SERTIFIKAT',W/2,320);
 x.fillStyle='#A9A3D6';x.font='400 32px Manrope,sans-serif';x.fillText('Ushbu sertifikat quyidagi shaxsga beriladi',W/2,410);
 x.fillStyle=gold;x.font='700 96px Fraunces,Georgia,serif';x.fillText(name,W/2,540);
 x.fillStyle='#F5F1FF';x.font='400 36px Manrope,sans-serif';x.fillText(cname[r.exam]+' muvaffaqiyatli topshirgani uchun',W/2,640);
 x.fillStyle=gold;x.font='700 170px Fraunces,Georgia,serif';x.fillText(r.level,W/2,830);
 x.fillStyle='#A9A3D6';x.font='400 30px Manrope,sans-serif';
 const extra=r.exam==='IELTS'?`Taxminiy band: ${r.ielts}`:r.exam==='TOEFL'?`Taxminiy ball: ${r.toefl}/120`:r.exam==='MATH'?`Natija: ${r.pct}%`:'';
 if(extra)x.fillText(extra,W/2,890);
 x.fillText(`Sana: ${r.date}   ·   ID: ${r.id}`,W/2,990);
 x.font='400 22px Manrope,sans-serif';x.fillText('Lingua platformasi sertifikati. Rasmiy xalqaro imtihon sertifikati o‘rnini bosmaydi.',W/2,1040);
 return c.toDataURL('image/png')}
function Cert({r,name}){
 const [u,setU]=useState('');useEffect(()=>{drawCert(r,name).then(setU)},[]);
 return u?<div style={{marginTop:'1.2rem'}}><img src={u} alt="Sertifikat" style={{width:'100%',borderRadius:12,border:'1px solid #ffffff30'}}/>
 <a className="btn gold" style={{display:'inline-block',marginTop:'.8rem',textDecoration:'none'}} href={u} download={`lingua-${r.exam}-${r.level}.png`}>Sertifikatni yuklab olish</a></div>:null}
const say=t=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.9;speechSynthesis.speak(u)};

function Auth({onUser}){
 const [mode,setMode]=useState('login'),[f,setF]=useState({name:'',email:'',pw:''}),[err,setErr]=useState('');
 const go=async fn=>{setErr('');try{onUser(await fn())}catch(e){setErr(e.message)}};
 return <div className="wrap auth card"><h1>Lingua</h1><p className="mute">Ingliz tili va matematikani noldan o‘rganing.</p>
 <form onSubmit={e=>{e.preventDefault();go(()=>mode==='login'?A.login(f.email,f.pw):A.register(f.name,f.email,f.pw))}}>
 {mode==='reg'&&<input placeholder="Ismingiz" value={f.name} onChange={e=>setF({...f,name:e.target.value})} required/>}
 <input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
 <input type="password" placeholder="Parol (kamida 6 belgi)" minLength={6} value={f.pw} onChange={e=>setF({...f,pw:e.target.value})} required/>
 <button className="gold">{mode==='login'?'Kirish':'Ro‘yxatdan o‘tish'}</button></form>
 <button onClick={()=>go(A.google)} style={{width:'100%'}}>Google bilan kirish</button>
 {err&&<p className="err">{err}</p>}
 <p className="mute" style={{marginTop:'1rem'}}>{mode==='login'?'Akkauntingiz yo‘qmi?':'Akkauntingiz bormi?'} <a href="#" style={{color:'var(--gold)'}} onClick={e=>{e.preventDefault();setMode(mode==='login'?'reg':'login')}}>{mode==='login'?'Ro‘yxatdan o‘ting':'Kiring'}</a></p></div>}

function Courses({done,toggle}){
 const [s,setS]=useState('en'),[lv,setLv]=useState(null),[sel,setSel]=useState(null);
 const S=SUBJECTS[s],list=lv?S.lessons(lv):[];
 return <div className="wrap"><h2>Darslar</h2>
 <div className="row">{Object.entries(SUBJECTS).map(([k,v])=><button key={k} className={s===k?'on':''} onClick={()=>{setS(k);setLv(null);setSel(null)}}>{v.name}</button>)}</div>
 {!lv?<div className="grid">{S.levels.map(l=>{const n=S.lessons(l).filter(x=>done[x.id]).length;
  return <div key={l} className="card" onClick={()=>{setLv(l);setSel(null)}} style={{cursor:'pointer'}}>
  <div className="lvl">{l}</div><h3>{S.desc[l]}</h3><p className="mute">12 dars · {n}/12 tugatildi</p><div className="bar"><i style={{width:n/12*100+'%'}}/></div></div>})}</div>
 :<><p style={{margin:'1rem 0'}}><button onClick={()=>setLv(null)}>Orqaga</button> <b>{S.name} · {lv}</b></p>
 <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>
 <div><div className="vid">{sel?.video?<iframe title={sel.title} allowFullScreen src={`https://www.youtube-nocookie.com/embed/${sel.video}`}/>:<p className="mute" style={{padding:'1rem',textAlign:'center'}}>{sel?`“${sel.title}” videosi tez orada qo‘shiladi (ID: ${sel.id})`:'Darsni tanlang'}</p>}</div>
 {sel&&<div className="row" style={{marginTop:'.8rem'}}><h3 style={{marginRight:'auto'}}>{sel.title}</h3><button className={done[sel.id]?'on':''} onClick={()=>toggle(sel.id)}>{done[sel.id]?'Tugatildi':'Tugatdim'}</button></div>}</div>
 <div>{list.map(x=><div key={x.id} className={'lesson'+(sel?.id===x.id?' sel':'')} onClick={()=>setSel(x)}><span>{x.n}. {x.title}</span><span className={done[x.id]?'done':'mute'}>{done[x.id]?'✓':x.min+' daq'}</span></div>)}</div></div></>}</div>}

function Exam({save,user}){
 const [ex,setEx]=useState(null),[st,setSt]=useState(null);
 const parts=ex?EXAMS[ex].parts:[];
 const start=k=>{setEx(k);setSt({i:0,ans:{},writing:'',speaking:'',phase:'mcq'})};
 if(!ex)return <div className="wrap"><h2>Imtihonlar</h2><p className="mute">Reading, Listening, Writing va Speaking bo‘yicha darajangiz avtomatik aniqlanadi.</p>
  <div className="grid">{Object.entries(EXAMS).map(([k,v])=><div key={k} className="card"><div className="lvl">{v.name}</div><p className="mute">{v.desc}</p><p>{v.parts.join(' · ')}</p><button className="gold" style={{marginTop:'.8rem'}} onClick={()=>start(k)}>Boshlash</button></div>)}</div></div>;
 const qs=ex==='MATH'?MQ:PLACEMENT.filter(q=>parts.includes(q.section));
 const finishMath=s=>{const ok=qs.filter((q,i)=>s.ans[i]===q.a).length;let lv=0;MLV.forEach((l,i)=>{if(qs.filter((q,k)=>q.level===l&&s.ans[k]===q.a).length>=2)lv=i});
  const res={exam:'MATH',level:MLV[lv],pct:Math.round(ok/qs.length*100),date:new Date().toLocaleDateString(),id:'LNG-'+Math.random().toString(36).slice(2,8).toUpperCase()};save(res);setSt({phase:'res',res})};
 if(st.phase==='mcq'){const q=qs[st.i];
  return <div className="wrap card"><p className="mute">{EXAMS[ex].name} · {q.section} · {st.i+1}/{qs.length}</p><div className="bar"><i style={{width:(st.i/qs.length)*100+'%'}}/></div>
  <h2 style={{marginTop:'1rem'}}>{q.text}</h2>{q.say&&<button onClick={()=>say(q.say)}>Tinglash</button>}
  {q.opts.map((o,k)=><button key={k} className={'opt'+(st.ans[st.i]===k?' pick':'')} onClick={()=>setSt({...st,ans:{...st.ans,[st.i]:k}})}>{o}</button>)}
  <button className="gold" disabled={st.ans[st.i]===undefined} onClick={()=>st.i+1<qs.length?setSt({...st,i:st.i+1}):ex==='MATH'?finishMath(st):setSt({...st,phase:'writing'})}>{st.i+1<qs.length?'Keyingisi':ex==='MATH'?'Natijani ko‘rish':'Keyingisi'}</button></div>;}
 if(st.phase==='writing')return <div className="wrap card"><h2>Writing</h2><p className="mute">“Describe a person who inspires you.” — kamida 80 so‘z, inglizcha yozing.</p>
  <textarea rows={9} value={st.writing} onChange={e=>setSt({...st,writing:e.target.value})}/><button className="gold" onClick={()=>setSt({...st,phase:'speaking'})}>Keyingisi</button></div>;
 if(st.phase==='speaking'){const R=window.SpeechRecognition||window.webkitSpeechRecognition;
  const rec=()=>{const r=new R();r.lang='en-US';r.continuous=true;r.onresult=e=>setSt(s=>({...s,speaking:[...e.results].map(x=>x[0].transcript).join(' ')}));r.start();setTimeout(()=>r.stop(),45000)};
  return <div className="wrap card"><h2>Speaking</h2><p className="mute">“Talk about your daily routine.” Yozishni bosing va 30–45 soniya inglizcha gapiring.</p>
  {R?<button onClick={rec}>Yozishni boshlash</button>:<p className="err">Brauzer ovoz tanishni qo‘llamaydi (Chrome ishlating). Matn bilan javob bering.</p>}
  <textarea rows={5} placeholder="Transkript" value={st.speaking} onChange={e=>setSt({...st,speaking:e.target.value})}/>
  <button className="gold" onClick={()=>{
   const sc={};LEVELS.forEach((l,i)=>{const g=qs.filter(q=>q.level===l);if(g.length)sc[i]=g.filter(q=>st.ans[qs.indexOf(q)]===q.a).length/g.length});
   let mcq=-1;LEVELS.forEach((l,i)=>{if(sc[i]>=.5)mcq=i});mcq=Math.max(mcq,0);
   const w=gradeText(st.writing),sp=gradeText(st.speaking);
   const idx=Math.round((mcq*2+w+sp)/4);const lvl=LEVELS[Math.min(5,Math.max(0,idx))];
   const res={exam:ex,level:lvl,ielts:ielts(LEVELS.indexOf(lvl)),toefl:toefl(LEVELS.indexOf(lvl)),w,sp,date:new Date().toLocaleDateString(),id:'LNG-'+Math.random().toString(36).slice(2,8).toUpperCase()};
   save(res);setSt({phase:'res',res})}}>Natijani ko‘rish</button></div>}
 const r=st.res;return <div className="wrap card"><p className="mute">{EXAMS[ex].name} natijasi</p><div className="lvl" style={{fontSize:'4rem'}}>{r.level}</div>
  <p>{ex==='IELTS'&&`Taxminiy band: ${r.ielts}`}{ex==='TOEFL'&&`Taxminiy ball: ${r.toefl}/120`}{ex==='CEFR'&&'Sizning CEFR darajangiz'}{ex==='MATH'&&`To‘g‘ri javoblar: ${r.pct}%`}</p>
  {ex!=='MATH'&&<p className="mute">Writing: {r.w}/5 · Speaking: {r.sp}/5. Bu avtomatik taxminiy baho; rasmiy imtihon emas.</p>}
  {(ex!=='MATH'||r.pct>=60)?<Cert r={r} name={user.name}/>:<p className="err">Sertifikat uchun kamida 60% kerak. Darslarni takrorlab, qayta urinib ko‘ring.</p>}
  <button className="gold" style={{marginTop:'1rem'}} onClick={()=>setEx(null)}>Yana topshirish</button></div>}

function Settings({user,out}){
 const [perm,setPerm]=useState(typeof Notification!=='undefined'?Notification.permission:'unsupported'),[ev,setEv]=useState(null);
 useEffect(()=>{const h=e=>{e.preventDefault();setEv(e)};addEventListener('beforeinstallprompt',h);return()=>removeEventListener('beforeinstallprompt',h)},[]);
 const ask=async()=>{const p=await Notification.requestPermission();setPerm(p);if(p==='granted'){const r=await navigator.serviceWorker.ready;r.showNotification('Lingua',{body:'Eslatmalar yoqildi. Har kuni 1 ta dars!',icon:'/icon.svg'})}};
 return <div className="wrap"><h2>Sozlamalar</h2><div className="card" style={{display:'grid',gap:'1rem'}}>
 <p><b>{user.name}</b> <span className="mute">{user.email}</span></p>
 <div className="row"><button className="gold" disabled={!ev} onClick={async()=>{ev.prompt();await ev.userChoice;setEv(null)}}>Ilovani o‘rnatish (PWA)</button>{!ev&&<span className="mute">Brauzer menyusidan “Ilovani o‘rnatish” ni tanlang yoki allaqachon o‘rnatilgan.</span>}</div>
 <div className="row"><button onClick={ask} disabled={perm==='granted'||perm==='unsupported'}>{perm==='granted'?'Bildirishnomalar yoqilgan':'Bildirishnomalarni yoqish'}</button></div>
 <button onClick={out}>Chiqish</button></div></div>}

export default function App(){
 const [user,setUser]=useState(undefined),[tab,setTab]=useState('courses'),[done,setDone]=useState(ls('done',{})),[hist,setHist]=useState(ls('hist',[]));
 useEffect(()=>A.watch(setUser),[]);
 useEffect(()=>localStorage.setItem('done',JSON.stringify(done)),[done]);
 useEffect(()=>localStorage.setItem('hist',JSON.stringify(hist)),[hist]);
 if(user===undefined)return null;if(!user)return <Auth onUser={setUser}/>;
 const T=[['courses','Darslar'],['exam','Imtihon'],['me','Profil']];
 return <><nav className="nav"><span className="logo">Lingua</span>{T.map(([k,n])=><button key={k} className={tab===k?'on':''} onClick={()=>setTab(k)}>{n}</button>)}</nav>
 {tab==='courses'&&<Courses done={done} toggle={id=>setDone({...done,[id]:!done[id]})}/>}
 {tab==='exam'&&<Exam user={user} save={r=>setHist([r,...hist])}/>}
 {tab==='me'&&<><Settings user={user} out={async()=>{await A.logout();setUser(null)}}/><div className="wrap"><h2>Natijalar</h2>{hist.length?hist.map((h,i)=><div key={i} className="card" style={{marginBottom:'.6rem'}}>{h.exam} · <b className="lvl" style={{fontSize:'1.2rem'}}>{h.level}</b> <span className="mute">{h.date}</span></div>):<p className="mute">Hali imtihon topshirmadingiz.</p>}</div></>}</>}
