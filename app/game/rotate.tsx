import { useGameSetup } from "@/context/GameSetupContext";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function RotateScreen() {
  const router = useRouter();
  const { mode } = useGameSetup();

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).then(() => router.replace(mode === "5v5" ? "/game/5v5" : "/game/3v3"));
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
});
