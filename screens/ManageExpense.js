import { StyleSheet, View } from "react-native";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  // ? checks if params is undefined, it is a conditional operator checks if params in whcih case we don't drill into it, if is defined we do drill into it - safe way of drilling into an object whcih may be undefined
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!!!",
        amount: 29.99,
        date: new Date("2024-08-02"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Tes",
        amount: 19.99,
        date: new Date("2024-07-31"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.buttonStyle} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
