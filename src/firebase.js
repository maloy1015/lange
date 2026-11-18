// Firebase sozlanmasa — localStorage'dagi demo-auth ishlaydi (faqat sinov uchun).
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth';
const e=import.meta.env;
export const live=!!e.VITE_FIREBASE_API_KEY;
const auth=live?getAuth(initializeApp({apiKey:e.VITE_FIREBASE_API_KEY,authDomain:e.VITE_FIREBASE_AUTH_DOMAIN,projectId:e.VITE_FIREBASE_PROJECT_ID,appId:e.VITE_FIREBASE_APP_ID})):null;
const U='lingua_users',S='lingua_session';
const lu=()=>JSON.parse(localStorage.getItem(U)||'{}');
const pub=u=>({name:u.displayName||u.name||u.email.split('@')[0],email:u.email});
export function watch(cb){
 if(live)return onAuthStateChanged(auth,u=>cb(u?pub(u):null));
 cb(JSON.parse(localStorage.getItem(S)||'null'));return()=>{};}
export async function register(name,email,pw){
 if(live){const r=await createUserWithEmailAndPassword(auth,email,pw);return pub(r.user)}
 const u=lu();if(u[email])throw new Error('Bu email band');u[email]={name,email,pw};localStorage.setItem(U,JSON.stringify(u));
 const s={name,email};localStorage.setItem(S,JSON.stringify(s));return s}
export async function login(email,pw){
 if(live){const r=await signInWithEmailAndPassword(auth,email,pw);return pub(r.user)}
 const u=lu()[email];if(!u||u.pw!==pw)throw new Error('Email yoki parol xato');
 const s={name:u.name,email};localStorage.setItem(S,JSON.stringify(s));return s}
export async function google(){
 if(live){const r=await signInWithPopup(auth,new GoogleAuthProvider());return pub(r.user)}
 throw new Error('Google uchun Firebase sozlang (.env faylga qarang)')}
export async function logout(){if(live)await signOut(auth);localStorage.removeItem(S)}
