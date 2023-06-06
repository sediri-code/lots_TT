let tableIndex = 1;
let isFirstTable = true;

function goToPage2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  addTable();
}

function addRow(tableId) {
  const table = document.getElementById(tableId);
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="text" name="entreprise_${tableIndex}"></td>
    <td><input type="number" name="montant_${tableIndex}"></td>
    <td><input type="text" name="classement_${tableIndex}"></td>
    <td>
      <button onclick="modifyRow(this)">Modifier</button>
      <button onclick="deleteRow(this)">Supprimer</button>
    </td>
  `;
  tableIndex++;
}

function calculateAverage(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName("tr");
  let total = 0;
  let count = 0;

  // Skip the first row (table header)
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (cells.length >= 2) {
      const montantInput = cells[1].querySelector("input[name^='montant_']");
      if (montantInput && montantInput.value !== "") {
        total += parseFloat(montantInput.value);
        count++;
      }
    }
  }

  if (count > 0) {
    const average = total / count;
    alert(`La moyenne des montants HTVA dans cette table est: ${average}`);
  } else {
    alert("Aucun montant HTVA n'a été saisi dans cette table.");
  }
}


function addTable() {
  const tableContainer = document.getElementById("table-container");
  const table = document.createElement("table");
  const newTableIndex = tableIndex;
  table.id = `data-table-${newTableIndex}`;

  if (isFirstTable) {
    table.innerHTML = `
      <thead>
        <tr>
          <th>Entreprise</th>
          <th>Montant HTVA</th>
          <th>Classement</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    isFirstTable = false;
  } else {
    table.innerHTML = `
      <tbody></tbody>
    `;
  }

  
  tableContainer.appendChild(table);
  const addRowButton = document.createElement("button");
  addRowButton.innerHTML = "Ajouter une Entreprise";
  addRowButton.onclick = function() {
    addRow(`data-table-${newTableIndex}`);
  };

  tableContainer.appendChild(addRowButton);
  addRow(`data-table-${newTableIndex}`);


 const calculateAverageButton = document.createElement("button");
  calculateAverageButton.innerHTML = "Calculer la moyenne";
  calculateAverageButton.onclick = function() {
    calculateAverage(`data-table-${newTableIndex}`);
    };  
  tableContainer.appendChild(calculateAverageButton);
}

function modifyRow(button) {
  const row = button.parentNode.parentNode;
  const inputs = row.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute("readonly");
  }
  button.innerHTML = "Sauvegarder";
  button.onclick = function() {
    saveRow(this);
  };
}

function saveRow(button) {
  const row = button.parentNode.parentNode;
  const inputs = row.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("readonly", true);
  }
  button.innerHTML = "Modifier";
  button.onclick = function() {
    modifyRow(this);
  };
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
