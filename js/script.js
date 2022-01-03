const dummyTransaction = [
  { id: 1, name: "Sálario", ammout: 695.0 },
  { id: 2, name: "Passagem GVBus", ammout: -160.0 },
  { id: 3, name: "ICloud", ammout: -3.5 },
  { id: 4, name: "Wizard", ammout: -135.0 },
  { id: 5, name: "Wizard", ammout: -135.0 },
  { id: 6, name: "Wizard", ammout: -135.0 },
  { id: 7, name: "Wizard", ammout: -135.0 },
  { id: 8, name: "Wizard", ammout: -135.0 },
  { id: 9, name: "Wizard", ammout: -135.0 },
  { id: 10, name: "Wizard", ammout: -135.0 },
  { id: 11, name: "Wizard", ammout: -135.0 },
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
  li.innerHTML = `${transaction.name} <span>${operator} R$${Math.abs(transaction.ammout)}</span> 
  <button class="delete-btn">x</button>`;

  // Adicionando a UL
  transactionUL.prepend(li);
};

// Iniciando a aplicação

const init = () => {
  dummyTransaction.forEach(addTransactionIntoDOM);
}

init();