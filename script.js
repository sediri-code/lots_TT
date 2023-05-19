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
  
    var newRow = document.getElementById("lotTable").insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
  
    cell1.innerHTML = entreprise;
    cell2.innerHTML = htva;
    cell3.innerHTML = classement;
  
    document.getElementById("entrepriseInput").value = "";
    document.getElementById("htvaInput").value = "";
    document.getElementById("classementInput").value = "";
  });
  
  document.getElementById("lotTable").addEventListener("click", function(e) {
    if (e.target && e.target.matches("td")) {
      var cell = e.target;
      var row = cell.parentNode;
      var rowIndex = row.rowIndex;
  
      if (confirm("Are you sure you want to delete this lot?")) {
        document.getElementById("lotTable").deleteRow(rowIndex);
      }
    }
  });
  