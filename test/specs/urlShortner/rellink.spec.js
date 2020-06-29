const { expect } = require('chai');
const addContext = require('mochawesome/addContext');
const { makeRequest, fixture } = require('../../helpers/main');

describe('Utilizar Rellink para encurtar URL', () => {
    const { url, body } = fixture('relink');

    it('encurtando link da home do google', async function () {
        const res = await makeRequest({
            method: 'post',
            url: `${url}`,
            data: body,
        });
        addContext(this, {
            value: JSON.stringify(res),
            title: 'Retorno encurtador url',
        });
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('hashid');
    });
});
