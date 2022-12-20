import { FC, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpensesContext } from "../../store/expenses-context";
import Button from "../UI/Button";
import Input from "./Input";
import { getDate } from "../../helpers/date";
import { Colors } from "../../constants/styles";

type inputIdentifiers = "amount" | "date" | "description";

interface expense {
  amount: number;
  date: Date;
  description: string;
}

interface Props {
  expenseID?: string;
  isEditing: boolean;
  cancelHandler: () => void;
  onSubmit: (expenseData: expense) => void;
}

const ExpenseForm: FC<Props> = ({
  expenseID,
  isEditing,
  cancelHandler,
  onSubmit,
}) => {
  const ctx = useContext(ExpensesContext);
  const selectedExpense = ctx.expensesArray.find(
    (expense) => expense.id === expenseID
  );

  const [inputs, setInputs] = useState({
    amount: {
      isValid: true,
      value: selectedExpense ? selectedExpense.amount.toString() : "",
    },
    date: {
      isValid: true,
      value: selectedExpense ? getDate(selectedExpense.date) : "",
    },
    description: {
      isValid: true,
      value: selectedExpense ? selectedExpense.description : "",
    },
  });

  const inputChangeHandler = (
    inputIdentifier: inputIdentifiers,
    enteredValue: string
  ) => {
    setInputs((state) => ({
      ...state,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((state) => {
        return {
          amount: {
            value: state.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: state.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: state.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formStyle}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Input is invalid. Please check your inputs.
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  formStyle: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
});
