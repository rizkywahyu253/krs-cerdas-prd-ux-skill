# Agent Guide

## Product
This repository contains a student project prototype for selecting UMM courses (KRS). Before changing product behavior, read `README.md` and `ux-skill/SKILL.md`.

## App
- Web application: `apps/web` (Vite, vanilla JavaScript, CSS).
- Run locally: `cd apps/web`, `npm install`, `npm run dev`.
- Build: `npm run build`.
- The app uses illustrative local data only; there is no My UMM integration or student account data.

## Product invariants
- A class cannot be selected when its day/time overlaps a selected class.
- Every conflict state names the class that causes it.
- Selected classes and credit totals update immediately after selection changes.
- Keep the experience responsive and status cues understandable without color alone.
- Do not claim that sample schedule or seat data is live or verified.

## Contribution notes
- Keep scope aligned with the PRD; flag requirements that depend on campus policy or live services.
- Keep user-facing copy in Indonesian.
- Update `CHANGELOG.md` when behavior or deliverables change.
