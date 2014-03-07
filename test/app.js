//requires
var assert = require("assert");
var express = require('express');
var app = require('../app.js');
var request = require('supertest');

describe('Home Controller', function(){
  describe('GET /', function() {
    it('should return html', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done)
    })
  })

  describe('GET /not_an_api_endpoint', function() {
    it('should return 404', function(done) {
      request(app)
        .get('/not_an_api_endpoint')
        .expect('Content-Type', /html/)
        .expect(404, done)
    })
  })
})