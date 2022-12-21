import { createContext, FC, useReducer } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface ExpenseData {
  id?: string;
  amount: number;
  date: Date;
  description: string;
}

interface context {
  expensesArray: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, expense: ExpenseData) => void;
  setExpenses: (expenses: Expense[]) => void;
}

interface Props {
  children: React.ReactNode;
}

interface action {
  type: string;
  value?: ExpenseData | Expense;
  valueData?: Expense[];
}

const initialContext: context = {
  expensesArray: [],
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
  setExpenses: (expenses: Expense[]) => {},
};

export const ExpensesContext = createContext<context>(initialContext);

const expensesReducer = (state: Expense[], action: action): Expense[] => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.value! }, ...state];
    case "SET":
      const returnedArray = action.valueData!.reverse();
      return returnedArray;
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.value!.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.value };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.value!.id);
    default:
      return state;
  }
};

const ExpensesContextProvider: FC<Props> = ({ children }) => {
  const initialExpenses: Expense[] = [];

  const [expensesState, dispatchFn] = useReducer(
    expensesReducer,
    initialExpenses
  );

  const addExpenseData = (expenseData: Expense) => {
    dispatchFn({ type: "ADD", value: expenseData });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatchFn({ type: "SET", valueData: expenses });
  };

  const updateExpenseData = (id: string, expenseData: ExpenseData) => {
    dispatchFn({ type: "UPDATE", value: { id: id, ...expenseData } });
  };
  const deleteExpenseData = (id: string) => {
    const expenseData: Expense = {
      id: id,
      description: "",
      amount: 0,
      date: new Date(),
    };
    dispatchFn({ type: "DELETE", value: expenseData });
  };

  const value: context = {
    expensesArray: expensesState,
    addExpense: addExpenseData,
    removeExpense: deleteExpenseData,
    updateExpense: updateExpenseData,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
