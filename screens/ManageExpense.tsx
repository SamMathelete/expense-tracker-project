import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

type RootParamsList = {
  ManageExpenses?: {
    expenseID: string;
  };
};

interface expense {
  amount: number;
  date: Date;
  description: string;
}

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

  const confirmHandler = (expenseData: expense) => {
    if (isEditing) {
      ctx.updateExpense(expenseID, expenseData);
    } else {
      ctx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        expenseID={expenseID}
        isEditing={isEditing}
        cancelHandler={cancelHandler}
        onSubmit={confirmHandler}
      />

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
    marginTop: 40,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
