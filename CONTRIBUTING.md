# Contributing to Repo Sprint: Movie Database Starter

Welcome! This repository is a starter template for the open-source hackathon event, Repo Sprint. Your goal is to enhance or complete the project by building features, improving UX, and documenting your work.

## 🏁 Event Context
This project is intentionally lightweight: the home page renders placeholder movie cards and several areas include TODO comments. Your task is to turn this scaffold into a polished, working app. Choose your own data provider (TMDB, OMDb, Trakt, JustWatch, etc.) and focus on clean code and a great UX.

## ⚙️ Setup Instructions
1. Clone your fork and install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
3. Open the app:
```bash
http://localhost:3000
```

## 🎯 Feature Goals (Core)
- Implement a data layer and connect `MovieGrid`/`MovieCard` to real movie data.
- Build the movie detail page without exposing secrets on the client (use server routes or proxies).
- Add loading and error states across pages; handle empty results and missing images.
- Improve accessibility (labels for search, landmarks, keyboard navigation in grids).
- Extract inline styles into CSS modules or a styling system for consistency.

## 💎 Bonus Features (Optional)
- Animations and micro-interactions (hover effects, skeletons, transitions).
- Search with debounced suggestions and keyboard selection.
- Filters (genre, year, rating), pagination, and infinite scroll.
- Watch provider availability badges; link to external streaming pages.
- Dark/light theme toggle and responsive enhancements.
- Unit tests and basic integration tests.

## 🔀 Contribution Rules
- Fork the repo.
- Create a feature branch: `feature/<your-feature>` or `fix/<short-description>`.
- Make focused commits with clear messages.
- Keep PRs small and scoped; include screenshots or GIFs when relevant.
- Submit a Pull Request to the main repo describing:
  - What you changed and why
  - How to test it locally
  - Any trade-offs or follow-ups

Example workflow:
```bash
git checkout -b feature/search-suggestions
# make changes
git commit -m "feat(search): add debounced suggestions"
git push origin feature/search-suggestions
# open a PR
```

## 📁 Project Structure Overview
- `components/`: Reusable UI pieces such as `Layout`, `SearchBar`, `MovieGrid`, and `MovieCard`.
- `pages/`: Next.js pages (`index.js`, custom `_app.js`, `_document.js`, and movie detail at `pages/movies/[id].js`).
- `styles/`: Global and module CSS files.
- `public/`: Static assets (icons, screenshots).
- `next.config.mjs`, `eslint.config.mjs`: Framework and linting configuration.

## 💬 Support Info
- Ask questions in the event Discord or GitHub Discussions (if enabled).
- If something is unclear in the starter, open an issue describing the confusion.
- Be kind, collaborative, and have fun — this is a sprint, but it’s also a learning experience.

Happy building! 🚀
