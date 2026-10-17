# الواحة الخضراء — موقع + نظام إدارة الطلبات (CRM)

```bash
npm install
cp .env.example .env     # عبّئ DATABASE_URL و ADMIN_PASSWORD و SESSION_SECRET (+ تيليجرام)
npx prisma generate
npx prisma db push
npm run dev
```
- الموقع: /ar و /en    ·    النظام: /admin
- مهم: احذف `middleware.js` القديم إن وُجد في مجلدك.
- النصوص: lib/content.js  ·  المشاريع: lib/projects.js
