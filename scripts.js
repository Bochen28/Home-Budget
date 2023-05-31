document.addEventListener("DOMContentLoaded", () => {
  const revenueBox = document.querySelector("#revenueList");
  const revenueName = document.querySelector("#revenueName");
  const revenueCount = document.querySelector("#revenueCount");
  const revenueButton = document.querySelector("#addRevenue");
  const expenseBox = document.querySelector("#expenseList");
  const expenseName = document.querySelector("#expenseName");
  const expenseCount = document.querySelector("#expenseCount");
  const expenseButton = document.querySelector("#addExpense");

  const revenueList = [];
  const expenseList = [];

  function addRevenue(event) {
    event.preventDefault();

    if (revenueName.value !== '' && revenueCount.value > 0) {
      const newRevenue = {
        name: revenueName.value,
        count: parseFloat(revenueCount.value).toFixed(2),
      };
      revenueList.push(newRevenue);
      loadRevenueList();
      revenueName.value = "";
      revenueCount.value = "";
      updateBudgetStatus();
    } else {
      alert("Wprowadzone dane są niepoprawne");
    }
  }

  function addExpense(event) {
    event.preventDefault();

    if (expenseName.value !== '' && expenseCount.value > 0) {
      const newExpense = {
        name: expenseName.value,
        count: parseFloat(expenseCount.value).toFixed(2),
      };
      expenseList.push(newExpense);
      loadExpenseList();
      expenseName.value = "";
      expenseCount.value = "";
      updateBudgetStatus();
    } else {
      alert("Wprowadzone dane są niepoprawne")
    }
  }

  function loadRevenueList() {
    revenueBox.innerHTML = "";

    revenueList.forEach((item, index) => {
      const listItem = document.createElement("li");
      const nameElement = document.createElement("span");
      const countElement = document.createElement("span");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      listItem.classList.add("dataListItem");
      nameElement.textContent = item.name;
      countElement.textContent = item.count + "zł";
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";

      editButton.classList.add("editButton");
      deleteButton.classList.add("deleteButton");

      listItem.appendChild(nameElement);
      listItem.appendChild(countElement);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      deleteButton.addEventListener("click", () => {
        revenueList.splice(index, 1);
        loadRevenueList();
        updateBudgetStatus();
      });

      editButton.addEventListener("click", () => {
        const newName = prompt("Podaj nową nazwę:", item.name);
        const newCount = prompt("Podaj nową kwotę:", item.count);

        if (newName && newCount && newCount > 0) {
          item.name = newName;
          item.count = parseFloat(newCount).toFixed(2);
          loadRevenueList();
          loadExpenseList();
          updateBudgetStatus();
        } else {
          alert("Wprowadzone dane są niepoprawne");
        }
      });

      revenueBox.appendChild(listItem);
    });
  }

  function loadExpenseList() {
    expenseBox.innerHTML = "";

    expenseList.forEach((item, index) => {
      const listItem = document.createElement("li");
      const nameElement = document.createElement("span");
      const countElement = document.createElement("span");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      listItem.classList.add("dataListItem");
      nameElement.textContent = item.name;
      countElement.textContent = item.count + "zł";
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";

      editButton.classList.add("editButton");
      deleteButton.classList.add("deleteButton");

      listItem.appendChild(nameElement);
      listItem.appendChild(countElement);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      deleteButton.addEventListener("click", () => {
        expenseList.splice(index, 1);
        loadExpenseList();
        updateBudgetStatus();
      });

      editButton.addEventListener("click", () => {
        const newName = prompt("Enter new name:", item.name);
        const newCount = prompt("Enter new count:", item.count);

        if (newName && newCount && newCount > 0) {
          item.name = newName;
          item.count = parseFloat(newCount).toFixed(2);
          loadRevenueList();
          loadExpenseList();
          updateBudgetStatus();
        } else {
          alert("Wprowadzone dane są niepoprawne");
        }
      });
      expenseBox.appendChild(listItem);
    });
  }

  function updateBudgetStatus() {
    const totalRevenue = revenueList.reduce(
      (total, revenue) => total + parseFloat(revenue.count),
      0
    );

    const totalExpense = expenseList.reduce(
      (total, expense) => total + parseFloat(expense.count),
      0
    );

    const balance = totalRevenue.toFixed(2) - totalExpense.toFixed(2);
    const budgetCount = document.querySelector("#budgetCount");

    if (balance > 0) {
      budgetCount.textContent = "Możesz jeszcze wydać " + balance.toFixed(2) + " zł";
    } else if (balance < 0) {
      budgetCount.textContent =
        "Bilans jest ujemny. Jesteś na minusie " + Math.abs(balance).toFixed(2) + " zł";
    } else {
      budgetCount.textContent = "Bilans wynosi zero";
    }
  }

  revenueButton.addEventListener("click", addRevenue);
  expenseButton.addEventListener("click", addExpense);
});
