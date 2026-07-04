import { Player } from "./Player";

export interface Team {
  id: string;
  name: string;
  players: Player[];
  playerScores: { playerId: string; score: number }[];
  score: number;
}

/// playerScore : {playerId: string, score: number}[]
