import { Player } from "@/constants/interface/Player";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  increaseScore: (team?: string) => void;
  increasePlayerScore: (team: string, playerIndex: number) => void;
  score: number;
  players: Player[];
  teamSide: string;
}

export default function PressScore({
  increaseScore,
  increasePlayerScore,
  score,
  players,
  teamSide,
}: Props) {
  const [teamSideState, setTeamSideState] = useState<string>(teamSide);

  const textColor = teamSide === "B" ? "#000000" : "#ffffff";

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.scoreArea}
        onPress={() => increaseScore(teamSide)}
      >
        <Text style={[styles.scoreText, { color: textColor }]}>{score}</Text>
      </TouchableOpacity>

      <View style={styles.playersArea}>
        <View style={styles.topPlayerRow}>
          {players[0] && (
            <Pressable
              style={({ pressed }) => [
                styles.playerButton,
                pressed && styles.playerButtonPressed,
              ]}
              onPress={() => increasePlayerScore(teamSide as string, 0)}
            >
              <Text style={[styles.playerName, { color: textColor }]}>
                {players[0].name}
              </Text>
            </Pressable>
          )}
        </View>
        <View style={styles.bottomPlayerRow}>
          {players.slice(1).map((player) => (
            <Pressable
              key={player.id}
              style={({ pressed }) => [
                styles.playerButton,
                pressed && styles.playerButtonPressed,
              ]}
              onPress={() =>
                increasePlayerScore(teamSide as string, players.indexOf(player))
              }
            >
              <Text style={[styles.playerName, { color: textColor }]}>
                {player.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  teamAContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#000000",
  },
  scoreArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 96,
    fontWeight: "bold",
    color: "green",
  },
  playersArea: {
    paddingBottom: 20,
  },
  topPlayerRow: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
  bottomPlayerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },
  playerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(241, 241, 241, 0.15)",
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: "#22c55e",
    minWidth: 72,
    alignItems: "center",
  },
  playerButtonPressed: {
    // backgroundColor: "rgba(34, 197, 94, 0.45)",
    // borderColor: "#16a34a",
  },
  playerName: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
