import { FC, useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

interface Expense {
  description: string;
  date: Date;
  amount: number;
  id: string;
}

const AllExpenses: FC = () => {
  const ctx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={ctx.expensesArray}
      periodName="Total"
      fallbackText="No Registered Expenses Found."
    />
  );
};

export default AllExpenses;
