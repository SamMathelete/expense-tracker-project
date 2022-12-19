import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

interface Expense {
  description: string;
  date: Date;
  amount: number;
  id: string;
}

interface Props {
  expenses: Expense[];
  periodName: string;
}

const ExpensesSummary: FC<Props> = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce<number>(
    (sum, expense) => sum + expense.amount,
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: Colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
