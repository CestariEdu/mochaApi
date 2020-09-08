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

function errorHandle(error) {
    const {
        config: {
            url,
            method,
            headers,
            data: requestBody,
        },
        response: {
            status,
            statusText,
            data: body,
        },
    } = error;
    return {
        request: {
            url,
            method,
            headers,
            requestBody,
        },
        status,
        statusText,
        body,
    };
}

function successHandle(success) {
    const {
        status,
        statusText,
        config: {
            url,
            method,
            headers,
            data: requestBody,
        },
        data: body,
    } = success;
    return {
        request: {
            url,
            method,
            headers,
            requestBody,
        },
        status,
        statusText,
        body,
    };
}

async function makeRequest(options) {
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
    try {
        const success = await axios(def);
        return successHandle(success);
    }
    catch (error) {
        return errorHandle(error);
    }
}

function fixture(name) {
    if (process.env.ENV) {
        // eslint-disable-next-line import/no-dynamic-require
        return require(`../fixture/${name}${process.env.ENV}`);
    }
    // eslint-disable-next-line import/no-dynamic-require
    return require(`../fixture/${name}HML`);
}

module.exports = {
    fixture,
    makeRequest,
};
