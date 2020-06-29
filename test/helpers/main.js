/* eslint-disable global-require */
const axios = require('axios');
const qs = require('querystring');
const FormData = require('form-data');
const https = require('https');

async function validateQuerystring(options) {
    const content = JSON.stringify(options.headers);
    if (content.includes('application/x-www-form-urlencoded')) {
        return qs.stringify(options.data);
    }
    return options.data;
}

async function makeRequest(options) {
    let response;
    const def = options;
    def.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    if (def.form === true) {
        const formData = new FormData();
        Object.keys(def.data).forEach((key) => {
            formData.append(key, def.data[key]);
        });
        def.data = formData;
        def.headers = formData.getHeaders();
    } else if (def.headers) {
        def.data = await validateQuerystring(def);
    }
    await axios(def).then((resp) => {
        const {
            status, statusText, config: {
                url, method, headers, data: requestBody,
            }, data: body,
        } = resp;
        response = {
            status,
            statusText,
            request: {
                url,
                method,
                headers,
                requestBody,
            },
            body,
        };
    }, (error) => {
        const {
            config: {
                url, method, headers, data: requestBody,
            }, response: { status, statusText, data: body },
        } = error;
        response = {
            status,
            statusText,
            request: {
                url,
                method,
                headers,
                requestBody,
            },
            body,
        };
    });
    return response;
}

function fixture(name) {
    let retorno = {};
    // eslint-disable-next-line import/no-dynamic-require
    retorno = require(`../fixture/${name}`);
    return retorno;
}

module.exports = {
    fixture,
    makeRequest,
};
