$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getDoctor",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'name' },
        { 'data': 'cell_no' },
        { 'data': 'cnic_no' },
        { 'data': 'gender' }
      ]
    })
  });