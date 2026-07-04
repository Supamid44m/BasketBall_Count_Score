import TeamForm from "@/components/TeamForm";
import { useGameSetup } from "@/context/GameSetupContext";
import { generateTeamId } from "@/utils/matchUtils";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function TeamAScreen() {
  const router = useRouter();
  const { setTeamAPlayers, setTeamA, mode, setMode } = useGameSetup();

  useEffect(() => {
    console.log("mode", mode);
  }, []);

  return (
    <View style={styles.container}>
      <TeamForm
        teamName="Team A"
        playerCount={mode === "3v3" ? 3 : 5}
        onSubmit={(players) => {
          setTeamAPlayers(players);
          setTeamA({
            id: generateTeamId(),
            name: "Team A",
            players,
            playerScores: players.map((player) => ({
              playerId: player.id,
              score: 0,
            })),
            score: 0,
          });
          router.push("/setup/teamB");
        }}
      />
      <Pressable
        onPress={() => {
          setMode(null);
          router.back();
        }}
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
  container: { flex: 1, padding: 20, backgroundColor: "#0f172a" },
});
