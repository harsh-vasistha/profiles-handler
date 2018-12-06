var row_count = 10;
var rows_offset = 0;

function pagination() {
    show_table();
    set_pagination_footer();
}

function change_row_count(elem) {
    row_count = parseInt($(elem).children("option:selected").val().trim());
    rows_offset = 0;
    //show_all();
    show_table();
    set_pagination_footer();
}

function change_offset(element) {
    $('#profile-action-pagination .pagination .active').removeClass('active');
    $(element).addClass('active');
    rows_offset = parseInt($(element).html().trim()) - 1;
    //show_all();
    show_table();
}

function show_all() {
    var table_tr = $('.pagination-table tbody tr');
    for (var i in table_tr) {
        
    }
}

function show_table() {
    var table_tr = $('.pagination-table tbody tr');
    var skipCount = row_count * rows_offset;
    var iterator_count = 0
    for (var i = 0; i < table_tr.length; i++ ) {
        if (i >= skipCount && iterator_count < row_count) {
            $(table_tr[i]).show();
            iterator_count++;
        } else {
            console.log(i);
            $(table_tr[i]).hide();
        }
    }
}

function set_pagination_footer() {
    var table_footer_html = '';
    var table_tr_count = $('.pagination-table tbody tr').length;
    var footer_count = table_tr_count / row_count;
    footer_count = table_tr_count % row_count == 0 ? footer_count : footer_count + 1;
    for (var i = 1; i <= footer_count; i++) {
        table_footer_html += ('<li><a class="' + (i == 1 ? 'active' : '' )+ '" href="#" onclick="change_offset(this)">' + i + '</a></li>');
    }
    $('#profile-action-pagination .pagination').html(table_footer_html);
}