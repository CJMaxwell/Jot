import request from 'supertest';
import { expect } from 'chai';
import "@babel/polyfill";

import app from '../app';

describe('User sign up', () => {
    it('When a user signs up, it should return firstName, lastName, email and a JWT token', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: 'Venius',
                lastName: 'Ikechi',
                email: 'veniusikechi@yahoo.co.uk',
                password: 'youtocome'
            });
        expect(response.body.user.firstName).to.equal('Venius');
        expect(response.body.user.lastName).to.equal('Ikechi');
        expect(response.body.user.email).to.equal('veniusikechi@yahoo.co.uk');
        expect(response.body.token).to.be.a('string');
        expect(response.statusCode).to.equal(201);
    })
})