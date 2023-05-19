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
  
    var table = document.getElementById("lotTable");
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
  
    cell1.innerHTML = entreprise;
    cell2.innerHTML = htva;
    cell3.innerHTML = classement;
    cell4.innerHTML = '<button class="deleteButton">Delete</button>';
    cell5.innerHTML = '<button class="editButton">Edit</button>';
  
    attachDeleteEvent();
    attachEditEvent();
  
    document.getElementById("entrepriseInput").value = "";
    document.getElementById("htvaInput").value = "";
    document.getElementById("classementInput").value = "";
    document.getElementById("lotForm").style.display = "none";
  });
  
  function attachDeleteEvent() {
    var deleteButtons = document.getElementsByClassName("deleteButton");
  
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this lot?")) {
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
  
  attachDeleteEvent();
  attachEditEvent();
  