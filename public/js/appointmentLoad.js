$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getAppointment",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'name'},
        { 'data': 'first_name' },
        { 'data': 'last_name' },
        { 'data': 'cell_no' },
        { 'data': 'date' },
        { 'data': 'time' },
        { 'data': 'status' }
      ]
    })
  });