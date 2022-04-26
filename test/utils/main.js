const axios = require('axios');
const Ajv = require('ajv');

const ajv = new Ajv({ strict: false });

function handleError(error) {
    const {
        config: {
            url, method, headers, data: requestBody,
        },
        response: { status, statusText, data: body },
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

function handleSuccess(success) {
    const {
        status,
        statusText,
        config: {
            url, method, headers, data: requestBody,
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
    try {
        const success = await axios(options);
        return handleSuccess(success);
    } catch (error) {
        return handleError(error);
    }
}

function validateSchema(schema, data) {
    const valid = ajv.validate(schema, data);

    if (!valid) {
        return JSON.stringify(ajv.errors);
    }

    return 'Success';
}

module.exports = {
    makeRequest,
    validateSchema,
};
