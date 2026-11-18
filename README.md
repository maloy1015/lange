# Lingua — Ingliz tili + Matematika (React PWA)
## Ishga tushirish
npm install && npm run dev
## Videolarni qo‘shish
`src/videos.json` ga dars id → YouTube video ID yozing, masalan:
{"en-A1-1":"dQw4w9WgXcQ","ma-Asos-3":"XXXXXXXXXXX"}
Har daraja 12 ta dars; id'lar ilovadagi dars ro‘yxatida ko‘rinadi.
## Login
Firebase kerak emas. Email bilan ro‘yxatdan o‘tish darhol ishlaydi (akkaunt shu brauzerda saqlanadi).
Google bilan kirish ixtiyoriy: Google Cloud → Credentials → OAuth client ID (Web) yarating,
Authorized JavaScript origins ga sayt domenini qo‘shing va `VITE_GOOGLE_CLIENT_ID` ni Render Environment'ga kiriting.
## Render
GitHub'ga yuklang → Render → New Static Site (`render.yaml` tayyor).
## Push
Hozir: ruxsat so‘rash + qurilmadagi eslatma. Serverdan push (ilova yopiq bo‘lganda) uchun Firebase Cloud Messaging yoki web-push backend kerak.
