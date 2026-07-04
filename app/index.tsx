import { useGameSetup } from "@/context/GameSetupContext";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { setMode } = useGameSetup();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    console.log("Resetting game setup state");
    setMode(null);
  }, []);

  function setGameMode(mode: string) {
    setMode(mode);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀 Basketball Score</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          setGameMode("3v3");
          router.push("/setup/teamA");
        }}
      >
        <Text style={styles.buttonText}>3 vs 3</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          setMode("5v5");
          router.push("/setup/teamA");
        }}
      >
        <Text style={styles.buttonText}>5 vs 5</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  button: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#22c55e",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
