//selecting elements in the DOM
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const cateory = document.getElementById("category");


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
  }
  console.log(newExpense);
};