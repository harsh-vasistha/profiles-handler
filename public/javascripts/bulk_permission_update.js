var selectClass = 'profile-select';

function update_bulk_permission(element) {
    var bulk_value = $(element).children("option:selected").val();
    var cells = $('td.' + selectClass + ' select');
    for (var i = 0; i < cells.length; i++) {
        $(cells[i]).val(bulk_value);
        $(cells[i]).parent().removeClass(selectClass);
    }
    $(element).val('0');
    $('#bulk_permission_update').hide();
}

function select_td_component(elem) {
    if ($(elem).hasClass('field')) {
        var siblingsTd = $(elem).siblings();
        for (var i = 0; i < siblingsTd.length; i++) {
            if (!$(siblingsTd[i]).hasClass('field'))
                if ($(siblingsTd[i]).hasClass(selectClass)) {
                    $(siblingsTd[i]).removeClass(selectClass)
                } else {
                    $(siblingsTd[i]).addClass(selectClass)
                }
        }
    } else {
        if ($(elem).hasClass(selectClass)) {
            $(elem).removeClass(selectClass)
        } else {
            $(elem).addClass(selectClass)
        }
    }
    active_inactive_buld_update();
}

function select_th_component(elem) {
    if ($(elem).hasClass('profile')) {
        var profile = $(elem).html().trim();
        var profile_td = $('td.'+profile);
        for (var i = 0; i < profile_td.length; i++) {
            if (!$(profile_td[i]).hasClass('field'))
                if ($(profile_td[i]).hasClass(selectClass)) {
                    $(profile_td[i]).removeClass(selectClass)
                } else {
                    $(profile_td[i]).addClass(selectClass)
                }
        }
    }
    active_inactive_buld_update();
}

function active_inactive_buld_update(){
    if ($('.' + selectClass).length > 0) {
        $('#bulk_permission_update').show();
    } else {
        $('#bulk_permission_update').hide();
    }
}