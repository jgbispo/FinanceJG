const dummyTransaction = [
  { id: 1, name: "Sálario", ammout: 695.0 },
  { id: 2, name: "Passagem GVBus", ammout: -160.0 },
  { id: 3, name: "ICloud", ammout: -3.5 },
  { id: 4, name: "Wizard", ammout: -135.0 },
];

// Atualizando a DOM
const transactionUL = document.querySelector("#transactions");

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
  <button class="delete-btn">x</button>`;

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
  const transactionAmounts = dummyTransaction.map(
    (transaction) => transaction.ammout
  );
  const sum = sumArray(transactionAmounts);

  // Atualizando os Incomes
  const incomeList = transactionAmounts.filter((ammout) => ammout > 0);
  const income = sumArray(incomeList);

  // Atualizando os Expenses
  const expenseList = transactionAmounts.filter((ammout) => ammout < 0);
  const expense = sumArray(expenseList);

  //Atualizando a UI
  balance.innerHTML = sum < 0 ? `- R$${Math.abs(sum)}` : `R$${sum}`;
  incomeUI.innerHTML = `+ R$${income}`;
  expenseUI.innerHTML = `- R$${expense}`;
};

// Iniciando a aplicação
const init = () => {
  dummyTransaction.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();
