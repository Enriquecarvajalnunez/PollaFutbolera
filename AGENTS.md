# AGENTS.md — PollaFutbolera

## Stack

Angular 20 + Ionic 8 + Capacitor 8. **Standalone Angular API** — no NgModules anywhere.
Single-app project (named `app` in `angular.json`). No monorepo.

---

## Developer Commands

| Task | Command |
|------|---------|
| Dev server | `npm start` |
| Build (prod) | `npm run build` |
| Build (dev) | `ng build --configuration development` or `npm run watch` |
| Test | `npm test` (watch mode, opens Chrome) |
| Test headless/CI | `ng test --configuration ci` |
| Lint | `npm run lint` |
| Typecheck | `ng build --configuration development` (no `tsc --noEmit` script) |

**`npm run build` defaults to production** — `angular.json` sets `"defaultConfiguration": "production"`. Always pass `--configuration development` for dev builds.

---

## Testing Quirks

- Karma + Jasmine. **`singleRun: false` by default** — `npm test` opens Chrome and stays in watch mode. Always use `--configuration ci` or `--watch=false` for one-shot runs.
- No Docker, no backend, no external services required.
- Run a single spec: `ng test --include='src/app/home/home.page.spec.ts'`
- Focus a single test without flags: use Jasmine `fdescribe` / `fit`.
- Standalone component test pattern — no `declarations`, just `imports: [MyComponent]`:
  ```ts
  await TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [provideRouter([])]
  }).compileComponents();
  ```

**Known scaffold bug**: `home.page.spec.ts` as generated will fail because it calls `TestBed.createComponent(HomePage)` without proper imports. Fix before running tests on that file.

---

## Ionic / Angular Import Rule — CRITICAL

**Always import Ionic components from `@ionic/angular/standalone`**, never from `@ionic/angular` or `@ionic/angular/common`. VS Code auto-import exclusions enforce this; ESLint does not — mistakes will compile but may break at runtime.

```ts
// CORRECT
import { IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';

// WRONG — do not use
import { IonicModule } from '@ionic/angular';
```

---

## Code Generation

Use Ionic schematics for pages and components — they produce standalone + SCSS automatically:

```bash
ng generate page pages/my-page       # uses @ionic/angular-toolkit:page
ng generate component components/foo # uses @ionic/angular-toolkit:component
```

Do not use plain `ng g component` without `@ionic/angular-toolkit` — it won't apply the right defaults.

---

## Routing

Routes use `loadComponent()`, not `loadChildren()`. Every new page follows the pattern in `src/app/app.routes.ts`.

---

## Source Layout

```
src/
  app/
    app.component.ts     # Root: imports IonApp + IonRouterOutlet (standalone)
    app.routes.ts        # Lazy loads pages via loadComponent()
    home/                # Only page currently implemented
  environments/
    environment.ts       # Dev (production: false)
    environment.prod.ts  # Prod — swapped by ng build automatically
  theme/variables.scss   # Ionic CSS custom properties
www/                     # Build output (Capacitor reads here, not dist/)
```

---

## TypeScript Config Gotchas

- `useDefineForClassFields: false` — required for Angular decorators. Do not remove.
- `moduleResolution: "node"` — not `bundler` or `node16`.
- Strict mode fully on: `strict`, `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`, `noImplicitReturns`, `noImplicitOverride`.
- No path aliases (`@app/`, `@core/`, etc.) — all imports are relative.

---

## Capacitor

- `webDir: 'www'` — always `ng build` before `npx cap sync`.
- App ID is placeholder `io.ionic.starter` in `capacitor.config.ts` — **change before any native build**.
- No native platform folders (`android/`, `ios/`) exist yet. Add with `npx cap add android` / `npx cap add ios`.

---

## Style / Formatting

- EditorConfig: 2-space indent, single quotes (TS), final newline, trim trailing whitespace.
- No Prettier, no Stylelint configured.
- Component selectors: `app-` prefix, element type, kebab-case.
- Directive selectors: `app` prefix, attribute type, camelCase.
- Page files named `*.page.ts` (not `*.component.ts`).

---

## Agent Skills

Skills live in `.agents/skills/`. Load a skill when the task matches its trigger.

| Skill | Trigger | File |
|-------|---------|------|
| `ionic-maestro` | **Start here** for any feature, page, component, or fix. Orchestrates review → propose → approve → execute. | [SKILL.md](.agents/skills/ionic-maestro/SKILL.md) |
| `ionic-angular` | Angular-specific patterns: routing, lifecycle, forms, services, signals, guards, testing | [SKILL.md](.agents/skills/ionic-angular/SKILL.md) |
| `ionic-design` | Ionic UI components, theming, CSS variables, dark mode, platform-specific styles | [SKILL.md](.agents/skills/ionic-design/SKILL.md) |
| `ionic` | General Ionic patterns, feature-based folder structure, Firebase integration | [SKILL.md](.agents/skills/ionic/SKILL.md) |

**Always load `ionic-maestro` first.** It will delegate to the correct sub-skill(s).

---

## What Does Not Exist Yet

No state management, no HTTP/backend, no auth, no i18n, no CI workflows, no pre-commit hooks, no path aliases, no native platform folders.
