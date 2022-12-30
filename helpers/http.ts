import axios from "axios";
import { Expense } from "../components/ExpensesOutput/ExpensesOutput";
import { expense } from "../screens/ManageExpense";
import { ExpenseData } from "../store/expenses-context";

const BACKEND_URL =
  "https://native-features-project-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData: expense) => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses: Expense[] = [];
  for (const key in response.data) {
    const expenseData: Expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseData);
  }
  return expenses;
};

export const updateExpense = async (id: string, expenseData: ExpenseData) => {
  const response = await axios.put(
    `${BACKEND_URL}/expenses/${id}.json`,
    expenseData
  );
  return response;
};

export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
  return response;
};
