var starting = '<?xml version="1.0" encoding="UTF-8"?>\n<Profile xmlns="http://soap.sforce.com/2006/04/metadata">\n\t';
var permissionStart = '<fieldPermissions>';
var readPermission = '\n\t\t<editable>false</editable>\n\t\t<readable>true</readable>';
var readWritePermission = '\n\t\t<editable>true</editable>\n\t\t<readable>true</readable>';
var noPermission = '\n\t\t<editable>false</editable>\n\t\t<readable>false</readable>';
var permissionEnds = '\n\t</fieldPermissions>\n\t';
var ending = '</Profile>';
var fieldStart = '\n\t\t<field>'
var fieldEnd = '</field>';
window.profilePermissions = {}

function download_csv() {
    var csv = 'Fields,' + profiles.join(',') + '\n';
    var dataValue = [];
    for (var j = 0; j < fields.length; j++) {
        csv += fields[j];
        dataValue = []
        for (var i = 0; i < profiles.length; i++) {
            //console.log('.' + fields[j] + ' .' + profiles[i] + '=>' + $('.' + fields[j] + ' .' + profiles[i] + ' select').children("option:selected").val())
            dataValue.push($('.' + fields[j] + ' .' + profiles[i] + ' select').children("option:selected").val().trim() + ',');
            //csv +=
        }
        //csv = csv.substring(0, csv.length);
        csv += dataValue.join(',') + '\n';
    }
    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'profiles.csv';
    hiddenElement.click();
}

function createProfile(profile) {
    var profilePermission = starting;
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var data = parseInt($('.' + field + ' .' + profile + ' select').children("option:selected").val().trim());
        console.log(field);
        field = field.split('-').join('.');
        profilePermission += permissionStart;
        profilePermission += fieldStart + field + fieldEnd;
        if (data == 0) {
            profilePermission += noPermission;
        } else if (data == 1) {
            profilePermission += readPermission;
        } else if (data == 2) {
            profilePermission += readWritePermission;
        }
        profilePermission += permissionEnds;
    }
    profilePermission += ending;
    window.profilePermissions[profile] = profilePermission

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(window.profilePermissions[profile]);
    hiddenElement.target = '_blank';
    hiddenElement.download = profile.split('_').join(' ').split('-').join(':') + '.profile';
    hiddenElement.click();
}