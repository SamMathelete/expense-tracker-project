import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

type RootParamsList = {
  ManageExpenses?: {
    expenseID: string;
  };
};

type Props = BottomTabScreenProps<RootParamsList, "ManageExpenses">;

const ManageExpense: FC<Props> = ({ navigation, route }) => {
  const expenseID = route.params?.expenseID;
  const isEditing = !!expenseID;
  const title = isEditing ? "Edit" : "Add";

  const ctx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${title} Expense`,
    });
  }, [navigation, isEditing, title]);

  const deleteHandler = () => {
    ctx.removeExpense(expenseID!);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    const DUMMY_UPDATE = {
      description: "Test",
      amount: 420.69,
      date: new Date(),
    };
    if (isEditing) {
      ctx.updateExpense(expenseID, DUMMY_UPDATE);
    } else {
      ctx.addExpense(DUMMY_UPDATE);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            onPress={deleteHandler}
            color={Colors.error500}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
