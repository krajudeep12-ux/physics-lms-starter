# PhysicsPath LMS Starter

A free-to-start Next.js demo for a JEE/NEET Physics learning and MCQ test platform.

## What works in this starter
- Responsive landing page
- Five sample Physics MCQs
- 10-minute countdown timer
- Question palette and previous/next navigation
- Mark for review
- +4 for correct, -1 for wrong, 0 for unanswered
- Result screen with answer review and explanations

## Important limitations
This is a **front-end demo**, not a production LMS yet:
- No student accounts
- No database or cross-device result saving
- Sample answers are included in browser code, so this is not secure for a real exam
- No admin question editor, payments, videos or batch management

Do not use this demo for a paid/high-stakes exam until the answer key and scoring move to a protected server and proper authentication/database permissions are added.

## Step 1 — Install Node.js
Install the current Node.js LTS version from https://nodejs.org/

## Step 2 — Extract this ZIP
Extract the folder `physics-lms-starter` to your computer.

## Step 3 — Open a terminal in the project folder
Run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 4 — Upload to GitHub
1. Create a GitHub account at https://github.com/
2. Create a new repository.
3. Upload the contents of this folder (not the ZIP itself).
4. Commit the files.

## Step 5 — Deploy on Vercel
1. Sign in at https://vercel.com/ using GitHub.
2. Click **Add New → Project**.
3. Import your GitHub repository.
4. Keep the detected Next.js settings.
5. Click **Deploy**.

Vercel will provide a public URL. You can test the demo on your phone.

## Step 6 — Make it a real LMS (next phase)
Recommended free-to-start services:
- Supabase (PostgreSQL + authentication): https://supabase.com/
- Vercel hosting: https://vercel.com/
- GitHub for source control: https://github.com/

Next development milestones:
1. Create Supabase project and tables for profiles, courses, questions, tests, attempts, answers and results.
2. Add sign-up/login and role-based permissions.
3. Move the correct answer key and scoring to server-side code.
4. Save answers securely while the test is in progress.
5. Add an admin-only question/test editor.
6. Add individual student dashboards and history.
7. Add course lessons and PDF/video access.
8. Add payment gateway only when needed.

## Free-plan note
Free plans and limits can change. Check each provider's current pricing and usage limits before launching to real students.
