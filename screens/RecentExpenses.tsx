import { FC } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

interface Expense {
  description: string;
  date: Date;
  amount: number;
  id: string;
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
];

const RecentExpenses: FC = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Last 7 Days" />;
};

export default RecentExpenses;
