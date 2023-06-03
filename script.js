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

  var lotTable = document.querySelector("#interface2 table:last-of-type");

  var newRow = lotTable.insertRow();
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);

  cell1.innerHTML = entreprise;
  cell2.innerHTML = htva;
  cell3.innerHTML = classement;
  cell4.innerHTML = '<button class="deleteButton">Supprimer</button>';

  attachDeleteEvent();

  document.getElementById("entrepriseInput").value = "";
  document.getElementById("htvaInput").value = "";
  document.getElementById("classementInput").value = "";
  document.getElementById("lotForm").style.display = "none";
});

function attachDeleteEvent() {
  var deleteButtons = document.getElementsByClassName("deleteButton");

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function() {
      var row = this.parentNode.parentNode;
      row.parentNode.removeChild(row);
    });
  }
}

document.getElementById("averageButton").addEventListener("click", function() {
  var lotCount = document.getElementsByClassName("lotTable").length;
  var totalHTVA = 0;

  for (var i = 1; i <= lotCount; i++) {
    var lotTable = document.getElementById("lotTable" + i);
    var rows = lotTable.getElementsByTagName("tr");

    for (var j = 1; j < rows.length; j++) {
      var htva = parseFloat(rows[j].cells[1].innerHTML);
      totalHTVA += htva;
    }
  }

  var averageHTVA = totalHTVA / (lotCount > 0 ? lotCount : 1);
  alert("La moyenne des offres HTVA est de: " + averageHTVA.toFixed(2));
});

document.getElementById("addLotButton").addEventListener("click", function() {
  var lotCount = document.getElementsByClassName("lotTable").length;
  var newLotNumber = lotCount + 2;

  var lotNumberHeading = document.createElement("h2");
  lotNumberHeading.innerHTML = "Lot numéro " + newLotNumber;

  var newLotTable = document.createElement("table");
  newLotTable.className = "lotTable";
  newLotTable.innerHTML = '<tr><th>Entreprise</th><th>Montant HTVA</th><th>Classement</th><th>Actions</th></tr>';

  var interface2 = document.getElementById("interface2");
  interface2.appendChild(lotNumberHeading);
  interface2.appendChild(newLotTable);

  attachDeleteEvent();
});