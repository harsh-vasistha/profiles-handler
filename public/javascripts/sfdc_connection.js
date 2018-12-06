function login() {
    var user = $('#username').val();
    var pass = $('#password').val();
    var org = $('#is_production:checked').length > 0 ? 'https://login.salesforce.com' : 'https://test.salesforce.com';
    if (user != null && pass != null) {
        var body = { 'username': user, 'password': pass, 'org': org };

        $.ajax({
            type: "POST",
            url: '/sfdc/login',
            data: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            success: function(data){
                if(data.login != null){
                    if(data.login['sf:exceptionMessage'] != null){
                        alert(data.login['sf:exceptionCode']+ ' || ' + data.login['sf:exceptionMessage']);
                    }else{
                        isFromOrg = true;
                        window.sfdc_server = data.login;
                        alert('Hello '+data.login.userFullName+', SFDC Login successful. Please press "Ok" to retrive FLS permissions')
                        load_fls_permissions();
                    }
                }
            }
        });
    }
}

function load_fls_permissions(){
    $.ajax({
        type: "POST",
        url: '/sfdc/flspermissions',
        data: JSON.stringify(window.sfdc_server),
        headers: { 'Content-Type': 'application/json' },
        success: function(response){
            alert('Response successful');
            var fieldValues = {};
            var profileValues = {};
            var profileName = '';
            var fieldName = '';
            response = JSON.parse(response);
            for(var i in response.records){
                fieldName = response.records[i].Field.split('.').join('-');
                if(!data.hasOwnProperty(fieldName)){
                    data[fieldName] = {};
                }
                count = response.records[i].PermissionsEdit ? '2' : response.records[i].PermissionsRead ? '1' : '0';
                profileName = response.records[i].Parent.Profile.Name.trim().split(' ').join('_').split(':').join('-');
                fieldValues[fieldName] = '';
                profileValues[profileName] = '';
                data[fieldName][profileName] = count;
            }
            fields = Object.keys(fieldValues);
            profiles = Object.keys(profileValues);
            loadTable();
        }
    });
}