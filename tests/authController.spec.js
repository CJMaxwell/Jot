import request from 'supertest';
import { expect } from 'chai';
import "@babel/polyfill";

import app from '../app';
import db from '../models';
import hashPassword from '../helpers/hashPassword';


beforeEach(async () => {
    await db.Todo.destroy({
        truncate: {
            cascade: true
        }
    });
    await db.User.destroy({
        truncate: {
            cascade: true
        }
    });
    const user = {
        firstName: 'Maxwell',
        lastName: 'Chijioke',
        email: 'maxwellchijioke@gmail.com',
        password: 'ThisIsTest'
    };

    const { firstName, lastName, email, password } = user;

    const hashedPassword = await hashPassword(password);

    await db.User.findOrCreate({
        where: {
            email
        },
        defaults: {
            firstName, lastName, email, password:hashedPassword
        } 
    });
});

describe('User sign up', () => {
    it('should return "Email already exists" if user exists', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: 'Maxwell',
                lastName: 'Chijioke',
                email: 'maxwellchijioke@gmail.com',
                password: 'ThisIsTest'
            });
        expect(response.statusCode).to.equal(409);
        expect(response.body.message).to.equal('Email already exists');
        
    });
    it('should return "Email and password are required" if any of them is not provided', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: 'Maxwell',
                lastName: 'Chijioke',
                email: '',
                password: 'ThisIsTest'
            });
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal('Email and password are required');
    });
    it('Should return firstName, lastName, email and a JWT token once a user signs up', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: 'Hamedima',
                lastName: 'Farouq',
                email: 'hamedimafarouq@yahoo.co.uk',
                password: 'youtocome'
            });
        expect(response.body.user.firstName).to.equal('Hamedima');
        expect(response.body.user.lastName).to.equal('Farouq');
        expect(response.body.user.email).to.equal('hamedimafarouq@yahoo.co.uk');
        expect(response.body.token).to.be.a('string');
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an('object');
    });
})

describe('User login',() => {
    it('should return "Please your email and password" if the email or password is invalid', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                email: 'maxwellchijioke@gmail.com',
                password: ''
            });
    })
})