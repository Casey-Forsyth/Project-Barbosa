//requires
var assert = require("assert");
var express = require('express');
var app = require('../app.js');
var request = require('supertest');
var User = require('../models/User');

var TEST_USER_PASSWORD = 'test'
var testUser = new User({email: 'test@test.com', password: TEST_USER_PASSWORD})

before(function() {
  testUser.save(function(err) {
    if (err && err.code != 11000) { //Create a test user. If user exist (err.code 11000 returned), do nothing.
      assert.fail(err, null, 'Test user creation error.')
    }
  })
})

describe('Login', function() {
  it('should log in', function(done) {
    request(app)
      .post('/login')
      .send({email: testUser.email, password: TEST_USER_PASSWORD})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        isAuthenticated: true,
        userID: testUser.id,
        email: testUser.email,
        name: ''
      })
      .end(done)
  })

  it('should not log in', function(done) {
    request(app)
      .post('/login')
      .send({email: 'wrongemail@test.com', password: 'wrongpassword'})
      .expect('Content-Type', /json/)
      .expect([
        {param: 'password', msg: 'Email wrongemail@test.com not found'}
      ])
      .end(done)
  })
})

describe('Signup', function() {
  it('should create a new user', function(done) {
    request(app)
      .post('/signup')
      .send({email: 'newuser@test.com', password: 'test', confirmPassword: 'test'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.body.isAuthenticated, true, 'User was not signed up.')
        assert.equal(res.body.email, 'newuser@test.com', 'Wrong email was used during signup.')
        if (res.body.isAuthenticated) {
          User.remove({ _id: res.body.userID }, function(err) {
            assert.equal(err, null, 'Test user could not be deleted.')
          })
        }
        done()
      })
  })

  it('should return everything blank, email not valid', function(done) {
    request(app)
      .post('/signup')
      .send({email: '', password: '', confirmPassword: ''})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'email', msg: 'Email cannot be blank', value: ''},
        {param: 'email', msg: 'Email is not valid', value: ''},
        {param: 'password', msg: 'Password cannot be blank', value: ''},
        {param: 'password', msg: 'Password must be at least 4 characters long', value: ''}
      ])
      .end(done)
  })

  it('should return email blank and not valid', function(done) {
    request(app)
      .post('/signup')
      .send({email: '', password: 'test', confirmPassword: 'test'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'email', msg: 'Email cannot be blank', value: ''},
        {param: 'email', msg: 'Email is not valid', value: ''}
      ])
      .end(done)
  })

  it('should return email not valid', function(done) {
    request(app)
      .post('/signup')
      .send({email: 'notvalid', password: 'test', confirmPassword: 'test'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'email', msg: 'Email is not valid', value: 'notvalid'}
      ])
      .end(done)
  })

  it('should return password too short', function(done) {
    request(app)
      .post('/signup')
      .send({email: 'test@test.com', password: '1', confirmPassword: '1'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'password', msg: 'Password must be at least 4 characters long', value: '1'}
      ])
      .end(done)
  })

  it('should return password too short and do not match', function(done) {
    request(app)
      .post('/signup')
      .send({email: 'test@test.com', password: '1', confirmPassword: 'a'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'password', msg: 'Password must be at least 4 characters long', value: '1'},
        {param: 'confirmPassword', msg: 'Passwords do not match', value: 'a'}
      ])
      .end(done)
  })

  it('should return passwords do not match', function(done) {
    request(app)
      .post('/signup')
      .send({email: 'test@test.com', password: 'testtest', confirmPassword: 'testabcd'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        {param: 'confirmPassword', msg: 'Passwords do not match', value: 'testabcd'}
      ])
      .end(done)
  })
})

after(function() {
  testUser.remove()
})