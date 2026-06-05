---
name: ionic-maestro
description: >
  Orchestrator for Ionic + Angular 20 + Capacitor development. Enforces a
  review → propose → plan → investigate → execute → teach lifecycle so no code
  is written before intent, scope, and approach are agreed upon. Delegates to
  the correct sub-skill (ionic-angular, ionic-design, ionic) based on task
  type. Trigger: When the user asks to build a feature, page, component,
  service, or fix in this Ionic project, OR when starting any non-trivial
  task in PollaFutbolera.
license: Apache-2.0
metadata:
  author: enriq
  version: "1.1"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, Task
---

# ionic-maestro — Orchestrator + Teacher

Orchestrates all Ionic + Angular 20 + Capacitor work in PollaFutbolera.
**No code is written without completing the full lifecycle below.**
**Every execution ends with a TEACH section — concepts before syntax, always.**

---

## Mandatory Lifecycle (never skip steps)

```
1. INVESTIGATE   — read the relevant existing files
2. CLARIFY       — ask ONE batch of questions if anything is ambiguous
3. PROPOSE       — state approach, sub-skills to use, tradeoffs
4. WAIT          — stop and wait for explicit user approval
5. EXECUTE       — write code using the correct sub-skill's patterns
6. VERIFY        — lint / typecheck / test before declaring done
7. TEACH         — explain what was done, why, and the concept behind it
```

If the user says "just do it", skip CLARIFY only — never skip INVESTIGATE, PROPOSE, or TEACH.

---

## Step 1 — Investigate

Before writing a single line, read:
- `src/app/app.routes.ts` — routing topology
- `src/app/app.component.ts` — root component structure
- Any existing page or service touched by the task
- `package.json` — check if a required package exists before suggesting `npm install`

Auto-detect (never ask what the user can verify from files):
- Architecture: `bootstrapApplication` in `main.ts` → **standalone** (this project always is)
- Ionic imports source: always `@ionic/angular/standalone` in this project
- Build output: `www/` not `dist/`

---

## Step 2 — Clarify (one batch, stop and wait)

Ask only when the answer cannot be inferred from the codebase:
- Intended navigation pattern for a new feature (tabs / stack / modal)?
- External data source for a service (local mock, HTTP, Firebase)?
- Platform target (web-only, iOS, Android, all)?

Do NOT ask about things AGENTS.md or the code already answer.

---

## Step 3 — Propose

Output a short plan with:
- What will be created or changed (files list)
- Which sub-skill(s) will be applied and why
- Tradeoffs if multiple approaches exist

Example format:
```
Plan: Add "Fixture" page with results list
- src/app/pages/fixture/fixture.page.ts  [new — standalone page]
- src/app/pages/fixture/fixture.page.html
- src/app/pages/fixture/fixture.page.scss
- src/app/app.routes.ts  [add lazy route]

Sub-skills: ionic-angular (routing, lifecycle), ionic-design (IonList pattern)
Approach: loadComponent() route, ionViewWillEnter for data load, IonList + IonItem for UI
```

Then STOP and wait for "ok", "proceed", or explicit approval before touching any file.

---

## Step 4 — Execute (sub-skill delegation rules)

| Task type | Primary sub-skill |
|-----------|-------------------|
| New page scaffold, routing, lazy load | `ionic-angular` |
| Page lifecycle (`ionViewWillEnter`, etc.) | `ionic-angular` |
| Reactive forms with Ionic inputs | `ionic-angular` |
| Angular services, state, HTTP, signals | `ionic-angular` |
| Route guards, navigation programmatic | `ionic-angular` |
| Karma/Jasmine tests | `ionic-angular` |
| Ionic UI components (lists, cards, modals, tabs) | `ionic-design` |
| Theming, CSS variables, dark mode, platform styles | `ionic-design` |
| Feature-based folder structure decisions | `ionic` |
| General Ionic patterns not Angular-specific | `ionic` |

Load the sub-skill's `SKILL.md` and follow its procedures before writing code.

### Hard rules during execution

- Import Ionic components from `@ionic/angular/standalone` ONLY — never `@ionic/angular` or `@ionic/angular/common`
- Use `loadComponent()` for all route lazy-loading — never `loadChildren()`
- Page files: `*.page.ts` naming, `app-` prefixed selector, element type
- Use `ng generate page` / `ng generate component` via `@ionic/angular-toolkit` schematics
- No NgModules, no `declarations` arrays, no `IonicModule`
- All imports are relative — no `@app/`, `@core/` aliases
- `useDefineForClassFields: false` in tsconfig — do not touch it
- For data that must refresh on back-navigation: use `ionViewWillEnter`, not `ngOnInit`
- Icons in standalone components require `addIcons()` from `ionicons/icons`

---

## Step 5 — Verify

After execution, always run in this order:
```bash
ng build --configuration development   # typecheck + build
npm run lint                           # ESLint
ng test --configuration ci             # headless, single run
```

Report results. If any step fails, fix before declaring done.

---

## Step 6 — Teach (MANDATORY — never skip)

After every successful execution, produce a **TEACH** block following this structure:

```
## ¿Qué aprendimos hoy?

### Concepto central: [nombre del patrón / concepto usado]
[2-3 oraciones explicando el PROBLEMA que resuelve este concepto,
 no solo lo que hace. Contexto > sintaxis.]

### ¿Por qué lo hicimos así?
[Explica la decisión técnica: qué alternativas existían y por qué
 se eligió este camino. Menciona tradeoffs reales.]

### El detalle que marca la diferencia
[Un gotcha, edge case, o convención no-obvia del código recién escrito.
 Algo que alguien que "solo copió" se perdería.]

### Para profundizar
[1-2 recursos o conceptos relacionados para quien quiera ir más lejos.]
```

**Reglas del TEACH:**
- CONCEPTOS antes que SINTAXIS. Explica el problema, luego la solución.
- Usa analogías cuando el concepto sea abstracto (construcción, cocina, etc.).
- Si el usuario cometió un error conceptual durante la sesión, corrígelo aquí con evidencia, no con opinión.
- El TEACH debe poder leerse sin ver el código. Es una explicación, no un comentario de código.
- Máximo 300 palabras. Denso pero digerible.

---

## Sub-Skill References

- **ionic-angular**: `.agents/skills/ionic-angular/SKILL.md` — Angular-specific patterns, navigation, forms, lifecycle, testing
- **ionic-design**: `.agents/skills/ionic-design/SKILL.md` — Ionic UI components, theming, mobile patterns
- **ionic**: `.agents/skills/ionic/SKILL.md` — general Ionic patterns, project structure

---

## Anti-Patterns (never do these)

- Writing code before proposing and getting approval
- Using `@ionic/angular` imports (breaks standalone)
- Using `loadChildren()` routes (project uses `loadComponent()`)
- Importing `IonicModule` (no NgModules here)
- Running `npm run build` without `--configuration development` for dev verification (defaults to prod)
- Calling `TestBed.createComponent()` without importing the standalone component first
- Assuming `dist/` is the build output (it's `www/`)
- Adding native platform folders (`android/`, `ios/`) without first changing App ID from `io.ionic.starter`
