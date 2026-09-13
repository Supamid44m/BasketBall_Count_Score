import { MatchGame } from "@/constants/interface/MatchGame";
import { useGameSetup } from "@/context/GameSetupContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function MatchPointScreen() {
  const [point, setPoint] = useState("21");
  const [error, setError] = useState(false);
  const { setMatchPoint, teamA, teamB, setMatch, mode } = useGameSetup();
  const router = useRouter();

  function createGame() {
    if (!teamA || !teamB) return;
    if (error) return;
    const matchPoint = Number(point);
    const newMatch: MatchGame = {
      id: Date.now().toString(),
      teams: [teamA, teamB],
      matchpoint: matchPoint,
      matchDate: new Date().toISOString(),
    };
    setMatchPoint(matchPoint);
    setMatch(newMatch);
    router.push(mode === "5v5" ? "/game/5v5" : "/game/3v3");
  }

  function handleInputScore(value: string) {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const parsedValue = parseInt(cleanValue, 10);

    if (
      cleanValue === "" ||
      (!isNaN(parsedValue) && parsedValue <= 0) ||
      cleanValue.startsWith("0")
    ) {
      setError(true);
      setPoint(cleanValue);
      return;
    }

    setError(false);
    setPoint(cleanValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Match Point</Text>

      <TextInput
        value={point}
        onChangeText={(value) => handleInputScore(value)}
        keyboardType="numeric"
        style={styles.input}
      />

      {error && (
        <Text style={{ color: "red", fontSize: 16 }}>
          Point should more than 0{" "}
        </Text>
      )}

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
