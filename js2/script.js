let isLoaded = false;

function loadData() {
  if (isLoaded) {
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      isLoaded = true;

      let html = '<table border="1" cellpadding="5" cellspacing="0">';
      html += '<tr>';
      html += '<th>User ID</th>';
      html += '<th>Task ID</th>';
      html += '<th>Title</th>';
      html += '<th>Status</th>';
      html += '</tr>';

      for (let i = 0; i < data.length; i++) {
        let status = '';
        if (data[i].completed === true) {
          status = '<span style="color:green;"><strong>Completed</strong></span>';
        } else {
          status = '<span style="color:red;"><strong>Not yet Completed</strong></span>';
        }

        html += '<tr>';
        html += '<td>' + data[i].userId + '</td>';
        html += '<td>' + data[i].id + '</td>';
        html += '<td>' + data[i].title + '</td>';
        html += '<td>' + status + '</td>';
        html += '</tr>';
      }

      html += '</table>';
      document.getElementById('tableContainer').innerHTML = html;
    });
}

function clearTable() {
  isLoaded = false;
  document.getElementById('tableContainer').innerHTML = '';
}

document.getElementById('btnLoad').addEventListener('click', function() {
  loadData();
});

document.getElementById('btnClear').addEventListener('click', function() {
  clearTable();
});