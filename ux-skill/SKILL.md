---
name: krs-umm-ux
description: Apply the UMM KRS research findings and UX requirements when designing, reviewing, or implementing the class selection experience in this project.
---

# KRS UMM UX Skill

## Purpose
Help the team make the KRS class selection flow clear under time pressure. Use this skill for product decisions, interface changes, UX reviews, and prototype work in this project.

## Product context
- Primary user: active UMM student selecting classes for the upcoming semester, often on a phone during a limited enrollment window.
- User goal: choose courses for the correct concentration, avoid schedule collisions, and secure an available seat without repeated manual checking.
- Research basis: three student interviews and Worksheets 1–8. Treat qualitative findings as directional evidence from a small sample, not population statistics.
- Design challenge: make schedule collisions visible at the moment a student chooses a class, so they do not have to remember every selected time slot.

## UX principles
1. **Prevent surprises at selection time.** Compare a candidate class with the selected schedule immediately. Explain which selected class causes a collision.
2. **Make status legible without color alone.** Pair color with an icon and short text. A conflicting class must not be selectable; keep the reason available to assistive technology.
3. **Put decision information beside the choice.** Show course concentration, actual clock times, room, lecturer, and remaining seats in the class list.
4. **Keep recovery close to the problem.** Show available non-conflicting alternatives in the same context. Preserve the student's other selections when replacing one class.
5. **Show a trustworthy schedule summary.** Group selected classes by day and time, and state whether there are collisions. Do not announce that a schedule is safe unless every selected pair has been checked.
6. **Support small screens and hurried use.** Keep labels readable, controls touch-friendly, and essential selection and conflict information visible on mobile.

## Interaction requirements
- Recalculate conflicts whenever a class is added or removed.
- A class overlaps when it is on the same day and its time interval intersects another selected class.
- Distinguish the selected class, a valid available class, and a blocked conflicting class with both visual and textual states.
- Communicate the conflicting course code/name; do not use an unexplained warning badge.
- If no conflict exists, allow selection and update total credits and the weekly summary immediately.
- If a selection is removed, re-evaluate the remaining options and make newly available choices selectable.
- Do not silently alter a student's schedule or claim to connect to campus systems when using sample data.

## Content and accessibility
- Write concise Indonesian interface copy using familiar academic terms such as “bentrok”, “penjurusan”, and “kuota”.
- Display actual time ranges (for example, `07.00–08.40`); if source data is still expressed as “jam ke-X”, label any conversion as an estimate until verified.
- Provide accessible names for icon-only buttons, visible keyboard focus, semantic headings, and disabled state explanations.
- Keep status understandable for users with color vision differences and screen readers.

## Evidence and prioritization
- Highest priority: collision prevention and an immediately understandable conflict state (UX-01, Must have).
- Also high: available alternative classes (UX-04, Must have).
- Next: concentration labels (UX-02), actual class times (UX-03), and a sorted schedule summary (UX-05).
- Later and subject to academic policy: in-system transfer requests (UX-06).
- Validate the proposed “recognize a conflict within 3 seconds” target in a usability test; it is a target, not a measured result.
- Persona Lala and journey emotions are synthesized from three interviews and assumptions. Do not present them as validated facts.

## Review checklist
- Can the student see a collision before selecting the class?
- Does the warning name the conflicting course and explain the effect?
- Is the reason conveyed without relying on color alone?
- Are concentration, clock time, and seat availability visible at the decision point?
- Can a student find a valid alternative without restarting selection?
- Does the schedule summary update after add and remove actions?
- Does the experience remain understandable on a narrow phone viewport?
- Are sample data and unvalidated assumptions labeled accurately?

## Source worksheets
The underlying evidence and requirements are summarized in the repository `README.md`. Worksheet identifiers refer to the student's UX Detective (W1), Design Challenge (W2), Stakeholder (W3), Research Plan (W4), User Interview (W5), Empathy Map/Persona (W6), User Journey (W7), and UX Requirements (W8).
