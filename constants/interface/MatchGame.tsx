import { Team } from "./Team";

export interface MatchGame {
  id: string;
  teams: Team[];
  matchpoint: number;
  matchDate: string;
}
