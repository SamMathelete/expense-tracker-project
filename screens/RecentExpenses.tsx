import { FC, useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../helpers/date";
import { ExpensesContext } from "../store/expenses-context";

interface Expense {
  description: string;
  date: Date;
  amount: number;
  id: string;
}

const RecentExpenses: FC = () => {
  const ctx = useContext(ExpensesContext);

  const expenses = ctx.expensesArray.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Last 7 Days"
      fallbackText="No Expenses Registered for the last 7 Days."
    />
  );
};

export default RecentExpenses;
