# 🧾 Job Tracker (WIP)

A comprehensive job application tracker built with Next.js, Tailwind CSS, Prisma, and OAuth authentication (GitHub & Google).

Track job applications with detailed information including salary ranges, company details, contact information, and deadlines — all tied to your authenticated account.

> This app is a work in progress. More features and polish are coming soon!

## 🔧 Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/) for GitHub & Google login
- SQLite (local dev), PostgreSQL (production)

## 🚧 Features (in progress)

- ✅ Auth via GitHub & Google OAuth
- ✅ Add/edit/delete job applications
- ✅ Notes and job statuses
- ✅ Filter + search
- ✅ Enhanced application fields (salary, company size, contacts, deadlines)
- 🛠️ Resume/cover letter attachments
- 🛠️ Calendar view for interviews

---

## 🏁 Local Dev

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker

npm install
cp .env.local.example .env.local
# Add your GitHub OAuth keys and database URL to .env.local

npx prisma migrate dev --name init
npm run dev
```
