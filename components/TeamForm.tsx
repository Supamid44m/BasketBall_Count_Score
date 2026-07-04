import { Player } from "@/constants/interface/Player";
import { createPlayer } from "@/utils/matchUtils";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import PlayerInput from "./PlayerInput";

type Props = {
  teamName: string;
  playerCount: number;
  onSubmit: (players: Player[]) => void;
};

export default function TeamForm({ teamName, playerCount, onSubmit }: Props) {
  const [players, setPlayers] = useState<string[]>(Array(playerCount).fill(""));

  const handleChange = (index: number, value: string) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{teamName}</Text>

      {players.map((player, index) => (
        <PlayerInput
          key={index}
          value={player}
          onChange={(text) => handleChange(index, text)}
          placeholder={`Player ${index + 1}`}
        />
      ))}

      <Pressable
        onPress={() => onSubmit(players.map((player) => createPlayer(player)))}
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
