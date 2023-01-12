// import { Response, Request } from './../../frontend/src/utils/_abstract';
import { expect } from 'chai';
import { it, describe } from 'mocha'
import { agent as request } from 'supertest';
import axios from 'axios';


import Application from '../src/app';
const app = new Application()


describe('#employees', () => {

    it('Should return success', async () => {
        const res = await request(app.service).get('/v1/employees').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(5)
        expect(res.body[0].id).to.equal('82837')
        expect(res.body.error).to.be.undefined;
    })
})

describe('#employees_id', () => {
    // let response: Response
    let employee_id: string = '82338'
    it('Should return success', async () => {
        const res = await axios.get(`http://localhost:4324/v1/employees/${employee_id}`);
        console.log(res.data)
        expect(res.status).to.equal(200);
        expect(res.data).to.be.a('array')
        expect(res.data.error).to.be.undefined;
        // Expect the array to contain objects with properties 'birthday', 'bio', 'id', 'name', and 'department'
        expect(res.data[0]).to.have.all.keys('id', 'name', 'departmentId', 'birthday', 'bio');

        // Expect the 'department' property of the first object to equal the passed department id
        expect(res.data[0]).to.have.property('departmentId', '2');
   })
})