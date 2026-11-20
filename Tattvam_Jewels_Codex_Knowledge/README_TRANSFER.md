# Tattvam Jewels — Codex Knowledge Pack

## Purpose
This folder transfers the current Tattvam Jewels business and software-project context from the ChatGPT project into the local VS Code/Codex workspace.

## How to use
1. Extract this folder into the root of your local repository (the same folder you open in VS Code).
2. Keep `AGENTS.md` at the repository root. Codex uses it as project guidance.
3. Open the repository folder in VS Code and open the Codex panel.
4. Start with:  
   `Read AGENTS.md and all project documentation. Summarise your understanding, identify unresolved decisions, inspect the repository, and recommend the next safe implementation step. Do not modify files yet.`
5. After reviewing its summary, ask it to implement one small task at a time.
6. Update these documents whenever a business rule or architecture decision changes.

## Important
- The documents capture the current plan, not proof that every choice is final.
- Items marked **Proposed** must be confirmed before implementation.
- Do not paste secrets, API keys, passwords, OTPs, payment credentials, or production customer data into these documents.
- ChatGPT Project history is not automatically synced to the VS Code Codex extension. These files are the handover mechanism.
