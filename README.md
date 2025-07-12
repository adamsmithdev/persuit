# 🧾 Job Tracker (WIP)

A simple full-stack job application tracker built with Next.js, Tailwind CSS, Prisma, and GitHub OAuth.

You can add, edit, and manage job applications with status tracking and notes — all tied to your authenticated account.

> This app is a work in progress. More features and polish are coming soon!

## 🔧 Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/) for GitHub login
- SQLite (local dev) or PostgreSQL (production)

## 🚧 Features (in progress)

- ✅ Auth via GitHub
- ✅ Add/edit/delete job applications
- ✅ Notes and job statuses
- 🛠️ Filter + search
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
