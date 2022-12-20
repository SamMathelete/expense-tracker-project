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
  style?: StyleProp<TextStyle>;
  textInputConfig?: React.ComponentProps<typeof TextInput>;
  invalid: boolean;
}

const Input: FC<Props> = ({ label, style, textInputConfig, invalid }) => {
  let inputStyles: StyleProp<TextStyle> = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
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
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
