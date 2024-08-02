import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A first expense",
    amount: 19.99,
    date: new Date("2022-05-24"),
  },
  {
    id: "e2",
    description: "A second expense",
    amount: 29.99,
    date: new Date("2023-01-12"),
  },
  {
    id: "e3",
    description: "A third expense",
    amount: 99.99,
    date: new Date("2024-03-24"),
  },
  {
    id: "e4",
    description: "A fourth expense",
    amount: 69.99,
    date: new Date("2024-08-24"),
  },
  {
    id: "e5",
    description: "An expense",
    amount: 69.99,
    date: new Date("2017-12-04"),
  },
  {
    id: "e6",
    description: "A first expense",
    amount: 19.99,
    date: new Date("2022-05-24"),
  },
  {
    id: "e7",
    description: "A second expense",
    amount: 29.99,
    date: new Date("2023-01-12"),
  },
  {
    id: "e8",
    description: "A third expense",
    amount: 99.99,
    date: new Date("2024-03-24"),
  },
  {
    id: "e9",
    description: "A fourth expense",
    amount: 69.99,
    date: new Date("2024-08-24"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      //also generate new id for expense
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  //the empty array is the initial state value, which I replaced with the DUMMY_EXPENSES array
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpenses = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpenses,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
