import { Player } from "@/constants/interface/Player";
import { createPlayer, validateTeamPlayers } from "@/utils/matchUtils";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PlayerInput from "./PlayerInput";

type Props = {
  teamName: string;
  playerCount: number;
  onSubmit: (players: Player[]) => void;
};

export default function TeamForm({ teamName, playerCount, onSubmit }: Props) {
  const [players, setPlayers] = useState<string[]>(Array(playerCount).fill(""));
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (players.some((player) => !validateTeamPlayers(player))) {
      setError("All player names are required.");
      return;
    }
    setError("");
    onSubmit(players.map((player) => createPlayer(player)));
  };

  return (
    <View style={null}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{teamName}</Text>

      {players.map((player, index) => (
        <PlayerInput
          key={index}
          value={player}
          onChange={(text) => handleChange(index, text)}
          placeholder={`Player ${index + 1}`}
        />
      ))}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#22c55e",
          padding: 16,
          marginTop: 20,
          borderRadius: 12,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Next
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: { color: "red", marginBottom: 15, fontSize: 14 },
});
