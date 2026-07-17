import PauseMenu from "@/components/PauseMenu";
import PressScore from "@/components/PressScore";
import { useGameSetup } from "@/context/GameSetupContext";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ThreeVThreeScreen() {
  const { match } = useGameSetup();
  const teamAPlayers = match?.teams[0]?.players || [];
  const teamBPlayers = match?.teams[1]?.players || [];
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  // const [matchScore, setMatchScore] = useState({ teamA: 0, teamB: 0 });

  function increaseScore(team: string) {
    if (team === "A") {
      const newScore = scoreA + 1;
      setScoreA(newScore);
      match.teams[0].score = newScore;
      checkGameEnd(newScore, scoreB);
    } else {
      const newScore = scoreB + 1;
      setScoreB(newScore);
      match.teams[1].score = newScore;
      checkGameEnd(scoreA, newScore);
    }
  }

  function checkGameEnd(teamAscore: number, teamBscore: number) {
    const matchScore = match.matchpoint;

    console.log("teamAscore" + teamAscore);
    console.log(`teamBScore+${teamBscore}`);

    if (teamAscore == matchScore || teamBscore == matchScore) {
      setIsEnd(true);
      console.log("result", JSON.stringify(match));
      Rematch();
    }
  }

  function increasePlayerScore(team: string, index: number) {
    const teamIndex = team == "A" ? 0 : 1;

    const playerScore = match.teams[teamIndex].playerScores?.[index];
    if (playerScore) playerScore.score += 1;
    increaseScore(team);

    console.log("Updated player score:", playerScore);
  }

  function Rematch() {
    setIsEnd(false);
    setScoreA(0);
    setScoreB(0);
    match.teams[0].score = 0;
    match.teams[1].score = 0;
    match.teams[0].playerScores?.forEach((ps) => (ps.score = 0));
    match.teams[1].playerScores?.forEach((ps) => (ps.score = 0));
  }

  useEffect(() => {
    console.log("3v3 screen mounted");
    console.log("Match data:", match);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        {/* Team A */}
        <View style={styles.teamAContainer}>
          <PressScore
            increaseScore={(team) => increaseScore(team as string)}
            teamSide={"A"}
            increasePlayerScore={(team, playerIndex) =>
              increasePlayerScore(team as string, playerIndex as number)
            }
            score={scoreA}
            players={teamAPlayers}
          />
        </View>

        {/* pause menu */}

        <Pressable style={styles.pauseButton} onPress={() => setIsPaused(true)}>
          <Text style={styles.pauseButtonText}>II</Text>
        </Pressable>

        <PauseMenu
          visible={isPaused}
          onResume={() => setIsPaused(false)}
          onRematch={() => {
            Rematch();
            setIsPaused(false);
          }}
        />

        {/* Team B */}
        <View style={styles.teamBContainer}>
          <PressScore
            increaseScore={(team) => increaseScore(team as string)}
            teamSide={"B"}
            increasePlayerScore={(team, playerIndex) =>
              increasePlayerScore(team as string, playerIndex as number)
            }
            score={scoreB}
            players={teamBPlayers}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#0f172a",
    flexDirection: "row",
  },
  scoreContainer: {
    flex: 1,
    flexDirection: "row",
  },
  teamAContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#000000",
  },
  teamBContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  pauseButton: {
    position: "absolute",
    top: 16,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  pauseButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
