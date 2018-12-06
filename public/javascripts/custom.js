$(document).ready(function () {
    //$('input[type=radio][name=inputType]').change(inputTypeChange);
    $('#profile-action-row').hide();
    $('#profile-action-filter-action').hide();
    $('#profile-action-pagination').hide();
    $('#bulk_permission_update').hide();
    $('#fileUpload').on('change', function () {
        var fileName = $(this).val();
        fileName = fileName.split('\\');
        fileName = fileName[fileName.length - 1]
        $(this).next('.custom-file-label').html(fileName);
    });
});

function trimArray(stringArray) {
    var trimmedArray = [];
    for (var arrVal in stringArray) {
        trimmedArray.push(stringArray[arrVal].trim())
    }
    return trimmedArray;
}

function permissionChange(element) {
    var profile = $(element).parent().attr('class');
    var field = $(element).parent().parent().attr('field');
    window.table.data[field][profile] = $(element).children("option:selected").val();
}