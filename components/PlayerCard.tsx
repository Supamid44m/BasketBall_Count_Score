import { Player } from "@/constants/interface/Player";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  useEffect(() => {
    console.log("Rendering PlayerCard for:", player);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.playerCard}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    marginVertical: 4,
    borderRadius: 8,
    width: "100%",
  },
  playerCard: {
    padding: 10,
    backgroundColor: "transparent",
  },
});
