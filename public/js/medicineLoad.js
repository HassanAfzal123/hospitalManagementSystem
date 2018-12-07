$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getMedicine",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'medicine_id'},
        { 'data': 'name' },
        { 'data': 'company' }
        ]
    })
  });