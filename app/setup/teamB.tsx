import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import TeamForm from "@/components/TeamForm";
import { Player } from "@/constants/interface/Player";
import { useGameSetup } from "@/context/GameSetupContext";
import { generateTeamId } from "@/utils/matchUtils";
import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";

export default function TeamBScreen() {
  const router = useRouter();
  const { setTeamBPlayers, setTeamB, mode, teamAPlayers } = useGameSetup();
  const [players, setPlayers] = useState<Player[]>([]);

  function createPlayer(player: string) {
    console.log("Creating player:", player);
  }

  useEffect(() => {
    console.log("Team A players:", teamAPlayers);
  }, []);

  return (
    <View style={styles.container}>
      <TeamForm
        teamName="Team B"
        playerCount={mode == "3v3" ? 3 : 5}
        onSubmit={(players) => {
          setTeamBPlayers(players);
          setTeamB({
            id: generateTeamId(),
            name: "Team B",
            players,
            playerScores: players.map((player) => ({
              playerId: player.id,
              score: 0,
            })),
            score: 0,
          });
          router.push("/setup/matchpoint");
        }}
      />
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
  container: { flex: 1, padding: 20, backgroundColor: "#0f172a" },
});
