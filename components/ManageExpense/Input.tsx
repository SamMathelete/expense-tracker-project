import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";

interface Props {
  label: string;
  textInputConfig?: React.ComponentProps<typeof TextInput>;
}

const Input: FC<Props> = ({ label, textInputConfig }) => {
  let inputStyles: StyleProp<TextStyle> = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
