const { expect } = require('chai');
const addContext = require('mochawesome/addContext');
const Joi = require('joi');
const { makeRequest, fixture } = require('../../helpers/main');

const fixtureBTC = fixture('bitcoin');

describe('Test/Bitcoin exchange API', () => {
    const schema = Joi.array().items(Joi.object({
        id: Joi.string(),
        baseCurrency: Joi.string(),
        quoteCurrency: Joi.string(),
        quantityIncrement: Joi.string(),
        tickSize: Joi.string(),
        takeLiquidityRate: Joi.string(),
        provideLiquidityRate: Joi.string(),
        feeCurrency: Joi.string(),
        marginTrading: Joi.boolean(),
        maxInitialLeverage: Joi.string(),
    }));

    it('Should return list of symbols', async function () {
        const res = await makeRequest({
            method: 'get',
            url: `${fixtureBTC.url}/api/2/public/symbol`,
        });

        addContext(this, {
            value: JSON.stringify(res),
            title: 'Response to bitcoin symbol api request',
        });

        const { error } = schema.validate(res.body);
        expect(error).to.be.undefined;

        expect(res.status).to.be.equal(200);
    });
});
