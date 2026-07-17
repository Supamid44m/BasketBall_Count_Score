import { Pressable, StyleSheet, Text, View } from "react-native";

interface PauseMenuProps {
  visible: boolean;
  onResume: () => void;
  onRematch: () => void;
}

export default function PauseMenu({
  visible,
  onResume,
  onRematch,
}: PauseMenuProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Paused</Text>

        <Pressable style={styles.button} onPress={onResume}>
          <Text style={styles.buttonText}>Resume</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.rematchButton]}
          onPress={onRematch}
        >
          <Text style={styles.buttonText}>Rematch</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: "center",
    gap: 12,
    minWidth: 220,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  rematchButton: {
    backgroundColor: "#334155",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
