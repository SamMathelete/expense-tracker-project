import { FC } from "react";
import { FlatList, ListRenderItemInfo, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

interface Expense {
  description: string;
  date: Date;
  amount: number;
  id: string;
}

interface Props {
  expenses: Expense[];
}

const renderExpenseItem = (itemData: ListRenderItemInfo<Expense>) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList: FC<Props> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
