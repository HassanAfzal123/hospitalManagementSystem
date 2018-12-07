$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getDisease",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'disease_id'},
        { 'data': 'name' },
        { 'data': 'details' },
        { 'data': 'symptoms' }
        ]
    })
  });