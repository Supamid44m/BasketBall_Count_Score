# tt-score

A basketball scorekeeping app built with [Expo](https://expo.dev) (React Native) and Expo Router.

แอปนับคะแนนบาสเก็ตบอล พัฒนาด้วย Expo (React Native) และ Expo Router

---

## English

### Overview

**tt-score** lets you set up a 3v3 (or 5v5) basketball match, enter player names for both teams, set a target score, and track the live scoreboard with per-player scoring.

### User Flow

```
app/index.tsx             ← Home: pick 3v3 or 5v5 mode
  → app/setup/teamA        ← Enter Team A player names
  → app/setup/teamB        ← Enter Team B player names
  → app/setup/matchpoint   ← Set winning point total (default 21)
  → app/game/3v3           ← In-game scoreboard (active)
    or app/game/5v5         ← (stub)
```

### Getting Started

```bash
npm install
npm run start       # Start Expo dev server (choose platform interactively)
npm run ios         # Run on iOS simulator
npm run android     # Run on Android emulator
npm run web          # Run in browser
npm run lint         # Lint with ESLint (expo lint)
```

There is no standalone `tsc` script; TypeScript type-checking runs through the Expo build pipeline. No test runner is configured yet.

### Project Structure

- `app/` — All screens (Expo Router derives routes from this folder).
- `app/(tabs)/` — Legacy Expo template tab screens; not part of the active game flow.
- `app/setup/` — Pre-game setup flow (Stack navigator, headers hidden).
- `app/game/` — In-game screens: `3v3.tsx` (active scoreboard with per-player scoring, rematch, game-end detection), `5v5.tsx` (stub), `scoreboard.tsx`.
- `components/` — Shared UI: `TeamForm`, `PlayerInput`, `PlayerCard`, `PressScore`, `PressPlayerScore`, `PauseMenu`, plus leftover Expo template components.
- `constants/interface/` — TypeScript interfaces: `Player`, `Team`, `MatchGame`.
- `constants/theme.ts` — `Colors` (light/dark) and `Fonts` exports.
- `context/GameSetupContext.tsx` — Single React Context carrying pre-game state across the setup flow.
- `utils/matchUtils.tsx` — Match validation utilities.

### State Management

A single `GameSetupContext`, mounted in `app/_layout.tsx`, carries setup state:

| Field | Type | Purpose |
|---|---|---|
| `mode` | `string \| null` | `"3v3"` or `"5v5"` |
| `teamAPlayers` / `teamBPlayers` | `Player[]` | Raw player arrays from `TeamForm` |
| `teamA` / `teamB` | `Team \| null` | Full Team objects (id, name, players, score) |
| `matchPoint` | `number` | Target score (default 21) |
| `match` | `MatchGame` | Full match record (teams, date) |

`Team.playerScores` is optional — always use optional chaining (`?.`) when reading it.

### Notable Details

- **Path alias**: `@/` maps to the project root (e.g. `@/context/GameSetupContext`).
- **Styling**: Inline `StyleSheet.create` throughout, no styling library. Dark background `#0f172a`, green accent `#22c55e`.
- **Expo config**: New Architecture enabled, typed routes enabled, React Compiler enabled.

---

## ภาษาไทย

### ภาพรวม

**tt-score** เป็นแอปสำหรับตั้งค่าการแข่งขันบาสเก็ตบอลแบบ 3 ต่อ 3 (หรือ 5 ต่อ 5) กรอกชื่อผู้เล่นทั้งสองทีม กำหนดคะแนนเป้าหมาย และติดตามสกอร์บอร์ดแบบเรียลไทม์พร้อมคะแนนรายผู้เล่น

### ขั้นตอนการใช้งาน

```
app/index.tsx             ← หน้าแรก: เลือกโหมด 3v3 หรือ 5v5
  → app/setup/teamA        ← กรอกรายชื่อผู้เล่นทีม A
  → app/setup/teamB        ← กรอกรายชื่อผู้เล่นทีม B
  → app/setup/matchpoint   ← ตั้งคะแนนที่ใช้ตัดสินผู้ชนะ (ค่าเริ่มต้น 21)
  → app/game/3v3           ← หน้าสกอร์บอร์ดระหว่างเกม (ใช้งานได้จริง)
    หรือ app/game/5v5       ← (ยังเป็นสตับ ยังไม่พัฒนาเต็มรูปแบบ)
```

### การเริ่มต้นใช้งาน

```bash
npm install
npm run start       # เริ่ม Expo dev server (เลือกแพลตฟอร์มแบบโต้ตอบ)
npm run ios         # รันบน iOS simulator
npm run android     # รันบน Android emulator
npm run web          # รันในเบราว์เซอร์
npm run lint         # ตรวจสอบโค้ดด้วย ESLint (expo lint)
```

ยังไม่มีสคริปต์ `tsc` แยกต่างหาก — การตรวจสอบชนิดข้อมูล TypeScript ทำงานผ่านขั้นตอน build ของ Expo และยังไม่มีการตั้งค่า test runner

### โครงสร้างโปรเจกต์

- `app/` — หน้าจอทั้งหมด (Expo Router สร้างเส้นทางจากโครงสร้างโฟลเดอร์นี้)
- `app/(tabs)/` — หน้าจอแท็บจากเทมเพลต Expo เดิม ไม่ได้เป็นส่วนหนึ่งของ flow เกมที่ใช้งานจริง
- `app/setup/` — ขั้นตอนตั้งค่าก่อนเริ่มเกม (ใช้ Stack navigator ซ่อน header)
- `app/game/` — หน้าจอระหว่างเกม: `3v3.tsx` (สกอร์บอร์ดที่ใช้งานได้ มีคะแนนรายผู้เล่น รีแมตช์ ตรวจจับจบเกม), `5v5.tsx` (สตับ), `scoreboard.tsx`
- `components/` — UI ที่ใช้ร่วมกัน: `TeamForm`, `PlayerInput`, `PlayerCard`, `PressScore`, `PressPlayerScore`, `PauseMenu` และคอมโพเนนต์เหลือจากเทมเพลต Expo
- `constants/interface/` — TypeScript interfaces: `Player`, `Team`, `MatchGame`
- `constants/theme.ts` — export `Colors` (light/dark) และ `Fonts`
- `context/GameSetupContext.tsx` — React Context ตัวเดียวที่เก็บสถานะก่อนเริ่มเกมตลอด flow การตั้งค่า
- `utils/matchUtils.tsx` — ยูทิลิตี้สำหรับตรวจสอบข้อมูลการแข่งขัน

### การจัดการ State

`GameSetupContext` ตัวเดียว mount อยู่ที่ `app/_layout.tsx` เก็บสถานะดังนี้:

| ฟิลด์ | ชนิด | วัตถุประสงค์ |
|---|---|---|
| `mode` | `string \| null` | `"3v3"` หรือ `"5v5"` |
| `teamAPlayers` / `teamBPlayers` | `Player[]` | อาร์เรย์ผู้เล่นดิบจาก `TeamForm` |
| `teamA` / `teamB` | `Team \| null` | ออบเจ็กต์ทีมแบบเต็ม (id, name, players, score) |
| `matchPoint` | `number` | คะแนนเป้าหมาย (ค่าเริ่มต้น 21) |
| `match` | `MatchGame` | ข้อมูลการแข่งขันแบบเต็ม (ทีม, วันที่) |

`Team.playerScores` เป็น optional — ควรใช้ optional chaining (`?.`) เสมอเมื่ออ่านค่านี้

### รายละเอียดที่ควรทราบ

- **Path alias**: `@/` ชี้ไปยัง root ของโปรเจกต์ (เช่น `@/context/GameSetupContext`)
- **Styling**: ใช้ inline `StyleSheet.create` ทั้งหมด ไม่มีไลบรารี styling ภายนอก พื้นหลังสีเข้ม `#0f172a` สีเขียวหลัก `#22c55e`
- **การตั้งค่า Expo**: เปิดใช้ New Architecture, typed routes และ React Compiler
