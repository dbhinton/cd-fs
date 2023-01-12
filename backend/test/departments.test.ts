import axios from 'axios';
// import { Response, Request } from './../../frontend/src/utils/_abstract';
import { expect } from 'chai';
import { it, describe } from 'mocha'
import { agent as request } from 'supertest';

import Application from '../src/app';
const app = new Application()


describe('#departments', () => {

    it('Should return success', async () => {
        const res = await request(app.service).get('/v1/departments').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body[0].id).to.equal('2')
        expect(res.body.error).to.be.undefined;
    })
})

describe('#departments_employees', () => {
    // let response: Response
    let department_id: string = '2'
    it('Should return success', async () => {
        const res = await axios.get(`http://localhost:4324/v1/departments/${department_id}`);
        console.log(res.data)
        expect(res.status).to.equal(200);
        expect(res.data).to.be.a('array')
        expect(res.data.error).to.be.undefined;
        // Expect the array to contain objects with properties  'birthday', 'bio', 'id', 'name', and 'department'
        expect(res.data[0]).to.have.all.keys('bio', 'birthday','id', 'departmentId', 'name');
        // // Expect the 'department' property of the first object to equal the passed department id
        expect(res.data[0]).to.have.property('departmentId', '2')
    })
})