# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start       # Start Expo dev server (choose platform interactively)
npm run ios         # Run on iOS simulator
npm run android     # Run on Android emulator
npm run web         # Run in browser
npm run lint        # ESLint via expo lint
```

No test runner is configured yet. TypeScript type-checking runs through the Expo build pipeline; there is no standalone `tsc` script.

## Architecture

**tt-score** is a basketball scorekeeping app built with Expo (React Native) using Expo Router for file-based navigation.

### User flow

```
app/index.tsx             ← Home: pick 3v3 or 5v5 mode
  → app/setup/teamA       ← Enter Team A player names
  → app/setup/teamB       ← Enter Team B player names
  → app/setup/matchpoint  ← Set winning point total (default 21)
  → app/game/rotate       ← Lock screen to landscape orientation
  → app/game/3v3          ← In-game scoreboard (active)
    or app/game/5v5       ← (stub)
```

### State management

A single React Context (`GameSetupContext`) carries all pre-game state across the setup flow. Mounted once in **`app/_layout.tsx`** (root).

| Field | Type | Purpose |
|---|---|---|
| `mode` | `string \| null` | `"3v3"` or `"5v5"` |
| `teamAPlayers` / `teamBPlayers` | `Player[]` | Raw player arrays from TeamForm |
| `teamA` / `teamB` | `Team \| null` | Full Team objects (id, name, players, score) |
| `matchPoint` | `number` | Target score (default 21) |
| `match` | `MatchGame` | Full match record (teams, date) |

`teamAPlayers`/`teamBPlayers` are set alongside `teamA`/`teamB` in the setup screens. `matchpoint.tsx` uses `teamA`/`teamB` (type `Team`) directly when building the `MatchGame` object.

`Team.playerScores` is optional (`{ playerId: string; score: number }[] | undefined`). Always use optional chaining (`?.`) when accessing it in game screens.

### Key directories

- `app/` — All screens. Expo Router derives routes from this folder's structure.
- `app/(tabs)/` — Legacy Expo template tab screens; not part of the active game flow.
- `app/setup/` — Pre-game setup flow (Stack navigator, headers hidden).
- `app/game/` — In-game screens. `rotate.tsx` locks orientation; `3v3.tsx` is active (score tracking, per-player scoring, rematch, game-end detection); `5v5.tsx` is a stub.
- `components/` — Shared UI: `TeamForm` (renders `PlayerInput` list), and leftover Expo template components.
- `constants/interface/` — TypeScript interfaces: `Player`, `Team`, `MatchGame`.
- `constants/theme.ts` — `Colors` (light/dark) and `Fonts` exports.
- `context/` — `GameSetupContext.tsx`.
- `utils/matchUtils.tsx` — Stub (`validateTeamPlayers` is empty).

### Orientation

`app/game/rotate.tsx` uses `expo-screen-orientation` to lock the device to landscape before entering the game screens. The root layout suppresses the header for all `/game/` routes via `<Stack.Screen name="game" options={{ headerShown: false }} />`.

### Path alias

`@/` maps to the project root (e.g. `@/context/GameSetupContext`).

### Styling conventions

All app screens use inline `StyleSheet.create`. The dark background color is `#0f172a` and the primary green accent is `#22c55e`. No styling library (NativeWind, Tamagui, etc.) is used.

### Expo config notes

- `newArchEnabled: true` — React Native New Architecture is active.
- `experiments.typedRoutes: true` — Expo Router typed routes are enabled; route strings are type-checked.
- `experiments.reactCompiler: true` — React Compiler is enabled.
