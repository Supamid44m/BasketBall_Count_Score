import { MatchGame } from "@/constants/interface/MatchGame";
import { useGameSetup } from "@/context/GameSetupContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function MatchPointScreen() {
  const [point, setPoint] = useState("21");
  const { setMatchPoint, teamA, teamB, setMatch, mode } = useGameSetup();
  const router = useRouter();

  function createGame() {
    if (!teamA || !teamB) return;
    const matchPoint = Number(point);
    const newMatch: MatchGame = {
      id: Date.now().toString(),
      teams: [teamA, teamB],
      matchpoint: matchPoint,
      matchDate: new Date().toISOString(),
    };
    setMatchPoint(matchPoint);
    setMatch(newMatch);
    router.push("/game/rotate");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Match Point</Text>

      <TextInput
        value={point}
        onChangeText={setPoint}
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={createGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
      <Pressable
        onPress={() => router.back()}
        style={{
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
