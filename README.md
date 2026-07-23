# Verbly Mandarin — Functional MVP

A dependency-free progressive web application for learning Mandarin through high-frequency verbs.
This is an updated version of the Verbly Mandarin App.

## Run locally

Because the app includes a service worker, serve it over HTTP rather than opening the file directly:

```bash
cd verbly_mandarin_mvp
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Progression

- Each lesson contains five questions.
- A score of 80% or higher passes the lesson.
- Passing a lesson unlocks the next lesson.
- Passing all five lessons in a unit unlocks the next unit.
- Failed questions enter the review queue.
- Progress, XP, settings, streaks, and scores persist in browser local storage.

## Included features

- Four units and twenty high-frequency Mandarin verbs
- Pinyin input using a regular alphabet keyboard
- Optional tone-free answer matching
- Browser speech synthesis for Chinese prompts
- Adaptive review queue for missed questions
- XP, streaks, lesson scores, mastery, and daily goals
- Searchable verb bank
- Installable/offline-capable PWA shell
- Responsive mobile and desktop interface

## Production limitations

This is a complete client-side MVP, not a hosted multi-user service. A production deployment would still need authentication, a backend database, cloud content management, analytics, tested native-speaker audio, speech scoring, security hardening, automated tests, accessibility review, and app-store packaging.
