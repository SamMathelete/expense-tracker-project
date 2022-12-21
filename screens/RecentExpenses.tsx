import { FC, useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { getDateMinusDays } from "../helpers/date";
import { fetchExpenses } from "../helpers/http";
import { ExpensesContext } from "../store/expenses-context";

const RecentExpenses: FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const ctx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching((state) => true);
      try {
        const fetchedExpenses = await fetchExpenses();
        ctx.setExpenses(fetchedExpenses);
      } catch (error) {
        setIsError("Failed to fetch expenses!");
      }
      setIsFetching((state) => false);
    };
    getExpenses();
  }, []);

  const errorHandler = () => {
    setIsError(null);
    const getExpenses = async () => {
      setIsFetching((state) => true);
      try {
        const fetchedExpenses = await fetchExpenses();
        ctx.setExpenses(fetchedExpenses);
      } catch (error) {
        setIsError("Failed to fetch expenses!");
      }
      setIsFetching((state) => false);
    };
    getExpenses();
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (isError && !isFetching) {
    return <ErrorOverlay message={isError} onConfirm={errorHandler} />;
  }

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
