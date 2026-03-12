let records = [];
let editingIndex = -1;

window.onload = function() {
  const saved = localStorage.getItem('js2_records');
  if (saved) {
    records = JSON.parse(saved);
  }
  renderTable();
}

function insertRecord() {
  const firstName = document.getElementById('firstName').value.trim();
  const middleName = document.getElementById('middleName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const age = document.getElementById('age').value.trim();

  if (firstName === '' || lastName === '' || age === '') {
    alert('Please fill in First Name, Last Name, and Age.');
    return;
  }

  const record = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    age: age
  };

  if (editingIndex >= 0) {
    records[editingIndex] = record;
    editingIndex = -1;
    document.getElementById('insertBtn').textContent = 'Insert';
  } else {
    records.push(record);
  }

  clearForm();
}

function clearForm() {
  document.getElementById('firstName').value = '';
  document.getElementById('middleName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('age').value = '';
  editingIndex = -1;
  document.getElementById('insertBtn').textContent = 'Insert';
  renderTable();
}

function deleteRecord(i) {
  records.splice(i, 1);
  renderTable();
}

function editRecord(i) {
  editingIndex = i;
  document.getElementById('firstName').value = records[i].firstName;
  document.getElementById('middleName').value = records[i].middleName;
  document.getElementById('lastName').value = records[i].lastName;
  document.getElementById('age').value = records[i].age;
  document.getElementById('insertBtn').textContent = 'Update';
}

function clearRecords() {
  records = [];
  editingIndex = -1;
  localStorage.removeItem('js2_records');
  clearForm();
}

function saveToLocal() {
  localStorage.setItem('js2_records', JSON.stringify(records));
  alert('Data saved to local storage!');
}

function sortRecords() {
  const field = document.getElementById('sortField').value;
  const order = document.getElementById('sortOrder').value;

  if (field === '') return;

  records.sort(function(a, b) {
    let va = a[field].toLowerCase();
    let vb = b[field].toLowerCase();
    if (va < vb) return order === 'asc' ? -1 : 1;
    if (va > vb) return order === 'asc' ? 1 : -1;
    return 0;
  });

  renderTable();
}

function renderTable() {
  const container = document.getElementById('recordsContainer');

  if (records.length === 0) {
    container.innerHTML = '<span style="color:red;">No Records...</span>';
    return;
  }

  let html = '<table border="1" cellpadding="5" cellspacing="0">';
  html += '<tr><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Age</th><th>Action</th></tr>';

  for (let i = 0; i < records.length; i++) {
    html += '<tr>';
    html += '<td>' + records[i].firstName + '</td>';
    html += '<td>' + records[i].middleName + '</td>';
    html += '<td>' + records[i].lastName + '</td>';
    html += '<td>' + records[i].age + '</td>';
    html += '<td>';
    html += '<button onclick="deleteRecord(' + i + ')">Delete</button>';
    html += '<button onclick="editRecord(' + i + ')">Edit</button>';
    html += '</td>';
    html += '</tr>';
  }

  html += '</table>';
  container.innerHTML = html;
}

document.getElementById('insertBtn').addEventListener('click', function() {
  insertRecord();
});

document.getElementById('clearBtn').addEventListener('click', function() {
  clearForm();
});

document.getElementById('clearRecordsBtn').addEventListener('click', function() {
  clearRecords();
});

document.getElementById('saveBtn').addEventListener('click', function() {
  saveToLocal();
});

document.getElementById('sortField').addEventListener('change', function() {
  sortRecords();
});

document.getElementById('sortOrder').addEventListener('change', function() {
  sortRecords();
});