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

    if (revenueCount.value <= 0) {
      alert("Kwota musi być większa od zera");
    } else if (revenueName.checkValidity() && revenueCount.checkValidity()) {
      const newRevenue = { name: revenueName.value, count: revenueCount.value };
      revenueList.push(newRevenue);
      console.log(revenueList);
      loadRevenueList();
      revenueName.value = "";
      revenueCount.value = "";
      updateBudgetStatus();
    } else {
      alert("Wypełnij wszystkie pola");
    }
  }

  function addExpense(event) {
    event.preventDefault();

    if (expenseCount.value <= 0) {
      alert("Kwota musi być większa od zera");
    } else if (expenseName.checkValidity() && expenseCount.checkValidity()) {
      const newExpense = { name: expenseName.value, count: expenseCount.value };
      expenseList.push(newExpense);
      console.log(expenseList);
      loadExpenseList();
      expenseName.value = "";
      expenseCount.value = "";
      updateBudgetStatus();
    } else {
      alert("Wypełnij wszystkie pola");
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
        const newName = prompt("Enter new name:", item.name);
        const newCount = prompt("Enter new count:", item.count);

        if (newName && newCount) {
          item.name = newName;
          item.count = newCount;
          loadRevenueList();
          updateBudgetStatus();
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

        if (newName && newCount) {
          item.name = newName;
          item.count = newCount;
          loadExpenseList();
          updateBudgetStatus();
        }
      });

      expenseBox.appendChild(listItem);
    });
  }

  function updateBudgetStatus() {
    const totalRevenue = revenueList.reduce(
      (total, revenue) => total + parseInt(revenue.count),
      0
    );

    const totalExpense = expenseList.reduce(
      (total, expense) => total + parseInt(expense.count),
      0
    );

    const balance = totalRevenue - totalExpense;
    const budgetCount = document.querySelector("#budgetCount");

    if (balance > 0) {
      budgetCount.textContent = "Możesz jeszcze wydać " + balance + " złotych";
    } else if (balance < 0) {
      budgetCount.textContent =
        "Bilans jest ujemny. Jesteś na minusie " +
        Math.abs(balance) +
        " złotych";
    } else {
      budgetCount.textContent = "Bilans wynosi zero";
    }
  }

  revenueButton.addEventListener("click", addRevenue);
  expenseButton.addEventListener("click", addExpense);
});
