import { MatchGame } from "@/constants/interface/MatchGame";
import { Player } from "@/constants/interface/Player";
import { Team } from "@/constants/interface/Team";
import { createContext, useContext, useState } from "react";

type GameSetup = {
  mode: string | null;
  teamAPlayers: Player[];
  teamBPlayers: Player[];
  teamA: Team | null;
  teamB: Team | null;
  matchPoint: number;
  match: MatchGame;
  isQuickMode: boolean;

  setMode: (mode: string | null) => void;
  setTeamAPlayers: (data: Player[]) => void;
  setTeamBPlayers: (data: Player[]) => void;
  setTeamA: (team: Team) => void;
  setTeamB: (team: Team) => void;
  setMatchPoint: (point: number) => void;
  setMatch: (match: MatchGame) => void;
  setIsQuickMode: (isQuickMode: boolean) => void;
};

const GameSetupContext = createContext<GameSetup | null>(null);

export function GameSetupProvider({ children }: any) {
  const [mode, setMode] = useState<string | null>(null);
  const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);
  const [matchPoint, setMatchPoint] = useState(21);
  const [match, setMatch] = useState<MatchGame>({
    id: "",
    teams: [],
    matchpoint: 21,
    matchDate: new Date().toISOString(),
  });
  const [isQuickMode, setIsQuickMode] = useState(false);

  return (
    <GameSetupContext.Provider
      value={{
        mode,
        teamAPlayers,
        teamBPlayers,
        teamA,
        teamB,
        matchPoint,
        match,
        isQuickMode,
        setMode,
        setTeamAPlayers,
        setTeamBPlayers,
        setTeamA,
        setTeamB,
        setMatchPoint,
        setMatch,
        setIsQuickMode,
      }}
    >
      {children}
    </GameSetupContext.Provider>
  );
}

export const useGameSetup = () => {
  const ctx = useContext(GameSetupContext);
  if (!ctx) throw new Error("useGameSetup must be used inside provider");
  return ctx;
};
