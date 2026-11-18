# Lingua — Ingliz tili + Matematika (React PWA)
## Ishga tushirish
npm install && npm run dev
## Videolarni qo‘shish
`src/videos.json` ga dars id → YouTube video ID yozing, masalan:
{"en-A1-1":"dQw4w9WgXcQ","ma-Asos-3":"XXXXXXXXXXX"}
Har daraja 12 ta dars; id'lar ilovadagi dars ro‘yxatida ko‘rinadi.
## Google va haqiqiy login
Firebase loyihasi oching (Authentication → Email + Google), `.env.example` ni `.env` qilib to‘ldiring. Render'da shu qiymatlarni Environment bo‘limiga kiriting.
## Render
GitHub'ga yuklang → Render → New Static Site (`render.yaml` tayyor).
## Push
Hozir: ruxsat so‘rash + qurilmadagi eslatma. Serverdan push (ilova yopiq bo‘lganda) uchun Firebase Cloud Messaging yoki web-push backend kerak.
