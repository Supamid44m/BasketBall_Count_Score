import { Player } from "@/constants/interface/Player";

export function validateTeamPlayers() {}

export function createPlayer(players: string) {
  const player: Player = {
    id:
      players.toLowerCase().replace(/\s/g, "-") +
      "-" +
      Math.random().toString(36).substring(2, 8),
    name: players,
  };
  return player;
}

export function generateTeamId() {
  return Math.random().toString(36).substring(2, 8);
}
