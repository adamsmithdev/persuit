# 🧾 Persuit (WIP)

A comprehensive job application tracker built with Next.js, Tailwind CSS, Prisma, and OAuth authentication (GitHub & Google).

Track applications with detailed information including salary ranges, company details, contact information, and deadlines — all tied to your authenticated account.

> This app is a work in progress. More features and polish are coming soon!

## 🔧 Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/) for GitHub & Google login
- SQLite (local dev), PostgreSQL (production)

## 🚧 Features (in progress)

- ✅ Auth via GitHub & Google OAuth
- ✅ Add/edit/delete applications
- ✅ Notes and application statuses
- ✅ Filter + search
- ✅ Enhanced application fields (salary, company size, contacts, deadlines)
- 🛠️ Resume/cover letter attachments
- 🛠️ Interview scheduling and management

---

## 🏁 Local Dev

```bash
git clone https://github.com/adamsmithdev/persuit.git
cd persuit

npm install
cp .env.local.example .env.local
# Add your GitHub OAuth keys and database URL to .env.local

npx prisma migrate dev --name init
npm run dev
```
