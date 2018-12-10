$(document).ready(function () {
  var table = $('#example').DataTable();
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getAdmin",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'admin_id'},
        { 'data': 'name' },
        { 'data': 'cell_no' },
        { 'data': 'cnic_no' },
        { 'data': 'gender' },
        { 'data': 'email' }
      ]
    })
  });