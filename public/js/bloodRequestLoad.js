$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getBloodRequest",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'first_name'},
        { 'data': 'last_name' },
        { 'data': 'cell_no' },
        { 'data': 'blood_group' },
        { 'data': 'status' },
        { 'data': 'name' },
        { 'data': 'number' }
      ]
    })
  });