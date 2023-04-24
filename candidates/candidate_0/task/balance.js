// The candidate will write the logic for the balance calculation page here
// Sample transaction data
const transactions = [
  { id: 1, date: "2023-04-10", amount: 50, paymentMethod: "Credit Card" },
  { id: 2, date: "2023-04-12", amount: 30, paymentMethod: "Cash" },
  { id: 3, date: "2023-04-15", amount: 120, paymentMethod: "Debit Card" },
  { id: 4, date: "2023-04-20", amount: 75, paymentMethod: "Credit Card" },
];

// Create a table displaying the transaction data
function createTransactionTable(transactions) {
  const table = document.createElement("table");
  table.classList.add("table");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Amount</th>
      <th>Payment Method</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  transactions.forEach(transaction => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.date}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.paymentMethod}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

// Render the transaction dashboard
function renderDashboard() {
  const container = document.createElement("div");
  container.classList.add("container");

  const title = document.createElement("h1");
  title.textContent = "Transaction Dashboard";
  container.appendChild(title);

  const table = createTransactionTable(transactions);
  container.appendChild(table);

  return container;
}

document.getElementById("app").appendChild(renderDashboard());
