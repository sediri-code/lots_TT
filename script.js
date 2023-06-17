let tableIndex = 1;

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
function deleteTable(tableId) {
  const tableContainer = document.getElementById("table-container");
  const table = document.getElementById(tableId);
  const tableHeading = document.querySelector(`h1[data-lot="${tableId}"]`);

  if (table && tableHeading) {
    tableContainer.removeChild(table);
    tableContainer.removeChild(tableHeading);
  }
}


function addTable() {
  const tableContainer = document.getElementById("table-container");
  const table = document.createElement("table");
  const newTableIndex = tableIndex;
  table.id = `data-table-${newTableIndex}`;

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>Entreprise</th>
    <th>Montant HTVA</th>
    <th>Classement</th>
    <th>Action</th>
  `;
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  tableContainer.appendChild(table);

  const tableHeading = document.createElement("h1");
  tableHeading.textContent = `Lot numéro ${newTableIndex}`;
  tableContainer.insertBefore(tableHeading, table);

  const addRowButton = document.createElement("button");
  addRowButton.innerHTML = "Ajouter une Entreprise";
  addRowButton.onclick = function () {
    addRow(`data-table-${newTableIndex}`);
  };
  tableContainer.appendChild(addRowButton);

  const calculateAverageButton = document.createElement("button");
  calculateAverageButton.innerHTML = "Calculer la moyenne";
  calculateAverageButton.onclick = function () {
    calculateAverage(`data-table-${newTableIndex}`);
  };
  tableContainer.appendChild(calculateAverageButton);

  addRow(`data-table-${newTableIndex}`);
}

function modifyRow(button) {
  const row = button.parentNode.parentNode;
  const inputs = row.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute("readonly");
  }
  button.innerHTML = "Sauvegarder";
  button.onclick = function () {
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
  button.onclick = function () {
    modifyRow(this);
  };
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function deleteLot(lotIndex) {
  const tableContainer = document.getElementById("table-container");
  const lotId = `data-table-${lotIndex}`;
  const lot = document.getElementById(lotId);
  const tableHeading = document.querySelector(`h1[data-lot="${lotId}"]`);

  if (lot && tableHeading) {
    tableContainer.removeChild(tableHeading);

    while (lot.firstChild) {
      lot.removeChild(lot.firstChild);
    }

    tableContainer.removeChild(lot);
  }
}



function generateBestScenario() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  const scenarioTableContainer = document.getElementById("scenario-table-container");
  scenarioTableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>N° du lot</th>
          <th>Entreprises</th>
          <th>Mt HTVA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lot n°1</td>
          <td>Olive</td>
          <td>200 000,000</td>
        </tr>
        <tr>
          <td>Lot n°2</td>
          <td>Pepper Event</td>
          <td>211 200,000</td>
        </tr>
        <tr>
          <td>Lot n°3</td>
          <td>Pepper Events</td>
          <td>67 250,000</td>
        </tr>
        <tr>
          <td>Lot n°4</td>
          <td>Tulip Event</td>
          <td>96 000,000</td>
        </tr>
        <tr>
          <td>Lot n°5</td>
          <td>Tulip Event</td>
          <td>70 000,000</td>
        </tr>
        <tr>
          <td>Lot n°6</td>
          <td>Prod'un jour</td>
          <td>81 600,000</td>
        </tr>
        <tr>
          <td>Lot n°7</td>
          <td>Olive</td>
          <td>80 000,000</td>
        </tr>
        <tr>
          <td>Lot n°8</td>
          <td>Prod'un jour</td>
          <td>101 200,000</td>
        </tr>
        <tr>
          <td>TOTAL HTVA</td>
          <td></td>
          <td>907 250,000</td>
        </tr>
      </tbody>
    </table>
  `;
}













