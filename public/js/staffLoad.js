$(document).ready(function () {
    $('#staffData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getStaff",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'staff_id'},
        { 'data': 'name' },
        { 'data': 'cell_no' },
        { 'data': 'cnic_no' },
        { 'data': 'gender' },
        { 'data': 'email' }
      ]
    })
  });