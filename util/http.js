import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-193d0-default-rtdb.firebaseio.com/";

// add expenses to databaase
export const storeExpense = async (expenseData) => {
  //second argument is the data we want to send to the server
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  //this is the 'id' property that firebase adds to the object. they call it 'name' property
  const id = response.data.name;
  return id;
};

//get expenses from database upon loading
export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

//update expenses
export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

//delete expenses
export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
