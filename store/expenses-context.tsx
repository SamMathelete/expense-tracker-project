import { createContext, FC, useReducer } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

interface ExpenseData {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

interface context {
  expensesArray: Expense[];
  addExpense: (expense: ExpenseData) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, expense: ExpenseData) => void;
}

interface Props {
  children: React.ReactNode;
}

interface action {
  type: string;
  value: ExpenseData;
}

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Yet Another book",
    amount: 18.59,
    date: new Date("2022-06-18"),
  },
  {
    id: "e7",
    description: "Yet Another book!",
    amount: 18.59,
    date: new Date("2022-12-19"),
  },
];

const initialContext: context = {
  expensesArray: [],
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
};

export const ExpensesContext = createContext<context>(initialContext);

const expensesReducer = (state: Expense[], action: action): Expense[] => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.value }, ...state];
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.value.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.value };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.value.id);
    default:
      return state;
  }
};

const ExpensesContextProvider: FC<Props> = ({ children }) => {
  const [expensesState, dispatchFn] = useReducer(
    expensesReducer,
    DUMMY_EXPENSES
  );

  const addExpenseData = (expenseData: ExpenseData) => {
    dispatchFn({ type: "ADD", value: expenseData });
  };

  const updateExpenseData = (id: string, expenseData: ExpenseData) => {
    dispatchFn({ type: "UPDATE", value: { id: id, ...expenseData } });
  };
  const deleteExpenseData = (id: string) => {
    const expenseData: ExpenseData = {
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
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
