// Firebase'siz login. Akkauntlar shu qurilma brauzerida (localStorage) saqlanadi.
// Google tugmasi: VITE_GOOGLE_CLIENT_ID berilsa ishlaydi (Google Identity Services, backend kerak emas).
const U='lingua_users',S='lingua_session';
const rd=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
const users=()=>rd(U,{});
const save=s=>{localStorage.setItem(S,JSON.stringify(s));return s};
const hash=async s=>{
 try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('lingua:'+s));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch{return s}};

const CID=String(import.meta.env.VITE_GOOGLE_CLIENT_ID||'').trim();
export const hasGoogle=!!CID;

export function watch(cb){cb(rd(S,null));return()=>{}}

export async function register(name,email,pw){
 email=email.trim().toLowerCase();name=(name||'').trim();
 if(!name)throw new Error('Ismingizni kiriting');
 if(!/^\S+@\S+\.\S+$/.test(email))throw new Error('Email noto‘g‘ri');
 if(pw.length<6)throw new Error('Parol kamida 6 ta belgi bo‘lsin');
 const u=users();if(u[email])throw new Error('Bu email band');
 u[email]={name,email,pw:await hash(pw)};localStorage.setItem(U,JSON.stringify(u));
 return save({name,email});
}

export async function login(email,pw){
 email=email.trim().toLowerCase();
 const u=users()[email];
 if(!u||u.pw!==await hash(pw))throw new Error('Email yoki parol xato');
 return save({name:u.name,email});
}

const loadGIS=()=>new Promise((res,rej)=>{
 if(window.google?.accounts?.oauth2)return res();
 const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;
 s.onload=res;s.onerror=()=>rej(new Error('Google yuklanmadi. Internetni tekshiring.'));document.head.appendChild(s);
});

export async function google(){
 if(!CID)throw new Error('Google kirish hozircha yoqilmagan. Email bilan ro‘yxatdan o‘ting.');
 await loadGIS();
 const tok=await new Promise((res,rej)=>{
  window.google.accounts.oauth2.initTokenClient({
   client_id:CID,scope:'openid email profile',
   callback:r=>r.access_token?res(r.access_token):rej(new Error('Google ruxsat bermadi')),
   error_callback:()=>rej(new Error('Google oynasi yopildi')),
  }).requestAccessToken();
 });
 const r=await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{headers:{Authorization:'Bearer '+tok}});
 if(!r.ok)throw new Error('Google ma‘lumotini olib bo‘lmadi');
 const g=await r.json();
 return save({name:g.name||g.email.split('@')[0],email:g.email.toLowerCase()});
}

export async function logout(){localStorage.removeItem(S)}
