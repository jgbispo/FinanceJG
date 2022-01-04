// LocalStorage
const localStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransaction : [];

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Atualizando a DOM
const transactionUL = document.querySelector("#transactions");
const inputName = document.querySelector("#text");
const inputAmount = document.querySelector("#amount");

const addTransactionIntoDOM = (transaction) => {
  // Verificando qual o tipo de operação
  const operator = transaction.ammout < 0 ? "-" : "+";

  // Verificando qual a classe que deve ser usada
  const CSSClass = operator == "+" ? "plus" : "minus";

  // Criando o li para adicionar na DOM
  const li = document.createElement("li");
  li.classList.add(CSSClass);
  li.innerHTML = `${transaction.name} <span>${operator} R$${Math.abs(
    transaction.ammout
  )
    .toFixed(2)
    .replace(".", ",")}</span> 
  <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>`;
  // Adicionando a UL
  transactionUL.prepend(li);
};

const sumArray = (array) => {
  return array
    .reduce((total, number) => total + number, 0)
    .toFixed(2)
    .replace(".", ",")
    .replace("-", "");
};

// Calculando o saldo final
const updateBalanceValues = () => {
  let balance = document.querySelector("#balance");
  let incomeUI = document.querySelector("#money-plus");
  let expenseUI = document.querySelector("#money-minus");

  // Fazendo o calculo
  const transactionAmounts = transactions.map(
    (transaction) => transaction.ammout
  );

  const sum = transactionAmounts.reduce((total, number) => total + number, 0);

  // Atualizando os Incomes
  const incomeList = transactionAmounts.filter((ammout) => ammout > 0);
  const income = sumArray(incomeList);

  // Atualizando os Expenses
  const expenseList = transactionAmounts.filter((ammout) => ammout < 0);
  const expense = sumArray(expenseList);

  //Atualizando a UI
  balance.innerHTML =
    sum < 0
      ? `- R$${Math.abs(sum).toFixed(2).replace(".", ",")}`
      : `R$${sum.toFixed(2).replace(".", ",")}`;
  incomeUI.innerHTML = `+ R$${income}`;
  expenseUI.innerHTML = `- R$${expense}`;
};

// Iniciando a aplicação
const init = () => {
  transactionUL.innerHTML = ``;
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

// Eventos dos botões
document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
});

init();

//gerando id
const generateID = (ammout) => Math.round(Math.random() * 1000 * ammout);

// Eventos dos botões
/*Adiocionar Novas transações*/
document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = inputName.value.trim();
  const amountValue = inputAmount.value.trim();

  const transaction = {
    id: generateID(+amountValue),
    name: nameValue,
    ammout: +amountValue,
  };

  transactions.push(transaction);
  init();
  updateLocalStorage();

  inputName.value = "";
  inputAmount.value = "";
});

/*Removendo transações*/
removeTransaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  updateLocalStorage();
  init();
};
