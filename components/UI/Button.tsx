import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  mode?: string;
  style?: {};
}

const Button: FC<Props> = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: Colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});
