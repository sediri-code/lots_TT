document.getElementById("insertButton").addEventListener("click", function() {
  document.getElementById("interface1").style.display = "none";
  document.getElementById("interface2").style.display = "block";
});

document.getElementById("addButton").addEventListener("click", function() {
  document.getElementById("lotForm").style.display = "block";
});

document.getElementById("addForm").addEventListener("submit", function(e) {
  e.preventDefault();

  var entreprise = document.getElementById("entrepriseInput").value;
  var htva = document.getElementById("htvaInput").value;
  var classement = document.getElementById("classementInput").value;

  var lotTable = document.getElementById("lotTable" + lotCount);
  var newRow = lotTable.insertRow();
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  cell1.innerHTML = entreprise;
  cell2.innerHTML = htva;
  cell3.innerHTML = classement;
  cell4.innerHTML = '<button class="deleteButton">Supprimer</button>';
  cell5.innerHTML = '<button class="editButton">Modifier</button>';

  attachDeleteEvent();
  attachEditEvent();

  document.getElementById("entrepriseInput").value = "";
  document.getElementById("htvaInput").value = "";
  document.getElementById("classementInput").value = "";
});

function attachDeleteEvent() {
  var deleteButtons = document.getElementsByClassName("deleteButton");

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function() {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce lot ?")) {
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
      }
    });
  }
}

function attachEditEvent() {
  var editButtons = document.getElementsByClassName("editButton");

  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function() {
      var row = this.parentNode.parentNode;
      var cells = row.cells;

      document.getElementById("entrepriseInput").value = cells[0].innerHTML;
      document.getElementById("htvaInput").value = cells[1].innerHTML;
      document.getElementById("classementInput").value = cells[2].innerHTML;

      document.getElementById("lotForm").style.display = "block";
    });
  }
}

document.getElementById("averageButton").addEventListener("click", function() {
  var rows = document.getElementById("lotTable").rows;
  var sum = 0;

  for (var i = 1; i < rows.length; i++) {
    var htva = parseFloat(rows[i].cells[1].innerHTML);

    if (!isNaN(htva)) {
      sum += htva;
    }
  }

  var average = sum / (rows.length - 1);
  alert("Moyenne HTVA : " + average.toFixed(2));
});

var lotCount = 1;

document.getElementById("addLotButton").addEventListener("click", function() {
  if (lotCount >= 10) {
    alert("Vous avez atteint le nombre maximum de lots.");
    return;
  }

  lotCount++;

  var interface2 = document.getElementById("interface2");

  var newLot = document.createElement("div");
  newLot.id = "lot" + lotCount;

  var lotHeading = document.createElement("h2");
  lotHeading.textContent = "Lot numéro " + lotCount;
  newLot.appendChild(lotHeading);

  var lotTable = document.createElement("table");
  lotTable.id = "lotTable" + lotCount;
  var tableHeader = document.createElement("tr");
  tableHeader.innerHTML = "<th>Entreprise</th><th>Montant HTVA</th><th>Classement</th>";
  lotTable.appendChild(tableHeader);
  newLot.appendChild(lotTable);

  var addButton = document.createElement("button");
  addButton.id = "addButton" + lotCount;
  addButton.textContent = "Ajouter une Entreprise";
  newLot.appendChild(addButton);

  var averageButton = document.createElement("button");
  averageButton.id = "averageButton" + lotCount;
  averageButton.textContent = "Calculer la moyenne des offres";
  newLot.appendChild(averageButton);

  interface2.appendChild(newLot);

  attachAddEvent(lotCount);
  attachAverageEvent(lotCount);
});

function attachAddEvent(lotCount) {
  var addButton = document.getElementById("addButton" + lotCount);
  addButton.addEventListener("click", function() {
    var lotTable = document.getElementById("lotTable" + lotCount);
    var newRow = lotTable.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = document.getElementById("entrepriseInput").value;
    cell2.innerHTML = document.getElementById("htvaInput").value;
    cell3.innerHTML = document.getElementById("classementInput").value;
    cell4.innerHTML = '<button class="deleteButton">Supprimer</button>';
    cell5.innerHTML = '<button class="editButton">Modifier</button>';

    attachDeleteEvent();
    attachEditEvent();

    document.getElementById("entrepriseInput").value = "";
    document.getElementById("htvaInput").value = "";
    document.getElementById("classementInput").value = "";
    document.getElementById("lotForm").style.display = "none";
  });
}

function attachAverageEvent(lotCount) {
  var averageButton = document.getElementById("averageButton" + lotCount);
  averageButton.addEventListener("click", function() {
    var lotTable = document.getElementById("lotTable" + lotCount);
    var rows = lotTable.rows;
    var sum = 0;

    for (var i = 1; i < rows.length; i++) {
      var htva = parseFloat(rows[i].cells[1].innerHTML);

      if (!isNaN(htva)) {
        sum += htva;
      }
    }

    var average = sum / (rows.length - 1);
    alert("Moyenne HTVA pour le lot " + lotCount + ": " + average.toFixed(2));
  });
}

attachDeleteEvent();
attachEditEvent();

