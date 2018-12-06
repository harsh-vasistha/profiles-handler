const callout = require("./request")

const getProfiles = (properties) => {
    var promise = new Promise(function (resolve, reject) {
        var requestURL = properties['baseURL'] + '/services/data/v' + properties['version']+'/query?q=SELECT+Name+FROM+Profile';

        var request = callout.executeRequest(requestURL, { 'Authorization': 'OAuth '+properties['sessionId']}, 'GET', null);
        request.then(function (response) {
            resolve(response.data);
        });
        request.catch(function (response) {
            reject(response);
        });
    });
    return promise;
}

module.exports = {
    getProfiles: getProfiles
}