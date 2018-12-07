$(document).ready(function () {
    $('#adminData').DataTable({
      "serverSide": true,
      "ajax": "/admin/getWard",
      "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
      "columns": [
        { 'data': 'ward_id'},
        { 'data': 'name' },
        { 'data': 'bed_count' },
        { 'data': 'class' }
        ]
    })
  });