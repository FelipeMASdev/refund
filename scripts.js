//selecting elements in the DOM
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const cateory = document.getElementById("category");

const expenseList = document.querySelector("ul");
const numberOfExpenses = document.querySelector("aside header p span");
const totalExpense = document.querySelector("aside header h2");


//validating the amount input field 
amount.oninput =  () => {
  let value = amount.value.replace(/\D/g, "");
  value = Number(value) / 100;
  amount.value = formatCurrencyBRL(value);
};

//formatting the value to BRL currency
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
};

//Capturing the form submit event and creating a object with the form data
form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: cateory.value,
    category_name: cateory.options[cateory.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  addExpense(newExpense);
};

//function to add the new expense to the list
function addExpense(newExpense) {
  try{
    //List item
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //icon
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //expense name and category
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    expenseInfo.append(expenseName, expenseCategory);

    //expense amount
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = 
      `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`;

    //remove icon
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Remover despesa");

    //organizing the elements in the DOM
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);

    //clear form fields
    formClear();

    //update total expense
    updateTotal();

  }catch(e){
    alert("não foi possível atualizar a lista de despesas");
    console.log(e);
  }
}

//function to update the total expense
function updateTotal() {
  try{
    const items = Array.from(expenseList.children);

    numberOfExpenses.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;

    items.forEach(element => {
      const itemAmount = element.querySelector(".expense-amount").textContent;
      
      let value = itemAmount.replace(/[^\d,]/g, "").replace(",", ".");
      value = parseFloat(value);
      
      if(isNaN(value)) {
        return alert(
          "Não foi possível calcular a despesa total. O valor parece estar em um formato inválido."
        );
      };

      total += Number(value);
    });

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
    totalExpense.innerHTML = `<small>R$</small>${total}`;

  } catch(e){
    console.log(e);
    alert("não foi possível atualizar o total de despesas");
  }
}

//capturing click event on the list items, checking the target was the remove icon and removing the item
expenseList.addEventListener("click", function(event) {
  if(event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense");
    item.remove();
  };
  updateTotal();
});

//function to clear form fields and set focus on the first input
function formClear() {
  expense.value = "";
  amount.value = "";
  cateory.value = "";

  expense.focus();
}