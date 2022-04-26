const { expect } = require('chai');
const addContext = require('mochawesome/addContext');
const { makeRequest, validateSchema } = require('../utils/main');
const schemaPokeItem = require('../schemas/pokeItem.json');
const schemaPokeItems = require('../schemas/pokeItems.json');

const url = 'https://pokeapi.co/api/v2';

describe('Pokemon API', () => {
    it('Should get pokemon item list', async function () {
        const res = await makeRequest({
            method: 'get',
            url: `${url}/item`,
        });

        addContext(this, {
            value: res,
            title: 'JSON Response Body',
        });

        expect(res.status).to.be.equal(200);
        expect(validateSchema(schemaPokeItems, res.body)).to.be.equal('Success');
    });

    it('Should get a pokemon item', async function () {
        const res = await makeRequest({
            method: 'get',
            url: `${url}/item/potion`,
        });

        addContext(this, {
            value: res,
            title: 'JSON Response Body',
        });

        expect(res.status).to.be.equal(200);
        expect(validateSchema(schemaPokeItem, res.body)).to.be.equal('Success');
    });
});
