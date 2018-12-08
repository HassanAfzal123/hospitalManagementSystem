$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getHomeService",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'first_name'},
        { 'data': 'last_name' },
        { 'data': 'description' },
        { 'data': 'Status' },
        { 'data': 'name' },
        { 'data': 'cell_no' }
      ]
    })
  });