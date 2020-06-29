const { expect } = require('chai');
const addContext = require('mochawesome/addContext');
const { makeRequest, fixture } = require('../../helpers/main');

describe('Valor do dolar', () => {
    const { url, key } = fixture('currency');

    it('em relação a todas as moedas', async function () {
        const res = await makeRequest({
            method: 'get',
            url: `${url}/rates?key=${key}&base=USD`,
        });
        addContext(this, {
            value: JSON.stringify(res),
            title: 'Retorno base USD',
        });
        expect(res.status).to.be.equal(200);
        expect(res.body.rates).to.have.property('AED');
        expect(res.body.rates).to.have.property('BRL');
        expect(res.body.rates).to.have.property('GBP');
    });

    it('em relação ao real brasileiro', async function () {
        const res = await makeRequest({
            method: 'get',
            url: `${url}/rates?key=${key}&base=USD&limit=BRL`,
        });
        addContext(this, {
            value: JSON.stringify(res),
            title: 'Retorno base USD para BRL',
        });
        expect(res.status).to.be.equal(200);
        expect(res.body.rates).to.have.property('BRL');
    });
});
