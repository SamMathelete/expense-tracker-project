import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Colors } from "../constants/styles";
import { deleteExpense, storeExpense, updateExpense } from "../helpers/http";
import { ExpensesContext } from "../store/expenses-context";

type RootParamsList = {
  ManageExpenses?: {
    expenseID: string;
  };
};

export interface expense {
  amount: number;
  date: Date;
  description: string;
}

type Props = BottomTabScreenProps<RootParamsList, "ManageExpenses">;

const ManageExpense: FC<Props> = ({ navigation, route }) => {
  const [isError, setIsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const expenseID = route.params?.expenseID;
  const isEditing = !!expenseID;
  const title = isEditing ? "Edit" : "Add";

  const ctx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${title} Expense`,
    });
  }, [navigation, isEditing, title]);

  const deleteHandler = async () => {
    setIsSubmitting((state) => true);
    try {
      await deleteExpense(expenseID!);
      ctx.removeExpense(expenseID!);
      navigation.goBack();
    } catch (error) {
      setIsError("Could Not Delete Expense. Please try again later.");
    }
    setIsSubmitting((state) => false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: expense) => {
    setIsSubmitting((state) => true);
    try {
      if (isEditing) {
        await updateExpense(expenseID, expenseData);
        ctx.updateExpense(expenseID, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        ctx.addExpense({ id: id, ...expenseData });
      }
      navigation.goBack();
    } catch (error) {
      setIsError("Could not Add/Update Expense. Please try again later.");
    }
    setIsSubmitting((state) => false);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const errorHandler = () => {
    setIsError(null);
  };

  if (isError && !isSubmitting) {
    return <ErrorOverlay message={isError} onConfirm={errorHandler} />;
  }

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
