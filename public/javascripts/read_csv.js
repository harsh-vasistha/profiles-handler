var fields = [];
var profiles = [];
var data = {};
var isFromOrg = false;

function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        $("#loader").show();
        $("#fileUpload").attr('disabled', 'disabled');
        $("#upload").attr('disabled', 'disabled');
        window.profilePermissions = {};
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                readCsvPermissions(e.target.result);
                loadTable();
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV or a profile file.");
    }
}

function loadTable() {
    $('#file-handler').hide();
    var template = $('#profileTable').html();
    var table = {};
    table.fields = fields;
    table.profiles = profiles;
    var html = Mustache.to_html(template, table);
    $('#profile-action-handler').html(html);
    setCurrentValues();
    pagination();
    $('#profile-action-row').show();

    $('#profile-action-filter-action').show();
    $('#profile-action-pagination').show();
}

function readCsvPermissions(targetResult) {
    var rows = targetResult.split("\n");
    if (rows.length > 0) {
        profiles = trimArray(rows[0].split(','));
        profiles.shift();
        rows.shift();
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(",");
            if (cells.length > 0 && cells[0] != '') {
                var field = cells[0].trim();
                fields.push(field);
                cells.shift();
                cells = trimArray(cells);
                var permissions = {};
                for (var j = 0; j < cells.length; j++) {
                    permissions[profiles[j]] = cells[j];
                }
                data[field] = permissions;
            }
        }
    }
}

function setCurrentValues() {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        for (var j = 0; j < profiles.length; j++) {
            var profile = profiles[j];
            $("." + field + " ." + profile + "  select").val(data[field][profile]);
        }
    }
}